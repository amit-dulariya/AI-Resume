export type SummaryTone = 'Professional' | 'Concise' | 'ATS-friendly';

export type SummaryExperienceLevel =
  | 'Entry-level (0–2 yrs)'
  | 'Mid-level (3–5 yrs)'
  | 'Senior (6–9 yrs)'
  | 'Lead / Staff (10+ yrs)'
  | 'Executive / Director';

export interface SummaryGeneratorInput {
  currentSummary?: string;
  jobRole: string;
  experienceLevel: SummaryExperienceLevel;
  keySkills: string[];
  careerGoal: string;
  tone: SummaryTone;
}

export interface SummaryGeneratorResult {
  generatedSummary: string;
  headlineTagline: string;
  highlightedSkills: string[];
  tone: SummaryTone;
  wordCount: number;
  charCount: number;
  atsReadabilityScore: number;
  variationIndex: number;
}
