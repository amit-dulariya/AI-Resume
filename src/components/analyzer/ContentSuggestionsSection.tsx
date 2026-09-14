import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Copy,
  Check,
  Zap,
  FileEdit,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { ContentImprovementSuggestion } from '../../data/analyzerMockData';

interface ContentSuggestionsSectionProps {
  suggestions: ContentImprovementSuggestion[];
}

export const ContentSuggestionsSection: React.FC<ContentSuggestionsSectionProps> = ({
  suggestions,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPriorityBadge = (priority: ContentImprovementSuggestion['priority']) => {
    switch (priority) {
      case 'High Impact':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <Zap className="w-2.5 h-2.5 fill-rose-600 text-rose-600" />
            High Impact
          </span>
        );
      case 'Moderate Impact':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
            <Sparkles className="w-2.5 h-2.5 text-indigo-600" />
            Moderate Impact
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Quick Fix
          </span>
        );
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileEdit className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Content Improvement Suggestions
            </h3>
            <p className="text-[11px] text-slate-500">
              AI-generated bullet rewrites that convert passive duties into high-impact metric achievements
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Potential Score Gain: +10 pts</span>
        </div>
      </CardHeader>

      <CardBody className="p-4 space-y-4">
        {suggestions.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-xl border border-slate-200/90 bg-white shadow-2xs space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {item.section}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {item.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {getPriorityBadge(item.priority)}
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {item.scoreBoost}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600">
              <strong className="text-slate-800">Issue identified:</strong> {item.issue}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              {/* Original Weak Bullet */}
              {item.originalText && (
                <div className="p-3 rounded-lg border border-rose-200/80 bg-rose-50/20 text-xs">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-700 mb-1">
                    Current Resume Bullet
                  </div>
                  <p className="text-slate-700 line-through decoration-rose-400 leading-relaxed">
                    {item.originalText}
                  </p>
                </div>
              )}

              {/* Improved Optimized Bullet */}
              {item.improvedText && (
                <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50/30 text-xs relative group">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      ATS-Optimized Recommendation
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(item.id, item.improvedText)}
                      className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-800 hover:text-emerald-900 bg-white hover:bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-300 transition-colors shadow-2xs"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-slate-900 font-medium leading-relaxed">
                    {item.improvedText}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
