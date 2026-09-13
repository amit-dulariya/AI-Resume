import React from 'react';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface SectionAccordionProps {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  isOpen: boolean;
  onToggle: () => void;
  isComplete?: boolean;
  itemCount?: number;
  children: React.ReactNode;
}

export const SectionAccordion: React.FC<SectionAccordionProps> = ({
  id,
  title,
  subtitle,
  icon: Icon,
  isOpen,
  onToggle,
  isComplete,
  itemCount,
  children,
}) => {
  return (
    <div
      id={`section-${id}`}
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden ${
        isOpen
          ? 'border-indigo-200 ring-2 ring-indigo-500/10 shadow-xs'
          : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-hidden hover:bg-slate-50/70 transition-colors"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
              isOpen
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            <Icon className="w-4 h-4" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm text-slate-900 leading-tight truncate">
                {title}
              </h3>
              {typeof itemCount === 'number' && itemCount > 0 && (
                <span className="text-[11px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </span>
              )}
              {isComplete && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Ready</span>
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-xs text-slate-500 truncate mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-3 shrink-0">
          <div
            className={`p-1 text-slate-400 hover:text-slate-600 rounded-md transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-indigo-600' : ''
            }`}
          >
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-100 animate-in fade-in duration-150">
          {children}
        </div>
      )}
    </div>
  );
};
