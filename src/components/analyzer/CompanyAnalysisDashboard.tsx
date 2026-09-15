import React from 'react';
import {
  Building2,
  Award,
  CheckCircle2,
  AlertCircle,
  Tag,
  Lightbulb,
  Rocket,
  ShieldCheck,
  TrendingUp,
  FileText,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Badge } from '../common/Badge';
import { CompanySpecificAnalysis } from '../../data/analyzerMockData';

interface CompanyAnalysisDashboardProps {
  companyAnalysis: CompanySpecificAnalysis;
  targetRole?: string;
}

export const CompanyAnalysisDashboard: React.FC<CompanyAnalysisDashboardProps> = ({
  companyAnalysis,
  targetRole,
}) => {
  const {
    companyName,
    companyScore,
    selectionReadinessLevel,
    expectedSkills,
    presentSkills,
    missingSkills,
    importantKeywords,
    companyStrengths,
    companyWeaknesses,
    recommendedProjectsAndCertifications,
    improvementSuggestions,
  } = companyAnalysis;

  // Score styling logic
  const getScoreTheme = (score: number) => {
    if (score >= 88) {
      return {
        stroke: '#10b981',
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      };
    }
    if (score >= 75) {
      return {
        stroke: '#4f46e5',
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        badge: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      };
    }
    if (score >= 60) {
      return {
        stroke: '#f59e0b',
        text: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        badge: 'bg-amber-100 text-amber-800 border-amber-300',
      };
    }
    return {
      stroke: '#f43f5e',
      text: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-200',
      badge: 'bg-rose-100 text-rose-800 border-rose-300',
    };
  };

  const theme = getScoreTheme(companyScore);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (companyScore / 100) * circumference;

  const matchedKeywordsCount = importantKeywords.filter((k) => k.matched).length;

  return (
    <div className="space-y-6" id="company-analysis-dashboard">
      {/* 1. Header Banner & Executive Score Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Score & Readiness Card */}
        <Card className="lg:col-span-6 p-6 bg-gradient-to-br from-white via-slate-50/70 to-indigo-50/40 border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                    Company-Specific Score
                  </span>
                  <span className="text-sm font-semibold text-slate-800">
                    {companyName} Hiring Benchmark
                  </span>
                </div>
              </div>
              <span
                className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full border ${theme.badge}`}
              >
                <Award className="w-3.5 h-3.5" />
                {selectionReadinessLevel}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 py-3">
              {/* Circular Score Gauge */}
              <div className="relative w-32 h-32 flex-shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    className="text-slate-100"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r={radius}
                    stroke={theme.stroke}
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className={`text-3xl font-extrabold tracking-tight ${theme.text}`}>
                    {companyScore}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">out of 100</span>
                </div>
              </div>

              {/* Score Narrative & Key Metrics */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <h4 className="text-base font-bold text-slate-900">
                  {selectionReadinessLevel === 'Interview Ready'
                    ? `Highly Aligned with ${companyName}'s Standards`
                    : selectionReadinessLevel === 'Highly Competitive'
                    ? `Strong Candidate for ${companyName}`
                    : selectionReadinessLevel === 'Moderate Match'
                    ? `Promising Foundation for ${companyName}`
                    : `Needs Targeted Alignment for ${companyName}`}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Evaluated against {companyName}'s technical bar, key competency expectations for{' '}
                  <span className="font-semibold text-slate-800">{targetRole || 'this position'}</span>,
                  and recruiter screening filters.
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                  <div className="bg-white/80 rounded-lg p-2 border border-slate-100 shadow-2xs">
                    <span className="block text-[11px] text-slate-500 font-medium">Present Skills</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {presentSkills.length} / {expectedSkills.length}
                    </span>
                  </div>
                  <div className="bg-white/80 rounded-lg p-2 border border-slate-100 shadow-2xs">
                    <span className="block text-[11px] text-slate-500 font-medium">Missing Skills</span>
                    <span className="text-sm font-bold text-rose-600">{missingSkills.length}</span>
                  </div>
                  <div className="bg-white/80 rounded-lg p-2 border border-slate-100 shadow-2xs">
                    <span className="block text-[11px] text-slate-500 font-medium">Keywords</span>
                    <span className="text-sm font-bold text-indigo-600">
                      {matchedKeywordsCount}/{importantKeywords.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Recruiter ATS & Technical Loop Verified
            </span>
            <span className="font-semibold text-slate-700">Target: {companyName}</span>
          </div>
        </Card>

        {/* Right: Estimated Selection-Readiness Breakdown */}
        <Card className="lg:col-span-6 p-6 bg-white border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Estimated Selection-Readiness Level
                </span>
              </div>
              <Badge variant="indigo" size="sm">
                Candidate Fit Assessment
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 ${
                    companyScore >= 75 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800 mb-0.5">
                    Stage Expectation at {companyName}
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {companyScore >= 85
                      ? `Candidate's resume demonstrates high readiness to clear ${companyName}'s initial recruiter screen and advance directly to technical phone screens.`
                      : companyScore >= 70
                      ? `Candidate has a solid foundation for ${companyName}, but addressing the missing high-priority skills will significantly improve screening conversion rates.`
                      : `Candidate currently has several skill and keyword gaps compared to typical offers extended at ${companyName}. Targeted additions recommended below.`}
                  </p>
                </div>
              </div>

              {/* Progress bar scale */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                  <span className="text-slate-500">Hiring Probability Curve</span>
                  <span className="font-bold text-slate-700">{companyScore}% Probability Index</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${companyScore}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>Entry Stage (0-59)</span>
                  <span>Competitive (60-74)</span>
                  <span>High Alignment (75-87)</span>
                  <span>Top Percentile (88-100)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live ATS Benchmark
            </span>
            <span>Based on verified job requisitions</span>
          </div>
        </Card>
      </div>

      {/* 2. Skills Comparison: Expected vs Present vs Missing */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardHeader className="bg-slate-50/60 border-b border-slate-100 py-4 px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Expected Skills vs Resume Comparison for {companyName}
            </h3>
            <p className="text-xs text-slate-500">
              Core competencies and architectural domains sought by {companyName} technical interviewers
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 text-emerald-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Present ({presentSkills.length})
            </span>
            <span className="inline-flex items-center gap-1.5 text-rose-700 font-medium">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              Missing ({missingSkills.length})
            </span>
          </div>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {expectedSkills.map((skill, idx) => {
              const isFound = presentSkills.includes(skill.name);
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                    isFound
                      ? 'border-emerald-200/80 bg-emerald-50/30'
                      : 'border-rose-200/80 bg-rose-50/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {isFound ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                      <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 ml-6 block">
                      Category: {skill.category}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 ${
                      skill.importance === 'Core Expectation'
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {skill.importance}
                  </span>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>

      {/* 3. Missing / High-Priority Skills */}
      {missingSkills.length > 0 && (
        <Card className="border-slate-200/90 shadow-xs">
          <CardHeader className="bg-slate-50/60 border-b border-slate-100 py-4 px-6">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              Missing & High-Priority Skills for {companyName}
            </h3>
            <p className="text-xs text-slate-500">
              Gaps identified between your current resume and typical accepted submissions at {companyName}
            </p>
          </CardHeader>
          <CardBody className="p-6">
            <div className="space-y-3">
              {missingSkills.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg border border-slate-200/80 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{item.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.priority === 'Critical'
                            ? 'bg-rose-100 text-rose-700'
                            : item.priority === 'High'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">{item.recommendation}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      )}

      {/* 4. Important Keywords for Company Screening */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardHeader className="bg-slate-50/60 border-b border-slate-100 py-4 px-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Tag className="w-4 h-4 text-indigo-600" />
              Important Keywords for {companyName} Recruiter Searches
            </h3>
            <p className="text-xs text-slate-500">
              Targeted phrasing and terminology scanned by {companyName} sourcing algorithms
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            {matchedKeywordsCount}/{importantKeywords.length} Matched
          </Badge>
        </CardHeader>
        <CardBody className="p-6">
          <div className="flex flex-wrap gap-2.5">
            {importantKeywords.map((kw, idx) => (
              <div
                key={idx}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                  kw.matched
                    ? 'border-emerald-200 bg-emerald-50/70 text-emerald-800'
                    : 'border-slate-200 bg-slate-50/80 text-slate-500'
                }`}
              >
                {kw.matched ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                )}
                <span>{kw.keyword}</span>
                <span
                  className={`text-[9px] uppercase px-1.5 py-0.5 rounded font-bold ${
                    kw.importance === 'High' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {kw.importance}
                </span>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* 5. Company Strengths & Weaknesses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Strengths */}
        <Card className="border-emerald-200/80 bg-emerald-50/15 shadow-xs">
          <CardHeader className="py-4 px-6 border-b border-emerald-100/60 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Resume Strengths for {companyName}
            </h3>
          </CardHeader>
          <CardBody className="p-6">
            <ul className="space-y-2.5">
              {companyStrengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{str}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Weaknesses */}
        <Card className="border-amber-200/80 bg-amber-50/15 shadow-xs">
          <CardHeader className="py-4 px-6 border-b border-amber-100/60 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Resume Weaknesses for {companyName}
            </h3>
          </CardHeader>
          <CardBody className="p-6">
            <ul className="space-y-2.5">
              {companyWeaknesses.map((weak, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span className="leading-relaxed">{weak}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>
      </div>

      {/* 6. Recommended Projects, Certifications & Skills */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardHeader className="bg-slate-50/60 border-b border-slate-100 py-4 px-6">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Rocket className="w-4 h-4 text-indigo-600" />
            Recommended Projects & Certifications for {companyName}
          </h3>
          <p className="text-xs text-slate-500">
            High-leverage credentials and showcase items proven to grab the attention of hiring managers at {companyName}
          </p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedProjectsAndCertifications.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        item.type === 'certification'
                          ? 'bg-amber-100 text-amber-800'
                          : item.type === 'project'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.type}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1.5">{item.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">{item.description}</p>
                </div>
                <div className="pt-2.5 border-t border-slate-100 text-[11px] font-medium text-indigo-700 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  <span>Impact: {item.expectedImpact}</span>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* 7. Actionable Resume Improvement Suggestions */}
      <Card className="border-slate-200/90 shadow-xs">
        <CardHeader className="bg-slate-50/60 border-b border-slate-100 py-4 px-6">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            Resume Improvement Suggestions for {companyName}
          </h3>
          <p className="text-xs text-slate-500">
            Step-by-step refinements to optimize your phrasing, metric quantification, and recruiter appeal
          </p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="space-y-3">
            {improvementSuggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg border border-slate-100 bg-slate-50/50 flex items-start gap-3"
              >
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">{suggestion}</p>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
