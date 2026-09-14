import React from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Cpu,
  FileCheck2,
  LayoutTemplate,
  Tag,
  Layers,
} from 'lucide-react';
import { Card } from '../common/Card';
import { ComprehensiveAnalysisResult } from '../../data/analyzerMockData';

interface ScoresVerdictSectionProps {
  analysis: ComprehensiveAnalysisResult;
}

export const ScoresVerdictSection: React.FC<ScoresVerdictSectionProps> = ({ analysis }) => {
  const { overallScore, overallVerdict, atsCompatibilityScore, atsBreakdown, targetRole } = analysis;

  // Circular gauge calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const overallOffset = circumference - (overallScore / 100) * circumference;
  const atsOffset = circumference - (atsCompatibilityScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500' };
    if (score >= 80) return { stroke: '#4f46e5', text: 'text-indigo-600', bg: 'bg-indigo-50', bar: 'bg-indigo-600' };
    if (score >= 70) return { stroke: '#2563eb', text: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-600' };
    if (score >= 60) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500' };
    return { stroke: '#f43f5e', text: 'text-rose-600', bg: 'bg-rose-50', bar: 'bg-rose-500' };
  };

  const overallColor = getScoreColor(overallScore);
  const atsColor = getScoreColor(atsCompatibilityScore);

  const atsMetrics = [
    { label: 'Machine Readability', value: atsBreakdown.machineReadability, icon: FileCheck2 },
    { label: 'Heading Hierarchy', value: atsBreakdown.headingHierarchy, icon: LayoutTemplate },
    { label: 'Contact Extraction', value: atsBreakdown.contactExtraction, icon: ShieldCheck },
    { label: 'Layout Cleanliness', value: atsBreakdown.layoutCleanliness, icon: Layers },
    { label: 'Keyword Placement', value: atsBreakdown.keywordPlacement, icon: Tag },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 1. Overall Resume Score Card */}
      <Card className="lg:col-span-6 p-6 bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/30 border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Overall Resume Score
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/70">
              <Award className="w-3.5 h-3.5" />
              Grade {overallVerdict.grade}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 my-3">
            {/* Circular Visual Gauge */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="9"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={overallColor.stroke}
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={overallOffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {overallScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 100</span>
              </div>
            </div>

            {/* Verdict text */}
            <div className="space-y-2 text-center sm:text-left flex-1">
              <div className="text-lg font-bold text-slate-900 leading-tight">
                {overallVerdict.label}
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200/70">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{overallVerdict.percentile} of candidate profiles</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                Evaluated for target domain: <strong className="text-slate-800">{targetRole}</strong>
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 mt-3">
            {overallVerdict.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5 text-emerald-600 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Competitive Score Range
          </span>
          <span className="text-slate-400">Strict Evaluation Engine</span>
        </div>
      </Card>

      {/* 2. ATS Compatibility Score Card */}
      <Card className="lg:col-span-6 p-6 bg-gradient-to-br from-white via-slate-50/70 to-emerald-50/20 border-slate-200/90 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                ATS Compatibility Score
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/70">
              <CheckCircle2 className="w-3 h-3" />
              Taleo & Workday Ready
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 my-3">
            {/* ATS Visual Circular Gauge */}
            <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
              <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="9"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r={radius}
                  stroke={atsColor.stroke}
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={atsOffset}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                  {atsCompatibilityScore}
                </span>
                <span className="text-[11px] font-semibold text-slate-400 mt-0.5">%</span>
              </div>
            </div>

            {/* 5-point ATS parser breakdown */}
            <div className="space-y-2 flex-1 w-full">
              {atsMetrics.map((m) => {
                const colors = getScoreColor(m.value);
                const Icon = m.icon;
                return (
                  <div key={m.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                        <Icon className="w-3 h-3 text-slate-400" />
                        {m.label}
                      </span>
                      <span className={`font-bold ${colors.text}`}>{m.value}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                        style={{ width: `${m.value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
          <span className="text-slate-500">
            Validated against Greenhouse, Lever & Taleo
          </span>
          <span className="font-semibold text-emerald-600">High Parsing Accuracy</span>
        </div>
      </Card>
    </div>
  );
};
