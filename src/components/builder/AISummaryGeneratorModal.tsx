import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  RefreshCw,
  Check,
  RotateCcw,
  Copy,
  CheckCheck,
  Briefcase,
  Layers,
  Target,
  FileText,
  Loader2,
  Wand2,
  Sliders,
  CheckCircle2,
} from 'lucide-react';
import {
  SummaryTone,
  SummaryExperienceLevel,
  SummaryGeneratorInput,
  SummaryGeneratorResult,
} from '../../types/summaryGenerator';
import { generateProfessionalSummary } from '../../utils/summaryGenerator';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface AISummaryGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (summary: string) => void;
  currentSummary?: string;
  defaultJobRole?: string;
  defaultSkills?: string[];
}

const EXPERIENCE_LEVELS: SummaryExperienceLevel[] = [
  'Entry-level (0–2 yrs)',
  'Mid-level (3–5 yrs)',
  'Senior (6–9 yrs)',
  'Lead / Staff (10+ yrs)',
  'Executive / Director',
];

const TONES: { id: SummaryTone; label: string; desc: string }[] = [
  {
    id: 'Professional',
    label: 'Professional',
    desc: 'Executive, balanced tone highlighting leadership & cross-functional value',
  },
  {
    id: 'Concise',
    label: 'Concise',
    desc: 'Brevity-first, punchy 2-sentence format ideal for single-page resumes',
  },
  {
    id: 'ATS-friendly',
    label: 'ATS-friendly',
    desc: 'Keyword-optimized structure with industry benchmarks & scan-friendly tags',
  },
];

const CAREER_GOAL_SUGGESTIONS = [
  'Lead engineering teams in building high-scale distributed systems',
  'Architect fault-tolerant cloud platforms and microservices',
  'Accelerate product velocity and drive measurable business ROI',
  'Deliver human-centric enterprise SaaS applications',
];

