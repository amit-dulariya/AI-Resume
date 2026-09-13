import React, { useState } from 'react';
import { Plus, Trash2, Award, Trophy, Languages, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { Certification, Achievement, Language } from '../../types/resume';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { AIImprovementModal } from './AIImprovementModal';
import { ImprovementSectionType, AIImprovementContext } from '../../types/aiImprovement';

// ==========================================
// Certifications Section
// ==========================================
interface CertificationsSectionProps {
  certifications: Certification[];
  onChange: (items: Certification[]) => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  certifications,
  onChange,
}) => {
  const handleAdd = () => {
    const newItem: Certification = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      issueDate: '',
      credentialId: '',
    };
    onChange([...certifications, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<Certification>) => {
    onChange(
      certifications.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(certifications.filter((item) => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= certifications.length) return;
    const newItems = [...certifications];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add professional licenses, cloud certifications, or accredited certificates.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Award className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">No certifications listed</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5 mb-2.5">
            Cloud certificates (AWS, GCP, CKA) give recruiters high ATS matching confidence.
          </p>
          <Button size="sm" variant="primary" onClick={handleAdd}>
            + Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Certification #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === certifications.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(cert.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Certification Name"
                  value={cert.name}
                  onChange={(e) => handleUpdate(cert.id, { name: e.target.value })}
                  placeholder="e.g. AWS Solutions Architect Professional"
                />
                <Input
                  label="Issuing Organization"
                  value={cert.issuer}
                  onChange={(e) => handleUpdate(cert.id, { issuer: e.target.value })}
                  placeholder="e.g. Amazon Web Services"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Input
                  label="Issue Date"
                  value={cert.issueDate}
                  onChange={(e) => handleUpdate(cert.id, { issueDate: e.target.value })}
                  placeholder="e.g. Nov 2023"
                />
                <Input
                  label="Credential ID / Verification URL"
                  value={cert.credentialId || ''}
                  onChange={(e) => handleUpdate(cert.id, { credentialId: e.target.value })}
                  placeholder="e.g. AWS-948190"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// Achievements Section
// ==========================================
interface AchievementsSectionProps {
  achievements: Achievement[];
  onChange: (items: Achievement[]) => void;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({
  achievements,
  onChange,
}) => {
  // AI Improvement Modal state
  const [aiModal, setAiModal] = useState<{
    isOpen: boolean;
    title: string;
    sectionType: ImprovementSectionType;
    originalContent: string;
    context?: AIImprovementContext;
    onApply: (improved: string) => void;
  }>({
    isOpen: false,
    title: '',
    sectionType: 'achievement-description',
    originalContent: '',
    onApply: () => {},
  });

  const handleOpenAiImprove = (config: {
    title: string;
    sectionType: ImprovementSectionType;
    originalContent: string;
    context?: AIImprovementContext;
    onApply: (improved: string) => void;
  }) => {
    setAiModal({
      isOpen: true,
      title: config.title,
      sectionType: config.sectionType,
      originalContent: config.originalContent,
      context: config.context,
      onApply: config.onApply,
    });
  };

  const handleAdd = () => {
    const newItem: Achievement = {
      id: `ach-${Date.now()}`,
      title: '',
      organization: '',
      date: '',
      description: '',
    };
    onChange([...achievements, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<Achievement>) => {
    onChange(
      achievements.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(achievements.filter((item) => item.id !== id));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= achievements.length) return;
    const newItems = [...achievements];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Highlight honors, competitive hackathons, awards, or patents.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Achievement
        </Button>
      </div>

      {achievements.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Trophy className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">No achievements added</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-0.5 mb-2.5">
            Awards and publications set candidates apart during final committee reviews.
          </p>
          <Button size="sm" variant="primary" onClick={handleAdd}>
            + Add Achievement
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {achievements.map((ach, index) => (
            <div
              key={ach.id}
              className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">
                  Honor / Award #{index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={index === achievements.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(ach.id)}
                    className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <Input
                    label="Award / Achievement Title"
                    value={ach.title}
                    onChange={(e) => handleUpdate(ach.id, { title: e.target.value })}
                    placeholder="e.g. 1st Place - Global FinTech Hackathon"
                  />
                </div>
                <Input
                  label="Date (Optional)"
                  value={ach.date || ''}
                  onChange={(e) => handleUpdate(ach.id, { date: e.target.value })}
                  placeholder="e.g. 2023"
                />
              </div>

              <div>
                <Input
                  label="Granting Organization / Event"
                  value={ach.organization || ''}
                  onChange={(e) => handleUpdate(ach.id, { organization: e.target.value })}
                  placeholder="e.g. TechCrunch Disrupt"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Short Context / Summary
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenAiImprove({
                        title: `Achievement Summary — ${ach.title || 'Honor / Award'}`,
                        sectionType: 'achievement-description',
                        originalContent: ach.description || '',
                        context: {
                          achievementTitle: ach.title,
                          company: ach.organization,
                        },
                        onApply: (improved) => {
                          handleUpdate(ach.id, { description: improved });
                        },
                      })
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-500" />
                    <span>Improve with AI</span>
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={ach.description || ''}
                  onChange={(e) => handleUpdate(ach.id, { description: e.target.value })}
                  placeholder="e.g. Built automated fraud detection pipeline out of 250 participating teams."
                  className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Improvement Modal */}
      <AIImprovementModal
        isOpen={aiModal.isOpen}
        onClose={() => setAiModal((prev) => ({ ...prev, isOpen: false }))}
        onApply={aiModal.onApply}
        title={aiModal.title}
        originalContent={aiModal.originalContent}
        sectionType={aiModal.sectionType}
        context={aiModal.context}
      />
    </div>
  );
};

// ==========================================
// Languages Section
// ==========================================
interface LanguagesSectionProps {
  languages: Language[];
  onChange: (items: Language[]) => void;
}

export const LanguagesSection: React.FC<LanguagesSectionProps> = ({
  languages,
  onChange,
}) => {
  const handleAdd = () => {
    const newItem: Language = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    onChange([...languages, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<Language>) => {
    onChange(
      languages.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(languages.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          List spoken and written language proficiencies.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Language
        </Button>
      </div>

      {languages.length === 0 ? (
        <div className="p-6 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Languages className="w-7 h-7 text-slate-400 mx-auto mb-1.5" />
          <p className="text-xs font-semibold text-slate-700">No languages listed</p>
          <Button size="sm" variant="primary" className="mt-2" onClick={handleAdd}>
            + Add Language
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {languages.map((lang) => (
            <div
              key={lang.id}
              className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={lang.language}
                  onChange={(e) => handleUpdate(lang.id, { language: e.target.value })}
                  placeholder="e.g. English, French, Mandarin"
                  className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-md focus:outline-hidden focus:border-indigo-500 font-medium"
                />
              </div>
              <div className="w-32">
                <select
                  value={lang.proficiency}
                  onChange={(e) =>
                    handleUpdate(lang.id, {
                      proficiency: e.target.value as Language['proficiency'],
                    })
                  }
                  className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md bg-white focus:outline-hidden focus:border-indigo-500"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Professional">Professional</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(lang.id)}
                className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
