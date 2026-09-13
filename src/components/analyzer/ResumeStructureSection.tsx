import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Mail,
  FileText,
  GraduationCap,
  Briefcase,
  Cpu,
  FolderGit2,
  Award,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { StructureCheck, StructureSectionStatus } from '../../types/resume';

interface ResumeStructureSectionProps {
  checks: StructureCheck[];
}

export const ResumeStructureSection: React.FC<ResumeStructureSectionProps> = ({ checks }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | StructureSectionStatus>('All');

  const getSectionIcon = (section: StructureCheck['section']) => {
    switch (section) {
      case 'Contact Information':
        return Mail;
      case 'Summary':
        return FileText;
      case 'Education':
        return GraduationCap;
      case 'Experience':
        return Briefcase;
      case 'Skills':
        return Cpu;
      case 'Projects':
        return FolderGit2;
      case 'Certifications':
        return Award;
      default:
        return FileText;
    }
  };

  const getStatusBadge = (status: StructureSectionStatus) => {
    switch (status) {
      case 'Good':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Good
          </span>
        );
      case 'Needs Improvement':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-300">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            Needs Improvement
          </span>
        );
      case 'Missing':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-800 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Missing
          </span>
        );
    }
  };

  const goodCount = checks.filter((c) => c.status === 'Good').length;
  const needsImpCount = checks.filter((c) => c.status === 'Needs Improvement').length;
  const missingCount = checks.filter((c) => c.status === 'Missing').length;

  const filteredChecks = filter === 'All' ? checks : checks.filter((c) => c.status === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-sm text-slate-900">Resume Structure Verification</h3>
            <span className="text-xs text-slate-400 font-medium">
              ({goodCount} of {checks.length} sections optimal)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            ATS parsing engines require standardized section taxonomy and consistent hierarchies
          </p>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <button
            onClick={() => setFilter('All')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filter === 'All'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
            }`}
          >
            All ({checks.length})
          </button>
          <button
            onClick={() => setFilter('Good')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filter === 'Good'
                ? 'bg-emerald-700 text-white'
                : 'text-emerald-700 hover:bg-emerald-50 bg-emerald-50/50'
            }`}
          >
            Good ({goodCount})
          </button>
          <button
            onClick={() => setFilter('Needs Improvement')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filter === 'Needs Improvement'
                ? 'bg-amber-600 text-white'
                : 'text-amber-700 hover:bg-amber-50 bg-amber-50/50'
            }`}
          >
            Needs Improvement ({needsImpCount})
          </button>
          <button
            onClick={() => setFilter('Missing')}
            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
              filter === 'Missing'
                ? 'bg-rose-600 text-white'
                : 'text-rose-700 hover:bg-rose-50 bg-rose-50/50'
            }`}
          >
            Missing ({missingCount})
          </button>
        </div>
      </CardHeader>

      <CardBody className="p-0 divide-y divide-slate-100">
        {filteredChecks.map((item) => {
          const Icon = getSectionIcon(item.section);
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="p-4 sm:p-5 hover:bg-slate-50/70 transition-colors"
            >
              <div
                className="flex items-start justify-between gap-3 cursor-pointer select-none"
                onClick={() => toggleExpand(item.id)}
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      item.status === 'Good'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : item.status === 'Needs Improvement'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-sm text-slate-900">{item.section}</h4>
                      {getStatusBadge(item.status)}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className="p-1 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
                  aria-label={isExpanded ? 'Collapse section details' : 'Expand section details'}
                >
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Collapsible Details */}
              {isExpanded && (
                <div className="mt-3.5 pl-12 space-y-2.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-500 uppercase text-[10px] tracking-wider block">
                      Parser Diagnostics:
                    </span>
                    <ul className="space-y-1">
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} className="text-slate-700 flex items-start gap-2">
                          <span className="text-slate-400 font-bold">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {item.recommendation && (
                    <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3 text-amber-900 text-xs mt-2">
                      <strong className="font-semibold text-amber-950">Actionable Fix: </strong>
                      {item.recommendation}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredChecks.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No sections found with status "{filter}".
          </div>
        )}
      </CardBody>
    </Card>
  );
};
