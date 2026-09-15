import React, { useState, useEffect } from 'react';
import { User, Bell, Palette, Shield, Save, Check } from 'lucide-react';
import { Card, CardHeader, CardBody, CardFooter } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { mockUserSettings, mockTemplates } from '../data/mockData';
import { UserSettings } from '../types/resume';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<UserSettings>(() => ({
    ...mockUserSettings,
    name: user?.name || (user?.email ? user.email.split('@')[0] : 'User'),
    email: user?.email || '',
  }));
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) {
      setSettings((prev) => ({
        ...prev,
        name: user.name || (user.email ? user.email.split('@')[0] : prev.name),
        email: user.email || prev.email,
      }));
    }
  }, [user?.name, user?.email]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="pb-2 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Account & Career Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          Manage your personal details, target industry benchmarks, and notification preferences
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-900">Personal Profile</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Industry
                </label>
                <input
                  type="text"
                  value={settings.targetIndustry}
                  onChange={(e) => setSettings({ ...settings, targetIndustry: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Career Experience Level
                </label>
                <select
                  value={settings.experienceLevel}
                  onChange={(e) => setSettings({ ...settings, experienceLevel: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="Entry-Level">Entry-Level (0-2 years)</option>
                  <option value="Mid-Level">Mid-Level (3-5 years)</option>
                  <option value="Senior">Senior (6-9 years)</option>
                  <option value="Lead / Executive">Lead / Executive (10+ years)</option>
                </select>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Preferences & Default Template */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-900">Builder Preferences</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Default Resume Template
              </label>
              <select
                value={settings.defaultTemplateId}
                onChange={(e) => setSettings({ ...settings, defaultTemplateId: e.target.value })}
                className="w-full sm:w-1/2 px-3.5 py-2.5 bg-white text-slate-900 text-sm rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {mockTemplates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category})
                  </option>
                ))}
              </select>
            </div>
          </CardBody>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-slate-700" />
              <h3 className="font-bold text-sm text-slate-900">Notifications</h3>
            </div>
          </CardHeader>
          <CardBody className="space-y-3">
            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-900">Score Improvements & ATS Updates</p>
                <p className="text-[11px] text-slate-500">Get notified when new ATS scanner criteria are published</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.scoreUpdates}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, scoreUpdates: e.target.checked },
                  })
                }
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-4 w-4"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
              <div>
                <p className="text-xs font-semibold text-slate-900">Weekly Resume Advice & Industry Trends</p>
                <p className="text-[11px] text-slate-500">Curated bullet points and high-converting action verbs</p>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications.weeklyTips}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    notifications: { ...settings.notifications, weeklyTips: e.target.checked },
                  })
                }
                className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 h-4 w-4"
              />
            </label>
          </CardBody>

          <CardFooter className="justify-end">
            <Button
              type="submit"
              icon={saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            >
              {saved ? 'Saved Changes' : 'Save Settings'}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
