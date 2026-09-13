import React from 'react';
import {
  Sparkles,
  Award,
  TrendingUp,
  Cpu,
  FileCode2,
  Briefcase,
  GraduationCap,
  Building,
  Target,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

interface MatchScoreCardsProps {
  overallScore: number;
  skillsMatchScore: number;
  keywordMatchScore: number;
  experienceMatchScore: number;
  educationMatchScore: number;
  jobTitle: string;
  companyName: string;
  verdict: {
    label: string;
    grade: string;
    summary: string;
  };
}

export const MatchScoreCards: React.FC<MatchScoreCardsProps> = ({
  overallScore,
  skillsMatchScore,
  keywordMatchScore,
  experienceMatchScore,
  educationMatchScore,
  jobTitle,
  companyName,
  verdict,
}) => {
  // Circular gauge math for the overall score
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  const getScoreColor = (score: number) => {
    if (score >= 90) return { stroke: '#10b981', text: 'text-emerald-600', bg: 'bg-emerald-50', bar: 'bg-emerald-500', border: 'border-emerald-200' };
    if (score >= 80) return { stroke: '#4f46e5', text: 'text-indigo-600', bg: 'bg-indigo-50', bar: 'bg-indigo-600', border: 'border-indigo-200' };
    if (score >= 70) return { stroke: '#2563eb', text: 'text-blue-600', bg: 'bg-blue-50', bar: 'bg-blue-600', border: 'border-blue-200' };
    if (score >= 60) return { stroke: '#f59e0b', text: 'text-amber-600', bg: 'bg-amber-50', bar: 'bg-amber-500', border: 'border-amber-200' };
    return { stroke: '#f43f5e', text: 'text-rose-600', bg: 'bg-rose-50', bar: 'bg-rose-500', border: 'border-rose-200' };
  };

  const overallColors = getScoreColor(overallScore);

  const dimensionCards = [
    {
      id: 'skills-match',
      title: 'Skills Match',
      score: skillsMatchScore,
      icon: Cpu,
      description: 'Technical, framework & tool alignment',
      weight: '35% weight',
    },
    {
      id: 'keyword-match',
      title: 'Keyword Match',
      score: keywordMatchScore,
      icon: FileCode2,
      description: 'Role-specific terminologies & phrasing',
      weight: '25% weight',
    },
    {
      id: 'experience-match',
      title: 'Experience Match',
      score: experienceMatchScore,
      icon: Briefcase,
      description: 'Tenure, responsibilities & metric density',
      weight: '25% weight',
    },
    {
      id: 'education-match',
      title: 'Education Match',
      score: educationMatchScore,
      icon: GraduationCap,
      description: 'Degrees, field of study & credentials',
      weight: '15% weight',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Overall Score Card */}
        <Card className="lg:col-span-5 p-6 bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/30 border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Overall Match Score
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
                <Award className="w-3 h-3" />
                Grade {verdict.grade}
              </span>
            </div>

            <div className="flex items-center gap-6 my-2">
              {/* Circular Gauge */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 128 128">
                  {/* Track */}
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth="10"
                    fill="transparent"
                  />
                  {/* Progress Ring */}
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

              {/* Role Context & Verdict */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="text-base font-bold text-slate-900 leading-tight">
                  {verdict.label}
                </div>
                <div className="text-xs text-slate-700 font-semibold truncate flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{companyName}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">
                  Role: <strong className="text-slate-800">{jobTitle}</strong>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 mt-2">
              {verdict.summary}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              Real-time Gap Analysis
            </span>
            <span className="font-medium text-slate-600">Weighted Match Model</span>
          </div>
        </Card>

        {/* 4 Dimension Score Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {dimensionCards.map((item) => {
            const colors = getScoreColor(item.score);
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200/90 p-4 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg ${colors.bg} ${colors.text} flex items-center justify-center shrink-0 border ${colors.border}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 leading-none">
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-400">{item.weight}</span>
                      </div>
                    </div>

                    <div className="flex items-baseline gap-0.5">
                      <span className={`text-lg font-black ${colors.text}`}>{item.score}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-2.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bar}`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 leading-snug">
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
