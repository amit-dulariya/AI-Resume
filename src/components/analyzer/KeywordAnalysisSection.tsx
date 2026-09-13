import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Search,
  Copy,
  Check,
  Lightbulb,
  Tag,
  ArrowUpRight,
  Filter,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { Badge } from '../common/Badge';
import { KeywordAnalysisData, KeywordItem } from '../../types/resume';

interface KeywordAnalysisSectionProps {
  data: KeywordAnalysisData;
}

export const KeywordAnalysisSection: React.FC<KeywordAnalysisSectionProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState<'matched' | 'missing' | 'important' | 'suggestions'>('matched');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const { matchedKeywords, missingKeywords, importantKeywords, usageSuggestions } = data;

  const handleCopyBullet = (id: string, text?: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Filtering keywords by search query
  const filterList = (list: KeywordItem[]) => {
    if (!searchQuery.trim()) return list;
    return list.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const getImportanceBadge = (importance: KeywordItem['importance']) => {
    if (importance === 'Critical') {
      return <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Critical</span>;
    }
    if (importance === 'High') {
      return <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">High</span>;
    }
    return <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">Medium</span>;
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">ATS Keyword Analysis</h3>
            <span className="text-xs text-slate-400 font-medium">
              ({matchedKeywords.length} matched / {matchedKeywords.length + missingKeywords.length} scanned)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Parsers compare your exact phraseology against job requisitions to rank candidate relevance
          </p>
        </div>

        {/* Search within keywords */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>
      </CardHeader>

      {/* Tabs */}
      <div className="px-5 border-b border-slate-100 flex items-center gap-2 overflow-x-auto py-2">
        <button
          onClick={() => setActiveTab('matched')}
          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === 'matched'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-300/80 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          Matched Keywords
          <span className="ml-0.5 px-1.5 py-0.2 bg-white rounded-full text-[10px] text-emerald-700 font-bold border border-emerald-200">
            {matchedKeywords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('missing')}
          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === 'missing'
              ? 'bg-rose-50 text-rose-800 border border-rose-300/80 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
          Missing Keywords
          <span className="ml-0.5 px-1.5 py-0.2 bg-white rounded-full text-[10px] text-rose-700 font-bold border border-rose-200">
            {missingKeywords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('important')}
          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === 'important'
              ? 'bg-indigo-50 text-indigo-800 border border-indigo-300/80 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          Important Keywords
          <span className="ml-0.5 px-1.5 py-0.2 bg-white rounded-full text-[10px] text-indigo-700 font-bold border border-indigo-200">
            {importantKeywords.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('suggestions')}
          className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
            activeTab === 'suggestions'
              ? 'bg-amber-50 text-amber-900 border border-amber-300/80 shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
          Usage Suggestions
          <span className="ml-0.5 px-1.5 py-0.2 bg-white rounded-full text-[10px] text-amber-800 font-bold border border-amber-200">
            {usageSuggestions.length}
          </span>
        </button>
      </div>

      <CardBody className="p-5">
        {/* Tab 1: Matched Keywords */}
        {activeTab === 'matched' && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span>Keywords verified in your resume body and skills categories:</span>
              <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                High ATS visibility
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {filterList(matchedKeywords).map((kw) => (
                <div
                  key={kw.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50/70 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {kw.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {kw.category}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-semibold text-emerald-800 bg-white border border-emerald-200 px-1.5 py-0.5 rounded shrink-0">
                    {kw.frequencyInResume && kw.frequencyInResume > 1
                      ? `${kw.frequencyInResume}x`
                      : 'Found'}
                  </span>
                </div>
              ))}
            </div>

            {filterList(matchedKeywords).length === 0 && (
              <p className="text-center text-xs text-slate-400 py-6">
                No matched keywords matching "{searchQuery}"
              </p>
            )}
          </div>
        )}

        {/* Tab 2: Missing Keywords */}
        {activeTab === 'missing' && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span>Keywords frequently required for this target role not yet detected:</span>
              <span className="text-[11px] text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded">
                Recommended to add
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {filterList(missingKeywords).map((kw) => (
                <div
                  key={kw.id}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-rose-200/70 bg-rose-50/25 hover:bg-rose-50/50 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-slate-900 truncate block">
                        {kw.name}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {kw.category}
                      </span>
                    </div>
                  </div>

                  <div className="shrink-0">{getImportanceBadge(kw.importance)}</div>
                </div>
              ))}
            </div>

            {filterList(missingKeywords).length === 0 && (
              <p className="text-center text-xs text-slate-400 py-6">
                No missing keywords matching "{searchQuery}"
              </p>
            )}
          </div>
        )}

        {/* Tab 3: Important Keywords */}
        {activeTab === 'important' && (
          <div>
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span>Primary competencies with highest weight in hiring screening algorithms:</span>
              <span className="text-[11px] text-indigo-700 font-medium bg-indigo-50 px-2 py-0.5 rounded">
                Core Requisites
              </span>
            </div>

            <div className="space-y-2">
              {filterList(importantKeywords).map((kw) => (
                <div
                  key={kw.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200/90 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {kw.matched ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{kw.name}</span>
                      <span className="text-[11px] text-slate-500">
                        Category: {kw.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {getImportanceBadge(kw.importance)}
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                        kw.matched
                          ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                          : 'text-rose-700 bg-rose-50 border border-rose-200'
                      }`}
                    >
                      {kw.matched ? 'Present in Resume' : 'Missing from Resume'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Usage Suggestions */}
        {activeTab === 'suggestions' && (
          <div className="space-y-3.5">
            <div className="text-xs text-slate-500 mb-1">
              Contextual suggestions on where and how to integrate keywords naturally into action bullets:
            </div>

            {usageSuggestions.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/40 space-y-2.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-md">
                      {item.keyword}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Target: <strong>{item.targetSection}</strong>
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {item.suggestion}
                </p>

                {item.exampleBullet && (
                  <div className="bg-white p-3 rounded-lg border border-slate-200 flex items-start justify-between gap-3 text-xs text-slate-800">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                        Recommended ATS Action Bullet:
                      </span>
                      <p className="font-mono text-[11px] text-slate-800 leading-relaxed">
                        • {item.exampleBullet}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyBullet(item.id, item.exampleBullet)}
                      className="shrink-0 p-1.5 rounded-md border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
                      title="Copy bullet to clipboard"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-semibold">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardBody>
    </Card>
  );
};
