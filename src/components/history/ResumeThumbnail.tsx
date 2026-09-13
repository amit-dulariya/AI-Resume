import React from 'react';
import { Resume } from '../../types/resume';

interface ResumeThumbnailProps {
  resume: Resume;
  className?: string;
}

export const ResumeThumbnail: React.FC<ResumeThumbnailProps> = ({ resume, className = '' }) => {
  const { content, templateId } = resume;
  const fullName = content?.personalInfo?.fullName || 'Candidate Name';
  const jobTitle = content?.personalInfo?.jobTitle || resume.targetRole || 'Professional';

  // Template aesthetics
  const isClassic = templateId === 'tpl-classic';
  const isMinimal = templateId === 'tpl-minimal' || templateId === 'tpl-minimalist';
  const isProfessional = templateId === 'tpl-professional' || templateId === 'tpl-technical';
  const isExecutive = templateId === 'tpl-executive';
  const isModern = !isClassic && !isMinimal && !isProfessional && !isExecutive;

  // Primary accent colors
  const accentColor = isExecutive
    ? 'bg-amber-700'
    : isProfessional
    ? 'bg-emerald-700'
    : isClassic
    ? 'bg-slate-800'
    : isMinimal
    ? 'bg-slate-600'
    : 'bg-indigo-600';

  const accentBorder = isExecutive
    ? 'border-amber-700/40'
    : isProfessional
    ? 'border-emerald-700/40'
    : isClassic
    ? 'border-slate-800/40'
    : isMinimal
    ? 'border-slate-300'
    : 'border-indigo-600/40';

  return (
    <div
      className={`relative w-full aspect-[1/1.38] bg-white rounded-lg shadow-sm border border-slate-200/90 overflow-hidden flex flex-col p-2.5 sm:p-3 select-none transition-transform duration-200 group-hover:scale-[1.01] ${className}`}
    >
      {/* Top Template Accent Bar */}
      <div className={`h-1 w-full rounded-full ${accentColor} mb-2 shrink-0`} />

      {/* Header Miniature */}
      <div
        className={`mb-2 shrink-0 ${
          isClassic || isExecutive ? 'text-center' : 'text-left'
        }`}
      >
        <div className="font-bold text-[10px] sm:text-[11px] text-slate-900 truncate tracking-tight">
          {fullName}
        </div>
        <div className="text-[8px] sm:text-[9px] font-medium text-slate-500 truncate mt-0.5">
          {jobTitle}
        </div>
        <div className="flex items-center justify-center gap-1 mt-1 opacity-70">
          <div className="h-1 w-8 bg-slate-200 rounded-full" />
          <div className="h-1 w-1 bg-slate-300 rounded-full" />
          <div className="h-1 w-10 bg-slate-200 rounded-full" />
        </div>
      </div>

      <div className={`w-full border-t ${accentBorder} mb-2 shrink-0`} />

      {/* Miniature Document Body Blocks */}
      <div className="space-y-2 flex-1 overflow-hidden">
        {/* Section 1: Summary */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className={`h-1.5 w-12 rounded-xs ${accentColor}`} />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-slate-200/80 rounded-full" />
            <div className="h-1 w-[90%] bg-slate-200/80 rounded-full" />
            <div className="h-1 w-[70%] bg-slate-200/80 rounded-full" />
          </div>
        </div>

        {/* Section 2: Experience */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className={`h-1.5 w-16 rounded-xs ${accentColor}`} />
            <div className="h-1 w-8 bg-slate-200 rounded-full" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="h-1 w-20 bg-slate-300 rounded-full" />
              <div className="h-1 w-6 bg-slate-200 rounded-full" />
            </div>
            <div className="pl-1 space-y-0.5 border-l border-slate-100">
              <div className="h-1 w-[92%] bg-slate-200/80 rounded-full" />
              <div className="h-1 w-[85%] bg-slate-200/80 rounded-full" />
            </div>
          </div>
        </div>

        {/* Section 3: Skills / Chips */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className={`h-1.5 w-10 rounded-xs ${accentColor}`} />
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="h-2 w-8 bg-slate-100 rounded-xs border border-slate-200" />
            <div className="h-2 w-10 bg-slate-100 rounded-xs border border-slate-200" />
            <div className="h-2 w-6 bg-slate-100 rounded-xs border border-slate-200" />
            <div className="h-2 w-9 bg-slate-100 rounded-xs border border-slate-200" />
          </div>
        </div>

        {/* Section 4: Education */}
        <div className="pt-0.5">
          <div className="flex items-center justify-between mb-1">
            <div className={`h-1.5 w-14 rounded-xs ${accentColor}`} />
          </div>
          <div className="h-1 w-[75%] bg-slate-200/80 rounded-full" />
        </div>
      </div>

      {/* Subtle Bottom watermark indicating template */}
      <div className="mt-auto pt-1 flex items-center justify-between border-t border-slate-100 text-[8px] text-slate-400">
        <span className="truncate">{templateId.replace('tpl-', '').toUpperCase()}</span>
        <span className="shrink-0 font-medium">1 PAGE</span>
      </div>
    </div>
  );
};
