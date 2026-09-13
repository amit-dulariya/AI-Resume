import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Copy,
  Check,
  Zap,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import {
  MatchImprovementSuggestion,
  AIImprovementRecommendation,
} from '../../types/resume';

interface ImproveMatchSectionProps {
  resumeId: string;
  suggestions: MatchImprovementSuggestion[];
  recommendations: AIImprovementRecommendation[];
}

export const ImproveMatchSection: React.FC<ImproveMatchSectionProps> = ({
  resumeId,
  suggestions,
  recommendations,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPriorityBadge = (priority: MatchImprovementSuggestion['priority']) => {
    switch (priority) {
      case 'High':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            High Impact
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Medium Impact
          </span>
        );
      case 'Low':
        return (
          <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Quick Polish
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* SECTION 1: How to Improve Your Match (AI Recommendation) */}
      <Card className="border-indigo-100 bg-gradient-to-b from-indigo-50/20 via-white to-white shadow-xs">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-base text-slate-900">
                  How to Improve Your Match
                </h3>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                  AI Action Plan
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Concrete, high-leverage steps and bullet optimizations tailored to this job description
              </p>
            </div>

            <Link to={`/builder?id=${resumeId}`}>
              <Button variant="primary" size="sm" className="shadow-xs flex items-center gap-1.5">
                <span>Apply in Resume Builder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardBody className="p-5 space-y-4">
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-200 hover:shadow-2xs transition-all space-y-3"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {rec.stepNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                          {rec.headline}
                        </h4>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {rec.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {rec.rationale}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Advice Action Text */}
                <div className="text-xs text-slate-700 pl-9 font-medium">
                  👉 {rec.actionableAdvice}
                </div>

                {/* Suggested Bullet Rewrite if available */}
                {rec.suggestedBullet && (
                  <div className="ml-9 rounded-lg border border-indigo-100 bg-slate-50/70 p-3.5 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                        Target: {rec.suggestedBullet.section}
                      </span>
                      <button
                        onClick={() =>
                          handleCopy(rec.suggestedBullet?.improved || '', rec.id)
                        }
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                      >
                        {copiedId === rec.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Bullet</span>
                          </>
                        )}
                      </button>
                    </div>

                    {rec.suggestedBullet.original && (
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold text-slate-400">CURRENT VERSION:</span>
                        <p className="text-xs text-slate-500 line-through italic">
                          "{rec.suggestedBullet.original}"
                        </p>
                      </div>
                    )}

                    <div className="space-y-0.5 pt-1 border-t border-slate-200/60">
                      <span className="text-[10px] font-bold text-indigo-600 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-indigo-600" />
                        RECOMMENDED OPTIMIZED BULLET:
                      </span>
                      <p className="text-xs text-slate-900 font-medium leading-relaxed bg-white p-2.5 rounded border border-indigo-200/60">
                        "{rec.suggestedBullet.improved}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* SECTION 2: Improvement Suggestions Breakdown */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <h3 className="font-bold text-sm text-slate-900">
                Improvement Suggestions
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-medium">
              Ranked by projected match gain
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Targeted modifications to maximize your resume's competitive standing against ATS filters
          </p>
        </CardHeader>

        <CardBody className="p-5 space-y-3">
          {suggestions.map((sug) => (
            <div
              key={sug.id}
              className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-slate-900">{sug.title}</span>
                  {getPriorityBadge(sug.priority)}
                  <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                    {sug.type}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {sug.description}
                </p>
                <p className="text-xs text-indigo-700 font-semibold pt-0.5">
                  Action: {sug.action}
                </p>
              </div>

              {sug.potentialScoreGain && (
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    Est. Gain
                  </span>
                  <span className="text-sm font-black text-emerald-600 flex items-center gap-0.5">
                    +{sug.potentialScoreGain} pts
                  </span>
                </div>
              )}
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
