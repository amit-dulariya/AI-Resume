import React from 'react';
import {
  Layers,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Info,
  Sliders,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../common/Card';
import { FormattingCheckItem } from '../../data/analyzerMockData';

interface FormattingAuditSectionProps {
  formattingIssues: FormattingCheckItem[];
}

export const FormattingAuditSection: React.FC<FormattingAuditSectionProps> = ({
  formattingIssues,
}) => {
  const passedCount = formattingIssues.filter((i) => i.status === 'passed').length;
  const warningCount = formattingIssues.filter((i) => i.status === 'warning').length;
  const failedCount = formattingIssues.filter((i) => i.status === 'failed').length;

  const getStatusIcon = (status: FormattingCheckItem['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-rose-600" />;
    }
  };

  const getStatusBadge = (status: FormattingCheckItem['status']) => {
    switch (status) {
      case 'passed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Passed
          </span>
        );
      case 'warning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Warning
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
            Failed
          </span>
        );
    }
  };

  return (
    <Card className="border-slate-200/90 shadow-xs">
      <CardHeader className="pb-3 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Formatting & ATS Layout Health
            </h3>
            <p className="text-[11px] text-slate-500">
              Ensures your PDF avoids formatting traps that cause automated rejection by ATS engines
            </p>
          </div>
        </div>

        {/* Quick summary badges */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/70">
            {passedCount} Passed
          </span>
          {warningCount > 0 && (
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/70">
              {warningCount} Warning
            </span>
          )}
          {failedCount > 0 && (
            <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200/70">
              {failedCount} Failed
            </span>
          )}
        </div>
      </CardHeader>

      <CardBody className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {formattingIssues.map((check) => {
            const isWarning = check.status === 'warning';
            const isFailed = check.status === 'failed';

            return (
              <div
                key={check.id}
                className={`p-3.5 rounded-xl border transition-all ${
                  isFailed
                    ? 'border-rose-200 bg-rose-50/20'
                    : isWarning
                    ? 'border-amber-200 bg-amber-50/20'
                    : 'border-slate-200/80 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(check.status)}
                    <h4 className="text-xs font-bold text-slate-900">{check.name}</h4>
                  </div>
                  {getStatusBadge(check.status)}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-1">
                  {check.description}
                </p>

                <p className="text-[11px] text-slate-400">
                  {check.details}
                </p>

                {check.tip && (
                  <div className="mt-2 text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 rounded-lg p-2 font-medium">
                    💡 <span className="font-semibold">Recommendation:</span> {check.tip}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};
