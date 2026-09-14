import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  FileText,
  Sparkles,
  BarChart3,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  LayoutTemplate,
  Settings,
} from 'lucide-react';
import { initialAdminStats, initialAdminActivities, adminAnalyticsData } from '../../data/adminMockData';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export const AdminOverviewPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 text-white border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-indigo-500/30 border border-indigo-400/40 text-indigo-300">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-300">
              Control Center
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Admin Overview</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Live overview of platform usage, ATS scoring health, resume generation pipelines, and active accounts.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <Link to="/admin/users">
            <Button variant="secondary" size="sm" className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
              Manage Users
            </Button>
          </Link>
          <Link to="/admin/templates">
            <Button variant="brand" size="sm" className="text-xs">
              Review Templates
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Primary Required Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {initialAdminStats.map((stat) => {
          let Icon = Users;
          let iconStyles = 'bg-indigo-50 text-indigo-600 border-indigo-100';
          if (stat.id === 'stat-resumes') {
            Icon = FileText;
            iconStyles = 'bg-blue-50 text-blue-600 border-blue-100';
          } else if (stat.id === 'stat-ai') {
            Icon = Sparkles;
            iconStyles = 'bg-purple-50 text-purple-600 border-purple-100';
          } else if (stat.id === 'stat-ats') {
            Icon = BarChart3;
            iconStyles = 'bg-emerald-50 text-emerald-600 border-emerald-100';
          }

          return (
            <Card key={stat.id} className="p-5 border border-slate-200/80 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {stat.title}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center border ${iconStyles}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</span>
                <span className="inline-flex items-center text-xs font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5 inline" />
                  {stat.change}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{stat.period}</p>
            </Card>
          );
        })}
      </div>

      {/* Main Grid: Weekly Platform Activity & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Activity Summary & Distribution */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Traffic & Scans Overview */}
          <Card className="p-5 border border-slate-200/80 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Weekly Scan Volume & AI Operations</h3>
                <p className="text-xs text-slate-500 mt-0.5">Aggregated ATS checks and AI generation requests</p>
              </div>
              <Link to="/admin/analytics" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                Full Analytics <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Visual Bar Graph */}
            <div className="pt-4 pb-2">
              <div className="flex items-end justify-between gap-3 h-44 px-2">
                {adminAnalyticsData.dailyScans.map((item) => {
                  const maxCount = 900;
                  const heightPercent = Math.min(100, Math.round((item.count / maxCount) * 100));
                  return (
                    <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="text-[10px] font-semibold text-slate-400 group-hover:text-indigo-600 transition-colors">
                        {item.count}
                      </div>
                      <div className="w-full bg-slate-100 rounded-t-lg h-32 relative flex items-end overflow-hidden">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className="w-full bg-indigo-600 group-hover:bg-indigo-500 rounded-t-md transition-all duration-300"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-600">{item.day}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-[11px] font-medium text-slate-400">Peak Scan Day</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">Friday (850 scans)</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400">Avg Daily Volume</div>
                <div className="text-sm font-bold text-slate-800 mt-0.5">630 scans/day</div>
              </div>
              <div>
                <div className="text-[11px] font-medium text-slate-400">ATS Pass Benchmark</div>
                <div className="text-sm font-bold text-emerald-600 mt-0.5">85.8% Quality</div>
              </div>
            </div>
          </Card>

          {/* Quick Shortcuts to All Admin Sections */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Quick Admin Navigation
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <Link
                to="/admin/users"
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Users</span>
                  <Users className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Accounts</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">3,240 active</div>
                </div>
              </Link>

              <Link
                to="/admin/resumes"
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Resumes</span>
                  <FileText className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Registry</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">7,180 records</div>
                </div>
              </Link>

              <Link
                to="/admin/templates"
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Templates</span>
                  <LayoutTemplate className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Presets</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">6 ATS styles</div>
                </div>
              </Link>

              <Link
                to="/admin/analytics"
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Analytics</span>
                  <BarChart3 className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">Insights</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">24.9k scans</div>
                </div>
              </Link>

              <Link
                to="/admin/settings"
                className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-indigo-300 hover:shadow-xs transition-all group flex flex-col justify-between col-span-2 sm:col-span-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Settings</span>
                  <Settings className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="mt-2">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">System</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Security & prefs</div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Col: Required Recent Activity Feed */}
        <div className="space-y-6">
          <Card className="p-5 border border-slate-200/80 shadow-2xs flex flex-col h-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
              </div>
              <Badge variant="neutral" size="sm">Real-time</Badge>
            </div>

            <div className="divide-y divide-slate-100 mt-3 flex-1 overflow-y-auto pr-1">
              {initialAdminActivities.map((act) => {
                let badgeVariant: 'brand' | 'success' | 'warning' | 'neutral' = 'neutral';
                if (act.type === 'ai') badgeVariant = 'brand';
                if (act.type === 'user') badgeVariant = 'success';
                if (act.type === 'template') badgeVariant = 'warning';

                return (
                  <div key={act.id} className="py-3 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-700 leading-snug">
                          <span className="font-bold text-slate-900">{act.user}</span>{' '}
                          <span className="text-slate-500">{act.action}</span>{' '}
                          <span className="font-medium text-indigo-950 underline decoration-indigo-200">{act.target}</span>
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-1">{act.timeAgo}</span>
                      </div>
                      <span className="shrink-0 text-[10px] uppercase font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {act.type}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link to="/admin/analytics" className="text-xs font-semibold text-indigo-600 hover:underline inline-flex items-center gap-1">
                View detailed event audit log <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