export const AISummaryGeneratorModal: React.FC<AISummaryGeneratorModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentSummary = '',
  defaultJobRole = '',
  defaultSkills = [],
}) => {
  // Form input state
  const [jobRole, setJobRole] = useState(defaultJobRole || '');
  const [experienceLevel, setExperienceLevel] = useState<SummaryExperienceLevel>('Senior (6–9 yrs)');
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [careerGoal, setCareerGoal] = useState('');
  const [tone, setTone] = useState<SummaryTone>('Professional');

  // Generation state
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SummaryGeneratorResult | null>(null);
  const [editableSummary, setEditableSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [variationCount, setVariationCount] = useState(0);

  // Initialize or reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setJobRole(defaultJobRole || '');
      setSkills(
        defaultSkills && defaultSkills.length > 0
          ? defaultSkills.slice(0, 6)
          : ['System Architecture', 'Cloud Infrastructure', 'Team Leadership']
      );
      setTone('Professional');
      setExperienceLevel('Senior (6–9 yrs)');
      setResult(null);
      setEditableSummary('');
      setVariationCount(0);
    }
  }, [isOpen, defaultJobRole, defaultSkills]);

  if (!isOpen) return null;

  const handleAddSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !skills.includes(trimmed) && skills.length < 10) {
      setSkills([...skills, trimmed]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleGenerate = async (variationSeed = variationCount) => {
    setIsGenerating(true);
    try {
      const input: SummaryGeneratorInput = {
        currentSummary,
        jobRole: jobRole.trim() || 'Software Engineer',
        experienceLevel,
        keySkills: skills,
        careerGoal,
        tone,
      };

      const genResult = await generateProfessionalSummary(input, variationSeed);
      setResult(genResult);
      setEditableSummary(genResult.generatedSummary);
      setVariationCount(variationSeed + 1);
    } catch (err) {
      console.error('Failed to generate summary', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRegenerate = () => {
    handleGenerate(variationCount);
  };

  const handleApply = () => {
    const finalContent = editableSummary.trim();
    if (finalContent) {
      onApply(finalContent);
      onClose();
    }
  };

  const handleKeepOriginal = () => {
    onClose();
  };

  const handleCopy = () => {
    if (!editableSummary) return;
    navigator.clipboard.writeText(editableSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="summary-gen-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h2 id="summary-gen-title" className="text-sm font-bold text-slate-900 flex items-center gap-2">
                Generate Professional Summary
                <Badge variant="indigo" size="sm">
                  AI Powered
                </Badge>
              </h2>
              <p className="text-[11px] text-slate-500">
                Create a tailored, recruiter-ready summary aligned with your target role and strengths.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-slate-800 text-xs">
          {/* Current Summary (Optional accordion / view) */}
          {currentSummary && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between mb-1 text-[11px] font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  Current Summary (Optional Reference)
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  {currentSummary.split(/\s+/).length} words
                </span>
              </div>
              <p className="text-slate-600 line-clamp-2 italic leading-relaxed text-[11px]">
                "{currentSummary}"
              </p>
            </div>
          )}

          {/* Setup Inputs Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Job Role */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Job Role <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Briefcase className="w-3.5 h-3.5" />
                </div>
                <input
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="e.g. Senior Full-Stack Engineer"
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Experience Level
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value as SummaryExperienceLevel)}
                  className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer"
                >
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Key Skills */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Key Skills (up to 8)
              </label>
              {defaultSkills && defaultSkills.length > 0 && skills.length === 0 && (
                <button
                  type="button"
                  onClick={() => setSkills(defaultSkills.slice(0, 6))}
                  className="text-[11px] font-medium text-indigo-600 hover:text-indigo-800"
                >
                  + Use skills from resume
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-1.5 min-h-[34px] p-2 bg-slate-50/80 rounded-lg border border-slate-200">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[11px] shadow-2xs"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-600 text-xs font-bold leading-none cursor-pointer"
                  >
                    ×
                  </button>
                </span>
              ))}

              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(skillInput);
                  }
                }}
                placeholder={skills.length === 0 ? "Type a skill and press Enter (e.g. React, Node.js)" : "Add skill..."}
                className="grow min-w-[140px] px-1.5 py-0.5 text-xs bg-transparent border-none focus:outline-hidden text-slate-800"
              />
            </div>
          </div>

          {/* Career Goal */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Career Goal or Specialization (Optional)
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Target className="w-3.5 h-3.5" />
              </div>
              <input
                type="text"
                value={careerGoal}
                onChange={(e) => setCareerGoal(e.target.value)}
                placeholder="e.g. Architect distributed microservices and mentor engineering teams"
                className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
              />
            </div>

            {/* Quick goal suggestions */}
            <div className="flex flex-wrap gap-1 pt-0.5">
              {CAREER_GOAL_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setCareerGoal(sug)}
                  className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                    careerGoal === sug
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-700 font-medium'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Tone Selector */}
          <div className="space-y-2">
            <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              Tone
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {TONES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id)}
                  className={`text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                    tone === t.id
                      ? 'bg-indigo-50/80 border-indigo-500 ring-1 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-xs ${tone === t.id ? 'text-indigo-900' : 'text-slate-800'}`}>
                      {t.label}
                    </span>
                    {tone === t.id && <Check className="w-3.5 h-3.5 text-indigo-600" />}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-normal line-clamp-2">
                    {t.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Action Button */}
          {!result && (
            <div className="pt-2">
              <Button
                type="button"
                variant="primary"
                onClick={() => handleGenerate(0)}
                disabled={isGenerating || !jobRole.trim()}
                className="w-full py-2.5 flex items-center justify-center gap-2 shadow-md shadow-indigo-100 font-semibold"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Crafting Tailored Summary...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-white" />
                    <span>Generate Summary</span>
                  </>
                )}
              </Button>
              {!jobRole.trim() && (
                <p className="text-[11px] text-amber-600 text-center mt-1.5">
                  Please specify a Job Role to generate your summary.
                </p>
              )}
            </div>
          )}

          {/* Result Section */}
          {result && (
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    AI-Generated Summary
                  </span>
                  <Badge variant="emerald" size="sm">
                    {result.tone}
                  </Badge>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 p-1 rounded hover:bg-slate-100 transition-colors"
                    title="Copy generated summary"
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-slate-500" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleRegenerate}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 p-1 rounded hover:bg-indigo-50 transition-colors"
                  >
                    <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* Editable Textarea for immediate preview & tweaks */}
              <div className="relative">
                <textarea
                  rows={4}
                  value={editableSummary}
                  onChange={(e) => setEditableSummary(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-indigo-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed shadow-xs"
                />
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 px-1">
                  <span>
                    ATS Readability Score:{' '}
                    <strong className="text-emerald-600 font-semibold">{result.atsReadabilityScore}%</strong>
                  </span>
                  <span>
                    {editableSummary.split(/\s+/).filter(Boolean).length} words • {editableSummary.length} chars
                  </span>
                </div>
              </div>

              {/* Tagline / Keywords Badge */}
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-500">Headline Tagline:</span>
                <span className="font-medium text-slate-800">{result.headlineTagline}</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleKeepOriginal}
            className="w-full sm:w-auto text-slate-700 border-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400 mr-1.5" />
            Keep Original
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {result ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={handleApply}
                disabled={!editableSummary.trim()}
                className="w-full sm:w-auto px-5 font-semibold shadow-xs"
              >
                <Check className="w-3.5 h-3.5 mr-1.5" />
                Apply to Resume
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleGenerate(0)}
                disabled={isGenerating || !jobRole.trim()}
                className="w-full sm:w-auto px-5 font-semibold shadow-xs"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Generate Summary
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
