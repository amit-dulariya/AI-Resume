export type ImprovementTone = 'Professional' | 'Concise' | 'Achievement-focused' | 'ATS-friendly';

export type ImprovementGoal =
  | 'concise'
  | 'impact'
  | 'action-verbs'
  | 'keywords'
  | 'ats-readability';

export type ImprovementSectionType =
  | 'summary'
  | 'experience-overview'
  | 'experience-bullet'
  | 'project-description'
  | 'achievement-description';

export interface AIImprovementContext {
  roleTitle?: string;
  company?: string;
  projectTitle?: string;
  achievementTitle?: string;
  technologies?: string[];
}

export interface AIImprovementResult {
  improvedContent: string;
  explanation: string;
  tone: ImprovementTone;
  activeGoal?: ImprovementGoal;
  appliedSuggestions: string[];
  powerVerbsAdded: string[];
  metricsAdded: string[];
  keywordsAdded: string[];
  stats: {
    originalWords: number;
    improvedWords: number;
    impactScoreEstimate: number; // e.g. 92
  };
}
