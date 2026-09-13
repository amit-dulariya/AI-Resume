import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Menu,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  Sparkles,
  ExternalLink,
  FileText,
  Briefcase,
  CheckCircle2,
  X,
  Clock,
} from 'lucide-react';
import { mockUserSettings, mockResumes } from '../../data/mockData';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  title?: string;
  subtitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  title,
  subtitle,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const notifications = [
    {
      id: 'notif-1',
      title: 'ATS Score Reached 92%',
      message: 'Senior Full Stack Engineer Resume passed all 30 ATS audit metrics.',
      time: '15m ago',
      read: false,
      type: 'success',
    },
    {
      id: 'notif-2',
      title: 'New High Job Match Found',
      message: '94% compatibility with Senior Software Engineer at Stripe.',
      time: '2h ago',
      read: false,
      type: 'match',
    },
    {
      id: 'notif-3',
      title: 'AI Phrase Optimization',
      message: '3 bullet points were enhanced with quantified impact verbs.',
      time: '1d ago',
      read: true,
      type: 'ai',
    },
  ];

  // Quick search results
  const filteredResumes = searchQuery.trim()
    ? mockResumes.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.targetRole.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Keyboard shortcut listener (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
        setShowSearchDropdown(true);
      }
      if (e.key === 'Escape') {
        setShowSearchDropdown(false);
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between z-20 sticky top-0">
      {/* Left side: Mobile Toggle & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleMobileSidebar}
          className="p-2 -ml-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 md:hidden focus:outline-none"
          aria-label="Toggle Navigation"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          {title ? (
            <div>
              <h1 className="text-base font-semibold text-slate-900 leading-tight truncate">{title}</h1>
              {subtitle && <p className="text-xs text-slate-500 hidden sm:block truncate">{subtitle}</p>}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="text-sm font-semibold text-slate-800">ResumeAI Studio</span>
            </div>
          )}
        </div>
      </div>

      {/* Middle: Quick Search Input */}
      <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Search resumes, jobs, tools..."
            className="w-full pl-9 pr-12 py-1.5 text-xs bg-slate-50 border border-slate-200 hover:border-slate-300 focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg text-slate-900 placeholder:text-slate-400 transition-all outline-hidden"
          />
          {searchQuery ? (
            <button
              onClick={() => {
                setSearchQuery('');
                setShowSearchDropdown(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          )}
        </div>

        {/* Quick Search Dropdown */}
        {showSearchDropdown && (
          <>
            <div
              className="fixed inset-0 z-20"
              onClick={() => setShowSearchDropdown(false)}
            />
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-xl shadow-xl border border-slate-200 p-2 z-30 divide-y divide-slate-100 max-h-80 overflow-y-auto">
              {searchQuery.trim() ? (
                <div>
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Matching Resumes
                  </div>
                  {filteredResumes.length > 0 ? (
                    <div className="space-y-1 mt-1">
                      {filteredResumes.map((resume) => (
                        <button
                          key={resume.id}
                          onClick={() => {
                            setShowSearchDropdown(false);
                            setSearchQuery('');
                            navigate(`/builder?id=${resume.id}`);
                          }}
                          className="w-full text-left flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 truncate">
                                {resume.title}
                              </p>
                              <p className="text-[11px] text-slate-500 truncate">{resume.targetRole}</p>
                            </div>
                          </div>
                          {resume.atsScore && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {resume.atsScore}% ATS
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="py-4 text-center text-xs text-slate-500">
                      No matching resumes found for "{searchQuery}"
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-1 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Quick AI Tools
                  </div>
                  <button
                    onClick={() => {
                      setShowSearchDropdown(false);
                      navigate('/analyzer');
                    }}
                    className="w-full text-left flex items-center gap-2.5 p-2 rounded-lg hover:bg-indigo-50/60 transition-colors text-xs text-slate-700 hover:text-indigo-700"
                  >
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span>Scan Resume with AI Analyzer</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSearchDropdown(false);
                      navigate('/matcher');
                    }}
                    className="w-full text-left flex items-center gap-2.5 p-2 rounded-lg hover:bg-blue-50/60 transition-colors text-xs text-slate-700 hover:text-blue-700"
                  >
                    <Briefcase className="w-4 h-4 text-blue-600" />
                    <span>Match against Job Description</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowSearchDropdown(false);
                      navigate('/builder?new=true');
                    }}
                    className="w-full text-left flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-50 transition-colors text-xs text-slate-700"
                  >
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Start New Resume Draft</span>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Right side: Landing preview, Notifications & User Profile */}
      <div className="flex items-center gap-1.5 sm:gap-3">
        {/* Quick link to Landing */}
        <NavLink
          to="/"
          className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-2.5 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
          title="View Landing Page"
        >
          <span>Landing Page</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </NavLink>

        {/* Quick ATS Scan button */}
        <button
          onClick={() => navigate('/analyzer')}
          className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Quick ATS Scan</span>
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white"></span>
            )}
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-30 divide-y divide-slate-100">
                <div className="px-4 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={() => setUnreadCount(0)}
                      className="text-[11px] text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="py-1 max-h-72 overflow-y-auto divide-y divide-slate-50">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 text-left hover:bg-slate-50 transition-colors flex gap-2.5 ${
                        !notif.read && unreadCount > 0 ? 'bg-indigo-50/30' : ''
                      }`}
                    >
                      <div className="mt-0.5">
                        {notif.type === 'success' ? (
                          <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </div>
                        ) : notif.type === 'match' ? (
                          <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                            <Briefcase className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                            <Sparkles className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-slate-900 truncate">{notif.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notif.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">{notif.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 py-2 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      navigate('/history');
                    }}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                  >
                    View All Activity Logs →
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* User Profile / Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold ring-2 ring-slate-200">
              {mockUserSettings.name.charAt(0)}
            </div>
            <span className="text-sm font-medium text-slate-700 hidden md:inline-block">
              {mockUserSettings.name.split(' ')[0]}
            </span>
          </button>

          {showProfileMenu && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setShowProfileMenu(false)}
              />
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 divide-y divide-slate-100">
                <div className="px-4 py-2.5">
                  <p className="text-xs font-semibold text-slate-900">{mockUserSettings.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{mockUserSettings.email}</p>
                  <div className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                    <Sparkles className="w-2.5 h-2.5" />
                    <span>Pro Member</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/settings');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Account Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/history');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>History & Versions</span>
                  </button>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
