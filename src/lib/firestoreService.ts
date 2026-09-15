import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Resume } from '../types/resume';
import { ResumeWithStats, AnalysisHistoryItem } from '../types/resumeHistory';
import { ComprehensiveAnalysisResult } from '../data/analyzerMockData';
import { calculateResumeCompletion, getTemplateDisplayName } from '../utils/resumeHistory';
import { isEmailAdmin } from '../utils/auth';

/**
 * 1. Users Collection
 * uid, name, email, photoURL, role, createdAt, lastLogin
 */
export interface FirestoreUserData {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin: string;
}

export async function syncUserDocument(
  fbUser: {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    photoURL?: string | null;
  },
  explicitRole?: 'user' | 'admin'
): Promise<FirestoreUserData> {
  const userRef = doc(db, 'users', fbUser.uid);
  const now = new Date().toISOString();
  const calculatedRole =
    explicitRole || (isEmailAdmin(fbUser.email || '') ? 'admin' : 'user');

  try {
    const existingSnap = await getDoc(userRef);

    if (existingSnap.exists()) {
      const data = existingSnap.data() as FirestoreUserData;
      const updatedData: Partial<FirestoreUserData> = {
        name: fbUser.displayName || data.name || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || data.email || '',
        photoURL: fbUser.photoURL || data.photoURL || '',
        lastLogin: now,
      };

      // Ensure admin email always reflects admin role
      if (isEmailAdmin(fbUser.email || '')) {
        updatedData.role = 'admin';
      }

      await updateDoc(userRef, updatedData);
      return { ...data, ...updatedData };
    } else {
      const newUserData: FirestoreUserData = {
        uid: fbUser.uid,
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
        email: fbUser.email || '',
        photoURL: fbUser.photoURL || '',
        role: calculatedRole,
        createdAt: now,
        lastLogin: now,
      };

      await setDoc(userRef, newUserData);
      return newUserData;
    }
  } catch (error) {
    console.warn('Firestore user synchronization notice:', error);
    // Return structured representation even if offline
    return {
      uid: fbUser.uid,
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      email: fbUser.email || '',
      photoURL: fbUser.photoURL || '',
      role: calculatedRole,
      createdAt: now,
      lastLogin: now,
    };
  }
}

/**
 * 2. Resumes Collection
 * resumeId, userId, title, templateId, resumeData, createdAt, updatedAt
 */
export async function saveResumeToFirestore(
  resume: Resume,
  userId: string
): Promise<string> {
  const resumeId = resume.id || `res-${Date.now()}`;
  const resumeRef = doc(db, 'resumes', resumeId);
  const now = new Date().toISOString();

  const firestoreData = {
    resumeId,
    userId,
    title: resume.title || 'Untitled Resume',
    templateId: resume.templateId || 'tpl-modern',
    resumeData: resume.content || {},
    createdAt: resume.createdAt || now,
    updatedAt: now,
  };

  try {
    await setDoc(resumeRef, firestoreData, { merge: true });

    // Log activity
    await logActivity(
      userId,
      'resume_save',
      `Saved resume "${resume.title || 'Untitled Resume'}"`
    );

    return resumeId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `resumes/${resumeId}`);
  }
}

export async function getUserResumesFromFirestore(
  userId: string
): Promise<ResumeWithStats[]> {
  try {
    const resumesRef = collection(db, 'resumes');
    const q = query(resumesRef, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const results: ResumeWithStats[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const rawResume: Resume = {
        id: data.resumeId || docSnap.id,
        title: data.title || 'Untitled Resume',
        targetRole: data.targetRole || data.resumeData?.personalInfo?.title || 'Software Engineer',
        templateId: data.templateId || 'tpl-modern',
        status: 'completed',
        createdAt: data.createdAt || new Date().toISOString(),
        lastModified: data.updatedAt || data.createdAt || new Date().toISOString(),
        content: data.resumeData || {},
      };

      results.push({
        ...rawResume,
        completionPercentage: calculateResumeCompletion(rawResume),
        templateName: getTemplateDisplayName(rawResume.templateId),
      });
    });

    // Sort by most recently updated
    results.sort((a, b) => {
      const tA = new Date(a.lastModified || a.createdAt).getTime();
      const tB = new Date(b.lastModified || b.createdAt).getTime();
      return tB - tA;
    });

    return results;
  } catch (error) {
    console.warn('Could not load resumes from Firestore:', error);
    return [];
  }
}

