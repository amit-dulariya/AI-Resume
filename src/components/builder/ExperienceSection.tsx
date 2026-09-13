import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Briefcase,
  Sparkles,
  Check,
  Calendar,
} from 'lucide-react';
import { Experience } from '../../types/resume';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { AIImprovementModal } from './AIImprovementModal';
import { ImprovementSectionType, AIImprovementContext } from '../../types/aiImprovement';

interface ExperienceSectionProps {
  experience: Experience[];
  onChange: (items: Experience[]) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experience,
  onChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    experience[0]?.id || null
  );

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
    sectionType: 'experience-bullet',
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
    const newId = `exp-${Date.now()}`;
    const newItem: Experience = {
      id: newId,
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: ['Managed project execution and exceeded sprint deliverables.'],
      technologies: [],
      description: '',
    };
    onChange([newItem, ...experience]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, updates: Partial<Experience>) => {
    onChange(
      experience.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(experience.filter((item) => item.id !== id));
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= experience.length) return;
    const newItems = [...experience];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  // Highlights / bullet management
  const handleAddBullet = (expId: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newBullet = 'Quantified accomplishment demonstrating measurable impact.';
    handleUpdate(expId, { highlights: [...exp.highlights, newBullet] });
  };

  const handleUpdateBullet = (expId: string, bulletIdx: number, val: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const newBullets = [...exp.highlights];
    newBullets[bulletIdx] = val;
    handleUpdate(expId, { highlights: newBullets });
  };

  const handleRemoveBullet = (expId: string, bulletIdx: number) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    handleUpdate(expId, {
      highlights: exp.highlights.filter((_, idx) => idx !== bulletIdx),
    });
  };

  // Tech tags handling
  const handleAddTech = (expId: string, techInput: string) => {
    const trimmed = techInput.trim();
    if (!trimmed) return;
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    const currentTech = exp.technologies || [];
    if (!currentTech.includes(trimmed)) {
      handleUpdate(expId, { technologies: [...currentTech, trimmed] });
    }
  };

  const handleRemoveTech = (expId: string, tech: string) => {
    const exp = experience.find((e) => e.id === expId);
    if (!exp) return;
    handleUpdate(expId, {
      technologies: (exp.technologies || []).filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          List your professional history in reverse chronological order.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Position
        </Button>
      </div>

      {experience.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">No work experience listed</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 mb-3">
            Add your past or current roles to highlight your career trajectory and achievements.
          </p>
          <Button size="sm" variant="primary" onClick={handleAdd}>
            + Add First Position
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {experience.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                {/* Item Summary Bar */}
                <div
                  className="px-4 py-3 bg-slate-50/60 border-b border-slate-200/80 flex items-center justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {exp.position || 'Untitled Role'}
                        {exp.company && <span className="text-slate-500 font-normal"> at {exp.company}</span>}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {exp.startDate || 'Start'} – {exp.current ? 'Present' : exp.endDate || 'End'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      title="Move Up"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === experience.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(exp.id)}
                      title="Delete"
                      className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Company / Employer"
                        value={exp.company}
                        onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                        placeholder="e.g. Stripe, Acme Corp"
                      />
                      <Input
                        label="Role / Title"
                        value={exp.position}
                        onChange={(e) => handleUpdate(exp.id, { position: e.target.value })}
                        placeholder="e.g. Senior Frontend Engineer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        label="Start Date"
                        value={exp.startDate}
                        onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                        placeholder="e.g. Mar 2021"
                      />
                      <Input
                        label="End Date"
                        value={exp.current ? 'Present' : exp.endDate || ''}
                        disabled={exp.current}
                        onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                        placeholder="e.g. Present"
                      />
                      <Input
                        label="Location (Optional)"
                        value={exp.location || ''}
                        onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                        placeholder="e.g. San Francisco, CA / Remote"
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={exp.current}
                        onChange={(e) =>
                          handleUpdate(exp.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : exp.endDate,
                          })
                        }
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>I currently work here</span>
                    </label>

                    {/* Role Description Summary */}
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Role Overview / Scope (Optional)
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenAiImprove({
                              title: `Role Overview — ${exp.position || 'Position'}${exp.company ? ` at ${exp.company}` : ''}`,
                              sectionType: 'experience-overview',
                              originalContent: exp.description || '',
                              context: {
                                roleTitle: exp.position,
                                company: exp.company,
                                technologies: exp.technologies,
                              },
                              onApply: (improved) => {
                                handleUpdate(exp.id, { description: improved });
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
                        value={exp.description || ''}
                        onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
                        placeholder="Brief summary of department or scope of responsibility."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Bullet Points / Highlights */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Key Accomplishments & Bullet Points</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(exp.id)}
                          className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          + Add Bullet Point
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {exp.highlights.map((bullet, bulletIdx) => (
                          <div
                            key={bulletIdx}
                            className="bg-slate-50/60 rounded-lg border border-slate-200/80 p-2.5 space-y-2"
                          >
                            <div className="flex items-start gap-2">
                              <span className="text-slate-400 mt-2 text-xs font-bold">•</span>
                              <textarea
                                rows={2}
                                value={bullet}
                                onChange={(e) =>
                                  handleUpdateBullet(exp.id, bulletIdx, e.target.value)
                                }
                                placeholder="Action verb + metric result (e.g. Spearheaded microfrontend migration, boosting page load speeds by 42%)."
                                className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white"
                              />
                              <div className="flex flex-col gap-1 shrink-0 mt-0.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleOpenAiImprove({
                                      title: `Accomplishment #${bulletIdx + 1} — ${exp.position || 'Role'}`,
                                      sectionType: 'experience-bullet',
                                      originalContent: bullet,
                                      context: {
                                        roleTitle: exp.position,
                                        company: exp.company,
                                        technologies: exp.technologies,
                                      },
                                      onApply: (improved) => {
                                        handleUpdateBullet(exp.id, bulletIdx, improved);
                                      },
                                    })
                                  }
                                  className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded transition-colors"
                                  title="Improve this highlight with AI"
                                >
                                  <Sparkles className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveBullet(exp.id, bulletIdx)}
                                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded transition-colors"
                                  title="Delete bullet"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5 px-1">
                              <span>Bullet #{bulletIdx + 1}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleOpenAiImprove({
                                    title: `Accomplishment #${bulletIdx + 1} — ${exp.position || 'Role'}`,
                                    sectionType: 'experience-bullet',
                                    originalContent: bullet,
                                    context: {
                                      roleTitle: exp.position,
                                      company: exp.company,
                                      technologies: exp.technologies,
                                    },
                                    onApply: (improved) => {
                                      handleUpdateBullet(exp.id, bulletIdx, improved);
                                    },
                                  })
                                }
                                className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
                              >
                                <Sparkles className="w-3 h-3" />
                                <span>Improve with AI</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <label className="block text-xs font-semibold text-slate-700">
                        Technologies / Tools Used
                      </label>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        {(exp.technologies || []).map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(exp.id, tech)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Type technology (e.g. React, Docker, Kubernetes) and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTech(exp.id, e.currentTarget.value);
                            e.currentTarget.value = '';
                          }
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
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
