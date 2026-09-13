import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  X,
  Check,
  RotateCcw,
  Copy,
  CheckCheck,
  TrendingUp,
  Zap,
  Tag,
  FileCheck,
  Sliders,
  ArrowRight,
  Info,
  Loader2,
  Edit3,
} from 'lucide-react';
import {
  ImprovementTone,
  ImprovementGoal,
  ImprovementSectionType,
  AIImprovementContext,
  AIImprovementResult,
} from '../../types/aiImprovement';
import { generateAIImprovement } from '../../utils/aiImprovement';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface AIImprovementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (improvedText: string) => void;
  title: string;
  originalContent: string;
  sectionType: ImprovementSectionType;
  context?: AIImprovementContext;
}

const TONES: { id: ImprovementTone; label: string; desc: string }[] = [
  { id: 'Professional', label: 'Professional', desc: 'Balanced, authoritative corporate cadence' },
  { id: 'Concise', label: 'Concise', desc: 'Punchy & streamlined, ideal for 1-page resumes' },
  { id: 'Achievement-focused', label: 'Achievement-focused', desc: 'Quantified metrics & Google XYZ formula' },
  { id: 'ATS-friendly', label: 'ATS-friendly', desc: 'High keyword density for automated filters' },
];

const SUGGESTION_GOALS: { id: ImprovementGoal; label: string; icon: React.ElementType }[] = [
  { id: 'concise', label: 'Make more concise', icon: Zap },
  { id: 'impact', label: 'Add measurable impact', icon: TrendingUp },
  { id: 'action-verbs', label: 'Use stronger action verbs', icon: Sparkles },
  { id: 'keywords', label: 'Add technical keywords', icon: Tag },
  { id: 'ats-readability', label: 'Improve ATS readability', icon: FileCheck },
];

