import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Briefcase,
  Calendar,
  ExternalLink,
  Edit3,
  TrendingUp,
  Target,
  ShieldCheck,
} from 'lucide-react';
import { AnalysisHistoryItem } from '../../types/resumeHistory';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { ScoreBadge } from '../common/ScoreBadge';
import { formatDate } from '../../utils/formatters';

interface AnalysisDetailModalProps {
  isOpen: boolean;
  item: AnalysisHistoryItem | null;
  onClose: () => void;
}

export const AnalysisDetailModal: React.FC<AnalysisDetailModalProps> = ({
  isOpen,
  item,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="analysis-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="analysis-modal-title" className="text-sm font-bold text-slate-900">
                  AI Resume Analysis Report
                </h2>
                <Badge variant="brand" size="sm">
                  {item.scanType}
                </Badge>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Archived AI audit scan recorded on {formatDate(item.analysisDate)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Resume & Role Info Card */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume Document:</span>
              </div>
              <div className="font-bold text-slate-900 text-sm">{item.resumeName}</div>
              {item.targetRole && (
                <div className="flex items-center gap-1.5 text-slate-600 text-[11px]">
                  <Briefcase className="w-3 h-3 text-slate-400" />
                  <span>
                    Target: <strong>{item.targetRole}</strong>
                    {item.companyName && ` • ${item.companyName}`}
                  </span>
                </div>
              )}
            </div>

            {/* Scores Dual Box */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center min-w-[76px] shadow-2xs">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                  ATS Score
                </div>
                <div className="text-xl font-black text-indigo-600 mt-0.5">
                  {item.atsScore}
                </div>
                <div className="text-[9px] text-slate-400">out of 100</div>
              </div>

              {item.matchScore > 0 && (
                <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center min-w-[76px] shadow-2xs">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                    Match Rate
                  </div>
                  <div className="text-xl font-black text-emerald-600 mt-0.5">
                    {item.matchScore}%
                  </div>
                  <div className="text-[9px] text-slate-400">role alignment</div>
                </div>
              )}
            </div>
          </div>

          {/* 4-Pillar Breakdown Bars */}
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                Evaluation Breakdown
              </span>
              <span className="text-[11px] text-slate-400">Calculated by AI rubric</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <div className="flex items-center justify-between mb-1 text-slate-600">
                  <span>Measurable Impact</span>
                  <span className="font-bold text-slate-900">{item.breakdown.impactScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${item.breakdown.impactScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-slate-600">
                  <span>ATS Readability</span>
                  <span className="font-bold text-slate-900">{item.breakdown.atsReadabilityScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${item.breakdown.atsReadabilityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-slate-600">
                  <span>Brevity & Conciseness</span>
                  <span className="font-bold text-slate-900">{item.breakdown.brevityScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${item.breakdown.brevityScore}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1 text-slate-600">
                  <span>Style & Layout Precision</span>
                  <span className="font-bold text-slate-900">{item.breakdown.styleScore}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-purple-600 rounded-full"
                    style={{ width: `${item.breakdown.styleScore}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* AI Executive Summary */}
          <div className="p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100 text-indigo-950">
            <div className="font-semibold text-xs mb-1 flex items-center gap-1.5 text-indigo-900">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              AI Recruiter Verdict
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700">
              {item.summary}
            </p>
          </div>

          {/* Strengths & Critical Issues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Strengths */}
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-2">
              <div className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Key Strengths
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-700">
                {item.keyStrengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations / Critical Issues */}
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/80 space-y-2">
              <div className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                Suggested Refinements
              </div>
              <ul className="space-y-1.5 text-[11px] text-slate-700">
                {item.criticalIssues.map((iss, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{iss}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Navigation Actions */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/70 flex flex-col-reverse sm:flex-row items-center justify-between gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="w-full sm:w-auto text-slate-700 border-slate-300"
          >
            Close
          </Button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onClose();
                navigate(`/builder?id=${item.resumeId}`);
              }}
              className="w-full sm:w-auto text-slate-700 border-slate-300"
            >
              <Edit3 className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
              Edit in Builder
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                onClose();
                navigate(`/analyzer?id=${item.resumeId}`);
              }}
              className="w-full sm:w-auto font-semibold"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
              Open in AI Analyzer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
