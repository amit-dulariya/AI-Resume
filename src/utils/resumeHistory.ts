import { Resume } from '../types/resume';
import {
  ResumeWithStats,
  AnalysisHistoryItem,
  ResumeSortOption,
  TemplateFilterOption,
} from '../types/resumeHistory';
import { mockResumes, mockTemplates, mockAnalysis, mockJobMatches } from '../data/mockData';

const RESUMES_STORAGE_KEY = 'resumeai_saved_resumes_list';
const ANALYSES_STORAGE_KEY = 'resumeai_analysis_history_list';

/**
 * Calculates a reliable completion percentage for a given resume based on
 * completeness of personal info, summary, experience, education, and skills.
 */
export function calculateResumeCompletion(resume: Resume): number {
  let score = 0;
  const content = resume.content;
  if (!content) return 15;

  // Personal Info (25%)
  const p = content.personalInfo;
  if (p) {
    if (p.fullName?.trim()) score += 5;
    if (p.email?.trim()) score += 5;
    if (p.phone?.trim()) score += 5;
    if (p.location?.trim()) score += 5;
    if (p.jobTitle?.trim()) score += 5;
  }

  // Summary (15%)
  if (p?.summary && p.summary.trim().length > 40) {
    score += 15;
  } else if (p?.summary && p.summary.trim().length > 10) {
    score += 8;
  }

  // Work Experience (25%)
  if (content.experience && content.experience.length > 0) {
    score += 15;
    const hasHighlights = content.experience.some(
      (e) => e.highlights && e.highlights.length > 0
    );
    if (hasHighlights) score += 10;
  }

  // Education (15%)
  if (content.education && content.education.length > 0) {
    score += 15;
  }

  // Skills (10%)
  if (content.skills && content.skills.length > 0) {
    const skillCount = content.skills.reduce(
      (acc, cat) => acc + (cat.skills?.length || 0),
      0
    );
    if (skillCount >= 5) score += 10;
    else if (skillCount > 0) score += 5;
  }

  // Extras: Projects, Certifications, Achievements (10%)
  const hasExtras =
    (content.projects && content.projects.length > 0) ||
    (content.certifications && content.certifications.length > 0) ||
    (content.achievements && content.achievements.length > 0) ||
    (content.languages && content.languages.length > 0);
  if (hasExtras) {
    score += 10;
  }

  return Math.min(100, Math.max(10, score));
}

/**
 * Get friendly template name by ID
 */
export function getTemplateDisplayName(templateId: string): string {
  const match = mockTemplates.find((t) => t.id === templateId);
  return match ? match.name : 'Modern';
}

/**
 * Loads all saved resumes from localStorage, merging with draft keys if present,
 * or defaulting to mockResumes.
 */
