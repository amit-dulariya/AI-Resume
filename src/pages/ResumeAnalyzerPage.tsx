import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  FileText,
  RotateCcw,
  Printer,
  Upload,
  Layout,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Layers,
  FileEdit,
  Tag,
  AlertCircle,
  RefreshCw,
  XCircle,
  Zap,
  Building2,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import {
  UploadedFileInfo,
  ComprehensiveAnalysisResult,
} from '../data/analyzerMockData';
import { generateLocalAtsAnalysis } from '../utils/localAtsEngine';
import { saveAnalysisToFirestore } from '../lib/firestoreService';
import { getStoredUser } from '../utils/auth';

// Subcomponents for the modular AI Resume Analyzer
import { PDFUploadDropzone } from '../components/analyzer/PDFUploadDropzone';
import { ScoresVerdictSection } from '../components/analyzer/ScoresVerdictSection';
import { SkillsAnalysisSection } from '../components/analyzer/SkillsAnalysisSection';
import { StrengthsWeaknessesSection } from '../components/analyzer/StrengthsWeaknessesSection';
import { FormattingAuditSection } from '../components/analyzer/FormattingAuditSection';
import { ContentSuggestionsSection } from '../components/analyzer/ContentSuggestionsSection';
import { KeywordSuggestionsSection } from '../components/analyzer/KeywordSuggestionsSection';
import { PrintableAnalysisReport } from '../components/analyzer/PrintableAnalysisReport';
import { CompanySelector } from '../components/analyzer/CompanySelector';
import { CompanyAnalysisDashboard } from '../components/analyzer/CompanyAnalysisDashboard';

type ActiveSectionTab =
  | 'all'
  | 'company'
  | 'scores'
  | 'skills'
  | 'strengths_weaknesses'
  | 'formatting'
  | 'content'
  | 'keywords';

