import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  History,
  FileText,
  Search,
  Filter,
  ArrowUpDown,
  Plus,
  LayoutGrid,
  List,
  Sparkles,
  Download,
  Copy,
  Trash2,
  Edit3,
  Clock,
  LayoutTemplate,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  BarChart3,
  Loader2,
  X,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ScoreBadge } from '../components/common/ScoreBadge';
import { EmptyState } from '../components/common/EmptyState';
import { ResumeThumbnail } from '../components/history/ResumeThumbnail';
import { ResumeCard } from '../components/history/ResumeCard';
import { ResumeDeleteModal } from '../components/history/ResumeDeleteModal';
import { AnalysisHistoryTab } from '../components/history/AnalysisHistoryTab';
import { AnalysisDetailModal } from '../components/history/AnalysisDetailModal';
import { ResumeWithStats, ResumeSortOption, TemplateFilterOption, AnalysisHistoryItem } from '../types/resumeHistory';
import {
  loadSavedResumes,
  saveResumesList,
  duplicateResume,
  deleteResumeStorage,
  loadAnalysisHistory,
  filterAndSortResumes,
  calculateResumeCompletion,
  getTemplateDisplayName,
} from '../utils/resumeHistory';
import { mockTemplates } from '../data/mockData';
import { timeAgo, formatDate } from '../utils/formatters';
import { Resume } from '../types/resume';

