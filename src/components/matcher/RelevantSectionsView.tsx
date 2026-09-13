import React from 'react';
import {
  FileText,
  Briefcase,
  Cpu,
  GraduationCap,
  FolderGit2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { SectionRelevanceItem } from '../../types/resume';

interface RelevantSectionsViewProps {
  sections: SectionRelevanceItem[];
}

export const RelevantSectionsView: React.FC<RelevantSectionsViewProps> = ({ sections }) => {
  const getSectionIcon = (name: string) => {
    switch (name) {
      case 'Work Experience':
        return Briefcase;
      case 'Technical Skills':
        return Cpu;
      case 'Projects & Portfolio':
        return FolderGit2;
      case 'Education & Accreditations':
        return GraduationCap;
      default:
        return FileText;
    }
  };

  const getStatusBadge = (status: SectionRelevanceItem['status']) => {
    switch (status) {
      case 'Strong Alignment':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Strong Alignment
          </span>
        );
      case 'Moderate Alignment':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Moderate Alignment
          </span>
        );
      case 'Needs Tailoring':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" />
            Needs Tailoring
          </span>
        );
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-600" />
            <h3 className="font-bold text-sm text-slate-900">
              Relevant Resume Sections
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Section-by-section alignment
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">
          Evaluate how each individual section of your resume stands up to the target job requirements
        </p>
      </CardHeader>

      <CardBody className="p-5 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((sec) => {
            const Icon = getSectionIcon(sec.sectionName);

            return (
              <div
                key={sec.id}
                className="bg-slate-50/50 rounded-xl border border-slate-200/80 p-4.5 hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Section Title & Score */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {sec.sectionName}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-slate-900 rounded-full"
                              style={{ width: `${sec.relevanceScore}%` }}
                            />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600">
                            {sec.relevanceScore}%
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0">{getStatusBadge(sec.status)}</div>
                  </div>

                  {/* Matching Highlights */}
                  <div className="space-y-1.5 my-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Key Highlights Mapped:
                    </span>
                    <ul className="space-y-1">
                      {sec.matchingHighlights.map((hl, i) => (
                        <li
                          key={i}
                          className="text-xs text-slate-600 flex items-start gap-1.5 leading-snug"
                        >
                          <span className="text-indigo-600 font-bold mt-0.5">•</span>
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="mt-3 pt-3 border-t border-slate-200/70 bg-white/70 -mx-1.5 -mb-1.5 px-3 py-2 rounded-lg flex items-start gap-2 text-xs">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-[11px] leading-relaxed">
                    <strong className="text-slate-900">Tailoring Tip:</strong> {sec.recommendation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
