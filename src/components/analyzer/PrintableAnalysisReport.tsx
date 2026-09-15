import React from 'react';
import { ComprehensiveAnalysisResult } from '../../data/analyzerMockData';
import {
  FileText,
  Sparkles,
  Award,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Cpu,
  Layers,
  FileEdit,
  Tag,
  TrendingUp,
} from 'lucide-react';

interface PrintableAnalysisReportProps {
  analysis: ComprehensiveAnalysisResult;
}

export const PrintableAnalysisReport: React.FC<PrintableAnalysisReportProps> = ({ analysis }) => {
  const {
    fileInfo,
    targetRole,
    overallScore,
    overallVerdict,
    atsCompatibilityScore,
    atsBreakdown,
    skillsDetected = [],
    missingSkills = [],
    strengths = [],
    weaknesses = [],
    formattingIssues = [],
    contentSuggestions = [],
    keywordSuggestions = [],
    companyAnalysis,
  } = analysis;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      id="analyzer-printable-report"
      className="hidden print:block bg-white text-slate-900 font-sans text-xs leading-normal p-6"
    >
      {/* 1. Report Header & Document Identification */}
      <div className="border-b-2 border-slate-900 pb-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              ResumeAI
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-sm font-semibold text-slate-700">
              ATS Resume Audit & Optimization Report
            </span>
          </div>
          <div className="text-right text-[10px] text-slate-500">
            <span>Date: {currentDate}</span>
            <span className="mx-1.5">•</span>
            <span>Standard ATS Specification</span>
          </div>
        </div>

        {/* Target File Info Banner */}
        <div className="mt-3 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Evaluated Document
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5 flex items-center gap-2">
              <span>{fileInfo.name}</span>
              <span className="text-[10px] font-normal text-slate-500">
                ({fileInfo.formattedSize} • {fileInfo.type})
              </span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Target Position
            </div>
            <div className="text-sm font-bold text-indigo-900 mt-0.5">
              {targetRole || 'Software Professional'}
            </div>
            {companyAnalysis && (
              <div className="text-[11px] font-semibold text-indigo-700 mt-0.5">
                Target Company: {companyAnalysis.companyName} ({companyAnalysis.companyScore}/100)
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Optional Company-Specific Audit Section in Print */}
      {companyAnalysis && (
        <div className="print-avoid-break mb-6 border border-indigo-200 rounded-lg p-4 bg-indigo-50/20">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-indigo-200">
            <div>
              <span className="text-xs uppercase font-extrabold text-indigo-950 tracking-wider">
                Target Company Analysis: {companyAnalysis.companyName}
              </span>
              <p className="text-[11px] text-slate-600">
                Tailored benchmark against {companyAnalysis.companyName}'s hiring rubrics
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-indigo-700">{companyAnalysis.companyScore}</span>
              <span className="text-xs text-slate-500 font-medium"> / 100</span>
              <div className="text-[10px] font-bold text-emerald-700">{companyAnalysis.selectionReadinessLevel}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div>
              <span className="font-bold text-slate-800 block mb-1">Missing / High-Priority Skills:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {companyAnalysis.missingSkills.map((m, i) => (
                  <li key={i}>
                    <strong>{m.name}</strong> ({m.priority} Priority) - {m.recommendation}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-800 block mb-1">Recommended Projects / Certifications:</span>
              <ul className="list-disc pl-4 space-y-0.5 text-slate-700">
                {companyAnalysis.recommendedProjectsAndCertifications.map((r, i) => (
                  <li key={i}>
                    <strong>{r.title}</strong>: {r.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 2 & 3. Overall Score & ATS Compatibility Section */}
      <div className="print-avoid-break mb-6">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center gap-1.5">
          <span>Executive Scores & Parser Compatibility</span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Overall Resume Score */}
          <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-700 text-xs">Overall Resume Score</span>
              <span className="text-xs font-extrabold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                Grade: {overallVerdict.grade}
              </span>
            </div>
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-black text-slate-900 tracking-tight">
                {overallScore}
              </span>
              <span className="text-xs text-slate-500 font-medium">/ 100</span>
              <span className="text-xs font-semibold text-indigo-700 ml-auto">
                {overallVerdict.label} ({overallVerdict.percentile})
              </span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed bg-white p-2 rounded border border-slate-100">
              {overallVerdict.summary}
            </p>
          </div>

          {/* ATS Compatibility Score */}
          <div className="p-3.5 border border-slate-200 rounded-lg bg-slate-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-slate-700 text-xs">ATS Compatibility Index</span>
              <span className="text-base font-black text-slate-900">
                {atsCompatibilityScore} <span className="text-xs text-slate-500 font-normal">/ 100</span>
              </span>
            </div>

            <div className="space-y-1.5 mt-2">
              {[
                { label: 'Machine Readability', val: atsBreakdown.machineReadability },
                { label: 'Heading Hierarchy', val: atsBreakdown.headingHierarchy },
                { label: 'Contact Extraction', val: atsBreakdown.contactExtraction },
                { label: 'Layout Cleanliness', val: atsBreakdown.layoutCleanliness },
                { label: 'Keyword Placement', val: atsBreakdown.keywordPlacement },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-600">{item.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-slate-800 h-full rounded-full"
                        style={{ width: `${item.val}%` }}
                      />
                    </div>
                    <span className="font-bold text-slate-800 w-7 text-right">{item.val}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 & 5. Skills Detected & Missing Skills */}
      <div className="print-avoid-break mb-6">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center justify-between">
          <span>Skills Analysis</span>
          <span className="text-[10px] font-normal text-slate-500 lowercase">
            {skillsDetected.length} detected • {missingSkills.length} missing
          </span>
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Detected Skills */}
          <div className="p-3 border border-slate-200 rounded-lg">
            <h3 className="text-xs font-bold text-slate-900 mb-2">
              Detected Skills in Resume ({skillsDetected.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skillsDetected.length > 0 ? (
                skillsDetected.map((sk) => (
                  <span
                    key={sk.id}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-800 rounded border border-slate-200 text-[11px] font-medium"
                  >
                    <span>{sk.name}</span>
                    <span className="text-[9px] text-slate-500 font-semibold">({sk.level})</span>
                  </span>
                ))
              ) : (
                <span className="text-slate-500 text-xs italic">No skills detected.</span>
              )}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="p-3 border border-amber-200 bg-amber-50/30 rounded-lg">
            <h3 className="text-xs font-bold text-amber-950 mb-2">
              Critical Missing Skills ({missingSkills.length})
            </h3>
            <div className="space-y-2">
              {missingSkills.slice(0, 5).map((m) => (
                <div key={m.id} className="text-[11px] border-b border-amber-100 pb-1.5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{m.name}</span>
                    <span className="text-[9px] font-bold text-amber-800 uppercase px-1.5 py-0.2 bg-amber-100 rounded">
                      {m.priority} Priority ({m.demandPercentage}% demand)
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-600 mt-0.5">{m.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Strengths and Weaknesses */}
      <div className="print-avoid-break mb-6">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200">
          Strengths & Critical Weaknesses
        </h2>

        <div className="grid grid-cols-2 gap-4">
          {/* Strengths */}
          <div className="p-3 border border-emerald-200 bg-emerald-50/20 rounded-lg space-y-2.5">
            <h3 className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
              <span>Key Strengths ({strengths.length})</span>
            </h3>
            {strengths.map((st) => (
              <div key={st.id} className="text-[11px]">
                <div className="flex items-center gap-1 font-bold text-emerald-950">
                  <span>✓ {st.title}</span>
                  <span className="text-[9px] text-emerald-700 bg-emerald-100 px-1 py-0.2 rounded font-normal">
                    {st.category}
                  </span>
                </div>
                {st.highlight && (
                  <div className="text-[10px] font-semibold text-emerald-800 mt-0.5">
                    Highlight: "{st.highlight}"
                  </div>
                )}
                <p className="text-[10px] text-slate-600 mt-0.5">{st.description}</p>
              </div>
            ))}
          </div>

          {/* Weaknesses */}
          <div className="p-3 border border-rose-200 bg-rose-50/20 rounded-lg space-y-2.5">
            <h3 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
              <span>Areas for Improvement ({weaknesses.length})</span>
            </h3>
            {weaknesses.map((w) => (
              <div key={w.id} className="text-[11px]">
                <div className="flex items-center gap-1 font-bold text-rose-950">
                  <span>⚠ {w.title}</span>
                  <span className="text-[9px] text-rose-700 bg-rose-100 px-1 py-0.2 rounded font-normal uppercase">
                    {w.severity} Severity
                  </span>
                </div>
                <p className="text-[10px] text-slate-600 mt-0.5">{w.description}</p>
                <div className="text-[10px] font-semibold text-rose-800 mt-0.5 bg-white p-1 rounded border border-rose-100">
                  Fix: {w.fixRecommendation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 7. Formatting Issues */}
      <div className="print-avoid-break mb-6">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200">
          Formatting & Parser Readability Checks ({formattingIssues.length})
        </h2>

        <div className="grid grid-cols-2 gap-3">
          {formattingIssues.map((fmt) => (
            <div key={fmt.id} className="p-2.5 border border-slate-200 rounded-lg text-[11px]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{fmt.name}</span>
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                    fmt.status === 'passed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : fmt.status === 'failed'
                      ? 'bg-rose-100 text-rose-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {fmt.status}
                </span>
              </div>
              <p className="text-slate-600 text-[10px]">{fmt.description}</p>
              {fmt.tip && (
                <p className="text-indigo-900 text-[9px] mt-1 font-medium bg-slate-50 p-1 rounded">
                  Tip: {fmt.tip}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 8. Content Improvements */}
      <div className="print-avoid-break mb-6">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center justify-between">
          <span>Actionable Content Improvements & Rewrites</span>
          <span className="text-[10px] font-normal text-slate-500 lowercase">
            {contentSuggestions.length} suggestions
          </span>
        </h2>

        <div className="space-y-3">
          {contentSuggestions.map((sug) => (
            <div key={sug.id} className="p-3 border border-slate-200 rounded-lg bg-slate-50/40 text-[11px]">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-slate-900">
                  {sug.section}: {sug.title}
                </span>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  Boost: +{sug.scoreBoost} ({sug.priority} Priority)
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mb-2">Issue: {sug.issue}</p>

              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 bg-rose-50/50 border border-rose-100 rounded">
                  <span className="font-bold text-rose-800 block mb-0.5">Original Phrasing:</span>
                  <span className="text-slate-700 italic">"{sug.originalText}"</span>
                </div>
                <div className="p-2 bg-emerald-50/50 border border-emerald-100 rounded">
                  <span className="font-bold text-emerald-800 block mb-0.5">Recommended AI Rewrite:</span>
                  <span className="text-slate-800 font-medium">"{sug.improvedText}"</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 9. Important Keywords */}
      <div className="print-avoid-break mb-4">
        <h2 className="text-xs uppercase font-extrabold text-slate-800 tracking-wider mb-2.5 pb-1 border-b border-slate-200 flex items-center justify-between">
          <span>ATS Keyword Optimization Matrix</span>
          <span className="text-[10px] font-normal text-slate-500 lowercase">
            {keywordSuggestions.length} keywords evaluated
          </span>
        </h2>

        <table className="w-full text-left text-[10px] border-collapse">
          <thead>
            <tr className="border-b border-slate-300 text-slate-600 font-bold bg-slate-100">
              <th className="py-1.5 px-2">Keyword</th>
              <th className="py-1.5 px-2">Category</th>
              <th className="py-1.5 px-2">Status</th>
              <th className="py-1.5 px-2">Importance</th>
              <th className="py-1.5 px-2">Recommended Section</th>
              <th className="py-1.5 px-2">Placement Advice</th>
            </tr>
          </thead>
          <tbody>
            {keywordSuggestions.map((kw) => (
              <tr key={kw.id} className="border-b border-slate-200">
                <td className="py-1.5 px-2 font-bold text-slate-900">{kw.keyword}</td>
                <td className="py-1.5 px-2 text-slate-600">{kw.category}</td>
                <td className="py-1.5 px-2">
                  <span
                    className={`font-semibold px-1 py-0.2 rounded text-[9px] ${
                      kw.matched
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {kw.matched ? `Found (${kw.frequency}x)` : 'Missing'}
                  </span>
                </td>
                <td className="py-1.5 px-2 font-medium text-slate-700">{kw.importance}</td>
                <td className="py-1.5 px-2 text-slate-700">{kw.recommendedPlacement}</td>
                <td className="py-1.5 px-2 text-slate-500 text-[9px]">{kw.tip}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Report Footer */}
      <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[9px] text-slate-400">
        <span>Generated by ResumeAI • Validated for modern enterprise ATS engines</span>
        <span>Page 1 of Analysis Report</span>
      </div>
    </div>
  );
};
