import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Languages as LanguagesIcon,
  Sparkles,
  Download,
  Eye,
  EyeOff,
  Check,
  Save,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  RotateCcw,
  Printer,
  FileText,
  AlignLeft,
  ChevronDown,
  LayoutTemplate,
  ExternalLink,
  CheckCircle2,
  Share2,
  Loader2,
  AlertCircle,
  Wand2,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { mockResumes, mockTemplates } from '../data/mockData';
import { Resume, ResumeContent, PersonalInfo } from '../types/resume';
import { saveResumeToFirestore } from '../lib/firestoreService';
import { getStoredUser } from '../utils/auth';
import { ResumeLivePreview } from '../components/builder/ResumeLivePreview';
import { SectionAccordion } from '../components/builder/SectionAccordion';
import { ExperienceSection } from '../components/builder/ExperienceSection';
import { EducationSection } from '../components/builder/EducationSection';
import { SkillsSection } from '../components/builder/SkillsSection';
import { ProjectsSection } from '../components/builder/ProjectsSection';
import {
  CertificationsSection,
  AchievementsSection,
  LanguagesSection,
} from '../components/builder/AdditionalSections';
import { TemplateSelector } from '../components/builder/TemplateSelector';
import { AIImprovementModal } from '../components/builder/AIImprovementModal';
import { AISummaryGeneratorModal } from '../components/builder/AISummaryGeneratorModal';
import { exportResumeToPdf, getResumePdfFilename } from '../utils/pdfExport';

type SectionKey =
  | 'personal'
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'languages';

