import React, { useRef, useState } from 'react';
import {
  UploadCloud,
  FileText,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Zap,
} from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { UploadedFileInfo, SAMPLE_RESUME_FILES } from '../../data/analyzerMockData';
import { extractTextFromPdf } from '../../utils/pdfTextExtractor';
import { SAMPLE_RESUME_TEXTS } from '../../data/sampleResumeContent';

interface PDFUploadDropzoneProps {
  stagedFile: UploadedFileInfo | null;
  onSelectFile: (fileInfo: UploadedFileInfo) => void;
  onClearFile: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export const PDFUploadDropzone: React.FC<PDFUploadDropzoneProps> = ({
  stagedFile,
  onSelectFile,
  onClearFile,
  onAnalyze,
  isAnalyzing,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatBytes = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);

    // Validate PDF extension and MIME type
    const isPDF =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPDF) {
      setErrorMessage('Please upload a valid PDF document (.pdf format only).');
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File size exceeds the 15MB limit. Please upload a smaller PDF.');
      return;
    }

    if (file.size === 0) {
      setErrorMessage('The uploaded PDF is empty (0 bytes). Please upload a valid resume.');
      return;
    }

    // Extract text and prepare payload
    const extracted = await extractTextFromPdf(file);

    if (extracted.error) {
      setErrorMessage(extracted.error);
      return;
    }

    const fileInfo: UploadedFileInfo = {
      name: file.name,
      size: file.size,
      formattedSize: formatBytes(file.size),
      type: 'PDF Document',
      lastModified: new Date(file.lastModified || Date.now()).toLocaleDateString(),
      pageCount: file.size > 300000 ? 2 : 1,
      extractedText: extracted.text,
      base64: extracted.base64,
    };

    onSelectFile(fileInfo);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_RESUME_FILES[0]) => {
    setErrorMessage(null);
    onSelectFile({
      name: sample.fileName,
      size: sample.sizeBytes,
      formattedSize: sample.formattedSize,
      type: 'PDF Document',
      lastModified: new Date().toLocaleDateString(),
      pageCount: 1,
      extractedText: SAMPLE_RESUME_TEXTS[sample.fileName] || '',
    });
  };

  return (
    <div className="space-y-6">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Main Upload Box */}
      {!stagedFile ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer select-none bg-white ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[1.005]'
              : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50/60 shadow-xs'
          }`}
        >
          <div className="max-w-md mx-auto flex flex-col items-center">
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform ${
                isDragging
                  ? 'bg-indigo-600 text-white scale-110 shadow-lg shadow-indigo-200'
                  : 'bg-indigo-50 text-indigo-600'
              }`}
            >
              <UploadCloud className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-1">
              Upload your Resume in PDF format
            </h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Drag and drop your PDF resume here, or{' '}
              <span className="text-indigo-600 font-semibold underline underline-offset-2">
                browse files
              </span>{' '}
              from your device
            </p>

            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                PDF files up to 15MB
              </span>
              <span>•</span>
              <span>Text-layer verified</span>
              <span>•</span>
              <span>ATS Parser compliant</span>
            </div>
          </div>
        </div>
      ) : (
        /* Staged File Information Card */
        <Card className="p-6 bg-white border-slate-200 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-200/80 text-rose-600 flex items-center justify-center shrink-0 shadow-2xs">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-[280px] sm:max-w-md">
                    {stagedFile.name}
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    Ready
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{stagedFile.type}</span>
                  <span>•</span>
                  <span className="font-semibold text-slate-700">{stagedFile.formattedSize}</span>
                  <span>•</span>
                  <span>Est. {stagedFile.pageCount} page(s)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Change File
              </button>
              <button
                type="button"
                onClick={onClearFile}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                title="Remove file"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Full ATS score, keyword gap detection, and formatting analysis will be generated.</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={onAnalyze}
              disabled={isAnalyzing}
              className="w-full sm:w-auto shadow-sm shadow-indigo-200"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Analyze Resume
            </Button>
          </div>
        </Card>
      )}

      {/* Error display */}
      {errorMessage && (
        <div className="flex items-center gap-2 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
          <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Quick-test Sample Resumes Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Need a test file? Try with a pre-loaded PDF resume</span>
          </div>
          <span className="text-[11px] text-slate-400">1-click instant demo</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_RESUME_FILES.map((sample) => {
            const isSelected = stagedFile?.name === sample.fileName;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className={`p-3.5 rounded-xl text-left border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50/60 ring-1 ring-indigo-500'
                    : 'border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/50 shadow-2xs'
                }`}
              >
                <div className="min-w-0 pr-2">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {sample.label}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5 truncate">
                    {sample.formattedSize} • PDF
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    isSelected
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
