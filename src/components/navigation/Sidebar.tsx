import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FileEdit,
  LayoutTemplate,
  Sparkles,
  Briefcase,
  History,
  Settings,
  PlusCircle,
  LogOut,
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const mainNavItems = [
    { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
    { label: 'My Resumes', to: '/dashboard#resumes', icon: FileText },
    { label: 'Resume Builder', to: '/builder', icon: FileEdit },
    { label: 'Templates', to: '/templates', icon: LayoutTemplate },
    { label: 'AI Analyzer', to: '/analyzer', icon: Sparkles, badge: 'AI' },
    { label: 'Job Matcher', to: '/matcher', icon: Briefcase },
    { label: 'History', to: '/history', icon: History },
  ];

  const handleLogout = async () => {
    await logout();
    if (onCloseMobile) onCloseMobile();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between">
        <NavLink to="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:bg-indigo-700 transition-colors">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-slate-900 tracking-tight text-base">ResumeAI</span>
              <span className="text-[9px] uppercase font-bold text-indigo-600 bg-indigo-50 px-1 py-0.2 rounded border border-indigo-100">
                Studio
              </span>
            </div>
            <span className="block text-[10px] text-slate-400 font-medium leading-none mt-0.5">
              AI Resume Studio
            </span>
          </div>
        </NavLink>
      </div>

      {/* Quick Action Button */}
      <div className="p-4 pb-2">
        <NavLink
          to="/builder?new=true"
          onClick={onCloseMobile}
          className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-xs group"
        >
          <PlusCircle className="w-4 h-4 text-indigo-200 group-hover:text-white transition-colors" />
          <span>Create New Resume</span>
        </NavLink>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {mainNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                cn(
                  'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-indigo-50/70 text-indigo-950 font-semibold border border-indigo-100/80 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon className={cn('w-4 h-4 shrink-0', isActive ? 'text-indigo-600' : 'text-slate-400')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-indigo-100/70 text-indigo-700 border border-indigo-200">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Nav: Settings and Logout */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <NavLink
          to="/settings"
          onClick={onCloseMobile}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              isActive
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            )
          }
        >
          <Settings className="w-4 h-4 shrink-0 text-slate-400" />
          <span>Settings</span>
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50/70 transition-colors text-left"
        >
          <LogOut className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-rose-600" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};
