import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  FileText,
  Sparkles,
  Briefcase,
  TrendingUp,
  Clock,
  MoreVertical,
  ChevronRight,
  Copy,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Download,
  Edit3,
  Wand2,
  ShieldCheck,
  Search,
  RotateCcw,
  Check,
  LayoutTemplate,
  X,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardBody } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ScoreBadge } from '../components/common/ScoreBadge';
import { mockResumes, mockTemplates } from '../data/mockData';
import { timeAgo } from '../utils/formatters';
import { Resume } from '../types/resume';
import {
  getUserResumesFromFirestore,
  saveResumeToFirestore,
  deleteResumeFromFirestore,
} from '../lib/firestoreService';
import { useAuth } from '../context/AuthContext';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<Resume[]>(() => {
    if (user) {
      return mockResumes.map((r) => ({
        ...r,
        content: {
          ...r.content,
          personalInfo: {
            ...r.content.personalInfo,
            fullName: user.name || (user.email ? user.email.split('@')[0] : 'Your Name'),
            email: user.email || 'user@example.com',
          },
        },
      }));
    }
    return mockResumes;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'high-score' | 'draft'>('all');
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [selectedResumeId, setSelectedResumeId] = useState<string>(
    mockResumes[0]?.id || 'res-1'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetRole, setNewTargetRole] = useState('');
  const [newTemplateId, setNewTemplateId] = useState('tpl-modern');

  const navigate = useNavigate();

  const userDisplayName = user?.name || (user?.email ? user.email.split('@')[0] : 'User');
  const userFirstName = user?.name ? user.name.trim().split(' ')[0] : (user?.email ? user.email.split('@')[0] : 'there');

  // Load resumes from Firestore
  React.useEffect(() => {
    async function loadUserResumes() {
      if (user?.id) {
        try {
          const fsResumes = await getUserResumesFromFirestore(user.id);
          if (fsResumes.length > 0) {
            setResumes(fsResumes);
            setSelectedResumeId(fsResumes[0].id);
          } else {
            // Personalize template resumes for new users with their actual name and email
            const starterResumes = mockResumes.map((r) => ({
              ...r,
              content: {
                ...r.content,
                personalInfo: {
                  ...r.content.personalInfo,
                  fullName: user.name || (user.email ? user.email.split('@')[0] : 'Your Name'),
                  email: user.email || 'user@example.com',
                },
              },
            }));
            setResumes(starterResumes);
            setSelectedResumeId(starterResumes[0]?.id || 'res-1');
          }
        } catch (err) {
          console.warn('Could not load user resumes from Firestore:', err);
        }
      }
    }
    loadUserResumes();
  }, [user?.id, user?.name, user?.email]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Helper to get template name
  const getTemplateName = (templateId: string) => {
    const tpl = mockTemplates.find((t) => t.id === templateId);
    return tpl ? tpl.name : 'Modern Tech';
  };

  // Duplicate resume handler
  const handleDuplicate = async (id: string) => {
    const target = resumes.find((r) => r.id === id);
    if (!target) return;
    const duplicated: Resume = {
      ...target,
      id: `res-${Date.now()}`,
      title: `${target.title} (Copy)`,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      status: 'draft',
    };
    if (user?.id) {
      saveResumeToFirestore(duplicated, user.id).catch((err) => {
        console.warn('Firestore duplicate notice:', err);
      });
    }
    setResumes([duplicated, ...resumes]);
    setActiveMenuId(null);
    showToast(`Duplicated "${target.title}" successfully.`);
  };

  // Delete resume handler
  const handleDelete = async (id: string) => {
    const target = resumes.find((r) => r.id === id);
    if (user?.id) {
      deleteResumeFromFirestore(id, user.id).catch((err) => {
        console.warn('Firestore delete notice:', err);
      });
    }
    const updated = resumes.filter((r) => r.id !== id);
    setResumes(updated);
    setActiveMenuId(null);
    if (selectedResumeId === id && updated.length > 0) {
      setSelectedResumeId(updated[0].id);
    }
    showToast(`Deleted "${target?.title || 'Resume'}".`);
  };

  // Simulate PDF Download
  const handleDownloadPdf = (resume: Resume) => {
    setActiveMenuId(null);
    showToast(`Preparing ATS-friendly PDF for "${resume.title}"...`);
    setTimeout(() => {
      showToast(`Downloaded PDF for "${resume.title}" (Single-page ATS format)`);
    }, 1500);
  };

  // Reset to initial mock resumes
  const handleRestoreSamples = () => {
    setResumes(mockResumes);
    setSelectedResumeId(mockResumes[0].id);
    showToast('Restored sample resumes.');
  };

  // Handle Create New Resume
  const handleCreateResume = async (e: React.FormEvent) => {
    e.preventDefault();
    const newResume: Resume = {
      id: `res-${Date.now()}`,
      title: newTitle.trim() || 'Untitled Resume',
      targetRole: newTargetRole.trim() || 'Target Position',
      templateId: newTemplateId,
      lastModified: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      atsScore: 82,
      status: 'draft',
      pageCount: 1,
      content: {
        personalInfo: {
          fullName: user?.name || (user?.email ? user.email.split('@')[0] : 'User'),
          jobTitle: newTargetRole.trim() || 'Software Engineer',
          email: user?.email || '',
          phone: '',
          location: '',
          summary: 'Dedicated professional with a strong track record of high-impact delivery.',
          socialLinks: [],
        },
        experience: [],
        education: [],
        skills: [],
        projects: [],
        certifications: [],
        achievements: [],
        languages: [],
      },
    };

    if (user?.id) {
      saveResumeToFirestore(newResume, user.id).catch((err) => {
        console.warn('Firestore create resume notice:', err);
      });
    }

    setResumes([newResume, ...resumes]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewTargetRole('');
    showToast('New resume created!');
    navigate(`/builder?id=${newResume.id}`);
  };

  // Calculate stats
  const totalResumes = resumes.length;
  const avgScore = totalResumes > 0
    ? Math.round(resumes.reduce((acc, r) => acc + (r.atsScore || 0), 0) / totalResumes)
    : 0;
  const totalAnalyses = 14;
  const totalJobMatches = 5;

  // Filtered resumes
  const filteredResumes = resumes.filter((resume) => {
    const matchesQuery =
      resume.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resume.targetRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      getTemplateName(resume.templateId).toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesQuery) return false;

    if (filterTab === 'high-score') {
      return (resume.atsScore || 0) >= 85;
    }
    if (filterTab === 'draft') {
      return resume.status === 'draft' || (resume.atsScore || 0) < 80;
    }
    return true;
  });

  // Active resume for completion widget
  const activeResume = resumes.find((r) => r.id === selectedResumeId) || resumes[0];

  // Calculate section completions for active resume
  const completionSections = [
    {
      id: 'personal',
      name: 'Personal Info',
      isComplete: Boolean(
        activeResume?.content?.personalInfo?.fullName &&
        activeResume?.content?.personalInfo?.email &&
        activeResume?.content?.personalInfo?.summary
      ),
      detail: activeResume?.content?.personalInfo?.fullName
        ? `${activeResume.content.personalInfo.fullName} · ${activeResume.content.personalInfo.email}`
        : 'Missing contact info & professional summary',
      builderSection: 'personal',
    },
    {
      id: 'experience',
      name: 'Experience',
      isComplete: Boolean(activeResume?.content?.experience && activeResume.content.experience.length > 0),
      detail: activeResume?.content?.experience?.length
        ? `${activeResume.content.experience.length} work positions documented`
        : 'No work history added yet',
      builderSection: 'experience',
    },
    {
      id: 'education',
      name: 'Education',
      isComplete: Boolean(activeResume?.content?.education && activeResume.content.education.length > 0),
      detail: activeResume?.content?.education?.length
        ? `${activeResume.content.education.length} degree & school records`
        : 'Add university or college credentials',
      builderSection: 'education',
    },
    {
      id: 'skills',
      name: 'Skills',
      isComplete: Boolean(activeResume?.content?.skills && activeResume.content.skills.length > 0),
      detail: activeResume?.content?.skills?.length
        ? `${activeResume.content.skills.reduce((sum, c) => sum + c.skills.length, 0)} skills listed across categories`
        : 'Highlight keywords & technical tools',
      builderSection: 'skills',
    },
    {
      id: 'projects',
      name: 'Projects',
      isComplete: Boolean(activeResume?.content?.projects && activeResume.content.projects.length > 0),
      detail: activeResume?.content?.projects?.length
        ? `${activeResume.content.projects.length} featured project showcases`
        : 'Add key portfolio achievements or open-source work',
      builderSection: 'projects',
    },
  ];

  const completedCount = completionSections.filter((s) => s.isComplete).length;
  const completionPercentage = Math.round((completedCount / completionSections.length) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 border border-slate-800 transition-all">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Welcome Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-50/60 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-10 w-48 h-48 bg-purple-50/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>AI Career Readiness Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {userFirstName}!
            </h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Your active resumes are tracking at an average <strong className="text-slate-800 font-semibold">{avgScore}% ATS score</strong>. 
              Tailor your high-impact achievements to pass corporate ATS filters and schedule more interviews.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link to="/templates">
              <Button
                variant="outline"
                size="md"
                icon={<LayoutTemplate className="w-4 h-4 text-slate-500" />}
              >
                Browse Templates
              </Button>
            </Link>
            <Button
              variant="primary"
              size="md"
              icon={<Plus className="w-4 h-4 text-white" />}
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 border-indigo-600 shadow-sm"
            >
              Create New Resume
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Resumes */}
        <Card className="p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Resumes
            </span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{totalResumes}</span>
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              +1 this week
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for custom job applications</p>
        </Card>

        {/* AI Analyses */}
        <Card className="p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              AI Analyses
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{totalAnalyses}</span>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              30-pt Audits
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Formatting & keyword audits completed</p>
        </Card>

        {/* Average ATS Score */}
        <Card className="p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Average ATS Score
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{avgScore}%</span>
            <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              Target ≥ 85%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">High recruiter pass rate benchmark</p>
        </Card>

        {/* Job Matches */}
        <Card className="p-5 hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Job Matches
            </span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">{totalJobMatches}</span>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
              91% Avg Match
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Evaluated against target descriptions</p>
        </Card>
      </div>

      {/* 3. Recent Resumes Section */}
      <div id="resumes" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Resumes</h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {resumes.length}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Customize, duplicate, and export ATS-certified resumes
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter tabs */}
            <div className="inline-flex rounded-lg bg-slate-100 p-1 text-xs">
              <button
                onClick={() => setFilterTab('all')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterTab === 'all'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All ({resumes.length})
              </button>
              <button
                onClick={() => setFilterTab('high-score')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterTab === 'high-score'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                High Score (85%+)
              </button>
              <button
                onClick={() => setFilterTab('draft')}
                className={`px-3 py-1 rounded-md font-medium transition-colors ${
                  filterTab === 'draft'
                    ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Drafts
              </button>
            </div>

            {/* Resume search input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter resumes..."
                className="pl-8 pr-3 py-1 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-44"
              />
            </div>
          </div>
        </div>

        {/* Resumes Grid / Empty State */}
        {filteredResumes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResumes.map((resume) => {
              const templateName = getTemplateName(resume.templateId);
              const isSelected = resume.id === selectedResumeId;

              return (
                <Card
                  key={resume.id}
                  hoverEffect
                  className={`flex flex-col justify-between transition-all relative ${
                    isSelected ? 'ring-2 ring-indigo-500/80 shadow-sm' : ''
                  }`}
                >
                  <div className="p-5 pb-3">
                    {/* Header Row: Title & Score Badge */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="min-w-0 flex-1">
                        <h4
                          className="font-bold text-slate-900 text-sm leading-snug truncate hover:text-indigo-600 cursor-pointer"
                          title={resume.title}
                          onClick={() => navigate(`/builder?id=${resume.id}`)}
                        >
                          {resume.title}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          Target: <span className="text-slate-700 font-medium">{resume.targetRole}</span>
                        </p>
                      </div>

                      {resume.atsScore ? (
                        <div className="shrink-0">
                          <ScoreBadge score={resume.atsScore} size="sm" />
                        </div>
                      ) : (
                        <Badge variant="neutral" size="sm">Draft</Badge>
                      )}
                    </div>

                    {/* Metadata: Template & Last Modified */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        <LayoutTemplate className="w-3 h-3 text-slate-400" />
                        <span>{templateName}</span>
                      </span>

                      <span className="text-slate-300">·</span>

                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{timeAgo(resume.lastModified)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions: Edit Button + More Options */}
                  <div className="px-5 py-3 bg-slate-50/90 border-t border-slate-100 rounded-b-xl flex items-center justify-between gap-2 relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/builder?id=${resume.id}`)}
                      className="flex-1 text-xs font-semibold justify-center bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                      icon={<Edit3 className="w-3.5 h-3.5 text-indigo-600" />}
                    >
                      Edit Resume
                    </Button>

                    <button
                      onClick={() => setSelectedResumeId(resume.id)}
                      title="Select for Completion Checklist"
                      className={`p-1.5 rounded-lg text-xs font-medium border transition-colors ${
                        isSelected
                          ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                          : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? 'Active' : 'Select'}
                    </button>

                    {/* More Options Dropdown */}
                    <div className="relative">
                      <button
                        onClick={() =>
                          setActiveMenuId(activeMenuId === resume.id ? null : resume.id)
                        }
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-white border border-transparent hover:border-slate-200 transition-colors"
                        title="More options"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeMenuId === resume.id && (
                        <>
                          <div
                            className="fixed inset-0 z-20"
                            onClick={() => setActiveMenuId(null)}
                          />
                          <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 divide-y divide-slate-100 text-xs">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigate(`/builder?id=${resume.id}`);
                                }}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-slate-400" />
                                <span>Edit in Builder</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigate('/analyzer');
                                }}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
                              >
                                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                                <span>Run ATS Scan</span>
                              </button>
                              <button
                                onClick={() => {
                                  setActiveMenuId(null);
                                  navigate('/matcher');
                                }}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
                              >
                                <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                                <span>Match Job Post</span>
                              </button>
                            </div>

                            <div className="py-1">
                              <button
                                onClick={() => handleDownloadPdf(resume)}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-400" />
                                <span>Download PDF</span>
                              </button>
                              <button
                                onClick={() => handleDuplicate(resume.id)}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-slate-700 hover:bg-slate-50"
                              >
                                <Copy className="w-3.5 h-3.5 text-slate-400" />
                                <span>Duplicate</span>
                              </button>
                            </div>

                            <div className="py-1">
                              <button
                                onClick={() => handleDelete(resume.id)}
                                className="w-full text-left flex items-center gap-2 px-3.5 py-1.5 text-rose-600 hover:bg-rose-50 font-medium"
                              >
                                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                                <span>Delete Resume</span>
                              </button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          /* 6. Empty State */
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 border border-indigo-100">
              <FileText className="w-8 h-8" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">
              {searchQuery ? 'No matching resumes found' : 'No resumes yet'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mb-6 leading-relaxed">
              {searchQuery
                ? `No resumes match "${searchQuery}". Try clearing the search filter or create a new document.`
                : 'Start tailoring your career history with our ATS-optimized builder and AI bullet optimizer.'}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {searchQuery ? (
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Filter
                </Button>
              ) : (
                <>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Plus className="w-4 h-4" />}
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    Create Your First Resume
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                    onClick={handleRestoreSamples}
                  >
                    Restore Sample Resumes
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4. AI Tools Section */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">AI Career Tools</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Specialized intelligent tools to boost applicant tracking pass rates
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Resume Analyzer */}
          <Card hoverEffect className="p-5 flex flex-col justify-between border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-100">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Resume Analyzer</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Comprehensive 30-point evaluation of formatting, brevity, metric density, and recruiter impact.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link to="/analyzer">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Analyze Resume</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* ATS Checker */}
          <Card hoverEffect className="p-5 flex flex-col justify-between border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 border border-emerald-100">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">ATS Checker</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Simulate candidate parsing algorithms across Greenhouse, Lever, Workday, and Taleo.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link to="/analyzer">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Check ATS Score</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Job Matcher */}
          <Card hoverEffect className="p-5 flex flex-col justify-between border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 border border-blue-100">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">Job Matcher</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Compare your resume against any target job description to discover critical keyword gaps.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link to="/matcher">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Match Target Job</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* AI Resume Improver */}
          <Card hoverEffect className="p-5 flex flex-col justify-between border-slate-200">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3 border border-purple-100">
                <Wand2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">AI Resume Improver</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Transform passive, weak bullet points into metric-rich, action-oriented career achievements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100">
              <Link to="/builder">
                <Button variant="outline" size="sm" className="w-full justify-between group">
                  <span>Improve Bullets</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. Resume Completion Section */}
      <Card className="border-slate-200/90 overflow-hidden">
        <div className="p-6 sm:p-7 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Resume Completion Checklist</h3>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                {completionPercentage}% Complete
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Active document: <strong className="text-slate-800 font-semibold">{activeResume?.title || 'None'}</strong>
            </p>
          </div>

          {/* Selector to switch active resume */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 hidden md:inline">Inspect resume:</span>
            <select
              value={selectedResumeId}
              onChange={(e) => setSelectedResumeId(e.target.value)}
              className="text-xs bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-hidden focus:border-indigo-500"
            >
              {resumes.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.title} ({r.atsScore ? `${r.atsScore}% ATS` : 'Draft'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 sm:px-7 pt-5">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700">
              {completedCount} of {completionSections.length} core sections finished
            </span>
            <span className="font-bold text-slate-900">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Checklist items */}
        <div className="p-6 sm:p-7 pt-4 divide-y divide-slate-100">
          {completionSections.map((sec) => (
            <div
              key={sec.id}
              className="py-3.5 flex items-center justify-between gap-4 first:pt-2 last:pb-1"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    sec.isComplete
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {sec.isComplete ? (
                    <Check className="w-4 h-4 stroke-[2.5]" />
                  ) : (
                    <AlertCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-slate-900">{sec.name}</p>
                    <span
                      className={`text-[10px] font-semibold px-1.5 py-0.2 rounded ${
                        sec.isComplete
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {sec.isComplete ? 'Complete' : 'Needs Content'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">{sec.detail}</p>
                </div>
              </div>

              <button
                onClick={() =>
                  navigate(`/builder?id=${activeResume.id}&section=${sec.builderSection}`)
                }
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 shrink-0 px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors"
              >
                {sec.isComplete ? 'Edit Section →' : 'Complete Section →'}
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal: Create New Resume */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Create New Resume</h4>
                  <p className="text-[11px] text-slate-400">Tailor a document for your target position</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateResume} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Resume Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer - Tech Leads"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Target Role / Job Title
                </label>
                <input
                  type="text"
                  required
                  value={newTargetRole}
                  onChange={(e) => setNewTargetRole(e.target.value)}
                  placeholder="e.g. Staff Software Engineer"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Starting Template
                </label>
                <select
                  value={newTemplateId}
                  onChange={(e) => setNewTemplateId(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-hidden focus:border-indigo-500"
                >
                  {mockTemplates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Launch in Builder
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
