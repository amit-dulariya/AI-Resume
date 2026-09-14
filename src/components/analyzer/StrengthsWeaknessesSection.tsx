import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Lightbulb,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { ResumeStrength, ResumeWeakness } from '../../data/analyzerMockData';

interface StrengthsWeaknessesSectionProps {
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
}

export const StrengthsWeaknessesSection: React.FC<StrengthsWeaknessesSectionProps> = ({
  strengths,
  weaknesses,
}) => {
  const getSeverityBadge = (severity: ResumeWeakness['severity']) => {
    switch (severity) {
      case 'High':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            High Severity
          </span>
        );
      case 'Medium':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Moderate
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Minor
          </span>
        );
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 5. Resume Strengths */}
      <Card className="lg:col-span-6 border-slate-200/90 shadow-xs flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Resume Strengths
                </h3>
                <p className="text-[11px] text-slate-500">
                  {strengths.length} competitive differentiators boosting recruiter recall
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              High Impact
            </span>
          </div>
        </CardHeader>

        <CardBody className="p-4 space-y-3.5 flex-1">
          {strengths.map((str) => (
            <div
              key={str.id}
              className="p-3.5 rounded-xl border border-emerald-200/70 bg-emerald-50/20 space-y-2 hover:border-emerald-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900">{str.title}</h4>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                  {str.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {str.description}
              </p>

              <div className="flex items-start gap-1.5 text-[11px] text-emerald-800 bg-emerald-50/80 p-2 rounded-lg border border-emerald-200/50">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-medium italic">{str.highlight}</span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>

      {/* 6. Resume Weaknesses */}
      <Card className="lg:col-span-6 border-slate-200/90 shadow-xs flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Resume Weaknesses & Vulnerabilities
                </h3>
                <p className="text-[11px] text-slate-500">
                  {weaknesses.length} critical areas holding your total score back
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
              Needs Revision
            </span>
          </div>
        </CardHeader>

        <CardBody className="p-4 space-y-3.5 flex-1">
          {weaknesses.map((w) => (
            <div
              key={w.id}
              className="p-3.5 rounded-xl border border-rose-200/70 bg-rose-50/20 space-y-2 hover:border-rose-300 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-slate-900">{w.title}</h4>
                {getSeverityBadge(w.severity)}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {w.description}
              </p>

              <div className="flex items-start gap-1.5 text-[11px] text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900 font-semibold">Recommended Fix: </strong>
                  <span>{w.fixRecommendation}</span>
                </div>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
