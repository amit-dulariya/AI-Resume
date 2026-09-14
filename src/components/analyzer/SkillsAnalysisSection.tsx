import React, { useState } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertCircle,
  Tag,
  Search,
  Zap,
  TrendingUp,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { SkillItem, MissingSkillItem } from '../../data/analyzerMockData';

interface SkillsAnalysisSectionProps {
  skillsDetected: SkillItem[];
  missingSkills: MissingSkillItem[];
}

export const SkillsAnalysisSection: React.FC<SkillsAnalysisSectionProps> = ({
  skillsDetected,
  missingSkills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    ...Array.from(new Set(skillsDetected.map((s) => s.category))),
  ];

  const filteredSkills = skillsDetected.filter((skill) => {
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getPriorityBadge = (priority: MissingSkillItem['priority']) => {
    switch (priority) {
      case 'Critical':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            <Zap className="w-2.5 h-2.5 fill-rose-600 text-rose-600" />
            Critical
          </span>
        );
      case 'High':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            High Demand
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
            Recommended
          </span>
        );
    }
  };

  const getLevelBadge = (level: SkillItem['level']) => {
    switch (level) {
      case 'Expert':
        return <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.2 rounded">Expert</span>;
      case 'Advanced':
        return <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded">Advanced</span>;
      default:
        return <span className="text-[10px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">Proficient</span>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 3. Skills Detected Card */}
      <Card className="lg:col-span-7 border-slate-200/90 shadow-xs flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Skills Detected in Resume
                </h3>
                <p className="text-[11px] text-slate-500">
                  {skillsDetected.length} competencies extracted and classified by ATS algorithms
                </p>
              </div>
            </div>

            <div className="relative w-full sm:w-44">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter skills..."
                className="w-full pl-8 pr-3 py-1 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </CardHeader>

        <CardBody className="p-4 flex-1">
          {filteredSkills.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No skills match your filter.
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {filteredSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="group inline-flex items-center gap-2 bg-white border border-slate-200/90 hover:border-indigo-300 rounded-lg px-2.5 py-1.5 text-xs shadow-2xs transition-all hover:bg-indigo-50/20"
                >
                  <span className="font-semibold text-slate-900">{skill.name}</span>
                  {getLevelBadge(skill.level)}
                  <span className="text-[10px] text-slate-400 font-medium">
                    {skill.frequency}x
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardBody>
      </Card>

      {/* 4. Missing Skills Card */}
      <Card className="lg:col-span-5 border-slate-200/90 shadow-xs flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Missing High-Demand Skills
                </h3>
                <p className="text-[11px] text-slate-500">
                  {missingSkills.length} key competencies expected for this role level
                </p>
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Market Gaps
            </span>
          </div>
        </CardHeader>

        <CardBody className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[380px]">
          {missingSkills.map((missing) => (
            <div
              key={missing.id}
              className="p-3 rounded-xl border border-amber-200/60 bg-amber-50/30 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">{missing.name}</span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    • {missing.category}
                  </span>
                </div>
                {getPriorityBadge(missing.priority)}
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {missing.reason}
              </p>

              <div className="flex items-center gap-1 text-[10px] text-amber-800 font-semibold pt-0.5">
                <TrendingUp className="w-3 h-3" />
                <span>Found in {missing.demandPercentage}% of comparable job postings</span>
              </div>
            </div>
          ))}
        </CardBody>
      </Card>
    </div>
  );
};