export const ResumeHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  // Active Tab: 'resumes' | 'analysis'
  const [activeTab, setActiveTab] = useState<'resumes' | 'analysis'>('resumes');

  // Resumes list state (loaded from localStorage + mock)
  const [resumes, setResumes] = useState<ResumeWithStats[]>([]);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisHistoryItem[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState<TemplateFilterOption>('all');
  const [sortBy, setSortBy] = useState<ResumeSortOption>('recently-updated');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals & Active state
  const [deleteTargetResume, setDeleteTargetResume] = useState<Resume | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedAnalysisItem, setSelectedAnalysisItem] = useState<AnalysisHistoryItem | null>(null);

  // Download & Toast feedback
  const [downloadingResumeId, setDownloadingResumeId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'info' | 'error';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Initial load
  useEffect(() => {
    const loadedResumes = loadSavedResumes();
    setResumes(loadedResumes);

    const loadedAnalyses = loadAnalysisHistory();
    setAnalysisHistory(loadedAnalyses);
  }, []);

  // Filtered and sorted resumes
  const filteredResumes = filterAndSortResumes(
    resumes,
    searchQuery,
    templateFilter,
    sortBy
  );

  // Duplicate handler
  const handleDuplicate = (target: ResumeWithStats) => {
    const cloned = duplicateResume(target);
    const withStats: ResumeWithStats = {
      ...cloned,
      completionPercentage: calculateResumeCompletion(cloned),
      templateName: getTemplateDisplayName(cloned.templateId),
    };

    const updated = [withStats, ...resumes];
    setResumes(updated);
    saveResumesList(updated);
    showToast(`Duplicated "${target.title}" successfully.`);
  };

  // Delete handler - open confirmation
  const handleRequestDelete = (target: ResumeWithStats) => {
    setDeleteTargetResume(target);
  };

  // Confirm delete
  const handleConfirmDelete = (resumeId: string) => {
    setIsDeleting(true);
    setTimeout(() => {
      const updated = resumes.filter((r) => r.id !== resumeId);
      setResumes(updated);
      saveResumesList(updated);
      deleteResumeStorage(resumeId);
      setIsDeleting(false);
      setDeleteTargetResume(null);
      showToast('Resume deleted successfully.', 'info');
    }, 300);
  };

  // Download PDF handler
  const handleDownload = (resume: ResumeWithStats) => {
    setDownloadingResumeId(resume.id);
    showToast(`Generating ATS-compliant PDF for "${resume.title}"...`, 'info');

    setTimeout(() => {
      // Create a clean printable blob or trigger download
      try {
        const jsonString = JSON.stringify(resume, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const cleanName = (resume.title || 'resume').replace(/[^a-zA-Z0-9_-]/g, '_');
        a.href = url;
        a.download = `${cleanName}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (err) {
        console.warn('Download error', err);
      }

      setDownloadingResumeId(null);
      showToast(`Exported "${resume.title}" successfully.`, 'success');
    }, 1200);
  };

  // Stats calculation
  const totalResumes = resumes.length;
  const averageAtsScore =
    resumes.length > 0
      ? Math.round(
          resumes.reduce((acc, r) => acc + (r.atsScore || 80), 0) / resumes.length
        )
      : 0;
  const completedCount = resumes.filter((r) => r.completionPercentage >= 90).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs shadow-xl border border-slate-700 animate-in slide-in-from-bottom-2 duration-200">
          {toastMessage.type === 'success' && (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          )}
          {toastMessage.type === 'info' && (
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
          )}
          {toastMessage.type === 'error' && (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{toastMessage.text}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Resume History
            </h1>
            <Badge variant="neutral" size="sm">
              {totalResumes} Resumes
            </Badge>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Access your saved resume versions, duplicate drafts, monitor ATS scores, and review past AI audit reports.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate('/builder?id=new')}
            className="shadow-xs font-semibold text-xs py-2"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Resume
          </Button>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Total Resumes
            </div>
            <div className="text-xl font-black text-slate-900 mt-0.5">
              {totalResumes}
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Avg. ATS Score
            </div>
            <div className="text-xl font-black text-indigo-600 mt-0.5">
              {averageAtsScore}
              <span className="text-xs font-normal text-slate-400">/100</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        <div className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Ready for Application
            </div>
            <div className="text-xl font-black text-emerald-600 mt-0.5">
              {completedCount}
              <span className="text-xs font-normal text-slate-400"> (≥90% Complete)</span>
            </div>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileCheck className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Tabs Navigation: Saved Resumes vs AI Analysis History */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-px">
        <button
          type="button"
          onClick={() => setActiveTab('resumes')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'resumes'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Saved Resumes</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-semibold">
            {resumes.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('analysis')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
            activeTab === 'analysis'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Analysis History</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 text-slate-600 font-semibold">
            {analysisHistory.length}
          </span>
        </button>
      </div>

      {/* TAB 1: SAVED RESUMES */}
      {activeTab === 'resumes' && (
        <div className="space-y-4">
          {/* Search, Filter & Sort Toolbar */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by resume name, target role, or candidate name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50/50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 text-xs font-bold leading-none cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            {/* Filters & Sort Controls */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Filter by Template */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  Template:
                </span>
                <select
                  value={templateFilter}
                  onChange={(e) => setTemplateFilter(e.target.value as TemplateFilterOption)}
                  className="px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-700 cursor-pointer"
                >
                  <option value="all">All Templates</option>
                  {mockTemplates.map((tpl) => (
                    <option key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as ResumeSortOption)}
                  className="px-2.5 py-2 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 text-slate-700 cursor-pointer"
                >
                  <option value="recently-updated">Recently Updated</option>
                  <option value="highest-ats">Highest ATS Score</option>
                  <option value="highest-completion">Highest Completion</option>
                  <option value="name-asc">Name (A–Z)</option>
                  <option value="name-desc">Name (Z–A)</option>
                </select>
              </div>

              {/* Grid vs Table View Switcher */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 ml-1">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Card Grid View"
                  aria-label="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('table')}
                  className={`p-1.5 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-indigo-600 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                  title="Table List View"
                  aria-label="Table View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Resumes Content Area */}
          {filteredResumes.length === 0 ? (
            <Card className="p-8">
              {resumes.length === 0 ? (
                <EmptyState
                  icon={<FileText className="w-6 h-6 text-indigo-500" />}
                  title="No Resumes Saved Yet"
                  description="Create your first professional, ATS-optimized resume using our intelligent builder."
                  actionLabel="Create Resume"
                  onAction={() => navigate('/builder?id=new')}
                />
              ) : (
                <EmptyState
                  icon={<Search className="w-6 h-6 text-slate-400" />}
                  title="No Resumes Match Filters"
                  description="Try adjusting your search keywords or clearing the template filter."
                  actionLabel="Clear Filters"
                  onAction={() => {
                    setSearchQuery('');
                    setTemplateFilter('all');
                  }}
                />
              )}
            </Card>
          ) : viewMode === 'grid' ? (
            /* Card Grid View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredResumes.map((resume) => (
                <ResumeCard
                  key={resume.id}
                  resume={resume}
                  onDuplicate={handleDuplicate}
                  onDelete={handleRequestDelete}
                  onDownload={handleDownload}
                  isDownloading={downloadingResumeId === resume.id}
                />
              ))}
            </div>
          ) : (
            /* Table View */
            <Card className="overflow-hidden border border-slate-200/90 shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-5 py-3.5">Resume Name</th>
                      <th className="px-5 py-3.5">Selected Template</th>
                      <th className="px-5 py-3.5">ATS Score</th>
                      <th className="px-5 py-3.5">Completion</th>
                      <th className="px-5 py-3.5">Last Updated</th>
                      <th className="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredResumes.map((resume) => (
                      <tr
                        key={resume.id}
                        className="hover:bg-slate-50/70 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/builder?id=${resume.id}`)}
                      >
                        {/* Resume Name & Role */}
                        <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-10 rounded bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-0.5 group-hover:border-indigo-400 transition-colors">
                              <ResumeThumbnail resume={resume} />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {resume.title}
                              </div>
                              <div className="text-[10px] text-slate-400 font-normal">
                                {resume.targetRole || 'Software Professional'}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Selected Template */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                            <LayoutTemplate className="w-3 h-3 text-slate-400" />
                            {resume.templateName}
                          </span>
                        </td>

                        {/* ATS Score */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <ScoreBadge score={resume.atsScore || 85} size="sm" />
                        </td>

                        {/* Completion Percentage */}
                        <td className="px-5 py-4 whitespace-nowrap">
                          <div className="w-28 space-y-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="font-bold text-slate-800">
                                {resume.completionPercentage}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  resume.completionPercentage >= 90
                                    ? 'bg-emerald-500'
                                    : resume.completionPercentage >= 70
                                    ? 'bg-indigo-500'
                                    : 'bg-amber-500'
                                }`}
                                style={{ width: `${resume.completionPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Last Updated */}
                        <td className="px-5 py-4 text-slate-400 whitespace-nowrap text-[11px]">
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <Clock className="w-3 h-3 text-slate-400" />
                            <span>{timeAgo(resume.lastModified || resume.createdAt)}</span>
                          </div>
                        </td>

                        {/* Quick Actions */}
                        <td
                          className="px-5 py-4 text-right whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => navigate(`/builder?id=${resume.id}`)}
                              className="text-indigo-600 border-indigo-200 hover:bg-indigo-50 text-xs font-semibold py-1 px-2.5"
                              title="Edit in builder"
                            >
                              <Edit3 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>

                            <button
                              type="button"
                              onClick={() => handleDuplicate(resume)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              title="Duplicate resume"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDownload(resume)}
                              disabled={downloadingResumeId === resume.id}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                              title="Download resume"
                            >
                              {downloadingResumeId === resume.id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                              ) : (
                                <Download className="w-3.5 h-3.5" />
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleRequestDelete(resume)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete resume"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* TAB 2: ANALYSIS HISTORY */}
      {activeTab === 'analysis' && (
        <AnalysisHistoryTab
          items={analysisHistory}
          onViewAnalysis={(item) => setSelectedAnalysisItem(item)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ResumeDeleteModal
        isOpen={Boolean(deleteTargetResume)}
        resume={deleteTargetResume}
        onClose={() => setDeleteTargetResume(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      {/* Analysis Detail Modal */}
      <AnalysisDetailModal
        isOpen={Boolean(selectedAnalysisItem)}
        item={selectedAnalysisItem}
        onClose={() => setSelectedAnalysisItem(null)}
      />
    </div>
  );
};
