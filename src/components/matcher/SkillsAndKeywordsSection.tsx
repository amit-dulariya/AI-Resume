import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Tag,
  Search,
  Filter,
  Cpu,
  Layers,
  AlertCircle,
  Check,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { SkillMatchItem } from '../../types/resume';

interface SkillsAndKeywordsSectionProps {
  matchedSkills: SkillMatchItem[];
  missingSkills: SkillMatchItem[];
  matchedKeywords: string[];
  missingKeywords: string[];
}

export const SkillsAndKeywordsSection: React.FC<SkillsAndKeywordsSectionProps> = ({
  matchedSkills,
  missingSkills,
  matchedKeywords,
  missingKeywords,
}) => {
  const [activeTab, setActiveTab] = useState<'skills' | 'keywords'>('skills');
  const [skillSubFilter, setSkillSubFilter] = useState<'all' | 'matched' | 'missing'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getImportanceBadge = (importance: SkillMatchItem['importance']) => {
    switch (importance) {
      case 'Required':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Required
          </span>
        );
      case 'Preferred':
        return (
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Preferred
          </span>
        );
      case 'Bonus':
        return (
          <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Bonus
          </span>
        );
    }
  };

  const filteredMatchedSkills = matchedSkills.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMissingSkills = missingSkills.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMatchedKeywords = matchedKeywords.filter((k) =>
    k.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMissingKeywords = missingKeywords.filter((k) =>
    k.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Skills & Keywords Breakdown
            </h3>
            <span className="text-xs text-slate-400 font-medium">
              ({matchedSkills.length} of {matchedSkills.length + missingSkills.length} skills matched)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify exact terminology gaps between candidate profile and required job qualifications
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search skills or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
          />
        </div>
      </CardHeader>

      {/* Mode Tabs */}
      <div className="px-5 border-b border-slate-100 flex items-center justify-between gap-2 overflow-x-auto py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('skills')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'skills'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            Technical & Soft Skills
            <span className="ml-0.5 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-bold">
              {matchedSkills.length + missingSkills.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('keywords')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
              activeTab === 'keywords'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            ATS Keyword Tags
            <span className="ml-0.5 px-1.5 py-0.2 bg-white/20 rounded-full text-[10px] font-bold">
              {matchedKeywords.length + missingKeywords.length}
            </span>
          </button>
        </div>

        {activeTab === 'skills' && (
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setSkillSubFilter('all')}
              className={`text-[11px] px-2 py-1 rounded font-medium cursor-pointer ${
                skillSubFilter === 'all' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'
              }`}
            >
              All ({matchedSkills.length + missingSkills.length})
            </button>
            <button
              onClick={() => setSkillSubFilter('matched')}
              className={`text-[11px] px-2 py-1 rounded font-medium cursor-pointer ${
                skillSubFilter === 'matched'
                  ? 'bg-emerald-100 text-emerald-800 font-bold'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              Matched ({matchedSkills.length})
            </button>
            <button
              onClick={() => setSkillSubFilter('missing')}
              className={`text-[11px] px-2 py-1 rounded font-medium cursor-pointer ${
                skillSubFilter === 'missing'
                  ? 'bg-rose-100 text-rose-800 font-bold'
                  : 'text-rose-700 hover:bg-rose-50'
              }`}
            >
              Missing ({missingSkills.length})
            </button>
          </div>
        )}
      </div>

      <CardBody className="p-5">
        {/* TAB 1: SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-6">
            {/* Matched Skills */}
            {(skillSubFilter === 'all' || skillSubFilter === 'matched') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Matched Skills ({filteredMatchedSkills.length})</span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Confirmed in Resume
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredMatchedSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl border border-emerald-200/70 bg-emerald-50/20 hover:bg-emerald-50/40 transition-colors flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5 pl-5">
                          {skill.category}
                        </span>
                        {skill.contextInResume && (
                          <span className="text-[10px] text-emerald-700 italic block mt-1 pl-5">
                            ✓ {skill.contextInResume}
                          </span>
                        )}
                      </div>

                      <div className="shrink-0">{getImportanceBadge(skill.importance)}</div>
                    </div>
                  ))}
                </div>

                {filteredMatchedSkills.length === 0 && (
                  <p className="text-center text-xs text-slate-400 py-4">
                    No matched skills matching your search query.
                  </p>
                )}
              </div>
            )}

            {/* Missing Skills */}
            {(skillSubFilter === 'all' || skillSubFilter === 'missing') && (
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Missing Skills ({filteredMissingSkills.length})</span>
                  </div>
                  <span className="text-[11px] text-rose-700 font-medium bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Recommended to Add
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {filteredMissingSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl border border-rose-200/70 bg-rose-50/25 hover:bg-rose-50/50 transition-colors flex items-start justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5 pl-5">
                          {skill.category}
                        </span>
                        <span className="text-[10px] text-rose-700 italic block mt-1 pl-5">
                          Missing from resume profile
                        </span>
                      </div>

                      <div className="shrink-0">{getImportanceBadge(skill.importance)}</div>
                    </div>
                  ))}
                </div>

                {filteredMissingSkills.length === 0 && (
                  <p className="text-center text-xs text-slate-400 py-4">
                    No missing skills matching your search query.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: KEYWORDS */}
        {activeTab === 'keywords' && (
          <div className="space-y-6">
            {/* Matched Keywords */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Matched Keywords ({filteredMatchedKeywords.length})</span>
                </div>
                <span className="text-[11px] text-emerald-700 font-medium">Found in Resume</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredMatchedKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-2xs hover:bg-emerald-100 transition-colors"
                  >
                    <Check className="w-3 h-3 text-emerald-600" />
                    {kw}
                  </span>
                ))}
              </div>

              {filteredMatchedKeywords.length === 0 && (
                <p className="text-xs text-slate-400 py-2">No matched keywords found.</p>
              )}
            </div>

            {/* Missing Keywords */}
            <div className="space-y-2.5 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>Missing Keywords ({filteredMissingKeywords.length})</span>
                </div>
                <span className="text-[11px] text-rose-700 font-medium">Found in Job Posting</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {filteredMissingKeywords.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs hover:bg-rose-100 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    {kw}
                  </span>
                ))}
              </div>

              {filteredMissingKeywords.length === 0 && (
                <p className="text-xs text-slate-400 py-2">No missing keywords found.</p>
              )}
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};
