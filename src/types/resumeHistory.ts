import { Resume, ResumeAnalysis, JobMatchAnalysis } from './resume';

export interface ResumeWithStats extends Resume {
  completionPercentage: number;
  templateName: string;
}

export interface AnalysisHistoryItem {
  id: string;
  resumeId: string;
  resumeName: string;
  targetRole: string;
  companyName?: string;
  atsScore: number;
  matchScore: number;
  analysisDate: string;
  summary: string;
  breakdown: {
    impactScore: number;
    brevityScore: number;
    styleScore: number;
    atsReadabilityScore: number;
  };
  keyStrengths: string[];
  criticalIssues: string[];
  scanType: 'ATS Scan' | 'Job Description Match' | 'Comprehensive';
}

export type ResumeSortOption =
  | 'recently-updated'
  | 'highest-ats'
  | 'highest-completion'
  | 'name-asc'
  | 'name-desc';

export type TemplateFilterOption =
  | 'all'
  | 'tpl-modern'
  | 'tpl-classic'
  | 'tpl-minimal'
  | 'tpl-professional'
  | 'tpl-executive';
