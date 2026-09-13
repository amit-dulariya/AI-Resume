import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Edit3,
  Copy,
  Trash2,
  Download,
  Clock,
  LayoutTemplate,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  MoreVertical,
  Check,
  TrendingUp,
} from 'lucide-react';
import { ResumeWithStats } from '../../types/resumeHistory';
import { ResumeThumbnail } from './ResumeThumbnail';
import { ScoreBadge } from '../common/ScoreBadge';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { timeAgo, formatDate } from '../../utils/formatters';

interface ResumeCardProps {
  resume: ResumeWithStats;
  onDuplicate: (resume: ResumeWithStats) => void;
  onDelete: (resume: ResumeWithStats) => void;
  onDownload: (resume: ResumeWithStats) => void;
  isDownloading?: boolean;
}

export const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onDuplicate,
  onDelete,
  onDownload,
  isDownloading = false,
}) => {
  const navigate = useNavigate();

  // Status badge config
  const statusMeta = {
    analyzed: { label: 'ATS Scanned', variant: 'brand' as const },
    completed: { label: 'Ready', variant: 'success' as const },
    draft: { label: 'Draft', variant: 'neutral' as const },
  }[resume.status || 'draft'];

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden">
      {/* Top Preview Thumbnail Container */}
      <div className="relative p-3 bg-slate-50/70 border-b border-slate-100 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-[210px] mx-auto transition-transform duration-200 group-hover:scale-[1.02]">
          <ResumeThumbnail resume={resume} />
        </div>

        {/* Hover Quick Edit Overlay */}
        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4 backdrop-blur-2xs">
          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={() => navigate(`/builder?id=${resume.id}`)}
            className="shadow-md font-semibold text-xs"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1.5" />
            Open in Builder
          </Button>
        </div>

        {/* Status Pill on top corner */}
        <div className="absolute top-2.5 right-2.5">
          <Badge variant={statusMeta.variant} size="sm">
            {statusMeta.label}
          </Badge>
        </div>
      </div>

      {/* Card Details Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        <div>
          {/* Resume Name */}
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => navigate(`/builder?id=${resume.id}`)}
              className="font-bold text-sm text-slate-900 line-clamp-1 hover:text-indigo-600 transition-colors cursor-pointer"
              title={resume.title}
            >
              {resume.title}
            </h3>
          </div>

          {/* Target Role / Category */}
          <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
            {resume.targetRole || 'Professional Resume'}
          </p>

          {/* Template & Updated Timestamp */}
          <div className="flex items-center justify-between gap-2 mt-2.5 text-[11px] text-slate-500">
            <span className="inline-flex items-center gap-1 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              <LayoutTemplate className="w-3 h-3 text-slate-400" />
              {resume.templateName}
            </span>

            <span className="inline-flex items-center gap-1 text-slate-400" title={formatDate(resume.lastModified)}>
              <Clock className="w-3 h-3" />
              {timeAgo(resume.lastModified || resume.createdAt)}
            </span>
          </div>
        </div>

        {/* Metrics Row: ATS Score & Completion Percentage */}
        <div className="pt-2.5 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium">ATS Score:</span>
              <ScoreBadge score={resume.atsScore || 85} size="sm" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-500 font-medium">Completion:</span>
              <span className="text-xs font-bold text-slate-800">
                {resume.completionPercentage}%
              </span>
            </div>
          </div>

          {/* Completion Progress Bar */}
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                resume.completionPercentage >= 90
                  ? 'bg-emerald-500'
                  : resume.completionPercentage >= 70
                  ? 'bg-indigo-500'
                  : 'bg-amber-500'
              }`}
              style={{ width: `${resume.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Quick Actions Toolbar */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate(`/builder?id=${resume.id}`)}
            className="flex-1 text-slate-700 border-slate-200 hover:border-slate-300 text-xs font-semibold py-1.5 shadow-2xs"
            title="Edit resume in builder"
          >
            <Edit3 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
            Edit
          </Button>

          <button
            type="button"
            onClick={() => onDuplicate(resume)}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
            title="Duplicate resume"
            aria-label="Duplicate"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDownload(resume)}
            disabled={isDownloading}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors cursor-pointer"
            title="Download PDF"
            aria-label="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => onDelete(resume)}
            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
            title="Delete resume"
            aria-label="Delete"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