export function loadSavedResumes(): ResumeWithStats[] {
  let baseResumes: Resume[] = [];

  try {
    const raw = localStorage.getItem(RESUMES_STORAGE_KEY);
    if (raw) {
      baseResumes = JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Error reading saved resumes list from localStorage', err);
  }

  // If empty, initialize with mockResumes
  if (!baseResumes || baseResumes.length === 0) {
    baseResumes = [...mockResumes];
  }

  // Also check if user edited active draft `resumeai_draft_res-1`, etc. and sync latest title/content
  baseResumes = baseResumes.map((res) => {
    try {
      const draftRaw = localStorage.getItem(`resumeai_draft_${res.id}`);
      if (draftRaw) {
        const draft = JSON.parse(draftRaw);
        return {
          ...res,
          ...draft,
          id: res.id, // preserve ID
        };
      }
    } catch {
      // ignore
    }
    return res;
  });

  return baseResumes.map((r) => ({
    ...r,
    completionPercentage: calculateResumeCompletion(r),
    templateName: getTemplateDisplayName(r.templateId),
  }));
}

/**
 * Persists the resumes list to localStorage
 */
export function saveResumesList(resumes: Resume[]): void {
  try {
    localStorage.setItem(RESUMES_STORAGE_KEY, JSON.stringify(resumes));
  } catch (err) {
    console.warn('Error saving resumes list to localStorage', err);
  }
}

/**
 * Duplicates a resume with a new ID and updated timestamp
 */
export function duplicateResume(target: Resume): Resume {
  const newId = `res-${Date.now()}`;
  const duplicated: Resume = {
    ...target,
    id: newId,
    title: `${target.title} (Copy)`,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: 'draft',
    // Clone nested content
    content: JSON.parse(JSON.stringify(target.content)),
  };

  // Also seed its draft in localStorage
  try {
    localStorage.setItem(`resumeai_draft_${newId}`, JSON.stringify(duplicated));
  } catch {
    // ignore
  }

  return duplicated;
}

/**
 * Deletes a resume from state and cleans up draft key
 */
export function deleteResumeStorage(resumeId: string): void {
  try {
    localStorage.removeItem(`resumeai_draft_${resumeId}`);
  } catch {
    // ignore
  }
}

/**
 * Default mock analysis history records
 */
export const initialAnalysisHistory: AnalysisHistoryItem[] = [
  {
    id: 'ana-hist-1',
    resumeId: 'res-1',
    resumeName: 'Senior Full Stack Engineer Resume',
    targetRole: 'Senior Frontend Architect',
    companyName: 'Stripe, Inc.',
    atsScore: 92,
    matchScore: 88,
    analysisDate: '2026-09-12T16:40:00.000Z',
    scanType: 'Job Description Match',
    summary:
      'High-impact resume with strong action-oriented metrics and exceptional keyword density. Minor optimizations recommended for cloud compliance protocols.',
    breakdown: {
      impactScore: 95,
      brevityScore: 90,
      styleScore: 88,
      atsReadabilityScore: 96,
    },
    keyStrengths: [
      'Strong metric density (85% of bullets feature quantified metrics)',
      'Optimal single-page length and standard linear margin flow',
      'Clean contact section with active portfolio and GitHub URLs',
    ],
    criticalIssues: [
      'Missing 2 specific cloud security keywords (OAuth2, SOC2)',
      'Summary could be tightened to 2 concise lines for faster human scan',
    ],
  },
  {
    id: 'ana-hist-2',
    resumeId: 'res-1',
    resumeName: 'Senior Full Stack Engineer Resume',
    targetRole: 'Staff Full Stack Engineer',
    companyName: 'Datadog',
    atsScore: 94,
    matchScore: 94,
    analysisDate: '2026-09-08T11:00:00.000Z',
    scanType: 'Job Description Match',
    summary:
      'Near-flawless match for distributed systems observability role. High alignment on Go, TypeScript, Docker, and telemetry.',
    breakdown: {
      impactScore: 96,
      brevityScore: 92,
      styleScore: 94,
      atsReadabilityScore: 98,
    },
    keyStrengths: [
      'PulseOps project aligns directly with Datadog APM requirements',
      '45M daily requests throughput metric shows enterprise production readiness',
      'Strong open-source contributions highlighted',
    ],
    criticalIssues: [
      'Consider referencing gRPC or Kubernetes Helm chart automation',
    ],
  },
  {
    id: 'ana-hist-3',
    resumeId: 'res-2',
    resumeName: 'Product Manager - SaaS Growth',
    targetRole: 'Senior Technical Product Manager',
    companyName: 'HyperGrowth B2B SaaS',
    atsScore: 78,
    matchScore: 82,
    analysisDate: '2026-08-20T10:30:00.000Z',
    scanType: 'ATS Scan',
    summary:
      'Good foundational resume. Needs stronger quantitative metrics on ARR growth, onboarding conversion lift, and A/B test methodologies.',
    breakdown: {
      impactScore: 74,
      brevityScore: 80,
      styleScore: 82,
      atsReadabilityScore: 84,
    },
    keyStrengths: [
      'Clear progression from Associate to Senior Product Manager',
      'Solid domain terminology: PLG, PRD, Mixpanel, SQL',
    ],
    criticalIssues: [
      'Several experience bullets lack concrete percentage or revenue numbers',
      'Include specific experimentation tools and frameworks used',
    ],
  },
  {
    id: 'ana-hist-4',
    resumeId: 'res-3',
    resumeName: 'Executive Strategy & Operations',
    targetRole: 'VP of Strategy & Transformation',
    companyName: 'Enterprise Consulting Group',
    atsScore: 84,
    matchScore: 79,
    analysisDate: '2026-07-28T14:15:00.000Z',
    scanType: 'ATS Scan',
    summary:
      'Authoritative executive profile with strong enterprise leadership credentials. Formatting should be streamlined to avoid multi-column parsing errors.',
    breakdown: {
      impactScore: 88,
      brevityScore: 78,
      styleScore: 86,
      atsReadabilityScore: 85,
    },
    keyStrengths: [
      'Multi-million dollar digital transformation outcomes highlighted',
      'Board-level and stakeholder leadership experience',
    ],
    criticalIssues: [
      'Ensure 2-page flow avoids orphan section headers',
      'Add key industry technological keywords in executive summary',
    ],
  },
];

/**
 * Loads previous AI analysis history from localStorage or defaults
 */
export function loadAnalysisHistory(): AnalysisHistoryItem[] {
  try {
    const raw = localStorage.getItem(ANALYSES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading analysis history from localStorage', err);
  }
  return initialAnalysisHistory;
}

/**
 * Saves analysis history
 */
export function saveAnalysisHistory(history: AnalysisHistoryItem[]): void {
  try {
    localStorage.setItem(ANALYSES_STORAGE_KEY, JSON.stringify(history));
  } catch (err) {
    console.warn('Error saving analysis history to localStorage', err);
  }
}

/**
 * Filter and sort resumes
 */
export function filterAndSortResumes(
  resumes: ResumeWithStats[],
  query: string,
  templateFilter: TemplateFilterOption,
  sortBy: ResumeSortOption
): ResumeWithStats[] {
  let filtered = [...resumes];

  // Search by resume name
  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.targetRole?.toLowerCase().includes(q) ||
        r.content?.personalInfo?.fullName?.toLowerCase().includes(q)
    );
  }

  // Filter by template
  if (templateFilter !== 'all') {
    filtered = filtered.filter((r) => r.templateId === templateFilter);
  }

  // Sort
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'recently-updated': {
        const timeA = new Date(a.lastModified || a.createdAt).getTime();
        const timeB = new Date(b.lastModified || b.createdAt).getTime();
        return timeB - timeA;
      }
      case 'highest-ats': {
        return (b.atsScore || 0) - (a.atsScore || 0);
      }
      case 'highest-completion': {
        return b.completionPercentage - a.completionPercentage;
      }
      case 'name-asc': {
        return a.title.localeCompare(b.title);
      }
      case 'name-desc': {
        return b.title.localeCompare(a.title);
      }
      default:
        return 0;
    }
  });

  return filtered;
}
