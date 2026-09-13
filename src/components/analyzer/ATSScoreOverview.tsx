import React from 'react';
import {
  FileCode2,
  Cpu,
  LayoutTemplate,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Award,
  Sparkles,
  Layers,
} from 'lucide-react';
import { Card } from '../common/Card';
import { ATSScoreBreakdown } from '../../types/resume';

interface ATSScoreOverviewProps {
  breakdown: ATSScoreBreakdown;
  summaryVerdict: {
    label: string;
    grade: string;
    percentile: string;
    brief: string;
  };
  targetRole: string;
}

export const ATSScoreOverview: React.FC<ATSScoreOverviewProps> = ({
  breakdown,
  summaryVerdict,
  targetRole,
}) => {
  const { overallScore, keywordMatch, skillsMatch, resumeStructure, experienceRelevance, formatting } =
    breakdown;

  // Circular gauge math for the overall score
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500' };
    if (score >= 80) return { stroke: '#4f46e5', text: 'text-indigo-600', bg: 'bg-indigo-50', bar: 'bg-indigo-600' };
    if (score >= 70) return { stroke: '#2563eb', text: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-600' };
    if (score >= 60) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500' };
    return { stroke: '#f43f5e', text: 'text-rose-600', bg: 'bg-rose-50', bar: 'bg-rose-500' };
  };

  const overallColors = getScoreColor(overallScore);

  const dimensionCards = [
    {
      id: 'keyword-match',
      title: 'Keyword Match',
      score: keywordMatch,
      icon: FileCode2,
      description: 'Alignment with role keywords & job requirements',
      weight: '30% weight',
    },
    {
      id: 'skills-match',
      title: 'Skills Match',
      score: skillsMatch,
      icon: Cpu,
      description: 'Technical, domain & tooling competencies',
      weight: '20% weight',
    },
    {
      id: 'resume-structure',
      title: 'Resume Structure',
      score: resumeStructure,
      icon: LayoutTemplate,
      description: 'Standard section headers & ATS parsability',
      weight: '20% weight',
    },
    {
      id: 'exp-relevance',
      title: 'Experience Relevance',
      score: experienceRelevance,
      icon: Briefcase,
      description: 'Metric-driven bullets & chronological history',
      weight: '20% weight',
    },
    {
      id: 'formatting-hygiene',
      title: 'Formatting',
      score: formatting,
      icon: Layers,
      description: 'Clean margins, safe typography & ATS layout',
      weight: '10% weight',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Hero Score Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Circular Gauge Card */}
        <Card className="lg:col-span-5 p-6 bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/30 border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  ATS Readiness Score
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                <Award className="w-3 h-3" />
                Grade {summaryVerdict.grade}
              </span>
            </div>

            <div className="flex items-center gap-6 my-3">
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 128 128">
                  {/* Background Track */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Animated Progress Ring */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke={overallColors.stroke}
                    strokeWidth="10"
                    strokeLinecap="round"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score Number in Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
                    {overallScore}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 mt-0.5">/ 100</span>
                </div>
              </div>

              {/* Verdict Summary */}
              <div className="space-y-1.5 flex-1">
                <div className="text-base font-bold text-slate-900 leading-tight">
                  {summaryVerdict.label}
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/70">
                  <TrendingUp className="w-3 h-3" />
                  <span>{summaryVerdict.percentile} of applicants</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-2">
                  Target Role: <strong className="text-slate-700">{targetRole}</strong>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 mt-2">
              {summaryVerdict.brief}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Standard ATS Format Tested
            </span>
            <span className="font-medium text-slate-600">Strict Scoring Model</span>
          </div>
        </Card>

        {/* 5 Dimension Progress Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {dimensionCards.map((item, idx) => {
            const colors = getScoreColor(item.score);
            const Icon = item.icon;
            const isFullWidth = idx === dimensionCards.length - 1;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between ${
                  isFullWidth ? 'sm:col-span-2' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-7 h-7 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center shrink-0`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-none">{item.title}</h4>
                        <span className="text-[10px] text-slate-400">{item.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-base font-extrabold ${colors.text}`}>{item.score}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">%</span>
                    </div>
                  </div>

                  {/* Linear Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-2">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug mt-1">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
