export interface SocialLink {
  id: string;
  platform: 'LinkedIn' | 'GitHub' | 'Twitter' | 'Portfolio' | 'LeetCode' | 'Dribbble' | 'Other';
  url: string;
  label?: string;
}

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  summary: string;
  avatarUrl?: string;
  socialLinks: SocialLink[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  highlights: string[];
  technologies?: string[];
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  gpa?: string;
  honors?: string[];
  description?: string;
}

export interface SkillCategory {
  id: string;
  name: string; // e.g., "Languages", "Frameworks & Libraries", "Tools & Platforms", "Soft Skills"
  skills: {
    id: string;
    name: string;
    level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  role?: string;
  liveUrl?: string;
  githubUrl?: string;
  startDate?: string;
  endDate?: string;
  highlights: string[];
  technologies: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  url?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  organization?: string;
}

export interface Language {
  id: string;
  language: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Basic';
}

export interface ResumeContent {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  projects: Project[];
  certifications: Certification[];
  achievements: Achievement[];
  languages: Language[];
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: 'Modern' | 'Minimalist' | 'Executive' | 'Technical' | 'Creative';
  isPopular?: boolean;
  isNew?: boolean;
}

export interface Resume {
  id: string;
  title: string;
  targetRole: string;
  templateId: string;
  lastModified: string;
  createdAt: string;
  content: ResumeContent;
  atsScore?: number;
  status: 'draft' | 'completed' | 'analyzed';
  pageCount?: number;
}

export interface ATSCheckItem {
  id: string;
  category: 'Formatting' | 'Keywords' | 'Impact' | 'Length' | 'Structure';
  status: 'passed' | 'warning' | 'failed';
  title: string;
  message: string;
  suggestion?: string;
}

export interface ResumeAnalysis {
  id: string;
  resumeId: string;
  resumeTitle: string;
  date: string;
  overallScore: number;
  breakdown: {
    impactScore: number;
    brevityScore: number;
    styleScore: number;
    atsReadabilityScore: number;
  };
  summary: string;
  keyStrengths: string[];
  criticalIssues: string[];
  checks: ATSCheckItem[];
}

export interface JobMatchAnalysis {
  id: string;
  resumeId: string;
  jobTitle: string;
  companyName: string;
  matchScore: number;
  matchingKeywords: string[];
  missingKeywords: string[];
  recommendations: string[];
  jobDescriptionSnippet: string;
  dateAnalyzed: string;
}

export interface SkillMatchItem {
  id: string;
  name: string;
  category: string;
  importance: 'Required' | 'Preferred' | 'Bonus';
  foundInResume: boolean;
  contextInResume?: string;
}

export interface SectionRelevanceItem {
  id: string;
  sectionName: string;
  relevanceScore: number; // 0-100
  status: 'Strong Alignment' | 'Moderate Alignment' | 'Needs Tailoring';
  matchingHighlights: string[];
  recommendation: string;
}

export interface MatchImprovementSuggestion {
  id: string;
  title: string;
  type: 'Keyword' | 'Experience' | 'Skill' | 'Formatting' | 'Education';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  action: string;
  potentialScoreGain?: number;
}

export interface AIImprovementRecommendation {
  id: string;
  stepNumber: number;
  category: string;
  headline: string;
  rationale: string;
  actionableAdvice: string;
  suggestedBullet?: {
    original?: string;
    improved: string;
    section: string;
  };
}

export interface DetailedJobMatchReport {
  id: string;
  resumeId: string;
  resumeTitle: string;
  jobTitle: string;
  companyName: string;
  dateAnalyzed: string;
  jobDescription: string;
  overallScore: number;
  skillsMatchScore: number;
  keywordMatchScore: number;
  experienceMatchScore: number;
  educationMatchScore: number;
  verdict: {
    label: string;
    grade: string;
    summary: string;
  };
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
  relevantSections: SectionRelevanceItem[];
  improvementSuggestions: MatchImprovementSuggestion[];
  aiRecommendations: AIImprovementRecommendation[];
}

export interface UserSettings {
  name: string;
  email: string;
  defaultTemplateId: string;
  targetIndustry: string;
  experienceLevel: 'Entry-Level' | 'Mid-Level' | 'Senior' | 'Lead / Executive';
  notifications: {
    emailAlerts: boolean;
    weeklyTips: boolean;
    scoreUpdates: boolean;
  };
  theme: 'light' | 'system' | 'dark';
}

export type StructureSectionStatus = 'Good' | 'Needs Improvement' | 'Missing';

export interface StructureCheck {
  id: string;
  section: 'Contact Information' | 'Summary' | 'Education' | 'Experience' | 'Skills' | 'Projects' | 'Certifications';
  status: StructureSectionStatus;
  summary: string;
  details: string[];
  recommendation?: string;
}

export interface KeywordItem {
  id: string;
  name: string;
  category: 'Technical' | 'Soft Skill' | 'Domain' | 'Tool';
  importance: 'Critical' | 'High' | 'Medium';
  frequencyInResume?: number;
  expectedInRole?: string;
  matched: boolean;
}

export interface KeywordUsageSuggestion {
  id: string;
  keyword: string;
  targetSection: string;
  suggestion: string;
  exampleBullet?: string;
}

export interface KeywordAnalysisData {
  matchedKeywords: KeywordItem[];
  missingKeywords: KeywordItem[];
  importantKeywords: KeywordItem[];
  usageSuggestions: KeywordUsageSuggestion[];
}

export interface ATSScoreBreakdown {
  overallScore: number;
  keywordMatch: number;
  skillsMatch: number;
  resumeStructure: number;
  experienceRelevance: number;
  formatting: number;
}

export interface ATSRecommendationItem {
  id: string;
  priority: 'High Impact' | 'Moderate Impact' | 'Quick Fix';
  category: 'Keywords' | 'Formatting' | 'Structure' | 'Experience' | 'Skills';
  title: string;
  description: string;
  actionText: string;
  estimatedScoreBoost?: number;
  beforeExample?: string;
  afterExample?: string;
}

export interface FullATSAnalysisReport {
  id: string;
  resumeId: string;
  resumeTitle: string;
  targetRole: string;
  jobDescription?: string;
  analyzedAt: string;
  scoreBreakdown: ATSScoreBreakdown;
  summaryVerdict: {
    label: string;
    grade: string;
    percentile: string;
    brief: string;
  };
  keywordAnalysis: KeywordAnalysisData;
  structureChecks: StructureCheck[];
  recommendations: ATSRecommendationItem[];
  legacyChecks?: ATSCheckItem[];
}