export const ResumeAnalyzerPage: React.FC = () => {
  const [stagedFile, setStagedFile] = useState<UploadedFileInfo | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>('Google');
  const [analysisResult, setAnalysisResult] = useState<ComprehensiveAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<ActiveSectionTab>('all');

  const handleSelectFile = (fileInfo: UploadedFileInfo) => {
    setStagedFile(fileInfo);
    setAnalysisResult(null);
    setError(null);
  };

  const handleClearFile = () => {
    setStagedFile(null);
    setAnalysisResult(null);
    setError(null);
    setIsAnalyzing(false);
  };

  const handleResetToUpload = () => {
    setStagedFile(null);
    setAnalysisResult(null);
    setError(null);
    setIsAnalyzing(false);
    setActiveSection('all');
  };

  const handleAnalyzeResume = async () => {
    if (!stagedFile) return;

    setError(null);
    setIsAnalyzing(true);
    setAnalysisStep(1);

    // Timers for natural progress visualization while waiting for Gemini
    const step2Timer = setTimeout(() => setAnalysisStep(2), 700);
    const step3Timer = setTimeout(() => setAnalysisStep(3), 1600);
    const step4Timer = setTimeout(() => setAnalysisStep(4), 2500);

    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: stagedFile.name,
          fileSize: stagedFile.size,
          formattedSize: stagedFile.formattedSize,
          resumeText: stagedFile.extractedText || '',
          resumeBase64: stagedFile.base64 || '',
          companyName: selectedCompany || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to complete resume analysis.');
      }

      setAnalysisResult(data as ComprehensiveAnalysisResult);

      // Save structured analysis to Firestore resumeAnalyses collection
      const user = getStoredUser();
      if (user?.id) {
        saveAnalysisToFirestore({
          userId: user.id,
          resumeId: `res-${Date.now()}`,
          resumeName: stagedFile.name.replace(/\.[^/.]+$/, ''),
          companyName: selectedCompany || 'General ATS Scan',
          targetRole: (data as ComprehensiveAnalysisResult).targetRole || 'Target Candidate Profile',
          analysisResult: data as ComprehensiveAnalysisResult,
          scanType: selectedCompany ? 'Company Specific' : 'ATS Scan',
        }).catch((saveErr) => {
          console.warn('Could not save analysis to Firestore:', saveErr);
        });
      }
    } catch (err: any) {
      console.error('Gemini Analysis Failed:', err);
      setError(
        err?.message ||
          'Failed to connect to the Gemini API. Please check your network connection and API key configuration.'
      );
    } finally {
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
      clearTimeout(step4Timer);
      setIsAnalyzing(false);
      setAnalysisStep(1);
    }
  };

  const handleRunLocalAnalysis = () => {
    if (!stagedFile) return;
    setError(null);
    setIsAnalyzing(false);
    const result = generateLocalAtsAnalysis({
      fileName: stagedFile.name,
      resumeText: stagedFile.extractedText || '',
      companyName: selectedCompany || undefined,
      fileSize: stagedFile.size,
      formattedSize: stagedFile.formattedSize,
    });
    setAnalysisResult(result);

    const user = getStoredUser();
    if (user?.id) {
      saveAnalysisToFirestore({
        userId: user.id,
        resumeId: `res-${Date.now()}`,
        resumeName: stagedFile.name.replace(/\.[^/.]+$/, ''),
        companyName: selectedCompany || 'Local ATS Diagnostic',
        targetRole: result.targetRole || 'Target Candidate Profile',
        analysisResult: result,
        scanType: selectedCompany ? 'Company Specific' : 'ATS Scan',
      }).catch((saveErr) => {
        console.warn('Could not save local analysis to Firestore:', saveErr);
      });
    }
  };

  const getStepLabel = (step: number) => {
    switch (step) {
      case 1:
        return 'Extracting resume text layers and structure...';
      case 2:
        return 'Evaluating ATS compatibility and Taleo/Workday parser rules...';
      case 3:
        return 'Connecting to Gemini AI for deep skills gap & keyword analysis...';
      case 4:
        return 'Synthesizing recommendations, strengths & bullet rewrites...';
      default:
        return 'Compiling comprehensive ATS audit report...';
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      try {
        window.focus();
        window.print();
      } catch (err) {
        console.error('Failed to trigger native print dialog:', err);
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Interactive Screen UI (Hidden during print) */}
      <div className="space-y-6 print:hidden">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                AI Resume Analyzer
              </h1>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                <Sparkles className="w-3 h-3 text-indigo-600" />
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Upload your resume in PDF format for deep ATS compatibility scoring, skills gap analysis, and content improvements.
            </p>
          </div>

          {/* Top Action Bar when result exists */}
          {analysisResult && (
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToUpload}
                className="bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 mr-1.5" />
                Analyze Another Resume
              </Button>
              <Button
                id="analyzer-print-btn"
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="inline-flex items-center bg-white border-slate-200 hover:bg-slate-50 text-slate-700 shadow-2xs cursor-pointer"
                title="Print Analysis Report"
              >
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Print
              </Button>
            </div>
          )}
        </div>

      {/* Error and Retry State */}
      {error && !isAnalyzing && (
        <Card className="p-6 bg-rose-50/70 border-rose-200 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-900">
                  Analysis Encountered an Issue
                </h3>
                <p className="text-xs text-rose-700 mt-1 max-w-xl leading-relaxed">
                  {error}
                </p>
                {stagedFile && (
                  <p className="text-[11px] text-rose-600/80 mt-1 font-medium">
                    Target file: {stagedFile.name} ({stagedFile.formattedSize})
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetToUpload}
                className="w-full sm:w-auto bg-white border-rose-200 hover:bg-rose-50 text-rose-800"
              >
                Choose Another PDF
              </Button>
              {stagedFile && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRunLocalAnalysis}
                    className="w-full sm:w-auto bg-white border-amber-300 hover:bg-amber-50 text-amber-900"
                  >
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                    Analyze with ATS Parser
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAnalyzeResume}
                    className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                    Retry Gemini AI
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      )}

      {/* STATE 1: Empty / Upload State */}
      {!analysisResult && !isAnalyzing && (
        <div className="space-y-4">
          <CompanySelector
            selectedCompany={selectedCompany}
            onSelectCompany={setSelectedCompany}
          />
          <PDFUploadDropzone
            stagedFile={stagedFile}
            onSelectFile={handleSelectFile}
            onClearFile={handleClearFile}
            onAnalyze={handleAnalyzeResume}
            isAnalyzing={isAnalyzing}
          />
        </div>
      )}

      {/* STATE 2: Loading / Analysis State */}
      {isAnalyzing && stagedFile && (
        <Card className="p-8 sm:p-12 text-center bg-white border-slate-200 shadow-sm max-w-xl mx-auto my-6">
          <div className="flex flex-col items-center">
            {/* Animated Radar / Pulsing Ring */}
            <div className="relative w-20 h-20 mb-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-100 animate-ping opacity-60" />
              <div className="absolute inset-1 rounded-full border-4 border-indigo-200 animate-pulse" />
              <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200 z-10">
                <Sparkles className="w-7 h-7 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
              Analyzing with Gemini AI
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium truncate max-w-sm">
              Evaluating: <strong className="text-slate-800">{stagedFile.name}</strong> ({stagedFile.formattedSize})
            </p>

            {/* Stepped Progress Bar */}
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(analysisStep / 4) * 100}%` }}
              />
            </div>

            {/* Step Message */}
            <div className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping shrink-0" />
              <span>{getStepLabel(analysisStep)}</span>
            </div>

            <div className="grid grid-cols-4 gap-2 w-full mt-6 text-[10px] text-slate-400 font-medium">
              <div className={`text-center ${analysisStep >= 1 ? 'text-indigo-600 font-bold' : ''}`}>
                1. Extraction
              </div>
              <div className={`text-center ${analysisStep >= 2 ? 'text-indigo-600 font-bold' : ''}`}>
                2. ATS Rules
              </div>
              <div className={`text-center ${analysisStep >= 3 ? 'text-indigo-600 font-bold' : ''}`}>
                3. Gemini Audit
              </div>
              <div className={`text-center ${analysisStep >= 4 ? 'text-indigo-600 font-bold' : ''}`}>
                4. Final Report
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* STATE 3: Professional Analysis Results Interface */}
      {analysisResult && !isAnalyzing && (
        <div className="space-y-6">
          {/* File Meta Banner */}
          <div className="p-4 bg-white border border-slate-200/90 rounded-2xl shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {analysisResult.fileInfo.name}
                  </h3>
                  {analysisResult.isFallback ? (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-300 shrink-0 flex items-center gap-1">
                      <Zap className="w-2.5 h-2.5 text-amber-600" />
                      ATS Rules Engine
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/80 shrink-0 flex items-center gap-1">
                      <Sparkles className="w-2.5 h-2.5" />
                      Gemini Analyzed
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                  <span>{analysisResult.fileInfo.formattedSize}</span>
                  <span>•</span>
                  <span>{analysisResult.fileInfo.type}</span>
                  <span>•</span>
                  <span>{analysisResult.analyzedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              {analysisResult.companyAnalysis && (
                <div className="flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-800 px-2.5 py-1 rounded-md font-semibold">
                  <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>{analysisResult.companyAnalysis.companyName}</span>
                  <span className="bg-indigo-600 text-white text-[10px] px-1.5 py-0.2 rounded font-bold">
                    {analysisResult.companyAnalysis.companyScore}%
                  </span>
                </div>
              )}
              <span className="text-slate-500">Detected Role:</span>
              <span className="font-bold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md">
                {analysisResult.targetRole}
              </span>
            </div>
          </div>

          {/* High Demand Fallback Notification Banner */}
          {analysisResult.isFallback && (
            <div className="p-3.5 bg-amber-50/90 border border-amber-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500 shrink-0" />
                <div>
                  <span className="font-bold text-amber-950">Enterprise ATS Engine Active:</span>{' '}
                  <span className="text-amber-800">
                    {analysisResult.engineNotice ||
                      'Gemini AI models are experiencing high demand (503). Your resume was evaluated using our local ATS engine.'}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAnalyzeResume}
                className="bg-white border-amber-300 hover:bg-amber-100 text-amber-900 text-xs shrink-0 self-start sm:self-auto h-7 px-2.5 shadow-2xs"
              >
                <RefreshCw className="w-3 h-3 mr-1 text-amber-700" />
                Re-analyze with Gemini
              </Button>
            </div>
          )}

          {/* Section Navigation Tabs / Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar border-b border-slate-200/70">
            <button
              type="button"
              onClick={() => setActiveSection('all')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'all'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layout className="w-3.5 h-3.5" />
              All Sections
            </button>
            {analysisResult.companyAnalysis && (
              <button
                type="button"
                onClick={() => setActiveSection('company')}
                className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  activeSection === 'company'
                    ? 'bg-indigo-600 text-white shadow-2xs'
                    : 'text-indigo-700 bg-indigo-50/80 hover:bg-indigo-100/90 border border-indigo-200/70'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                {analysisResult.companyAnalysis.companyName} Fit ({analysisResult.companyAnalysis.companyScore}/100)
              </button>
            )}
            <button
              type="button"
              onClick={() => setActiveSection('scores')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'scores'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Scores & ATS
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('skills')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'skills'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              Skills ({analysisResult.skillsDetected?.length || 0} Detected, {analysisResult.missingSkills?.length || 0} Missing)
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('strengths_weaknesses')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'strengths_weaknesses'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Strengths & Weaknesses
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('formatting')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'formatting'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Formatting Audit
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('content')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'content'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileEdit className="w-3.5 h-3.5" />
              Content Improvements ({analysisResult.contentSuggestions?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('keywords')}
              className={`px-3 py-1.5 text-xs rounded-lg font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                activeSection === 'keywords'
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              Keywords ({analysisResult.keywordSuggestions?.length || 0})
            </button>
          </div>

          {/* Company-Specific Analysis Dashboard */}
          {analysisResult.companyAnalysis && (activeSection === 'all' || activeSection === 'company') && (
            <CompanyAnalysisDashboard
              companyAnalysis={analysisResult.companyAnalysis}
              targetRole={analysisResult.targetRole}
            />
          )}

          {/* 1 & 2: Overall Resume Score & ATS Compatibility Score */}
          {(activeSection === 'all' || activeSection === 'scores') && (
            <ScoresVerdictSection analysis={analysisResult} />
          )}

          {/* 3 & 4: Skills Detected & Missing Skills */}
          {(activeSection === 'all' || activeSection === 'skills') && (
            <SkillsAnalysisSection
              skillsDetected={analysisResult.skillsDetected || []}
              missingSkills={analysisResult.missingSkills || []}
            />
          )}

          {/* 5 & 6: Resume Strengths & Resume Weaknesses */}
          {(activeSection === 'all' || activeSection === 'strengths_weaknesses') && (
            <StrengthsWeaknessesSection
              strengths={analysisResult.strengths || []}
              weaknesses={analysisResult.weaknesses || []}
            />
          )}

          {/* 7: Formatting Issues */}
          {(activeSection === 'all' || activeSection === 'formatting') && (
            <FormattingAuditSection
              formattingIssues={analysisResult.formattingIssues || []}
            />
          )}

          {/* 8: Content Improvement Suggestions */}
          {(activeSection === 'all' || activeSection === 'content') && (
            <ContentSuggestionsSection
              suggestions={analysisResult.contentSuggestions || []}
            />
          )}

          {/* 9: Keyword Suggestions */}
          {(activeSection === 'all' || activeSection === 'keywords') && (
            <KeywordSuggestionsSection
              keywords={analysisResult.keywordSuggestions || []}
            />
          )}

          {/* Bottom Action Footer */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-0.5">
                Ready to optimize your resume with these AI insights?
              </h4>
              <p className="text-xs text-slate-300">
                Upload another PDF or open the Resume Builder to apply bullet rewrites and missing skills.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant="outline"
                size="md"
                onClick={handleResetToUpload}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Analyze Another Resume
              </Button>
              <Link to="/builder" className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white shadow-sm shadow-indigo-900"
                >
                  <FileEdit className="w-4 h-4 mr-2" />
                  Open in Builder
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Dedicated Clean, Professional Printable Report (Visible only during window.print()) */}
      {analysisResult && <PrintableAnalysisReport analysis={analysisResult} />}
    </div>
  );
};
