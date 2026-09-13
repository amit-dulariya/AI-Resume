import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Calendar,
  Briefcase,
  ExternalLink,
  FileText,
  TrendingUp,
  Target,
  ArrowUpDown,
  Filter,
} from 'lucide-react';
import { AnalysisHistoryItem } from '../../types/resumeHistory';
import { ScoreBadge } from '../common/ScoreBadge';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { formatDate } from '../../utils/formatters';

interface AnalysisHistoryTabProps {
  items: AnalysisHistoryItem[];
  onViewAnalysis: (item: AnalysisHistoryItem) => void;
}

export const AnalysisHistoryTab: React.FC<AnalysisHistoryTabProps> = ({
  items,
  onViewAnalysis,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'ATS Scan' | 'Job Description Match'>('all');

  const filtered = items.filter((item) => {
    const matchesSearch =
      item.resumeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.companyName && item.companyName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = typeFilter === 'all' || item.scanType === typeFilter;

    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-4">
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search analysis reports by resume, target role, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold leading-none cursor-pointer"
            >
              ×
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Type:</span>
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-700 cursor-pointer"
          >
            <option value="all">All Scans ({items.length})</option>
            <option value="ATS Scan">ATS Scans</option>
            <option value="Job Description Match">Job Matches</option>
          </select>
        </div>
      </div>

      {/* Content: List or Empty */}
      {filtered.length === 0 ? (
        <Card className="p-8">
          <EmptyState
            icon={<Sparkles className="w-6 h-6 text-indigo-500" />}
            title="No Analysis Reports Found"
            description={
              searchQuery || typeFilter !== 'all'
                ? 'No previous analysis audits match your search query. Try clearing the filters.'
                : 'Run an ATS scan or Job Match analysis to generate audit history records.'
            }
            actionLabel={searchQuery || typeFilter !== 'all' ? 'Clear Filters' : undefined}
            onAction={
              searchQuery || typeFilter !== 'all'
                ? () => {
                    setSearchQuery('');
                    setTypeFilter('all');
                  }
                : undefined
            }
          />
        </Card>
      ) : (
        <Card className="overflow-hidden border border-slate-200/90 shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3.5">Resume Document</th>
                  <th className="px-5 py-3.5">ATS Score</th>
                  <th className="px-5 py-3.5">Match Score</th>
                  <th className="px-5 py-3.5">Target Job / Context</th>
                  <th className="px-5 py-3.5">Analysis Date</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                    onClick={() => onViewAnalysis(item)}
                  >
                    {/* Resume Name */}
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                          <FileText className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                            {item.resumeName}
                          </div>
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 font-normal">
                            <span className="font-medium text-slate-500">{item.scanType}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* ATS Score */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ScoreBadge score={item.atsScore} size="sm" />
                        <span className="text-[11px] text-slate-500">
                          {item.atsScore >= 90
                            ? 'Excellent'
                            : item.atsScore >= 80
                            ? 'Good'
                            : 'Needs Work'}
                        </span>
                      </div>
                    </td>

                    {/* Match Score */}
                    <td className="px-5 py-4 whitespace-nowrap">
                      {item.matchScore > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-xs">
                          <Target className="w-3 h-3 text-emerald-600" />
                          {item.matchScore}% Match
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Not scanned</span>
                      )}
                    </td>

                    {/* Target Job */}
                    <td className="px-5 py-4 text-slate-700 max-w-xs truncate">
                      <div className="font-medium text-slate-800 truncate">
                        {item.targetRole}
                      </div>
                      {item.companyName && (
                        <div className="text-[10px] text-slate-400 truncate">
                          {item.companyName}
                        </div>
                      )}
                    </td>

                    {/* Analysis Date */}
                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>{formatDate(item.analysisDate)}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td
                      className="px-5 py-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onViewAnalysis(item)}
                        className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 hover:text-indigo-800 text-xs font-semibold py-1 px-3 shadow-2xs"
                      >
                        <Sparkles className="w-3 h-3 mr-1 text-indigo-500" />
                        View Analysis
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};
