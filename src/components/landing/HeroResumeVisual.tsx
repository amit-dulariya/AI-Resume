import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Layers,
  Award,
  Check,
  Zap,
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const HeroResumeVisual: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'optimizer' | 'keywords' | 'preview'>('optimizer');
  const [appliedOptimization, setAppliedOptimization] = useState(false);

  return (
    <div className="relative w-full max-w-xl mx-auto lg:max-w-none">
      {/* Decorative ambient backdrop */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-100/60 via-purple-100/40 to-blue-100/50 rounded-3xl blur-xl opacity-70 pointer-events-none" />

      {/* Main Container Card */}
      <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-lg shadow-slate-200/50 overflow-hidden">
        {/* Top Header Bar / Window Frame */}
        <div className="px-4 py-3 bg-slate-50/90 border-b border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="ml-2 font-mono text-[11px] text-slate-500 font-medium hidden sm:inline-block">
              resumeai.engine/analysis
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-bold text-emerald-700">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>ATS Score: {appliedOptimization ? '98/100' : '94/100'}</span>
            </div>
            <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200">
              Greenhouse Tested
            </span>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="px-4 pt-3 pb-2 bg-slate-50/40 border-b border-slate-100 flex items-center gap-1 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('optimizer')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'optimizer'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>AI Bullet Optimizer</span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'keywords'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-indigo-600" />
            <span>ATS Keyword Match</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'preview'
                ? 'bg-white text-indigo-700 shadow-xs border border-slate-200/80 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-600" />
            <span>Live Resume View</span>
          </button>
        </div>

        {/* Tab 1: AI Bullet Optimizer */}
        {activeTab === 'optimizer' && (
          <div className="p-5 sm:p-6 space-y-4">
            {/* Context Badge */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-600" />
                Work Experience · Lead Software Engineer
              </span>
              <span className="text-[11px] text-slate-500">Targeting Staff / Senior Roles</span>
            </div>

            {/* Before Card */}
            <div className="p-3.5 rounded-xl border border-rose-200/80 bg-rose-50/40 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Original Bullet Point
                </span>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded">
                  Score: 42% (Passive & Unquantified)
                </span>
              </div>
              <p className="text-xs text-slate-700 font-normal leading-relaxed">
                "Responsible for maintaining backend systems, writing API routes, and helping junior developers on our team with code reviews."
              </p>
            </div>

            {/* AI Enhanced Card */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> AI-Engineered High Impact Bullet
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Score: 98% (Metric + Active Verb)
                </span>
              </div>

              <p className="text-xs text-slate-900 font-medium leading-relaxed">
                "Architected high-throughput microservices handling <strong className="text-indigo-900 bg-indigo-100/70 px-1 py-0.2 rounded font-semibold">45M daily requests</strong> with <strong className="text-indigo-900 bg-indigo-100/70 px-1 py-0.2 rounded font-semibold">99.99% uptime</strong>, and established automated CI/CD pipelines reducing deployment regression by <strong className="text-indigo-900 bg-indigo-100/70 px-1 py-0.2 rounded font-semibold">34%</strong>."
              </p>

              {/* Detected Metric Chips */}
              <div className="pt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-indigo-700 font-medium">
                  ✓ Quantified Metric (45M)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-indigo-700 font-medium">
                  ✓ Power Action Verb (Architected)
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white border border-indigo-200 text-indigo-700 font-medium">
                  ✓ Proven Reliability (99.99%)
                </span>
              </div>
            </div>

            {/* Interactive Apply Toggle */}
            <div className="pt-1 flex items-center justify-between border-t border-slate-100">
              <div className="text-[11px] text-slate-500">
                {appliedOptimization ? (
                  <span className="text-emerald-700 font-medium flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Applied to resume draft
                  </span>
                ) : (
                  <span>Click to preview instant resume update</span>
                )}
              </div>
              <button
                onClick={() => setAppliedOptimization(!appliedOptimization)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  appliedOptimization
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xs'
                }`}
              >
                {appliedOptimization ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                  </>
                ) : (
                  <>
                    <Zap className="w-3.5 h-3.5" /> Apply AI Rewrite
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: ATS Keyword Match */}
        {activeTab === 'keywords' && (
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-900">Job Description Alignment</h4>
                <p className="text-[11px] text-slate-500">Senior Full Stack Engineer (Fintech & Cloud)</p>
              </div>
              <div className="text-right">
                <span className="text-base font-extrabold text-indigo-700">92%</span>
                <span className="text-[10px] text-slate-500 block leading-none">Match Rate</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 mb-1.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Matched High-Value Skills (22)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['React 19', 'TypeScript', 'Distributed Systems', 'Node.js', 'PostgreSQL', 'GraphQL', 'AWS Cloud', 'Docker', 'System Design'].map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 text-amber-600" /> Recommended Keywords to Add (2)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium">
                    + Kubernetes (K8s)
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 text-[11px] font-medium">
                    + OpenTelemetry
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Adding these two keywords will elevate candidate match rate to 98%.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Live Document Preview */}
        {activeTab === 'preview' && (
          <div className="p-5 sm:p-6 bg-slate-50/50">
            <div className="bg-white rounded-lg p-5 border border-slate-200/90 shadow-xs space-y-3.5 text-slate-800">
              <div className="border-b border-slate-100 pb-2.5 flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight">Alex Morgan</h4>
                  <p className="text-indigo-600 font-semibold text-xs">Senior Full Stack Engineer</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    San Francisco, CA · alex.morgan@example.com · linkedin.com/in/alexmorgan
                  </p>
                </div>
                <Badge variant="neutral" size="sm">Template: Modern Tech</Badge>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Professional Summary
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  High-impact engineer with 7+ years architecting distributed web platforms, high-throughput APIs, and scalable frontends. Proven track record reducing latency by 45% and leading cross-functional squads to 2M+ active users.
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Experience
                </span>
                <div className="text-[11px] space-y-1">
                  <div className="flex justify-between font-semibold text-slate-900">
                    <span>Lead Software Engineer — Nexus Cloud Platforms</span>
                    <span className="text-slate-400 font-normal">2023 – Present</span>
                  </div>
                  <p className="text-slate-600 text-[10px] leading-relaxed">
                    {appliedOptimization
                      ? '• Architected high-throughput microservices handling 45M daily requests with 99.99% uptime, and established automated CI/CD pipelines reducing deployment regression by 34%.'
                      : '• Architected event-driven microservices processing 45M daily requests with 99.99% uptime utilizing Go and TypeScript.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Banner inside Card */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="font-medium text-[11px]">Ready for Greenhouse, Lever & Workday</span>
          </div>
          <span className="text-[11px] font-semibold text-indigo-600 flex items-center gap-1">
            0 Parsing Errors
          </span>
        </div>
      </div>
    </div>
  );
};
