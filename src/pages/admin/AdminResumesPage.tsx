import React, { useState, useMemo } from 'react';
import {
  FileText,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  User,
  Mail,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  Layers,
  BarChart2,
  Award,
  ArrowUpDown,
  RotateCcw,
  Check,
} from 'lucide-react';
import { initialAdminResumes, AdminResumeRecord } from '../../data/adminMockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { ScoreBadge } from '../../components/common/ScoreBadge';

export const AdminResumesPage: React.FC = () => {
  const [resumes, setResumes] = useState<AdminResumeRecord[]>(initialAdminResumes);
  const [searchQuery, setSearchQuery] = useState('');
  const [templateFilter, setTemplateFilter] = useState<string>('All');
  const [scoreRangeFilter, setScoreRangeFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals state
  const [selectedResume, setSelectedResume] = useState<AdminResumeRecord | null>(null);
  const [resumeToDelete, setResumeToDelete] = useState<AdminResumeRecord | null>(null);
  const [deleteNotification, setDeleteNotification] = useState<string | null>(null);

  // Available templates dynamically extracted + preset list
  const availableTemplates = useMemo(() => {
    const set = new Set<string>();
    resumes.forEach((r) => set.add(r.templateName));
    return ['All', ...Array.from(set)];
  }, [resumes]);

  // Filtered resumes based on search (name or user), template, and ATS score range
  const filteredResumes = useMemo(() => {
    return resumes.filter((r) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.ownerName.toLowerCase().includes(q) ||
        r.ownerEmail.toLowerCase().includes(q) ||
        r.targetRole.toLowerCase().includes(q);

      const matchesTemplate = templateFilter === 'All' || r.templateName === templateFilter;

      let matchesScore = true;
      if (scoreRangeFilter === 'high') {
        matchesScore = r.atsScore >= 90;
      } else if (scoreRangeFilter === 'medium') {
        matchesScore = r.atsScore >= 80 && r.atsScore < 90;
      } else if (scoreRangeFilter === 'low') {
        matchesScore = r.atsScore < 80;
      }

      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

      return matchesSearch && matchesTemplate && matchesScore && matchesStatus;
    });
  }, [resumes, searchQuery, templateFilter, scoreRangeFilter, statusFilter]);

  // Delete resume action
  const handleConfirmDelete = () => {
    if (!resumeToDelete) return;
    const title = resumeToDelete.title;
    const deletedId = resumeToDelete.id;

    setResumes((prev) => prev.filter((r) => r.id !== deletedId));
    if (selectedResume?.id === deletedId) {
      setSelectedResume(null);
    }
    setResumeToDelete(null);

    // Show temporary feedback toast
    setDeleteNotification(`"${title}" has been permanently removed.`);
    setTimeout(() => {
      setDeleteNotification(null);
    }, 4000);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setTemplateFilter('All');
    setScoreRangeFilter('All');
    setStatusFilter('All');
  };

  const isFiltered =
    searchQuery.trim() !== '' ||
    templateFilter !== 'All' ||
    scoreRangeFilter !== 'All' ||
    statusFilter !== 'All';

  // Summary Metrics
  const totalCount = resumes.length;
  const avgScore = totalCount > 0
    ? Math.round(resumes.reduce((acc, curr) => acc + curr.atsScore, 0) / totalCount)
    : 0;
  const highMatchCount = resumes.filter((r) => r.atsScore >= 90).length;
  const readyCount = resumes.filter((r) => r.status === 'Ready').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {deleteNotification && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-rose-600 shrink-0" />
            <span className="font-medium">{deleteNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setDeleteNotification(null)}
            className="text-rose-500 hover:text-rose-700 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Resume Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit candidate resumes, target industries, ATS scores, and template performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="md">
            {totalCount} Total Resumes
          </Badge>
        </div>
      </div>

      {/* Metric Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Resumes</span>
            <FileText className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Active in registry</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Average ATS</span>
            <Award className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{avgScore}%</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all profiles</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">High Match (90%+)</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-indigo-600">{highMatchCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Interview-ready scores</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-amber-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Verified Ready</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{readyCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Completed reviews</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search by resume name or user */}
          <div className="w-full lg:w-96">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by resume name or user..."
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Filters for template and ATS score range */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Template filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">
                Template:
              </span>
              <select
                id="template-filter-select"
                aria-label="Filter by resume template"
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
              >
                {availableTemplates.map((t) => (
                  <option key={t} value={t}>
                    {t === 'All' ? 'All Templates' : `${t} Template`}
                  </option>
                ))}
              </select>
            </div>

            {/* ATS score range filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">
                ATS Score:
              </span>
              <select
                id="score-range-filter-select"
                aria-label="Filter by ATS score range"
                value={scoreRangeFilter}
                onChange={(e) => setScoreRangeFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value="All">All ATS Scores</option>
                <option value="high">90% - 100% (High Match)</option>
                <option value="medium">80% - 89% (Good Match)</option>
                <option value="low">&lt; 80% (Needs Improvement)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">
                Status:
              </span>
              <select
                id="status-filter-select"
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
              >
                <option value="All">All Statuses</option>
                <option value="Ready">Ready</option>
                <option value="Analyzed">Analyzed</option>
                <option value="Draft">Draft</option>
              </select>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Feedback */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredResumes.length}</strong> of{' '}
            <strong className="text-slate-800">{resumes.length}</strong> resumes
          </span>
          {isFiltered && (
            <span className="text-slate-400 italic">
              Filtered results active
            </span>
          )}
        </div>
      </Card>

      {/* Resumes Clean Table */}
      <Card className="overflow-hidden border border-slate-200/80 shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50/90 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500 select-none">
              <tr>
                <th scope="col" className="px-5 py-3.5">Resume Name</th>
                <th scope="col" className="px-5 py-3.5">User</th>
                <th scope="col" className="px-5 py-3.5">Template</th>
                <th scope="col" className="px-5 py-3.5 text-center">ATS Score</th>
                <th scope="col" className="px-5 py-3.5">Created Date</th>
                <th scope="col" className="px-5 py-3.5">Status</th>
                <th scope="col" className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredResumes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <FileText className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="font-semibold text-slate-600">No resumes found</p>
                      <p className="text-[11px] text-slate-400">
                        No resumes match your search query, template filter, or ATS score range.
                      </p>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={handleClearFilters}
                        className="mt-2 text-xs"
                      >
                        Reset Search & Filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredResumes.map((resume) => {
                  const initials = resume.ownerName
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()
                    .slice(0, 2);

                  return (
                    <tr
                      key={resume.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedResume(resume)}
                    >
                      {/* Resume Name */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                              {resume.title}
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium">
                              {resume.targetRole}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* User */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0">
                            {initials}
                          </div>
                          <div>
                            <div className="font-medium text-slate-800">{resume.ownerName}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              {resume.ownerEmail}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Template */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs border border-slate-200/60">
                          <Layers className="w-3 h-3 text-slate-400" />
                          {resume.templateName}
                        </span>
                      </td>

                      {/* ATS Score */}
                      <td className="px-5 py-3.5 text-center">
                        <ScoreBadge score={resume.atsScore} size="sm" showLabel />
                      </td>

                      {/* Created Date */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-slate-600 font-medium text-xs">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{resume.createdDate}</span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5">
                        <Badge
                          variant={
                            resume.status === 'Ready'
                              ? 'success'
                              : resume.status === 'Analyzed'
                              ? 'brand'
                              : 'neutral'
                          }
                          size="sm"
                        >
                          {resume.status}
                        </Badge>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* View Action */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedResume(resume);
                            }}
                            title="View resume details"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-all cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden xl:inline">Details</span>
                          </button>

                          {/* Delete Action */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setResumeToDelete(resume);
                            }}
                            title="Delete resume"
                            className="inline-flex items-center gap-1 p-1 sm:px-2.5 sm:py-1 text-xs font-semibold text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-all cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                            <span className="hidden xl:inline text-rose-600">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Resume Details / View Modal */}
      {selectedResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedResume(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-5 relative animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider">
                    Resume Audit & Details
                  </span>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {selectedResume.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Targeting: <strong className="text-slate-700 font-semibold">{selectedResume.targetRole}</strong>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedResume(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* ATS Score Overview Card */}
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">
                  ATS Match Score
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-slate-900">
                    {selectedResume.atsScore}%
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      selectedResume.atsScore >= 90
                        ? 'text-emerald-600'
                        : selectedResume.atsScore >= 80
                        ? 'text-indigo-600'
                        : 'text-amber-600'
                    }`}
                  >
                    {selectedResume.atsScore >= 90
                      ? 'Exceptional match'
                      : selectedResume.atsScore >= 80
                      ? 'Competitive match'
                      : 'Needs keyword polish'}
                  </span>
                </div>
              </div>
              <ScoreBadge score={selectedResume.atsScore} size="lg" />
            </div>

            {/* User & Metadata Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[11px]">Candidate Owner</span>
                <span className="font-semibold text-slate-900 mt-0.5 block">
                  {selectedResume.ownerName}
                </span>
                <span className="text-slate-500 text-[11px] block mt-0.5 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  {selectedResume.ownerEmail}
                </span>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[11px]">Template Applied</span>
                <span className="font-semibold text-indigo-700 mt-0.5 block flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  {selectedResume.templateName}
                </span>
                <span className="text-slate-500 text-[11px] block mt-0.5">ATS compliant layout</span>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[11px]">Created Date</span>
                <span className="font-semibold text-slate-800 mt-0.5 block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  {selectedResume.createdDate}
                </span>
              </div>

              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <span className="text-slate-400 block text-[11px]">Review Status</span>
                <div className="mt-1">
                  <Badge
                    variant={
                      selectedResume.status === 'Ready'
                        ? 'success'
                        : selectedResume.status === 'Analyzed'
                        ? 'brand'
                        : 'neutral'
                    }
                    size="sm"
                  >
                    {selectedResume.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Summary Preview snippet */}
            {selectedResume.summaryPreview && (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/60 text-xs">
                <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider mb-1">
                  Professional Summary Preview
                </span>
                <p className="text-slate-700 leading-relaxed italic">
                  &ldquo;{selectedResume.summaryPreview}&rdquo;
                </p>
              </div>
            )}

            {/* Key Skills Tags */}
            {selectedResume.skills && selectedResume.skills.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-slate-400 block text-[11px] font-semibold uppercase tracking-wider">
                  Indexed Core Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedResume.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-indigo-50/80 text-indigo-700 border border-indigo-100 text-[11px] font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100">
              <Button
                variant="danger"
                size="sm"
                className="text-xs"
                onClick={() => {
                  const target = selectedResume;
                  setSelectedResume(null);
                  setResumeToDelete(target);
                }}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Delete Resume
              </Button>
              <div className="flex-1" />
              <Button
                variant="secondary"
                size="sm"
                className="text-xs"
                onClick={() => setSelectedResume(null)}
              >
                Close View
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {resumeToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setResumeToDelete(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Warning Icon */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Delete Resume Confirmation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Are you sure you want to permanently delete this resume?
                </p>
              </div>
            </div>

            {/* Targeted resume information box */}
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-1.5 text-xs">
              <div className="font-semibold text-slate-900">
                {resumeToDelete.title}
              </div>
              <div className="text-slate-600 flex items-center gap-1 text-[11px]">
                <User className="w-3 h-3 text-slate-400" />
                <span>Owner: <strong className="text-slate-700">{resumeToDelete.ownerName}</strong> ({resumeToDelete.ownerEmail})</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Created: {resumeToDelete.createdDate}</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              This action cannot be undone. The resume record, scoring metrics, and version history will be removed from the platform.
            </p>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs"
                onClick={() => setResumeToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="text-xs"
                onClick={handleConfirmDelete}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
