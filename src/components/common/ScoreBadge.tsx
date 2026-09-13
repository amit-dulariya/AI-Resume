import React from 'react';
import { formatScoreColor } from '../../utils/formatters';
import { cn } from '../../utils/cn';

export interface ScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  size = 'md',
  showLabel = false,
  className,
}) => {
  const meta = formatScoreColor(score);

  if (size === 'lg') {
    return (
      <div className={cn('flex items-center gap-3', className)}>
        <div
          className={cn(
            'w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold text-xl border shadow-xs',
            meta.bg,
            meta.text,
            meta.border
          )}
        >
          {score}
        </div>
        {showLabel && (
          <div>
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">ATS Score</div>
            <div className={cn('text-sm font-semibold', meta.text)}>{meta.label}</div>
          </div>
        )}
      </div>
    );
  }

  if (size === 'sm') {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 font-semibold text-xs px-2 py-0.5 rounded-full border',
          meta.bg,
          meta.text,
          meta.border,
          className
        )}
      >
        <span>{score}%</span>
        {showLabel && <span className="font-normal opacity-80">· {meta.label}</span>}
      </span>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border font-semibold text-xs',
        meta.bg,
        meta.text,
        meta.border,
        className
      )}
    >
      <span className="font-bold text-sm">{score}</span>
      <span className="text-slate-400 font-normal">/100</span>
      {showLabel && <span className="ml-1 pl-1 border-l border-slate-200">{meta.label}</span>}
    </div>
  );
};
