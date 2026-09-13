import React from 'react';
import {
  Check,
  LayoutTemplate,
  Sparkles,
  ChevronDown,
} from 'lucide-react';
import { ResumeTemplate } from '../../types/resume';
import { mockTemplates } from '../../data/mockData';

interface TemplateSelectorProps {
  currentTemplateId: string;
  onSelectTemplate: (templateId: string) => void;
  className?: string;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  currentTemplateId,
  onSelectTemplate,
  className = '',
}) => {
  const currentTemplate =
    mockTemplates.find((t) => t.id === currentTemplateId) || mockTemplates[0];

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
          <LayoutTemplate className="w-3.5 h-3.5 text-indigo-600" />
          <span>Resume Template</span>
        </div>
        <span className="text-[11px] font-medium text-slate-500">
          Active: <strong className="text-slate-900">{currentTemplate.name}</strong>
        </span>
      </div>

      {/* Horizontal pill / card picker */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {mockTemplates.map((template) => {
          const isSelected = template.id === currentTemplateId;
          return (
            <button
              key={template.id}
              type="button"
              onClick={() => onSelectTemplate(template.id)}
              className={`text-left p-2.5 rounded-xl border transition-all relative flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-indigo-50/70 border-indigo-600 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
              }`}
            >
              {/* Selected indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              )}

              <div>
                <span
                  className={`text-xs font-bold block truncate pr-4 ${
                    isSelected ? 'text-indigo-950' : 'text-slate-900'
                  }`}
                >
                  {template.name}
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-2 mt-0.5 leading-tight">
                  {template.description}
                </span>
              </div>

              <div className="mt-2 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span
                  className={`font-semibold ${
                    isSelected ? 'text-indigo-600' : 'text-slate-400'
                  }`}
                >
                  {isSelected ? 'Selected' : 'Click to apply'}
                </span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400">
                  {template.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
