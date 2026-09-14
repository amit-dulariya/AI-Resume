import React, { useState } from 'react';
import {
  User,
  Settings,
  Bell,
  Shield,
  Save,
  CheckCircle2,
  Lock,
  Globe,
  RotateCcw,
  KeyRound,
  Mail,
  AlertCircle,
  X,
} from 'lucide-react';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { getStoredUser } from '../../utils/auth';

export const AdminSettingsPage: React.FC = () => {
  const currentAuthUser = getStoredUser();

  // 1. Admin Profile Information (local mock state)
  const [adminName, setAdminName] = useState(currentAuthUser?.name || 'Administrator');
  const [adminEmail, setAdminEmail] = useState(currentAuthUser?.email || 'admin@resumeai.io');
  const [adminRole, setAdminRole] = useState('Lead Systems Administrator');

  // 2. Application Name & Settings
  const [appName, setAppName] = useState('ResumeAI');
  const [appTagline, setAppTagline] = useState('AI-Powered ATS Resume Builder & Career Matcher');
  const [supportEmail, setSupportEmail] = useState('support@resumeai.io');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  // 3. Notification Preferences
  const [notifyOnNewUser, setNotifyOnNewUser] = useState(true);
  const [notifyOnQuotaAlert, setNotifyOnQuotaAlert] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(false);
  const [notifySecurityAlerts, setNotifySecurityAlerts] = useState(true);

  // 4. Basic Security & Session Settings
  const [sessionTimeout, setSessionTimeout] = useState<'15m' | '30m' | '1h' | '4h'>('30m');
  const [require2FA, setRequire2FA] = useState(true);
  const [maxLoginAttempts, setMaxLoginAttempts] = useState('5');
  const [enforceStrongPassword, setEnforceStrongPassword] = useState(true);

  // UI state for Save feedback
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const handleFieldChange = () => {
    if (!isDirty) setIsDirty(true);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDirty(false);
    setShowSuccessToast(true);
    setTimeout(() => {
      setShowSuccessToast(false);
    }, 3500);
  };

  const handleResetDefaults = () => {
    setAdminName(currentAuthUser?.name || 'Administrator');
    setAdminEmail(currentAuthUser?.email || 'admin@resumeai.io');
    setAdminRole('Lead Systems Administrator');
    setAppName('ResumeAI');
    setAppTagline('AI-Powered ATS Resume Builder & Career Matcher');
    setSupportEmail('support@resumeai.io');
    setMaintenanceMode(false);
    setAllowRegistration(true);
    setNotifyOnNewUser(true);
    setNotifyOnQuotaAlert(true);
    setNotifyWeeklyDigest(false);
    setNotifySecurityAlerts(true);
    setSessionTimeout('30m');
    setRequire2FA(true);
    setMaxLoginAttempts('5');
    setEnforceStrongPassword(true);
    setIsDirty(false);
  };

  return (
    <div className="space-y-6">
      {/* Toast feedback */}
      {showSuccessToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs flex items-center justify-between shadow-2xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold">
              Admin settings and platform preferences saved successfully.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowSuccessToast(false)}
            className="text-emerald-500 hover:text-emerald-800 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Admin Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your admin profile, application configuration, notifications, and security policies.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleResetDefaults}
            icon={<RotateCcw className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Reset Defaults
          </Button>
          <Button
            type="button"
            variant="brand"
            size="sm"
            onClick={handleSaveSettings}
            icon={<Save className="w-3.5 h-3.5" />}
            className="text-xs"
          >
            Save Changes
          </Button>
        </div>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* 1. Admin Profile Information */}
        <Card className="p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Admin Profile Information</h3>
                <p className="text-xs text-slate-500">Identity details for administrative event logging.</p>
              </div>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Super Admin
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-2">
            <div className="w-14 h-14 rounded-full bg-slate-900 text-white flex items-center justify-center text-lg font-black shrink-0 shadow-xs border-2 border-indigo-500">
              {adminName.charAt(0).toUpperCase() || 'A'}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{adminName}</div>
              <div className="text-xs text-slate-500">{adminEmail}</div>
              <div className="text-[11px] text-indigo-600 font-semibold mt-0.5">{adminRole}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <Input
              label="Admin Display Name"
              value={adminName}
              onChange={(e) => {
                setAdminName(e.target.value);
                handleFieldChange();
              }}
              required
            />
            <Input
              label="Admin Account Email"
              type="email"
              value={adminEmail}
              onChange={(e) => {
                setAdminEmail(e.target.value);
                handleFieldChange();
              }}
              required
            />
            <Input
              label="Administrative Title / Role"
              value={adminRole}
              onChange={(e) => {
                setAdminRole(e.target.value);
                handleFieldChange();
              }}
              required
            />
          </div>
        </Card>

        {/* 2. Application Name & Settings */}
        <Card className="p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Application Name & Settings</h3>
              <p className="text-xs text-slate-500">Global brand configuration and access availability.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <Input
              label="Application Name"
              value={appName}
              onChange={(e) => {
                setAppName(e.target.value);
                handleFieldChange();
              }}
              required
            />
            <Input
              label="Application Tagline"
              value={appTagline}
              onChange={(e) => {
                setAppTagline(e.target.value);
                handleFieldChange();
              }}
              required
            />
            <Input
              label="Support / Helpdesk Email"
              type="email"
              value={supportEmail}
              onChange={(e) => {
                setSupportEmail(e.target.value);
                handleFieldChange();
              }}
              required
            />
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs pt-1">
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-slate-900 block">Maintenance Mode</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Temporarily lock out non-admin candidates while performing maintenance or model updates.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setMaintenanceMode(!maintenanceMode);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  maintenanceMode ? 'bg-amber-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    maintenanceMode ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-900 block">Public Candidate Registrations</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Allow new candidates to register accounts via the signup page.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setAllowRegistration(!allowRegistration);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  allowRegistration ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    allowRegistration ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* 3. Notification Preferences */}
        <Card className="p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-100 text-purple-600 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Notification Preferences</h3>
              <p className="text-xs text-slate-500">
                Configure administrative alerts for accounts, quotas, and security anomalies.
              </p>
            </div>
          </div>

          <div className="space-y-3.5 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="font-semibold text-slate-900 block">New User Registrations</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Send real-time alerts when new candidates create an account.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyOnNewUser(!notifyOnNewUser);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifyOnNewUser ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifyOnNewUser ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-900 block">Scan Quota Threshold Warnings</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Receive an alert when daily system ATS scan volumes cross 90% of expected capacity.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyOnQuotaAlert(!notifyOnQuotaAlert);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifyOnQuotaAlert ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifyOnQuotaAlert ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-900 block">Weekly Performance Digest</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Automated email summary of top ATS scores, active templates, and user acquisition metrics.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifyWeeklyDigest(!notifyWeeklyDigest);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifyWeeklyDigest ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifyWeeklyDigest ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-900 block">Security & Failed Login Alerts</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Immediate notification upon suspicious login behavior or repeated administrative failed auth.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setNotifySecurityAlerts(!notifySecurityAlerts);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  notifySecurityAlerts ? 'bg-indigo-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notifySecurityAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* 4. Basic Security & Session Settings */}
        <Card className="p-5 sm:p-6 border border-slate-200/80 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Basic Security & Session Settings</h3>
              <p className="text-xs text-slate-500">Access policies, session timeouts, and authentication security.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Admin Session Inactivity Timeout
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => {
                  setSessionTimeout(e.target.value as any);
                  handleFieldChange();
                }}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="15m">15 Minutes</option>
                <option value="30m">30 Minutes (Recommended)</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
              </select>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Automatically terminates active administrator tokens upon prolonged inactivity.
              </span>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Max Failed Login Attempts Before Lockout
              </label>
              <select
                value={maxLoginAttempts}
                onChange={(e) => {
                  setMaxLoginAttempts(e.target.value);
                  handleFieldChange();
                }}
                className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:ring-2 focus:ring-indigo-500"
              >
                <option value="3">3 Attempts (Strict)</option>
                <option value="5">5 Attempts (Default)</option>
                <option value="10">10 Attempts (Permissive)</option>
              </select>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Temporarily locks candidate and staff IP addresses after sequential failed passwords.
              </span>
            </div>
          </div>

          <div className="space-y-3 divide-y divide-slate-100 text-xs pt-1">
            <div className="flex items-center justify-between pt-2">
              <div>
                <span className="font-semibold text-slate-900 block">Require Two-Factor Authentication (2FA)</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Enforces authenticator app verification on all administrator accounts.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRequire2FA(!require2FA);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  require2FA ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    require2FA ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-semibold text-slate-900 block">Enforce Strong Password Complexity</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">
                  Requires minimum 10 characters, mixed case, numbers, and special symbols.
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setEnforceStrongPassword(!enforceStrongPassword);
                  handleFieldChange();
                }}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  enforceStrongPassword ? 'bg-emerald-600' : 'bg-slate-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    enforceStrongPassword ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-slate-500">
            {isDirty ? (
              <span className="text-amber-600 font-medium">You have unsaved changes.</span>
            ) : (
              'All settings are synchronized with local administrative storage.'
            )}
          </p>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              type="button"
              variant="secondary"
              size="md"
              className="flex-1 sm:flex-initial text-xs"
              onClick={handleResetDefaults}
            >
              Reset Defaults
            </Button>
            <Button
              type="submit"
              variant="brand"
              size="md"
              icon={<Save className="w-4 h-4" />}
              className="flex-1 sm:flex-initial text-xs"
            >
              Save Admin Settings
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
