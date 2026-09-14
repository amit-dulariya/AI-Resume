import React, { useState } from 'react';
import {
  Tag,
  CheckCircle2,
  AlertCircle,
  Search,
  Check,
  Copy,
  SlidersHorizontal,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { KeywordSuggestionItem } from '../../data/analyzerMockData';

interface KeywordSuggestionsSectionProps {
  keywords: KeywordSuggestionItem[];
}

export const KeywordSuggestionsSection: React.FC<KeywordSuggestionsSectionProps> = ({
  keywords,
}) => {
  const [filterStatus, setFilterStatus] = useState<'all' | 'matched' | 'missing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = keywords.filter((kw) => {
    if (filterStatus === 'matched' && !kw.matched) return false;
    if (filterStatus === 'missing' && kw.matched) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        kw.keyword.toLowerCase().includes(q) ||
        kw.category.toLowerCase().includes(q) ||
        kw.recommendedPlacement.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const getImportanceBadge = (importance: KeywordSuggestionItem['importance']) => {
    switch (importance) {
      case 'Critical':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            High Priority
          </span>
        );
      default:
        return (
          <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Medium
          </span>
        );
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Tag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Keyword Suggestions & Match Analysis
              </h3>
              <p className="text-[11px] text-slate-500">
                High-frequency ATS terms that recruiters search for in this role tier
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter Pills */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-xs">
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  filterStatus === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                All ({keywords.length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('matched')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  filterStatus === 'matched'
                    ? 'bg-white text-emerald-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Found ({keywords.filter((k) => k.matched).length})
              </button>
              <button
                type="button"
                onClick={() => setFilterStatus('missing')}
                className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                  filterStatus === 'missing'
                    ? 'bg-white text-rose-700 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Missing ({keywords.filter((k) => !k.matched).length})
              </button>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-36">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-8 pr-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardBody className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((kw) => (
            <div
              key={kw.id}
              className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                kw.matched
                  ? 'border-emerald-200/80 bg-emerald-50/15'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    {kw.matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {kw.keyword}
                    </h4>
                  </div>
                  {getImportanceBadge(kw.importance)}
                </div>

                <div className="text-[11px] text-slate-500 mb-1">
                  Category: <span className="font-medium text-slate-700">{kw.category}</span>
                </div>

                <p className="text-[11px] text-slate-600 leading-snug">
                  {kw.tip}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px]">
                <span className="text-slate-400">
                  Target: <strong className="text-slate-600">{kw.recommendedPlacement}</strong>
                </span>
                <span className={kw.matched ? 'text-emerald-700 font-bold' : 'text-slate-400'}>
                  {kw.matched ? `${kw.frequency}x in resume` : '0 matches'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
