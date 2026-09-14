import React, { useState, useMemo } from 'react';
import {
  Users,
  FileText,
  Sparkles,
  BarChart3,
  TrendingUp,
  Calendar,
  LayoutTemplate,
  CheckCircle2,
  ArrowUpRight,
  Activity,
  Zap,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';

type DateRangeOption = '7d' | '30d' | '90d' | '1y';

interface TimeSeriesPoint {
  date: string;
  resumes: number;
  analyses: number;
}

export const AdminAnalyticsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRangeOption>('30d');
  const [activeChartTab, setActiveChartTab] = useState<'both' | 'resumes' | 'analyses'>('both');

  // Dynamic mock analytics data based on dateRange
  const analyticsData = useMemo(() => {
    switch (dateRange) {
      case '7d':
        return {
          totalUsers: '3,240',
          usersGrowth: '+3.8%',
          totalResumes: '640',
          resumesGrowth: '+12.4%',
          totalAiAnalyses: '2,850',
          aiGrowth: '+19.2%',
          avgAtsScore: '86.4%',
          atsGrowth: '+1.2 pts',
          timeSeries: [
            { date: 'Mon', resumes: 85, analyses: 380 },
            { date: 'Tue', resumes: 92, analyses: 410 },
            { date: 'Wed', resumes: 110, analyses: 490 },
            { date: 'Thu', resumes: 104, analyses: 460 },
            { date: 'Fri', resumes: 128, analyses: 570 },
            { date: 'Sat', resumes: 64, analyses: 280 },
            { date: 'Sun', resumes: 57, analyses: 260 },
          ] as TimeSeriesPoint[],
          templateUsage: [
            { name: 'Modern Clean', count: 260, percentage: 40.6, color: 'bg-indigo-600' },
            { name: 'Classic Serif', count: 175, percentage: 27.3, color: 'bg-blue-600' },
            { name: 'Minimalist Whitespace', count: 120, percentage: 18.8, color: 'bg-slate-700' },
            { name: 'Professional Slate', count: 50, percentage: 7.8, color: 'bg-purple-600' },
            { name: 'Executive Navy', count: 35, percentage: 5.5, color: 'bg-emerald-600' },
          ],
        };
      case '90d':
        return {
          totalUsers: '3,240',
          usersGrowth: '+38.6%',
          totalResumes: '7,180',
          resumesGrowth: '+26.1%',
          totalAiAnalyses: '24,910',
          aiGrowth: '+34.5%',
          avgAtsScore: '85.2%',
          atsGrowth: '+4.1 pts',
          timeSeries: [
            { date: 'Jun', resumes: 1850, analyses: 6400 },
            { date: 'Jul', resumes: 2340, analyses: 8150 },
            { date: 'Aug', resumes: 2990, analyses: 10360 },
          ] as TimeSeriesPoint[],
          templateUsage: [
            { name: 'Modern Clean', count: 2840, percentage: 39.5, color: 'bg-indigo-600' },
            { name: 'Classic Serif', count: 1950, percentage: 27.2, color: 'bg-blue-600' },
            { name: 'Minimalist Whitespace', count: 1420, percentage: 19.8, color: 'bg-slate-700' },
            { name: 'Professional Slate', count: 970, percentage: 13.5, color: 'bg-purple-600' },
            { name: 'Executive Navy', count: 780, percentage: 10.9, color: 'bg-emerald-600' },
            { name: 'Technical Architect', count: 620, percentage: 8.6, color: 'bg-amber-600' },
          ],
        };
      case '1y':
        return {
          totalUsers: '3,240',
          usersGrowth: '+114%',
          totalResumes: '7,180',
          resumesGrowth: '+84.2%',
          totalAiAnalyses: '24,910',
          aiGrowth: '+142%',
          avgAtsScore: '84.8%',
          atsGrowth: '+6.5 pts',
          timeSeries: [
            { date: 'Q4 25', resumes: 920, analyses: 3100 },
            { date: 'Q1 26', resumes: 1540, analyses: 5200 },
            { date: 'Q2 26', resumes: 2280, analyses: 7900 },
            { date: 'Q3 26', resumes: 2440, analyses: 8710 },
          ] as TimeSeriesPoint[],
          templateUsage: [
            { name: 'Modern Clean', count: 2840, percentage: 39.5, color: 'bg-indigo-600' },
            { name: 'Classic Serif', count: 1950, percentage: 27.2, color: 'bg-blue-600' },
            { name: 'Minimalist Whitespace', count: 1420, percentage: 19.8, color: 'bg-slate-700' },
            { name: 'Professional Slate', count: 970, percentage: 13.5, color: 'bg-purple-600' },
            { name: 'Executive Navy', count: 780, percentage: 10.9, color: 'bg-emerald-600' },
            { name: 'Technical Architect', count: 620, percentage: 8.6, color: 'bg-amber-600' },
          ],
        };
      case '30d':
      default:
        return {
          totalUsers: '3,240',
          usersGrowth: '+14.2%',
          totalResumes: '2,480',
          resumesGrowth: '+19.8%',
          totalAiAnalyses: '9,840',
          aiGrowth: '+28.4%',
          avgAtsScore: '85.8%',
          atsGrowth: '+3.4 pts',
          timeSeries: [
            { date: 'Week 1', resumes: 540, analyses: 2150 },
            { date: 'Week 2', resumes: 610, analyses: 2420 },
            { date: 'Week 3', resumes: 680, analyses: 2690 },
            { date: 'Week 4', resumes: 650, analyses: 2580 },
          ] as TimeSeriesPoint[],
          templateUsage: [
            { name: 'Modern Clean', count: 980, percentage: 39.5, color: 'bg-indigo-600' },
            { name: 'Classic Serif', count: 670, percentage: 27.0, color: 'bg-blue-600' },
            { name: 'Minimalist Whitespace', count: 490, percentage: 19.7, color: 'bg-slate-700' },
            { name: 'Professional Slate', count: 335, percentage: 13.5, color: 'bg-purple-600' },
            { name: 'Executive Navy', count: 270, percentage: 10.9, color: 'bg-emerald-600' },
            { name: 'Technical Architect', count: 215, percentage: 8.7, color: 'bg-amber-600' },
          ],
        };
    }
  }, [dateRange]);

  // Max scale calculation for charts
  const maxResumes = useMemo(
    () => Math.max(...analyticsData.timeSeries.map((p) => p.resumes), 100),
    [analyticsData.timeSeries]
  );
  const maxAnalyses = useMemo(
    () => Math.max(...analyticsData.timeSeries.map((p) => p.analyses), 500),
    [analyticsData.timeSeries]
  );

  return (
    <div className="space-y-6">
      {/* Header & Date Range Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Admin Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Key platform metrics, resume creation volume, AI analysis usage, and template popularity.
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200/80 shadow-2xs text-xs font-semibold self-start sm:self-auto">
          <div className="flex items-center gap-1 px-2 text-slate-400">
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden md:inline text-[11px] uppercase tracking-wider font-bold">Range:</span>
          </div>
          {(
            [
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: '90d', label: '90 Days' },
              { id: '1y', label: '1 Year' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setDateRange(item.id)}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer text-xs ${
                dateRange === item.id
                  ? 'bg-indigo-600 text-white shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Users */}
        <Card className="p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Users
            </span>
            <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {analyticsData.totalUsers}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {analyticsData.usersGrowth}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Active candidate accounts</p>
        </Card>

        {/* Total Resumes */}
        <Card className="p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Resumes
            </span>
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {analyticsData.totalResumes}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {analyticsData.resumesGrowth}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Resumes generated & tailored</p>
        </Card>

        {/* Total AI Analyses */}
        <Card className="p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total AI Analyses
            </span>
            <div className="w-9 h-9 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {analyticsData.totalAiAnalyses}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {analyticsData.aiGrowth}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">ATS scans & bullet rewrites</p>
        </Card>

        {/* Average ATS Score */}
        <Card className="p-5 border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average ATS Score
            </span>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 tracking-tight">
              {analyticsData.avgAtsScore}
            </span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
              {analyticsData.atsGrowth}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Aggregated candidate score benchmark</p>
        </Card>
      </div>

      {/* Responsive Charts Section: Resumes Over Time & AI Analysis Usage */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Resumes Created Over Time & AI Analysis Usage Chart */}
        <Card className="lg:col-span-2 p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Resumes Created & AI Analysis Usage Over Time
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comparison between generated resume volumes and AI scoring operations.
                </p>
              </div>

              {/* Chart Series Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveChartTab('both')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartTab === 'both' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Both
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab('resumes')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartTab === 'resumes' ? 'bg-white text-blue-700 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  Resumes
                </button>
                <button
                  type="button"
                  onClick={() => setActiveChartTab('analyses')}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    activeChartTab === 'analyses' ? 'bg-white text-purple-700 shadow-2xs' : 'text-slate-500'
                  }`}
                >
                  AI Analyses
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-medium pt-3 pb-1">
              {(activeChartTab === 'both' || activeChartTab === 'resumes') && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-blue-600 inline-block" />
                  <span className="text-slate-700">Resumes Created</span>
                </div>
              )}
              {(activeChartTab === 'both' || activeChartTab === 'analyses') && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-purple-600 inline-block" />
                  <span className="text-slate-700">AI Analyses & Scans</span>
                </div>
              )}
            </div>

            {/* Responsive Dual-Bar Visual Chart */}
            <div className="pt-6 pb-2">
              <div className="flex items-end justify-between gap-4 h-52 px-2 border-b border-slate-200">
                {analyticsData.timeSeries.map((point) => {
                  const resumeHeight = Math.min(100, Math.round((point.resumes / maxResumes) * 100));
                  const analysisHeight = Math.min(100, Math.round((point.analyses / maxAnalyses) * 100));

                  return (
                    <div key={point.date} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                      {/* Hover Tooltip Value */}
                      <div className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-600 transition-colors flex flex-col items-center leading-none">
                        {activeChartTab !== 'analyses' && (
                          <span className="text-blue-600">{point.resumes}</span>
                        )}
                        {activeChartTab !== 'resumes' && (
                          <span className="text-purple-600">{point.analyses}</span>
                        )}
                      </div>

                      {/* Side-by-side bars */}
                      <div className="w-full flex items-end justify-center gap-1.5 h-40">
                        {(activeChartTab === 'both' || activeChartTab === 'resumes') && (
                          <div className="w-1/2 max-w-[28px] bg-slate-100 rounded-t-md h-full flex items-end">
                            <div
                              style={{ height: `${resumeHeight}%` }}
                              className="w-full bg-blue-600 hover:bg-blue-500 rounded-t-sm transition-all duration-300"
                              title={`${point.resumes} resumes on ${point.date}`}
                            />
                          </div>
                        )}
                        {(activeChartTab === 'both' || activeChartTab === 'analyses') && (
                          <div className="w-1/2 max-w-[28px] bg-slate-100 rounded-t-md h-full flex items-end">
                            <div
                              style={{ height: `${analysisHeight}%` }}
                              className="w-full bg-purple-600 hover:bg-purple-500 rounded-t-sm transition-all duration-300"
                              title={`${point.analyses} AI analyses on ${point.date}`}
                            />
                          </div>
                        )}
                      </div>

                      {/* X-axis Label */}
                      <span className="text-xs font-semibold text-slate-600 whitespace-nowrap mt-1">
                        {point.date}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block text-[11px]">AI-to-Resume Ratio</span>
              <span className="font-bold text-slate-800 text-sm">3.9 analyses/resume</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <span className="text-slate-400 block text-[11px]">Average Scan Duration</span>
              <span className="font-bold text-slate-800 text-sm">1.8 seconds</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg col-span-2 sm:col-span-1">
              <span className="text-slate-400 block text-[11px]">Success Rate</span>
              <span className="font-bold text-emerald-600 text-sm">99.7% Completion</span>
            </div>
          </div>
        </Card>

        {/* Right Col: Most Used Templates Chart */}
        <Card className="p-5 border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <LayoutTemplate className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Most Used Templates</h3>
              </div>
              <Badge variant="neutral" size="sm">Adoption</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Distribution of layout presets chosen by candidates during creation and download.
            </p>

            {/* Template Horizontal Usage Chart */}
            <div className="space-y-4 mt-5">
              {analyticsData.templateUsage.map((tpl) => (
                <div key={tpl.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{tpl.name}</span>
                    <span className="text-slate-500 font-medium">
                      <strong className="text-slate-900 font-bold">{tpl.count}</strong> uses ({tpl.percentage}%)
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${tpl.percentage}%` }}
                      className={`h-full rounded-full ${tpl.color} transition-all duration-500`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insight box */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Modern Clean</strong> remains the #1 preset chosen by over 39% of job seekers targeting Big Tech and Enterprise roles.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