export const AIImprovementModal: React.FC<AIImprovementModalProps> = ({
  isOpen,
  onClose,
  onApply,
  title,
  originalContent,
  sectionType,
  context,
}) => {
  const [selectedTone, setSelectedTone] = useState<ImprovementTone>('Professional');
  const [activeGoal, setActiveGoal] = useState<ImprovementGoal | undefined>(undefined);
  const [variationIndex, setVariationIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<AIImprovementResult | null>(null);
  const [editedImprovedText, setEditedImprovedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isManualEditMode, setIsManualEditMode] = useState(false);

  // Generate recommendation whenever tone, goal, or variation changes
  const runGeneration = (tone: ImprovementTone, goal?: ImprovementGoal, seed: number = 0) => {
    setIsGenerating(true);
    // Simulate smart AI response latency (snappy ~240ms)
    setTimeout(() => {
      const res = generateAIImprovement(
        originalContent,
        sectionType,
        tone,
        goal,
        context,
        seed
      );
      setResult(res);
      setEditedImprovedText(res.improvedContent);
      setIsGenerating(false);
    }, 220);
  };

  // Initial load when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedTone('Professional');
      setActiveGoal(undefined);
      setVariationIndex(0);
      setIsManualEditMode(false);
      setIsCopied(false);
      runGeneration('Professional', undefined, 0);
    }
  }, [isOpen, originalContent, sectionType]);

  const handleToneChange = (tone: ImprovementTone) => {
    setSelectedTone(tone);
    runGeneration(tone, activeGoal, variationIndex);
  };

  const handleGoalClick = (goal: ImprovementGoal) => {
    const nextGoal = activeGoal === goal ? undefined : goal;
    setActiveGoal(nextGoal);
    runGeneration(selectedTone, nextGoal, variationIndex);
  };

  const handleRegenerate = () => {
    const nextIndex = variationIndex + 1;
    setVariationIndex(nextIndex);
    runGeneration(selectedTone, activeGoal, nextIndex);
  };

  const handleCopy = () => {
    if (!editedImprovedText) return;
    navigator.clipboard.writeText(editedImprovedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleApply = () => {
    if (!editedImprovedText.trim()) return;
    onApply(editedImprovedText.trim());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b border-indigo-900/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Improve with AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  Smart Assistant
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{title}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[calc(85vh-140px)] overflow-y-auto">
          {/* Tone Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <Sliders className="w-3.5 h-3.5 text-indigo-600" />
                <span>Select Desired Tone</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {TONES.find((t) => t.id === selectedTone)?.desc}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {TONES.map((tone) => {
                const isSelected = selectedTone === tone.id;
                return (
                  <button
                    key={tone.id}
                    type="button"
                    onClick={() => handleToneChange(tone.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {tone.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Suggestion Goals Bar */}
          <div>
            <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Improvement Goals</span>
              <span className="text-[11px] font-normal text-slate-400">
                Click a goal to steer recommendation
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {SUGGESTION_GOALS.map((goal) => {
                const Icon = goal.icon;
                const isActive = activeGoal === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handleGoalClick(goal.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                    <span>{goal.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Comparison Panels: Original vs Improved */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Original Content */}
            <div className="flex flex-col bg-slate-50 rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                  <span>Original Content</span>
                </span>
                <span className="text-[11px] text-slate-500">
                  {originalContent?.trim() ? originalContent.trim().split(/\s+/).length : 0} words
                </span>
              </div>
              <div className="flex-1 text-xs text-slate-600 leading-relaxed bg-white/70 p-3 rounded-lg border border-slate-200/80 min-h-[110px] whitespace-pre-wrap">
                {originalContent?.trim() ? (
                  originalContent
                ) : (
                  <span className="text-slate-400 italic">
                    (No original content entered yet. AI will generate a strong starter draft for you.)
                  </span>
                )}
              </div>
            </div>

            {/* Improved Version */}
            <div className="flex flex-col bg-indigo-50/40 rounded-xl border border-indigo-200 p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Improved Version</span>
                  <Badge variant="success" size="sm" className="ml-1 text-[10px]">
                    +{result?.stats.impactScoreEstimate || 92}% Impact
                  </Badge>
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setIsManualEditMode(!isManualEditMode)}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                    title={isManualEditMode ? 'Finish manual edit' : 'Edit text before applying'}
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="p-1 text-slate-400 hover:text-indigo-600 rounded transition-colors"
                    title="Copy improved version"
                  >
                    {isCopied ? (
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white rounded-lg border border-indigo-100 min-h-[110px]">
                  <Loader2 className="w-6 h-6 text-indigo-600 animate-spin mb-2" />
                  <p className="text-xs font-medium text-slate-600">Generating AI improvements...</p>
                </div>
              ) : isManualEditMode ? (
                <textarea
                  rows={4}
                  value={editedImprovedText}
                  onChange={(e) => setEditedImprovedText(e.target.value)}
                  className="flex-1 w-full text-xs text-slate-900 leading-relaxed bg-white p-3 rounded-lg border border-indigo-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 min-h-[110px]"
                />
              ) : (
                <div className="flex-1 text-xs text-slate-900 font-medium leading-relaxed bg-white p-3 rounded-lg border border-indigo-200/80 min-h-[110px] whitespace-pre-wrap shadow-2xs">
                  {editedImprovedText}
                </div>
              )}

              <div className="flex items-center justify-between mt-2 text-[11px] text-slate-500">
                <span>{editedImprovedText.trim().split(/\s+/).length} words</span>
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={isGenerating}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  <RotateCcw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Try another variation</span>
                </button>
              </div>
            </div>
          </div>

          {/* Short Explanation of the Improvement */}
          {result && (
            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Info className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">Why this is an improvement:</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{result.explanation}</p>
                </div>
              </div>

              {/* Applied Enhancements List */}
              {result.appliedSuggestions.length > 0 && (
                <div className="pt-2.5 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.appliedSuggestions.map((sug, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-[11.5px] text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{sug}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Key tags added */}
              {(result.powerVerbsAdded.length > 0 || result.keywordsAdded.length > 0) && (
                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap items-center gap-1.5 text-[11px]">
                  <span className="text-slate-400 font-medium">Added Entities:</span>
                  {result.powerVerbsAdded.map((verb, idx) => (
                    <span
                      key={`verb-${idx}`}
                      className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-medium border border-indigo-200/60"
                    >
                      ⚡ {verb}
                    </span>
                  ))}
                  {result.keywordsAdded.slice(0, 3).map((kw, idx) => (
                    <span
                      key={`kw-${idx}`}
                      className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60"
                    >
                      🏷️ {kw}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-t border-slate-200">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={onClose}
            className="text-slate-700"
          >
            Keep Original
          </Button>

          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="primary"
              size="md"
              icon={<Check className="w-4 h-4" />}
              onClick={handleApply}
              disabled={isGenerating || !editedImprovedText.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              Apply Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
