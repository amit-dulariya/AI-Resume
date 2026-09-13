import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  Briefcase,
  HelpCircle,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { SAMPLE_JOB_DESCRIPTIONS } from '../../utils/atsScoring';

interface JobDescriptionInputProps {
  value: string;
  onChange: (val: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  value,
  onChange,
  onAnalyze,
  isLoading,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const wordCount = value.trim() ? value.trim().split(/\s+/).length : 0;
  const charCount = value.length;

  const handleApplyPreset = (content: string) => {
    onChange(content);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <Card className="border-slate-200/90 shadow-xs overflow-hidden">
      {/* Header bar */}
      <div
        className="p-4 bg-slate-50/70 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center border border-indigo-200/60">
            <Briefcase className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                Target Job Description
              </h3>
              <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/50">
                Optional
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Paste a target job posting to unlock precision keyword alignment and role relevance scoring
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {value.trim() && (
            <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {wordCount} words loaded
            </span>
          )}
          <button
            type="button"
            className="text-slate-400 hover:text-slate-600 transition-colors p-1"
            aria-label={isOpen ? 'Collapse job description input' : 'Expand job description input'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Body when open */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-3 bg-white">
          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium text-[11px]">Load Sample Role:</span>
            {SAMPLE_JOB_DESCRIPTIONS.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApplyPreset(sample.content);
                }}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:border-slate-300 transition-colors cursor-pointer"
              >
                {sample.title}
              </button>
            ))}

            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-[11px] font-medium px-2 py-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-auto flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              rows={4}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Paste a target job description here (responsibilities, required qualifications, key skills)... The ATS scoring engine will cross-reference your resume against these exact requirements."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-slate-50/40 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white resize-y font-normal leading-relaxed"
            />
            <div className="flex items-center justify-between mt-1 px-1 text-[11px] text-slate-400">
              <span>{charCount} characters · {wordCount} words</span>
              <span>Supports plain text & copied job postings</span>
            </div>
          </div>

          {/* Action row */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>
                {value.trim()
                  ? 'Ready to evaluate ATS match against this job description'
                  : 'Without a job description, ATS evaluates against standard industry benchmarks'}
              </span>
            </div>

            <Button
              size="sm"
              variant="primary"
              onClick={onAnalyze}
              isLoading={isLoading}
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold cursor-pointer shadow-xs"
            >
              {isLoading ? 'Analyzing Resume...' : value.trim() ? 'Run ATS Job Match' : 'Run ATS Audit'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
