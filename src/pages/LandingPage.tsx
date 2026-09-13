import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  CheckCircle2,
  FileCheck,
  ArrowRight,
  Shield,
  Briefcase,
  Layers,
  BarChart3,
  Star,
  ChevronRight,
  Menu,
  X,
  Zap,
  Target,
  FileText,
  UploadCloud,
  Download,
  Check,
  Building2,
  ExternalLink,
  Laptop,
  Cpu,
  Feather,
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { mockTemplates } from '../data/mockData';
import { HeroResumeVisual } from '../components/landing/HeroResumeVisual';

export const LandingPage: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Take 4 curated templates for the preview section
  const previewTemplates = mockTemplates.slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-indigo-100 selection:text-indigo-900">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-indigo-700 transition-colors">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">ResumeAI</span>
              <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded border border-indigo-100 hidden sm:inline-block">
                Studio
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">
              How It Works
            </a>
            <a href="#templates" className="hover:text-slate-900 transition-colors">
              Templates
            </a>
            <Link to="/analyzer" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
              <span>ATS Score</span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="brand"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link to="/builder">
              <Button variant="brand" size="sm">
                Build
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-md">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#templates"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Templates
              </a>
              <Link
                to="/analyzer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <span>ATS Resume Analyzer</span>
                <Badge variant="brand" size="sm">Free Scan</Badge>
              </Link>
              <Link
                to="/matcher"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Job Description Matcher
              </Link>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Log In
                </Button>
              </Link>
              <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="brand" size="sm" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-gradient-to-b from-white via-slate-50/70 to-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Column */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Category Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-200/80 text-xs font-semibold text-indigo-800 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Next-Gen AI Resume Platform</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
                Build an ATS-Beating Resume with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700">
                  Precision AI.
                </span>
              </h1>

              {/* Short Supporting Text */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                Transform passive bullets into high-impact achievements. Get instant ATS scores, recruiter-tested phrasing, and automated keyword matching tailored to your target job descriptions.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link to="/builder" className="w-full sm:w-auto">
                  <Button
                    variant="brand"
                    size="lg"
                    className="w-full sm:w-auto font-semibold px-6 shadow-sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Build My Resume
                  </Button>
                </Link>

                <Link to="/analyzer" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto font-medium px-5"
                    icon={<FileCheck className="w-4 h-4 text-indigo-600" />}
                  >
                    Analyze My Resume
                  </Button>
                </Link>
              </div>

              {/* Supporting Highlights Checklist */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-5 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Free ATS score check
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Instant PDF export
                </span>
              </div>
            </div>

            {/* Right Hero Column: Professional Resume / AI Visual */}
            <div className="lg:col-span-6">
              <HeroResumeVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST & STATS SECTION */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          {/* Top Stat Metric Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-slate-100 text-center">
            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">25+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Resume Templates</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Recruiter-approved formats</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">150K+</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">AI Analyses Run</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Continuous scoring feedback</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">98.4%</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">ATS Optimization</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Zero parse or table errors</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50/60 border border-slate-100">
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">3.2x</div>
              <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-1">Job Matching Boost</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Higher recruiter callback rate</div>
            </div>
          </div>

          {/* Compatible ATS & Hiring Engines Trust Row */}
          <div className="pt-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-5">
              Tested & Verified Against Leading Applicant Tracking Systems
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs font-semibold text-slate-500">
              {['Greenhouse', 'Lever', 'Workday', 'Ashby', 'Taleo', 'iCIMS', 'BambooHR'].map((ats) => (
                <div
                  key={ats}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/80 bg-slate-50/50 hover:bg-slate-100/70 transition-colors"
                >
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-slate-700">{ats}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURES SECTION */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Engineered for Candidate Success</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Powerful Intelligence for Every Stage of Your Resume
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
              From blank canvas to final submission, ResumeAI ensures every bullet, skill, and section passes automated screening and catches the recruiter's eye.
            </p>
          </div>

          {/* 5 Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1: AI Resume Builder */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5 border border-indigo-100 shadow-2xs">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Resume Builder</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Interactive multi-section editor with guided step-by-step forms, real-time typography scaling, and live visual preview side-by-side.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-indigo-600">Dynamic Section Ordering</span>
                <Link to="/builder" className="text-slate-800 hover:text-indigo-600 flex items-center gap-1">
                  Try Builder <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 2: AI Resume Analyzer */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 border border-emerald-100 shadow-2xs">
                  <FileCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Resume Analyzer</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Audits your document against 30+ recruiting criteria: metric density, passive voice elimination, bullet brevity, and contact completeness.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-emerald-700">30-Point Deep Scan</span>
                <Link to="/analyzer" className="text-slate-800 hover:text-indigo-600 flex items-center gap-1">
                  Run Scan <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 3: ATS Score */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-5 border border-purple-100 shadow-2xs">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Objective ATS Score</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Transparent 0-100 scoring with categorical breakdowns for Readability, Impact, Style, and Keyword Coverage to pinpoint exact improvements.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-purple-700">Instant Metric Diagnostics</span>
                <Link to="/analyzer" className="text-slate-800 hover:text-indigo-600 flex items-center gap-1">
                  Check Score <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 4: Job Description Matcher */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-5 border border-blue-100 shadow-2xs">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Job Description Matcher</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Paste any job opening description to discover exactly which required technical keywords, leadership terms, or certifications your resume is missing.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-blue-700">Keyword Gap Analysis</span>
                <Link to="/matcher" className="text-slate-800 hover:text-indigo-600 flex items-center gap-1">
                  Match Job <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Feature 5: AI Suggestions & Rewriting */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-2">
              <div>
                <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 border border-amber-100 shadow-2xs">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">AI Suggestions & Action Verbs</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                  Intelligent sentence enhancers rewrite passive duties into quantifiable executive statements. Automatically substitute overused buzzwords with high-converting action verbs like <em>"Spearheaded"</em>, <em>"Orchestrated"</em>, and <em>"Accelerated"</em>.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
                <span className="text-amber-700">One-Click Phrasing Amplification</span>
                <Link to="/builder" className="text-slate-800 hover:text-indigo-600 flex items-center gap-1">
                  Experience in Builder <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 mb-3">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              <span>Simple 4-Step Workflow</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              From Draft to Dream Offer in Minutes
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3.5 leading-relaxed">
              Follow our seamless four-step blueprint designed to elevate your resume from unseen application to recruiter interview invitation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <UploadCloud className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Create or Upload</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Start from scratch with guided step-by-step inputs or upload an existing resume to parse into structured fields automatically.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <Sparkles className="w-5 h-5 text-indigo-500 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">AI Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our recruiting engine performs a comprehensive scan evaluating ATS readability, keyword density, formatting, and impact metrics.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <Zap className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Polish & Improve</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accept tailored bullet rewrites, inject recommended industry keywords, and strengthen action verbs to maximize your ATS score.
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:shadow-sm transition-all relative group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <Download className="w-5 h-5 text-emerald-500 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Download & Apply</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Export ATS-certified PDF or print-ready layouts tailored specifically to your dream role with guaranteed formatting fidelity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TEMPLATES PREVIEW SECTION */}
      <section id="templates" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-semibold text-indigo-700 mb-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Recruiter Approved</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                Curated ATS-Tested Templates
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Zero parsing errors, clean hierarchy, and refined typography designed to pass ATS and impress recruiters.
              </p>
            </div>

            <Link to="/templates">
              <Button
                variant="outline"
                size="sm"
                icon={<ChevronRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View All Templates
              </Button>
            </Link>
          </div>

          {/* 4 Template Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {previewTemplates.map((template) => (
              <div
                key={template.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 bg-slate-100 overflow-hidden relative border-b border-slate-100">
                    <img
                      src={template.thumbnail}
                      alt={template.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="brand" size="sm">
                        {template.category}
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-emerald-700 border border-emerald-200 shadow-2xs">
                        ✓ ATS 100%
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 text-sm">{template.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <Link to={`/builder?template=${template.id}`}>
                    <Button variant="secondary" size="sm" className="w-full group-hover:bg-indigo-50 group-hover:text-indigo-700 group-hover:border-indigo-200">
                      <span>Use Template</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-xl">
            {/* Subtle atmospheric accents (clean, not slop) */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-semibold backdrop-blur-xs border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                <span>Accelerate Your Career Today</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Ready to build a resume that gets you hired?
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
                Join over 100,000 professionals securing high-compensation offers with AI-optimized phrasing and certified ATS formatting.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
                <Link to="/builder" className="w-full sm:w-auto">
                  <Button
                    variant="brand"
                    size="lg"
                    className="w-full sm:w-auto px-7 font-bold text-white shadow-md bg-indigo-500 hover:bg-indigo-600"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Build My Resume Free
                  </Button>
                </Link>

                <Link to="/analyzer" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto px-6 bg-white/10 hover:bg-white/15 text-white border-white/20"
                    icon={<FileCheck className="w-4 h-4 text-indigo-300" />}
                  >
                    Analyze My Resume
                  </Button>
                </Link>
              </div>

              <p className="text-xs text-slate-400 pt-2 font-medium">
                Free to start • Instant PDF export • Works with Greenhouse, Lever & Workday
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="mt-auto bg-slate-900 border-t border-slate-800 text-slate-400 py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800">
            {/* Brand column */}
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="font-extrabold text-xl text-white tracking-tight">ResumeAI</span>
              </Link>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                The next-generation AI resume builder and ATS analyzer. Crafting high-converting, recruiter-tested career documents that land top job interviews.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <span className="text-xs text-slate-500 font-medium">Compatible with:</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Greenhouse
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Lever
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  Workday
                </span>
              </div>
            </div>

            {/* Product Column */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold uppercase tracking-wider text-slate-200">Product</div>
              <ul className="space-y-2">
                <li>
                  <Link to="/builder" className="hover:text-white transition-colors">
                    AI Resume Builder
                  </Link>
                </li>
                <li>
                  <Link to="/analyzer" className="hover:text-white transition-colors">
                    ATS Resume Analyzer
                  </Link>
                </li>
                <li>
                  <Link to="/matcher" className="hover:text-white transition-colors">
                    Job Description Matcher
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-white transition-colors">
                    Resume Templates
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:text-white transition-colors">
                    Resume History
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold uppercase tracking-wider text-slate-200">Resources</div>
              <ul className="space-y-2">
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    ATS Optimization Guide
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">
                    Action Verbs Directory
                  </a>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-white transition-colors">
                    Software Engineer Resumes
                  </Link>
                </li>
                <li>
                  <Link to="/templates" className="hover:text-white transition-colors">
                    Executive Resumes
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal & Company Column */}
            <div className="space-y-3 text-xs">
              <div className="font-semibold uppercase tracking-wider text-slate-200">Company</div>
              <ul className="space-y-2">
                <li>
                  <Link to="/dashboard" className="hover:text-white transition-colors">
                    Candidate Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/settings" className="hover:text-white transition-colors">
                    Settings & Preferences
                  </Link>
                </li>
                <li>
                  <span className="text-slate-400 hover:text-white cursor-pointer">
                    Privacy Policy
                  </span>
                </li>
                <li>
                  <span className="text-slate-400 hover:text-white cursor-pointer">
                    Terms of Service
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} ResumeAI, Inc. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-slate-300 transition-colors">
                Twitter / X
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="hover:text-slate-300 transition-colors">
                GitHub
              </a>
              <Link to="/dashboard" className="text-indigo-400 hover:text-indigo-300 font-medium">
                Launch App →
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