export async function updateResumeInFirestore(
  resumeId: string,
  userId: string,
  updates: Partial<Resume>
): Promise<void> {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    const now = new Date().toISOString();

    const payload: Record<string, any> = {
      updatedAt: now,
    };
    if (updates.title) payload.title = updates.title;
    if (updates.templateId) payload.templateId = updates.templateId;
    if (updates.content) payload.resumeData = updates.content;

    await updateDoc(resumeRef, payload);

    await logActivity(
      userId,
      'resume_update',
      `Updated resume "${updates.title || resumeId}"`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `resumes/${resumeId}`);
  }
}

export async function deleteResumeFromFirestore(
  resumeId: string,
  userId: string
): Promise<void> {
  try {
    const resumeRef = doc(db, 'resumes', resumeId);
    await deleteDoc(resumeRef);

    await logActivity(
      userId,
      'resume_delete',
      `Deleted resume ${resumeId}`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `resumes/${resumeId}`);
  }
}

/**
 * 3. Resume Analyses Collection
 * analysisId, userId, resumeId, overallScore, atsScore, skillsDetected,
 * missingSkills, strengths, weaknesses, formattingIssues, contentSuggestions, keywords, createdAt
 */
export async function saveAnalysisToFirestore(params: {
  userId: string;
  resumeId: string;
  resumeName?: string;
  companyName?: string;
  targetRole?: string;
  analysisResult: ComprehensiveAnalysisResult;
  scanType?: 'ATS Scan' | 'Job Description Match' | 'Comprehensive' | 'Company Specific';
}): Promise<string> {
  const analysisId = `ana-${Date.now()}`;
  const analysisRef = doc(db, 'resumeAnalyses', analysisId);
  const now = new Date().toISOString();
  const { analysisResult } = params;

  // Extract structured properties without saving binary data
  const overallScore = analysisResult.overallScore || 85;
  const atsScore = analysisResult.atsCompatibilityScore || overallScore;
  const skillsDetected =
    analysisResult.skillsDetected?.map((s) => (typeof s === 'string' ? s : s.name)) || [];
  const missingSkills =
    analysisResult.missingSkills?.map((m) => (typeof m === 'string' ? m : m.name)) || [];
  const strengths = analysisResult.strengths || [];
  const weaknesses = analysisResult.weaknesses || [];
  const formattingIssues =
    analysisResult.formattingIssues?.map((f) => (typeof f === 'string' ? f : `${f.name}: ${f.description}`)) || [];
  const contentSuggestions =
    analysisResult.contentSuggestions?.map((c) =>
      typeof c === 'string' ? c : `${c.section || 'General'} - ${c.title}: ${c.issue}`
    ) || [];
  const keywords =
    analysisResult.keywordSuggestions?.map((k) => (typeof k === 'string' ? k : k.keyword)) || [];

  const firestoreData: Record<string, any> = {
    analysisId,
    userId: params.userId,
    resumeId: params.resumeId || 'general',
    resumeName: params.resumeName || 'Resume Analysis',
    companyName: params.companyName || 'General',
    targetRole: params.targetRole || analysisResult.targetRole || 'Software Professional',
    overallScore,
    atsScore,
    skillsDetected,
    missingSkills,
    strengths,
    weaknesses,
    formattingIssues,
    contentSuggestions,
    keywords,
    summary:
      analysisResult.overallVerdict?.summary ||
      'Complete ATS evaluation report generated via AI analysis.',
    scanType: params.scanType || 'Comprehensive',
    breakdown: analysisResult.atsBreakdown || {
      machineReadability: 90,
      headingHierarchy: 85,
      contactExtraction: 95,
      layoutCleanliness: 88,
      keywordPlacement: 82,
    },
    createdAt: now,
  };

  if (analysisResult.companyAnalysis) {
    firestoreData.companyAnalysis = analysisResult.companyAnalysis;
  }

  try {
    await setDoc(analysisRef, firestoreData);

    // Log activity
    await logActivity(
      params.userId,
      'analysis_performed',
      `Completed ${params.scanType || 'ATS'} analysis for "${params.resumeName || 'Resume'}"`
    );

    return analysisId;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `resumeAnalyses/${analysisId}`);
  }
}

