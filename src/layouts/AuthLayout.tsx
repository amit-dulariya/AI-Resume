import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs group-hover:bg-indigo-700 transition-colors">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-2xl text-slate-900 tracking-tight">ResumeAI</span>
        </Link>
        <p className="mt-2 text-sm text-slate-500 font-medium">
          Build a better resume. Get noticed faster.
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-2xl border border-slate-200 shadow-sm">
          <Outlet />
        </div>

        {/* Feature trust badges */}
        <div className="mt-8 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-500">
          <div className="flex flex-col items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>ATS Optimized</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>AI Powered</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <ShieldCheck className="w-4 h-4 text-slate-600" />
            <span>Private & Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
};
