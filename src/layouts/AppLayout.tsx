import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/navigation/Sidebar';
import { Navbar } from '../components/navigation/Navbar';

export const AppLayout: React.FC = () => {
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
