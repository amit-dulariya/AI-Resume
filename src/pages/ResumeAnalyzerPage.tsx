import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Upload,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Search,
  RotateCcw,
  Zap,
  BarChart3,
  ListChecks,
  AlertCircle,
  FileSearch,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { mockResumes, mockAnalysis } from '../data/mockData';
import { ATSCheckItem, FullATSAnalysisReport } from '../types/resume';
import { generateATSScoreReport } from '../utils/atsScoring';

// Subcomponents for the ATS Resume Scoring feature
import { ATSScoreOverview } from '../components/analyzer/ATSScoreOverview';
import { KeywordAnalysisSection } from '../components/analyzer/KeywordAnalysisSection';
import { ResumeStructureSection } from '../components/analyzer/ResumeStructureSection';
import { ImproveScoreRecommendations } from '../components/analyzer/ImproveScoreRecommendations';
import { JobDescriptionInput } from '../components/analyzer/JobDescriptionInput';

export const ResumeAnalyzerPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const urlResumeId = searchParams.get('id');
  const initialResume = mockResumes.find((r) => r.id === urlResumeId) || mockResumes[0];

  const [selectedResumeId, setSelectedResumeId] = useState(initialResume.id);
  const [jobDescriptionInput, setJobDescriptionInput] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(1);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'structure' | 'recommendations' | 'checklist'>('overview');

  // Currently selected resume object
  const selectedResume = mockResumes.find((r) => r.id === selectedResumeId) || mockResumes[0];

  // Full ATS Report State
  const [report, setReport] = useState<FullATSAnalysisReport | null>(() =>
    generateATSScoreReport(initialResume, '')
  );

  // When selected resume changes, re-run analysis automatically or update
  const handleResumeChange = (newResumeId: string) => {
    setSelectedResumeId(newResumeId);
    const targetResume = mockResumes.find((r) => r.id === newResumeId) || mockResumes[0];
    runAnalysisSimulation(targetResume, jobDescriptionInput);
  };

  const runAnalysisSimulation = (targetResume = selectedResume, jd = jobDescriptionInput) => {
    setIsScanning(true);
    setScanStep(1);

    const step2Timer = setTimeout(() => setScanStep(2), 300);
    const step3Timer = setTimeout(() => setScanStep(3), 600);
    const step4Timer = setTimeout(() => setScanStep(4), 900);

    const finishTimer = setTimeout(() => {
      const generated = generateATSScoreReport(targetResume, jd);
      setReport(generated);
      setIsScanning(false);
      setScanStep(1);
    }, 1100);

    return () => {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
      clearTimeout(finishTimer);
    };
  };

  const handleClearAnalysis = () => {
    setReport(null);
  };

  const categories = ['All', 'Formatting', 'Keywords', 'Impact', 'Length', 'Structure'];
  const legacyChecks = mockAnalysis.checks;
  const filteredChecks =
    filterCategory === 'All'
      ? legacyChecks
      : legacyChecks.filter((c) => c.category === filterCategory);

  const getStatusIcon = (status: ATSCheckItem['status']) => {
    if (status === 'passed') return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
    if (status === 'warning') return <AlertTriangle className="w-4 h-4 text-amber-500" />;
    return <XCircle className="w-4 h-4 text-rose-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              ATS Resume Scoring & Audit
            </h2>
            <Badge variant="brand" size="sm">
              ATS Engine v2.4
            </Badge>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time applicant tracking simulation, keyword density scoring, and section structure verification
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium hidden md:inline">Resume:</span>
            <select
              value={selectedResumeId}
              onChange={(e) => handleResumeChange(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 shadow-2xs cursor-pointer"
            >
              {mockResumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.targetRole})
                </option>
              ))}
            </select>
          </div>

          <Button
            size="sm"
            onClick={() => runAnalysisSimulation()}
            isLoading={isScanning}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            className="bg-indigo-600 hover:bg-indigo-700 text-xs font-semibold cursor-pointer shadow-xs"
          >
            {report ? 'Re-Analyze' : 'Analyze Resume'}
          </Button>

          {report && (
            <button
              type="button"
              onClick={handleClearAnalysis}
              className="text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2.5 py-2 rounded-lg transition-colors cursor-pointer"
              title="Reset report to empty state"
            >
              Clear
            </button>
          )}

          <Link to={`/builder?id=${selectedResumeId}`}>
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              icon={<ExternalLink className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              Open Builder
            </Button>
          </Link>
        </div>
      </div>

      {/* Optional Job Description Input */}
      <JobDescriptionInput
        value={jobDescriptionInput}
        onChange={setJobDescriptionInput}
        onAnalyze={() => runAnalysisSimulation()}
        isLoading={isScanning}
      />

      {/* Loading State Animation */}
      {isScanning && (
        <Card className="p-8 border-indigo-200 bg-gradient-to-b from-indigo-50/40 to-white text-center">
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-200 animate-ping opacity-25" />
              <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
              <Sparkles className="w-6 h-6 text-indigo-600 absolute" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Evaluating ATS Compatibility...
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {scanStep === 1 && 'Step 1/4: Parsing semantic resume structure and section taxonomy...'}
                {scanStep === 2 && 'Step 2/4: Cross-referencing technical skills against ATS keyword taxonomies...'}
                {scanStep === 3 && 'Step 3/4: Quantifying bullet action metrics and experience relevance...'}
                {scanStep === 4 && 'Step 4/4: Formulating prioritized score optimization recommendations...'}
              </p>
            </div>

            {/* Stepped progress dots */}
            <div className="flex justify-center items-center gap-2 pt-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    scanStep >= step ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Empty State */}
      {!isScanning && !report && (
        <Card className="p-8">
          <EmptyState
            icon={<FileSearch className="w-6 h-6 text-indigo-600" />}
            title="No ATS Score Generated"
            description={`Ready to analyze "${selectedResume.title}" against industry applicant tracking systems. Add an optional job description or click below to start.`}
            actionLabel="Run ATS Scoring Now"
            onAction={() => runAnalysisSimulation()}
          />
        </Card>
      )}

      {/* Results State */}
      {!isScanning && report && (
        <div className="space-y-6">
          {/* Main ATS Score Overview Component */}
          <ATSScoreOverview
            breakdown={report.scoreBreakdown}
            summaryVerdict={report.summaryVerdict}
            targetRole={report.targetRole}
          />

          {/* Navigation Sub-Tabs for Fast Section Jumping */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'overview'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              Full ATS Dashboard
            </button>

            <button
              onClick={() => setActiveTab('keywords')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'keywords'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Keywords ({report.keywordAnalysis.matchedKeywords.length}/{report.keywordAnalysis.matchedKeywords.length + report.keywordAnalysis.missingKeywords.length})
            </button>

            <button
              onClick={() => setActiveTab('structure')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'structure'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Structure ({report.structureChecks.filter((s) => s.status === 'Good').length}/7 Good)
            </button>

            <button
              onClick={() => setActiveTab('recommendations')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'recommendations'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
              Recommendations ({report.recommendations.length})
            </button>

            <button
              onClick={() => setActiveTab('checklist')}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shrink-0 ${
                activeTab === 'checklist'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <ListChecks className="w-3.5 h-3.5 text-slate-400" />
              ATS Criteria Checklist
            </button>
          </div>

          {/* Section 1: Recommendations ("Improve Your ATS Score") */}
          {(activeTab === 'overview' || activeTab === 'recommendations') && (
            <ImproveScoreRecommendations
              recommendations={report.recommendations}
              resumeId={selectedResumeId}
            />
          )}

          {/* Section 2: Keyword Analysis */}
          {(activeTab === 'overview' || activeTab === 'keywords') && (
            <KeywordAnalysisSection data={report.keywordAnalysis} />
          )}

          {/* Section 3: Resume Structure */}
          {(activeTab === 'overview' || activeTab === 'structure') && (
            <ResumeStructureSection checks={report.structureChecks} />
          )}

          {/* Section 4: Legacy / Detailed ATS Verification Checklist */}
          {(activeTab === 'overview' || activeTab === 'checklist') && (
            <Card className="border-slate-200/90 shadow-xs">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-slate-700" />
                  <h3 className="font-bold text-sm text-slate-900">
                    Comprehensive ATS Verification Checklist
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilterCategory(cat)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                        filterCategory === cat
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </CardHeader>

              <CardBody className="divide-y divide-slate-100 p-0">
                {filteredChecks.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 flex items-start gap-3 hover:bg-slate-50/60 transition-colors"
                  >
                    <div className="mt-0.5 shrink-0">{getStatusIcon(item.status)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-xs text-slate-900">{item.title}</h5>
                        <Badge variant="neutral" size="sm">
                          {item.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                      {item.suggestion && (
                        <p className="text-[11px] text-amber-800 bg-amber-50/80 px-2.5 py-1 rounded border border-amber-200/60 mt-1.5">
                          <strong>Suggestion:</strong> {item.suggestion}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
