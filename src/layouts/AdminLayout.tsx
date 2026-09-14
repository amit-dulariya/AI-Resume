import React, { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Users,
  FileText,
  LayoutTemplate,
  BarChart3,
  Settings,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  Bell,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { getStoredUser, logout } from '../utils/auth';
import { Badge } from '../components/common/Badge';

export const AdminLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', to: '/admin/users', icon: Users, badge: '3.2k' },
    { label: 'Resumes', to: '/admin/resumes', icon: FileText, badge: '7.1k' },
    { label: 'Templates', to: '/admin/templates', icon: LayoutTemplate },
    { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', to: '/admin/settings', icon: Settings },
  ];

  const getPageInfo = (pathname: string) => {
    if (pathname.includes('/admin/users')) return { title: 'User Management', subtitle: 'Manage member accounts, permissions, and tier plans' };
    if (pathname.includes('/admin/resumes')) return { title: 'Resume Registry', subtitle: 'Audit generated resumes, target roles, and ATS scores' };
    if (pathname.includes('/admin/templates')) return { title: 'Resume Templates', subtitle: 'Configure, toggle, and curate ATS-friendly layout presets' };
    if (pathname.includes('/admin/analytics')) return { title: 'AI & ATS Analytics', subtitle: 'Monitor scan usage, score distributions, and feature adoption' };
    if (pathname.includes('/admin/settings')) return { title: 'Admin Settings', subtitle: 'Platform preferences, AI thresholds, and security policies' };
    return { title: 'Admin Overview', subtitle: 'System metrics, platform performance, and real-time activity' };
  };

  const pageInfo = getPageInfo(location.pathname);

  const SidebarContent = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full bg-slate-900 text-slate-200 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800 justify-between">
        <NavLink to="/admin/dashboard" onClick={onClose} className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white tracking-tight text-base">ResumeAI</span>
              <span className="text-[10px] uppercase font-bold text-indigo-300 bg-indigo-900/60 px-1.5 py-0.5 rounded border border-indigo-700/50">
                Admin
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 font-medium leading-none mt-0.5">
              Management Portal
            </span>
          </div>
        </NavLink>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Admin Nav Section */}
      <div className="px-3 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Admin Navigation
      </div>
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to === '/admin/dashboard' && location.pathname === '/admin');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all group',
                isActive
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={cn(
                    'text-[10px] font-semibold px-1.5 py-0.2 rounded',
                    isActive ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-400'
                  )}
                >
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Switch to User Workspace & Logout */}
      <div className="p-3 border-t border-slate-800 space-y-1.5">
        <NavLink
          to="/dashboard"
          onClick={onClose}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ArrowLeft className="w-3.5 h-3.5 text-indigo-400" />
            <span>Switch to User App</span>
          </div>
          <ExternalLink className="w-3 h-3 text-slate-500" />
        </NavLink>

        <div className="pt-2 px-3 pb-1 border-t border-slate-800/60 flex items-center justify-between">
          <div className="min-w-0 pr-2">
            <div className="text-xs font-semibold text-white truncate">{user?.name || 'Administrator'}</div>
            <div className="text-[10px] text-slate-400 truncate">{user?.email || 'admin@resumeai.io'}</div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign out"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-full shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50 w-72 max-w-[85vw] h-full shadow-2xl">
            <SidebarContent onClose={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden focus:outline-none"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight truncate">
                  {pageInfo.title}
                </h1>
                <Badge variant="brand" size="sm" className="hidden sm:inline-flex">Admin Mode</Badge>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block truncate">{pageInfo.subtitle}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/70 rounded-full text-[11px] font-medium text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Status: Healthy</span>
            </div>

            <NavLink
              to="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>User App</span>
            </NavLink>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
