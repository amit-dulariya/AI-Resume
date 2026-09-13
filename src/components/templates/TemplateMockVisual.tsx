import React from 'react';
import { ResumeTemplate } from '../../types/resume';

interface TemplateMockVisualProps {
  templateId: string;
}

export const TemplateMockVisual: React.FC<TemplateMockVisualProps> = ({ templateId }) => {
  switch (templateId) {
    case 'tpl-modern':
      return (
        <div className="w-full h-full bg-white p-4 font-sans text-[6px] select-none flex flex-col justify-between overflow-hidden">
          {/* Header */}
          <div className="border-b border-indigo-100 pb-2">
            <div className="h-2.5 w-24 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1.5 w-16 bg-indigo-600 rounded-xs mb-1.5" />
            <div className="flex gap-2 text-[5px] text-slate-400">
              <div className="h-1 w-8 bg-slate-200 rounded-xs" />
              <div className="h-1 w-10 bg-slate-200 rounded-xs" />
              <div className="h-1 w-8 bg-slate-200 rounded-xs" />
            </div>
          </div>

          {/* Body */}
          <div className="space-y-2 mt-2">
            <div>
              <div className="h-1.5 w-12 bg-indigo-900 rounded-xs mb-1" />
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="h-1.5 w-14 bg-indigo-900 rounded-xs mb-1" />
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="h-1.5 w-16 bg-slate-800 rounded-xs" />
                  <div className="h-1 w-8 bg-slate-300 rounded-xs" />
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="h-1.5 w-10 bg-indigo-900 rounded-xs mb-1" />
              <div className="flex gap-1 flex-wrap">
                <div className="h-2 w-6 bg-indigo-50 border border-indigo-200 rounded-xs" />
                <div className="h-2 w-7 bg-indigo-50 border border-indigo-200 rounded-xs" />
                <div className="h-2 w-5 bg-indigo-50 border border-indigo-200 rounded-xs" />
                <div className="h-2 w-6 bg-indigo-50 border border-indigo-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'tpl-classic':
      return (
        <div className="w-full h-full bg-white p-4 font-serif text-[6px] select-none flex flex-col justify-between overflow-hidden">
          {/* Centered Traditional Header */}
          <div className="border-b border-slate-400 pb-2 text-center flex flex-col items-center">
            <div className="h-2.5 w-28 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1.5 w-20 bg-slate-600 rounded-xs mb-1.5 italic" />
            <div className="flex justify-center gap-2">
              <div className="h-1 w-10 bg-slate-300 rounded-xs" />
              <div className="h-1 w-10 bg-slate-300 rounded-xs" />
            </div>
          </div>

          {/* Body with classic lines */}
          <div className="space-y-2 mt-2">
            <div>
              <div className="border-b border-slate-400 pb-0.5 mb-1">
                <div className="h-1.5 w-16 bg-slate-800 rounded-xs" />
              </div>
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-11/12 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="border-b border-slate-400 pb-0.5 mb-1">
                <div className="h-1.5 w-18 bg-slate-800 rounded-xs" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-1.5 w-20 bg-slate-800 rounded-xs" />
                  <div className="h-1 w-8 bg-slate-400 rounded-xs" />
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'tpl-minimal':
      return (
        <div className="w-full h-full bg-white p-5 font-sans text-[6px] select-none flex flex-col justify-between overflow-hidden">
          {/* Clean minimal whitespace */}
          <div className="border-b border-slate-200 pb-2 mb-2">
            <div className="h-2 w-20 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1 w-12 bg-slate-400 rounded-xs mb-1 uppercase tracking-wider" />
            <div className="h-1 w-24 bg-slate-200 rounded-xs" />
          </div>

          <div className="space-y-2.5">
            <div>
              <div className="h-1 w-10 bg-slate-700 rounded-xs uppercase tracking-widest mb-1" />
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="h-1 w-12 bg-slate-700 rounded-xs uppercase tracking-widest mb-1" />
              <div className="space-y-1">
                <div className="h-1.5 w-16 bg-slate-900 rounded-xs" />
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'tpl-professional':
      return (
        <div className="w-full h-full bg-white p-4 font-sans text-[6px] select-none flex flex-col justify-between overflow-hidden">
          {/* Left accent block header */}
          <div className="border-b-2 border-slate-700 pb-2 mb-2">
            <div className="h-2.5 w-24 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1.5 w-16 bg-slate-700 rounded-xs" />
          </div>

          <div className="space-y-2">
            <div>
              <div className="bg-slate-100 border-l-2 border-slate-800 px-1 py-0.5 mb-1">
                <div className="h-1.5 w-12 bg-slate-900 rounded-xs" />
              </div>
              <div className="space-y-0.5 pl-1">
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="bg-slate-100 border-l-2 border-slate-800 px-1 py-0.5 mb-1">
                <div className="h-1.5 w-14 bg-slate-900 rounded-xs" />
              </div>
              <div className="space-y-1 pl-1">
                <div className="flex justify-between">
                  <div className="h-1.5 w-18 bg-slate-800 rounded-xs" />
                  <div className="h-1 w-6 bg-slate-400 rounded-xs" />
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'tpl-executive':
      return (
        <div className="w-full h-full bg-white p-4 font-sans text-[6px] select-none flex flex-col justify-between overflow-hidden">
          {/* Navy Double Border Executive */}
          <div className="border-b-2 border-blue-950 pb-2 text-center flex flex-col items-center">
            <div className="h-2.5 w-28 bg-slate-950 rounded-xs mb-1" />
            <div className="h-1.5 w-16 bg-blue-900 rounded-xs mb-1 tracking-widest uppercase" />
            <div className="h-1 w-28 bg-slate-300 rounded-xs" />
          </div>

          <div className="space-y-2 mt-2">
            <div>
              <div className="border-b-2 border-blue-950 pb-0.5 mb-1">
                <div className="h-1.5 w-14 bg-blue-950 rounded-xs tracking-wider uppercase" />
              </div>
              <div className="space-y-0.5">
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
                <div className="h-1 w-11/12 bg-slate-200 rounded-xs" />
              </div>
            </div>

            <div>
              <div className="border-b-2 border-blue-950 pb-0.5 mb-1">
                <div className="h-1.5 w-16 bg-blue-950 rounded-xs tracking-wider uppercase" />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-1.5 w-20 bg-slate-900 rounded-xs" />
                  <div className="h-1 w-8 bg-blue-900 rounded-xs" />
                </div>
                <div className="h-1 w-full bg-slate-200 rounded-xs" />
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