export const ResumeBuilderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get('id') || 'res-1';
  const templateParam = searchParams.get('template');
  const sectionParam = searchParams.get('section') as SectionKey | null;

  // Local storage cache key
  const storageKey = `resumeai_draft_${resumeId}`;

  // Load resume with localStorage fallback or mock data
  const [resume, setResume] = useState<Resume>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (templateParam) parsed.templateId = templateParam;
        return parsed;
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }

    const base = mockResumes.find((r) => r.id === resumeId) || mockResumes[0];
    if (templateParam) {
      return { ...base, templateId: templateParam };
    }
    return base;
  });

  // Section open/close states (collapsible)
  const [openSections, setOpenSections] = useState<{ [key in SectionKey]?: boolean }>(() => {
    const initial: { [key in SectionKey]?: boolean } = {
      personal: true,
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: false,
      achievements: false,
      languages: false,
    };
    if (sectionParam) {
      initial[sectionParam] = true;
    }
    return initial;
  });

  // Live preview controls
  const [showLivePreview, setShowLivePreview] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(0.92);
  const [isFullPreviewModal, setIsFullPreviewModal] = useState(false);
  const [mobileViewTab, setMobileViewTab] = useState<'editor' | 'preview'>('editor');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [summaryAiModalOpen, setSummaryAiModalOpen] = useState(false);
  const [summaryGenModalOpen, setSummaryGenModalOpen] = useState(false);

  const editorContainerRef = useRef<HTMLDivElement>(null);
  const user = getStoredUser();

  // Autosave to localStorage and Firestore on resume change
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(resume));
        if (user?.id) {
          saveResumeToFirestore(resume, user.id).catch((err) => {
            console.warn('Firestore autosave note:', err);
          });
        }
        setSaveStatus('saved');
      } catch (err) {
        console.warn('Autosave error', err);
        setSaveStatus('saved');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [resume, storageKey, user?.id]);

  // If query string specifies a templateParam, ensure template is switched while preserving content
  useEffect(() => {
    if (templateParam && resume.templateId !== templateParam) {
      setResume((prev) => ({
        ...prev,
        templateId: templateParam,
        lastModified: new Date().toISOString(),
      }));
    }
  }, [templateParam]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Toggle specific accordion section
  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Jump to specific section and expand it
  const handleJumpToSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: true,
    }));
    const element = document.getElementById(`section-${key}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Personal Info helpers
  const handlePersonalInfoChange = (field: keyof PersonalInfo, value: any) => {
    setResume((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      content: {
        ...prev.content,
        personalInfo: {
          ...prev.content.personalInfo,
          [field]: value,
        },
      },
    }));
  };

  // Social link helpers (LinkedIn, GitHub, Portfolio)
  const getSocialLink = (platform: 'LinkedIn' | 'GitHub' | 'Portfolio') => {
    return (
      resume.content.personalInfo.socialLinks?.find((s) => s.platform === platform)?.url || ''
    );
  };

  const setSocialLink = (platform: 'LinkedIn' | 'GitHub' | 'Portfolio', url: string) => {
    const existing = resume.content.personalInfo.socialLinks || [];
    const otherLinks = existing.filter((s) => s.platform !== platform);
    const updated = url.trim()
      ? [...otherLinks, { id: `soc-${platform.toLowerCase()}`, platform, url: url.trim() }]
      : otherLinks;

    setResume((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      content: {
        ...prev.content,
        personalInfo: {
          ...prev.content.personalInfo,
          socialLinks: updated,
        },
      },
    }));
  };

  // Generic content updater
  const updateContent = <K extends keyof ResumeContent>(key: K, value: ResumeContent[K]) => {
    setResume((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      content: {
        ...prev.content,
        [key]: value,
      },
    }));
  };

  // Calculate dynamic completion percentage
  const completionPercentage = useMemo(() => {
    let completedSteps = 0;
    const totalSteps = 9;

    const { personalInfo, experience, education, skills, projects, certifications, achievements, languages } = resume.content;

    // 1. Personal
    if (personalInfo.fullName && personalInfo.email && personalInfo.phone) completedSteps += 1;
    // 2. Summary
    if (personalInfo.summary && personalInfo.summary.length > 20) completedSteps += 1;
    // 3. Education
    if (education.length > 0) completedSteps += 1;
    // 4. Experience
    if (experience.length > 0) completedSteps += 1;
    // 5. Skills
    if (skills.some((c) => c.skills.length > 0)) completedSteps += 1;
    // 6. Projects
    if (projects.length > 0) completedSteps += 1;
    // 7. Certifications
    if (certifications && certifications.length > 0) completedSteps += 1;
    // 8. Achievements
    if (achievements && achievements.length > 0) completedSteps += 1;
    // 9. Languages
    if (languages && languages.length > 0) completedSteps += 1;

    return Math.round((completedSteps / totalSteps) * 100);
  }, [resume.content]);

  // Current template details
  const currentTemplate = mockTemplates.find((t) => t.id === resume.templateId) || mockTemplates[0];

  // Zoom controls
  const handleZoomIn = () => setZoomLevel((z) => Math.min(Number((z + 0.1).toFixed(2)), 1.3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(Number((z - 0.1).toFixed(2)), 0.6));
  const handleZoomReset = () => setZoomLevel(0.92);

  // PDF Export States
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgressStep, setPdfProgressStep] = useState('');
  const [pdfNotification, setPdfNotification] = useState<{
    type: 'loading' | 'success' | 'error';
    title: string;
    message: string;
  } | null>(null);

  // Client-side PDF export
  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;

    setIsExportingPdf(true);
    const filename = getResumePdfFilename(resume);

    setPdfNotification({
      type: 'loading',
      title: 'Generating PDF',
      message: `Exporting "${filename}" in A4 format...`,
    });

    try {
      // Find element: prioritize the main visible preview sheet; fallback to offscreen sheet if hidden
      let targetElement = document.getElementById('resume-a4-preview-sheet');
      if (!targetElement || targetElement.offsetParent === null) {
        targetElement = document.getElementById('resume-pdf-export-sheet') || targetElement;
      }

      if (!targetElement) {
        throw new Error('Could not locate resume document for PDF rendering.');
      }

      const result = await exportResumeToPdf(targetElement, {
        filename,
        onProgress: (status) => {
          setPdfProgressStep(status);
          setPdfNotification({
            type: 'loading',
            title: 'Generating PDF',
            message: status,
          });
        },
      });

      if (result.success) {
        setPdfNotification({
          type: 'success',
          title: 'PDF Downloaded',
          message: `Clean, print-ready PDF saved as ${result.filename}`,
        });
        setTimeout(() => setPdfNotification(null), 4500);
      } else {
        setPdfNotification({
          type: 'error',
          title: 'Export Failed',
          message: result.error || 'Failed to download PDF. Please try again.',
        });
        setTimeout(() => setPdfNotification(null), 5000);
      }
    } catch (err: any) {
      setPdfNotification({
        type: 'error',
        title: 'Export Error',
        message: err?.message || 'An unexpected error occurred during PDF export.',
      });
      setTimeout(() => setPdfNotification(null), 5000);
    } finally {
      setIsExportingPdf(false);
      setPdfProgressStep('');
    }
  };

  const allSectionsNav: { key: SectionKey; label: string; icon: React.ElementType }[] = [
    { key: 'personal', label: 'Personal', icon: User },
    { key: 'summary', label: 'Summary', icon: AlignLeft },
    { key: 'experience', label: 'Experience', icon: Briefcase },
    { key: 'education', label: 'Education', icon: GraduationCap },
    { key: 'skills', label: 'Skills', icon: Wrench },
    { key: 'projects', label: 'Projects', icon: FolderGit2 },
    { key: 'certifications', label: 'Certifications', icon: Award },
    { key: 'achievements', label: 'Achievements', icon: Trophy },
    { key: 'languages', label: 'Languages', icon: LanguagesIcon },
  ];

  return (
    <div className="space-y-5 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 border border-slate-800 transition-all">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar: Resume Title, Template, Autosave Status, and Actions */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Left Side: Back button + Editable Title & Subtitle */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/dashboard"
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors shrink-0"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={resume.title}
                onChange={(e) => setResume({ ...resume, title: e.target.value })}
                className="font-extrabold text-base sm:text-lg text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-white border border-transparent hover:border-slate-200 focus:border-indigo-500 rounded-lg px-2 py-0.5 focus:outline-hidden transition-colors truncate max-w-sm"
                title="Click to rename resume"
              />
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                {resume.atsScore ? `${resume.atsScore}% ATS` : '85% ATS'}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 mt-1 px-2">
              {/* Template dropdown selector */}
              <div className="flex items-center gap-1.5">
                <LayoutTemplate className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-slate-400">Template:</span>
                <select
                  value={resume.templateId}
                  onChange={(e) => {
                    setResume({ ...resume, templateId: e.target.value });
                    showToast(`Switched template to ${mockTemplates.find((t) => t.id === e.target.value)?.name}`);
                  }}
                  className="font-semibold text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-md px-2 py-0.5 text-xs focus:outline-hidden focus:border-indigo-500 cursor-pointer"
                >
                  {mockTemplates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.category})
                    </option>
                  ))}
                </select>
              </div>

              <span>·</span>

              {/* Autosave status indicator */}
              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                {saveStatus === 'saved' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Saved locally</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    <span>Saving...</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Completion Pill, ATS Scan Link, and Export Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Completion Progress pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-medium">Completion:</span>
            <div className="w-16 bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-800">{completionPercentage}%</span>
          </div>

          {/* ATS Scan button */}
          <Link to={`/analyzer?id=${resume.id}`}>
            <Button
              variant="outline"
              size="sm"
              icon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
              className="text-xs"
            >
              ATS Audit
            </Button>
          </Link>

          {/* Toggle Live Preview on Desktop */}
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {showLivePreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showLivePreview ? 'Hide Preview' : 'Show Preview'}</span>
          </button>

          {/* Download PDF button */}
          <Button
            variant="primary"
            size="sm"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            icon={
              isExportingPdf ? (
                <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 text-white" />
              )
            }
            className="bg-indigo-600 hover:bg-indigo-700 text-xs shadow-sm font-semibold disabled:opacity-75 cursor-pointer"
          >
            {isExportingPdf ? (pdfProgressStep || 'Exporting PDF...') : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Mobile View Toggle Switch (Editor vs Live Preview) */}
      <div className="flex lg:hidden rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-medium">
        <button
          onClick={() => setMobileViewTab('editor')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            mobileViewTab === 'editor'
              ? 'bg-white text-slate-900 font-bold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Editor Panel
        </button>
        <button
          onClick={() => setMobileViewTab('preview')}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            mobileViewTab === 'preview'
              ? 'bg-white text-slate-900 font-bold shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Live A4 Preview
        </button>
      </div>

      {/* Main Split-Screen Builder Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* =========================================================================
            LEFT COLUMN: Resume Editing Panel
           ========================================================================= */}
        <div
          ref={editorContainerRef}
          className={`${
            showLivePreview ? 'lg:col-span-6 xl:col-span-6' : 'lg:col-span-10 lg:col-start-2'
          } ${mobileViewTab === 'preview' ? 'hidden lg:block' : 'block'} space-y-4`}
        >
          {/* Template Selection Module */}
          <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
            <TemplateSelector
              currentTemplateId={resume.templateId}
              onSelectTemplate={(newTemplateId) => {
                setResume((prev) => ({
                  ...prev,
                  templateId: newTemplateId,
                  lastModified: new Date().toISOString(),
                }));
                const tplName = mockTemplates.find((t) => t.id === newTemplateId)?.name || newTemplateId;
                showToast(`Applied ${tplName} template`);
              }}
            />
          </div>

          {/* Quick Jump Section Pills Navigation */}
          <div className="bg-white rounded-xl border border-slate-200 p-2.5 shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-1">
              Quick Navigation
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {allSectionsNav.map((sec) => {
                const Icon = sec.icon;
                const isOpen = openSections[sec.key];
                return (
                  <button
                    key={sec.key}
                    type="button"
                    onClick={() => handleJumpToSection(sec.key)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isOpen
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                        : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 1. Personal Information */}
          <SectionAccordion
            id="personal"
            title="Personal Information"
            subtitle="Full name, target title, contact info, and social profiles"
            icon={User}
            isOpen={Boolean(openSections.personal)}
            onToggle={() => toggleSection('personal')}
            isComplete={Boolean(
              resume.content.personalInfo.fullName &&
              resume.content.personalInfo.email &&
              resume.content.personalInfo.phone
            )}
          >
            <div className="space-y-4 pt-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Full Name"
                  value={resume.content.personalInfo.fullName}
                  onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
                  placeholder="e.g. Alex Morgan"
                />
                <Input
                  label="Professional Title"
                  value={resume.content.personalInfo.jobTitle}
                  onChange={(e) => handlePersonalInfoChange('jobTitle', e.target.value)}
                  placeholder="e.g. Senior Full Stack Engineer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Email Address"
                  type="email"
                  value={resume.content.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                  placeholder="e.g. alex@example.com"
                />
                <Input
                  label="Phone Number"
                  value={resume.content.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                  placeholder="e.g. +1 (555) 234-5678"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <Input
                  label="Location"
                  value={resume.content.personalInfo.location}
                  onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                  placeholder="e.g. San Francisco, CA / Remote"
                />
                <Input
                  label="Portfolio / Website URL"
                  value={resume.content.personalInfo.website || ''}
                  onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                  placeholder="e.g. https://alexwright.dev"
                />
              </div>

              {/* Social links row */}
              <div className="pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  Social & Developer Profiles
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="LinkedIn URL"
                    value={getSocialLink('LinkedIn')}
                    onChange={(e) => setSocialLink('LinkedIn', e.target.value)}
                    placeholder="e.g. https://linkedin.com/in/alexwright"
                  />
                  <Input
                    label="GitHub URL"
                    value={getSocialLink('GitHub')}
                    onChange={(e) => setSocialLink('GitHub', e.target.value)}
                    placeholder="e.g. https://github.com/alexwright"
                  />
                </div>
              </div>
            </div>
          </SectionAccordion>

          {/* 2. Professional Summary */}
          <SectionAccordion
            id="summary"
            title="Professional Summary"
            subtitle="Executive elevator pitch highlighting your key strengths"
            icon={AlignLeft}
            isOpen={Boolean(openSections.summary)}
            onToggle={() => toggleSection('summary')}
            isComplete={Boolean(resume.content.personalInfo.summary?.length > 25)}
          >
            <div className="space-y-3 pt-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-700">Summary Statement</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSummaryGenModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 hover:text-purple-800 text-xs font-semibold transition-colors cursor-pointer border border-purple-200/80 shadow-2xs"
                    title="Generate a custom summary with AI based on your role, experience level, and skills"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-purple-600" />
                    <span>Generate with AI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryAiModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 text-xs font-semibold transition-colors cursor-pointer border border-indigo-200/80 shadow-2xs"
                    title="Enhance summary with ATS keywords, stronger action verbs, and impact"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Improve with AI</span>
                  </button>
                </div>
              </div>
              <textarea
                rows={4}
                value={resume.content.personalInfo.summary}
                onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                placeholder="Results-driven Software Engineer with 6+ years of experience architecting distributed systems and cloud platforms. Proven track record improving latency and scaling products to 2M+ users."
                className="w-full px-3.5 py-2.5 text-xs text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 leading-relaxed"
              />
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Recommended: 2–4 concise sentences with keywords.</span>
                <span>{resume.content.personalInfo.summary?.length || 0} characters</span>
              </div>
            </div>
          </SectionAccordion>

          {/* 3. Education */}
          <SectionAccordion
            id="education"
            title="Education"
            subtitle="Degrees, colleges, universities, and academic honors"
            icon={GraduationCap}
            isOpen={Boolean(openSections.education)}
            onToggle={() => toggleSection('education')}
            itemCount={resume.content.education.length}
            isComplete={resume.content.education.length > 0}
          >
            <div className="pt-3">
              <EducationSection
                education={resume.content.education}
                onChange={(items) => updateContent('education', items)}
              />
            </div>
          </SectionAccordion>

          {/* 4. Experience */}
          <SectionAccordion
            id="experience"
            title="Experience"
            subtitle="Past roles, achievements, quantified results, and impact"
            icon={Briefcase}
            isOpen={Boolean(openSections.experience)}
            onToggle={() => toggleSection('experience')}
            itemCount={resume.content.experience.length}
            isComplete={resume.content.experience.length > 0}
          >
            <div className="pt-3">
              <ExperienceSection
                experience={resume.content.experience}
                onChange={(items) => updateContent('experience', items)}
              />
            </div>
          </SectionAccordion>

          {/* 5. Skills */}
          <SectionAccordion
            id="skills"
            title="Skills & Competencies"
            subtitle="Technical stack, languages, tools, and soft skills"
            icon={Wrench}
            isOpen={Boolean(openSections.skills)}
            onToggle={() => toggleSection('skills')}
            itemCount={resume.content.skills.reduce((acc, c) => acc + c.skills.length, 0)}
            isComplete={resume.content.skills.some((c) => c.skills.length > 0)}
          >
            <div className="pt-3">
              <SkillsSection
                skills={resume.content.skills}
                onChange={(cats) => updateContent('skills', cats)}
              />
            </div>
          </SectionAccordion>

          {/* 6. Projects */}
          <SectionAccordion
            id="projects"
            title="Key Projects"
            subtitle="Portfolio showcase, open-source work, and architecture"
            icon={FolderGit2}
            isOpen={Boolean(openSections.projects)}
            onToggle={() => toggleSection('projects')}
            itemCount={resume.content.projects.length}
            isComplete={resume.content.projects.length > 0}
          >
            <div className="pt-3">
              <ProjectsSection
                projects={resume.content.projects}
                onChange={(items) => updateContent('projects', items)}
              />
            </div>
          </SectionAccordion>

          {/* 7. Certifications */}
          <SectionAccordion
            id="certifications"
            title="Certifications & Credentials"
            subtitle="Cloud licenses, certifications, and accreditations"
            icon={Award}
            isOpen={Boolean(openSections.certifications)}
            onToggle={() => toggleSection('certifications')}
            itemCount={resume.content.certifications?.length || 0}
            isComplete={(resume.content.certifications?.length || 0) > 0}
          >
            <div className="pt-3">
              <CertificationsSection
                certifications={resume.content.certifications || []}
                onChange={(items) => updateContent('certifications', items)}
              />
            </div>
          </SectionAccordion>

          {/* 8. Achievements */}
          <SectionAccordion
            id="achievements"
            title="Achievements & Honors"
            subtitle="Hackathons, publications, patents, and recognition"
            icon={Trophy}
            isOpen={Boolean(openSections.achievements)}
            onToggle={() => toggleSection('achievements')}
            itemCount={resume.content.achievements?.length || 0}
            isComplete={(resume.content.achievements?.length || 0) > 0}
          >
            <div className="pt-3">
              <AchievementsSection
                achievements={resume.content.achievements || []}
                onChange={(items) => updateContent('achievements', items)}
              />
            </div>
          </SectionAccordion>

          {/* 9. Languages */}
          <SectionAccordion
            id="languages"
            title="Languages"
            subtitle="Spoken and written language proficiency levels"
            icon={LanguagesIcon}
            isOpen={Boolean(openSections.languages)}
            onToggle={() => toggleSection('languages')}
            itemCount={resume.content.languages?.length || 0}
            isComplete={(resume.content.languages?.length || 0) > 0}
          >
            <div className="pt-3">
              <LanguagesSection
                languages={resume.content.languages || []}
                onChange={(items) => updateContent('languages', items)}
              />
            </div>
          </SectionAccordion>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: Live Resume Preview (A4 Sheet Document View)
           ========================================================================= */}
        {showLivePreview && (
          <div
            className={`lg:col-span-6 xl:col-span-6 ${
              mobileViewTab === 'editor' ? 'hidden lg:block' : 'block'
            } lg:sticky lg:top-20 space-y-3`}
          >
            {/* Preview Toolbar: Zoom, Template Selector & Full View */}
            <div className="bg-white rounded-xl border border-slate-200/90 px-4 py-2.5 shadow-2xs flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <FileText className="w-4 h-4 text-indigo-600" />
                <span>Live A4 Preview</span>
                <span className="text-[10px] font-normal text-slate-400">
                  ({Math.round(zoomLevel * 100)}%)
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-2 py-1 text-[11px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>

                <span className="w-px h-4 bg-slate-200 mx-1" />

                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isExportingPdf}
                  className="px-2 py-1 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold cursor-pointer disabled:opacity-50"
                  title="Download A4 PDF"
                >
                  {isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 text-indigo-600 animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-indigo-600" />
                  )}
                  <span>PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsFullPreviewModal(true)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Full Screen Preview"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* A4 Paper Document Canvas Container */}
            <div className="bg-slate-200/80 rounded-2xl p-4 sm:p-6 border border-slate-300/80 shadow-inner overflow-x-auto min-h-[640px] flex justify-center">
              <ResumeLivePreview resume={resume} scale={zoomLevel} />
            </div>
          </div>
        )}
      </div>

      {/* =========================================================================
          FULL PREVIEW MODAL
         ========================================================================= */}
      {isFullPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center p-4 sm:p-6 overflow-y-auto">
          {/* Modal Header */}
          <div className="w-full max-w-4xl bg-white rounded-xl p-4 mb-4 flex items-center justify-between shadow-xl border border-slate-200">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span className="font-bold text-sm text-slate-900">{resume.title} — Full Preview</span>
              <span className="text-xs text-slate-500">({currentTemplate.name})</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => window.print()}
                icon={<Printer className="w-3.5 h-3.5" />}
              >
                Print
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleDownloadPdf}
                disabled={isExportingPdf}
                icon={
                  isExportingPdf ? (
                    <Loader2 className="w-3.5 h-3.5 text-white animate-spin" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-white" />
                  )
                }
              >
                {isExportingPdf ? 'Exporting PDF...' : 'Download PDF'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsFullPreviewModal(false)}
                icon={<Minimize2 className="w-3.5 h-3.5" />}
              >
                Close
              </Button>
            </div>
          </div>

          {/* Scaled Preview Sheet */}
          <div className="w-full max-w-4xl flex justify-center pb-8">
            <ResumeLivePreview resume={resume} scale={1} id="resume-a4-modal-sheet" />
          </div>
        </div>
      )}

      {/* Off-screen dedicated A4 export sheet for reliable background/mobile PDF generation */}
      <div
        id="resume-pdf-export-wrapper"
        aria-hidden="true"
        className="fixed top-0 -z-50 pointer-events-none overflow-hidden"
        style={{ width: '794px', left: '-9999px' }}
      >
        <ResumeLivePreview
          id="resume-pdf-export-sheet"
          resume={resume}
          scale={1}
        />
      </div>

      {/* PDF Export Feedback Toast */}
      {pdfNotification && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 text-xs font-medium px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border transition-all ${
            pdfNotification.type === 'loading'
              ? 'bg-slate-900 text-white border-slate-700'
              : pdfNotification.type === 'success'
              ? 'bg-emerald-950 text-emerald-100 border-emerald-700'
              : 'bg-rose-950 text-rose-100 border-rose-700'
          }`}
        >
          {pdfNotification.type === 'loading' && (
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
          )}
          {pdfNotification.type === 'success' && (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          )}
          {pdfNotification.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
          )}
          <div>
            <div className="font-bold text-xs text-white">
              {pdfNotification.title}
            </div>
            <div className="text-[11px] opacity-90 mt-0.5">
              {pdfNotification.message}
            </div>
          </div>
        </div>
      )}

      {/* AI Improvement Modal for Professional Summary */}
      <AIImprovementModal
        isOpen={summaryAiModalOpen}
        onClose={() => setSummaryAiModalOpen(false)}
        onApply={(improved) => {
          handlePersonalInfoChange('summary', improved);
          showToast('✨ Applied AI improvement to Professional Summary');
        }}
        title="Professional Summary"
        originalContent={resume.content.personalInfo.summary || ''}
        sectionType="summary"
        context={{
          roleTitle: resume.content.personalInfo.jobTitle,
        }}
      />

      {/* AI Professional Summary Generator Modal */}
      <AISummaryGeneratorModal
        isOpen={summaryGenModalOpen}
        onClose={() => setSummaryGenModalOpen(false)}
        onApply={(generated) => {
          handlePersonalInfoChange('summary', generated);
          showToast('✨ Generated and applied new Professional Summary');
        }}
        currentSummary={resume.content.personalInfo.summary || ''}
        defaultJobRole={resume.content.personalInfo.jobTitle || ''}
        defaultSkills={resume.content.skills?.map((s) => s.name) || []}
      />
    </div>
  );
};