export async function getUserAnalysesFromFirestore(
  userId: string
): Promise<AnalysisHistoryItem[]> {
  try {
    const ref = collection(db, 'resumeAnalyses');
    const q = query(ref, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const items: AnalysisHistoryItem[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      items.push({
        id: data.analysisId || docSnap.id,
        resumeId: data.resumeId || 'res-1',
        resumeName: data.resumeName || 'Resume',
        targetRole: data.targetRole || 'General Role',
        companyName: data.companyName,
        atsScore: data.atsScore || data.overallScore || 80,
        matchScore: data.overallScore || data.atsScore || 80,
        analysisDate: data.createdAt || new Date().toISOString(),
        summary: data.summary || 'ATS evaluation report',
        breakdown: data.breakdown || {
          impactScore: 85,
          brevityScore: 80,
          styleScore: 80,
          atsReadabilityScore: data.atsScore || 80,
        },
        keyStrengths: data.strengths || [],
        criticalIssues: data.formattingIssues || data.weaknesses || [],
        scanType: data.scanType || 'ATS Scan',
      });
    });

    items.sort(
      (a, b) =>
        new Date(b.analysisDate).getTime() - new Date(a.analysisDate).getTime()
    );

    return items;
  } catch (error) {
    console.warn('Could not load analyses from Firestore:', error);
    return [];
  }
}

/**
 * 4. Activity History Collection
 * activityId, userId, type, description, createdAt
 */
export async function logActivity(
  userId: string,
  type: string,
  description: string
): Promise<void> {
  if (!userId) return;
  const activityId = `act-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const activityRef = doc(db, 'activityHistory', activityId);

  try {
    await setDoc(activityRef, {
      activityId,
      userId,
      type,
      description,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Activity logging notice:', err);
  }
}

export async function getUserActivityHistory(
  userId: string
): Promise<
  Array<{
    activityId: string;
    userId: string;
    type: string;
    description: string;
    createdAt: string;
  }>
> {
  try {
    const ref = collection(db, 'activityHistory');
    const q = query(ref, where('userId', '==', userId));
    const snapshot = await getDocs(q);

    const list: any[] = [];
    snapshot.forEach((d) => list.push(d.data()));
    list.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    return list;
  } catch (error) {
    console.warn('Could not load activity history:', error);
    return [];
  }
}

/**
 * 5. Templates Collection
 * templateId, name, description, previewImage, category, templateData, createdAt, updatedAt
 */
export async function getTemplatesFromFirestore(): Promise<any[]> {
  try {
    const ref = collection(db, 'templates');
    const snapshot = await getDocs(ref);
    const list: any[] = [];
    snapshot.forEach((d) => list.push(d.data()));
    return list;
  } catch (error) {
    console.warn('Could not load templates from Firestore:', error);
    return [];
  }
}

export async function saveTemplateToFirestore(
  template: {
    templateId: string;
    name: string;
    description: string;
    previewImage?: string;
    category: string;
    templateData?: any;
  },
  adminUserId: string
): Promise<void> {
  const ref = doc(db, 'templates', template.templateId);
  const now = new Date().toISOString();

  try {
    await setDoc(
      ref,
      {
        ...template,
        createdAt: now,
        updatedAt: now,
      },
      { merge: true }
    );

    await logActivity(
      adminUserId,
      'template_update',
      `Admin updated template "${template.name}"`
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `templates/${template.templateId}`);
  }
}
