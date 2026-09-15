import React, { useState } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Navbar } from '../components/navigation/Navbar';
import { useAuth } from '../context/AuthContext';
import { Sparkles } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();

  const getPageMeta = (pathname: string): { title: string; subtitle: string } => {
    if (pathname === '/dashboard') return { title: 'Dashboard', subtitle: 'Overview of your resumes, ATS scores, and recent job match scans' };
    if (pathname.startsWith('/builder')) return { title: 'Resume Builder', subtitle: 'Compose and format your high-impact resume' };
    if (pathname === '/templates') return { title: 'Resume Templates', subtitle: 'Pick modern, ATS-tested resume layout designs' };
    if (pathname === '/analyzer') return { title: 'Resume Analyzer', subtitle: 'Scan resume readability, keyword impact, and ATS score' };
    if (pathname === '/matcher') return { title: 'Job Description Matcher', subtitle: 'Compare resume against job posting requirements' };
    if (pathname === '/history') return { title: 'Resume History', subtitle: 'Version records, recent edits, and analysis logs' };
    if (pathname === '/settings') return { title: 'Settings', subtitle: 'Profile settings, target industries, and preferences' };
    return { title: 'ResumeAI', subtitle: 'AI Resume Builder & Analyzer' };
  };

  const meta = getPageMeta(location.pathname);

  // Prevent flashing demo data while Firebase Auth restores the session
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md animate-pulse">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
            <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            <span>Loading workspace...</span>
          </div>
        </div>
      </div>
    );
  }

  // Redirect unauthenticated visitors to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden print:h-auto print:overflow-visible print:bg-white">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full print:hidden">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden flex print:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-64 max-w-[80vw] h-full bg-white shadow-xl">
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden print:h-auto print:overflow-visible">
        <div className="print:hidden">
          <Navbar
            onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            title={meta.title}
            subtitle={meta.subtitle}
          />
        </div>
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 print:p-0 print:overflow-visible print:h-auto">
          <div className="max-w-7xl mx-auto print:max-w-none print:w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
