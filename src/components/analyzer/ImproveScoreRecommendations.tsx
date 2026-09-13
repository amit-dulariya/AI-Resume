import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Zap,
  ArrowUpRight,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Button } from '../common/Button';
import { ATSRecommendationItem } from '../../types/resume';

interface ImproveScoreRecommendationsProps {
  recommendations: ATSRecommendationItem[];
  resumeId: string;
}

export const ImproveScoreRecommendations: React.FC<ImproveScoreRecommendationsProps> = ({
  recommendations,
  resumeId,
}) => {
  const totalPotentialBoost = recommendations.reduce(
    (acc, curr) => acc + (curr.estimatedScoreBoost || 0),
    0
  );

  const getPriorityBadge = (priority: ATSRecommendationItem['priority']) => {
    switch (priority) {
      case 'High Impact':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
            <Zap className="w-3 h-3 text-rose-600 fill-rose-600" />
            High Impact
          </span>
        );
      case 'Moderate Impact':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
            <Sparkles className="w-3 h-3 text-indigo-600" />
            Moderate Impact
          </span>
        );
      case 'Quick Fix':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Quick Fix
          </span>
        );
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Improve Your ATS Score</h3>
            {totalPotentialBoost > 0 && (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                +{totalPotentialBoost} pts achievable
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Prioritized tactical revisions calculated to bypass automated screening filters
          </p>
        </div>

        <Link to={`/builder?id=${resumeId}`}>
          <Button
            size="sm"
            variant="primary"
            className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-xs text-xs"
            icon={<ArrowRight className="w-3.5 h-3.5 text-white" />}
            iconPosition="right"
          >
            Apply Fixes in Builder
          </Button>
        </Link>
      </CardHeader>

      <CardBody className="p-5 space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900">{rec.title}</h4>
                <span className="text-[10px] uppercase font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                  {rec.category}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {getPriorityBadge(rec.priority)}
                {rec.estimatedScoreBoost && (
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +{rec.estimatedScoreBoost} pts
                  </span>
                )}
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {rec.description}
            </p>

            <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-800 border border-slate-200/70">
              <strong className="text-indigo-900 block mb-1">Recommended Action:</strong>
              <p className="text-slate-700">{rec.actionText}</p>
            </div>

            {/* Before vs After comparison if present */}
            {rec.beforeExample && rec.afterExample && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1 text-xs">
                <div className="p-3 rounded-lg bg-rose-50/40 border border-rose-200/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                    Before (Generic / Weak ATS match):
                  </span>
                  <p className="text-slate-700 font-mono text-[11px] leading-relaxed">
                    "{rec.beforeExample}"
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50/40 border border-emerald-200/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                    After (Quantified ATS high-rank):
                  </span>
                  <p className="text-slate-800 font-mono text-[11px] leading-relaxed font-medium">
                    "{rec.afterExample}"
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardBody>
    </Card>
  );
};
