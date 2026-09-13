import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Search,
  ArrowRight,
  RefreshCw,
  Building,
  Target,
  FileText,
  AlertCircle,
  FileCheck2,
  CheckCircle2,
  X,
  Sliders,
  Send,
  Zap,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { mockResumes } from '../data/mockData';
import { DetailedJobMatchReport } from '../types/resume';
import {
  analyzeJobMatch,
  PRESET_JOB_DESCRIPTIONS,
  PresetJobItem,
} from '../utils/jobMatching';
import { MatchScoreCards } from '../components/matcher/MatchScoreCards';
import { SkillsAndKeywordsSection } from '../components/matcher/SkillsAndKeywordsSection';
import { RelevantSectionsView } from '../components/matcher/RelevantSectionsView';
import { ImproveMatchSection } from '../components/matcher/ImproveMatchSection';

export const JobMatcherPage: React.FC = () => {
  // Resume selection
  const [selectedResumeId, setSelectedResumeId] = useState<string>(mockResumes[0].id);

  // Job description input
  const [jobDescriptionInput, setJobDescriptionInput] = useState<string>(
    PRESET_JOB_DESCRIPTIONS[0].description
  );

  // UX states: 'idle' | 'loading' | 'results' | 'error'
  const [status, setStatus] = useState<'idle' | 'loading' | 'results' | 'error'>('results');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading animation step tracking
  const [loadingStep, setLoadingStep] = useState<number>(0);

  // The generated detailed analysis report
  const selectedResume =
    mockResumes.find((r) => r.id === selectedResumeId) || mockResumes[0];

  const [report, setReport] = useState<DetailedJobMatchReport>(() =>
    analyzeJobMatch(selectedResume, PRESET_JOB_DESCRIPTIONS[0].description)
  );

  // Active view tab in results: 'overview' | 'skills-keywords' | 'sections' | 'ai-action-plan'
  const [activeTab, setActiveTab] = useState<
    'overview' | 'skills-keywords' | 'sections' | 'ai-action-plan'
  >('overview');

  const handleAnalyze = () => {
    // Validate input for error state
    if (!jobDescriptionInput || jobDescriptionInput.trim().length < 25) {
      setStatus('error');
      setErrorMessage(
        'Please provide a detailed job description (minimum 25 characters) including responsibilities, required skills, and qualifications.'
      );
      return;
    }

    setErrorMessage(null);
    setStatus('loading');
    setLoadingStep(1);

    // Multi-step animated progress simulation
    const t1 = setTimeout(() => setLoadingStep(2), 350);
    const t2 = setTimeout(() => setLoadingStep(3), 700);
    const t3 = setTimeout(() => {
      const generated = analyzeJobMatch(selectedResume, jobDescriptionInput);
      setReport(generated);
      setStatus('results');
      setLoadingStep(0);
    }, 1100);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  };

  const handleApplyPreset = (preset: PresetJobItem) => {
    setJobDescriptionInput(preset.description);
    setErrorMessage(null);
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleClear = () => {
    setJobDescriptionInput('');
    setStatus('idle');
    setErrorMessage(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Job Description Matcher
            </h2>
            <Badge variant="brand" size="sm">
              Role Alignment
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Compare your resume against specific job requirements to eliminate ATS keyword gaps and boost interview callbacks
          </p>
        </div>

        {status === 'results' && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="text-xs flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Comparison</span>
            </Button>
          </div>
        )}
      </div>

      {/* INPUT SECTION */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardBody className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Resume Selector */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                1. Select Existing Resume
              </label>
              <div className="relative">
                <select
                  value={selectedResumeId}
                  onChange={(e) => {
                    setSelectedResumeId(e.target.value);
                    if (status === 'results') {
                      const newResume =
                        mockResumes.find((r) => r.id === e.target.value) || mockResumes[0];
                      setReport(analyzeJobMatch(newResume, jobDescriptionInput));
                    }
                  }}
                  className="w-full text-xs font-semibold bg-slate-50/70 border border-slate-300 rounded-lg px-3.5 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
                >
                  {mockResumes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title} — {r.targetRole} (Score: {r.atsScore || 88}/100)
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-[11px] text-slate-400">
                Selected: <strong className="text-slate-700">{selectedResume.title}</strong> ({selectedResume.content.experience.length} career positions, {selectedResume.content.skills.length} skill groups)
              </p>
            </div>

            {/* Quick Sample Presets */}
            <div className="md:col-span-7 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Quick Load Sample Job Descriptions
                </label>
                <span className="text-[10px] text-slate-400 font-medium">1-Click Test</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_JOB_DESCRIPTIONS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50 text-slate-700 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Building className="w-3 h-3 text-slate-400" />
                    <span>{preset.company}</span>
                    <span className="text-slate-400 font-normal">({preset.title.split(' ')[0]})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Job Description Textarea */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                2. Target Job Description
              </label>
              <div className="flex items-center gap-3 text-[11px] text-slate-400">
                <span>{jobDescriptionInput.trim().length} characters</span>
                <span>•</span>
                <span>
                  {jobDescriptionInput.trim() ? jobDescriptionInput.trim().split(/\s+/).length : 0} words
                </span>
                {jobDescriptionInput && (
                  <button
                    onClick={() => setJobDescriptionInput('')}
                    className="text-slate-400 hover:text-slate-600 ml-1 cursor-pointer"
                    title="Clear text"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <textarea
              rows={6}
              value={jobDescriptionInput}
              onChange={(e) => {
                setJobDescriptionInput(e.target.value);
                if (status === 'error' && e.target.value.trim().length >= 25) {
                  setErrorMessage(null);
                }
              }}
              placeholder="Paste the full job posting here (responsibilities, required qualifications, tech stack, soft skills)..."
              className="w-full px-3.5 py-2.5 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white leading-relaxed font-mono transition-all"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Evaluates technical skills, key terms, experience relevance, and education</span>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={handleAnalyze}
              isLoading={status === 'loading'}
              icon={<Sparkles className="w-4 h-4 text-indigo-300" />}
              className="w-full sm:w-auto font-bold px-6 shadow-xs"
            >
              Analyze Match
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* ERROR STATE */}
      {status === 'error' && errorMessage && (
        <Card className="border-rose-200 bg-rose-50/30 p-5">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-2 flex-1">
              <div>
                <h4 className="text-sm font-bold text-rose-900">Analysis Error</h4>
                <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
              </div>

              <div className="pt-2 border-t border-rose-200/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-rose-800">
                  Try pasting a sample posting:
                </span>
                {PRESET_JOB_DESCRIPTIONS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setJobDescriptionInput(preset.description);
                      setErrorMessage(null);
                      setStatus('idle');
                    }}
                    className="text-[11px] font-semibold px-2 py-1 rounded bg-white text-rose-800 border border-rose-200 hover:bg-rose-50 cursor-pointer"
                  >
                    {preset.company} ({preset.title.split(' ')[0]})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* EMPTY STATE */}
      {status === 'idle' && (
        <Card className="p-12 text-center border-dashed border-2 border-slate-200">
          <div className="max-w-md mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto border border-indigo-100 shadow-2xs">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Ready to Analyze Role Match
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Paste a target job posting above or pick one of the sample presets, then click <strong>"Analyze Match"</strong> to calculate your score across skills, keywords, experience, and education.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setJobDescriptionInput(PRESET_JOB_DESCRIPTIONS[0].description);
                  handleAnalyze();
                }}
                className="text-xs font-semibold"
              >
                Load Stripe Posting & Run Analysis
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* LOADING STATE */}
      {status === 'loading' && (
        <Card className="p-10 border-slate-200 shadow-xs">
          <div className="max-w-md mx-auto text-center space-y-5">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin" />
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Analyzing Match Against Job Requirements
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Comparing candidate qualifications with target role specifications...
              </p>
            </div>

            {/* Step Checkpoints */}
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    loadingStep >= 1 ? 'text-emerald-600' : 'text-slate-300'
                  }`}
                />
                <span className={loadingStep >= 1 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  Extracting required skills & technical keywords...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    loadingStep >= 2 ? 'text-emerald-600' : 'text-slate-300'
                  }`}
                />
                <span className={loadingStep >= 2 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  Evaluating experience relevance & education match...
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2
                  className={`w-4 h-4 ${
                    loadingStep >= 3 ? 'text-emerald-600' : 'text-slate-300'
                  }`}
                />
                <span className={loadingStep >= 3 ? 'font-bold text-slate-800' : 'text-slate-400'}>
                  Synthesizing AI bullet suggestions & improvement plan...
                </span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* RESULTS STATE */}
      {status === 'results' && report && (
        <div className="space-y-6 animate-fadeIn">
          {/* Top Score Overview Cards */}
          <MatchScoreCards
            overallScore={report.overallScore}
            skillsMatchScore={report.skillsMatchScore}
            keywordMatchScore={report.keywordMatchScore}
            experienceMatchScore={report.experienceMatchScore}
            educationMatchScore={report.educationMatchScore}
            jobTitle={report.jobTitle}
            companyName={report.companyName}
            verdict={report.verdict}
          />

          {/* Navigation Sub-Tabs */}
          <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Full Match Report
            </button>
            <button
              onClick={() => setActiveTab('skills-keywords')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'skills-keywords'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Skills & Keywords ({report.matchedSkills.length} matched / {report.missingSkills.length} missing)
            </button>
            <button
              onClick={() => setActiveTab('sections')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 ${
                activeTab === 'sections'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Relevant Resume Sections ({report.relevantSections.length})
            </button>
            <button
              onClick={() => setActiveTab('ai-action-plan')}
              className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 flex items-center gap-1.5 ${
                activeTab === 'ai-action-plan'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-indigo-700 bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              How to Improve Your Match ({report.aiRecommendations.length} steps)
            </button>
          </div>

          {/* TAB CONTENT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Skills and Keywords */}
              <SkillsAndKeywordsSection
                matchedSkills={report.matchedSkills}
                missingSkills={report.missingSkills}
                matchedKeywords={report.matchedKeywords}
                missingKeywords={report.missingKeywords}
              />

              {/* Relevant Resume Sections */}
              <RelevantSectionsView sections={report.relevantSections} />

              {/* How to Improve Your Match (AI Recommendation) */}
              <ImproveMatchSection
                resumeId={selectedResume.id}
                suggestions={report.improvementSuggestions}
                recommendations={report.aiRecommendations}
              />
            </div>
          )}

          {activeTab === 'skills-keywords' && (
            <SkillsAndKeywordsSection
              matchedSkills={report.matchedSkills}
              missingSkills={report.missingSkills}
              matchedKeywords={report.matchedKeywords}
              missingKeywords={report.missingKeywords}
            />
          )}

          {activeTab === 'sections' && (
            <RelevantSectionsView sections={report.relevantSections} />
          )}

          {activeTab === 'ai-action-plan' && (
            <ImproveMatchSection
              resumeId={selectedResume.id}
              suggestions={report.improvementSuggestions}
              recommendations={report.aiRecommendations}
            />
          )}
        </div>
      )}
    </div>
  );
};
