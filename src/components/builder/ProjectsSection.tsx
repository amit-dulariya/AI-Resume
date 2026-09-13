import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, FolderGit2, ExternalLink, Sparkles } from 'lucide-react';
import { Project } from '../../types/resume';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { AIImprovementModal } from './AIImprovementModal';
import { ImprovementSectionType, AIImprovementContext } from '../../types/aiImprovement';

interface ProjectsSectionProps {
  projects: Project[];
  onChange: (items: Project[]) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    projects[0]?.id || null
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
    sectionType: 'project-description',
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
    const newId = `proj-${Date.now()}`;
    const newItem: Project = {
      id: newId,
      title: '',
      description: '',
      role: '',
      liveUrl: '',
      githubUrl: '',
      technologies: [],
      highlights: [],
    };
    onChange([newItem, ...projects]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, updates: Partial<Project>) => {
    onChange(
      projects.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(projects.filter((item) => item.id !== id));
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;
    const newItems = [...projects];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  const handleAddTech = (projId: string, val: string) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    if (!proj.technologies.includes(trimmed)) {
      handleUpdate(projId, { technologies: [...proj.technologies, trimmed] });
    }
  };

  const handleRemoveTech = (projId: string, tech: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    handleUpdate(projId, {
      technologies: proj.technologies.filter((t) => t !== tech),
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Highlight key applications, open-source work, or systems you built.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <FolderGit2 className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">No projects added</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 mb-3">
            Add 1–3 impressive technical projects to demonstrate your practical hands-on ability.
          </p>
          <Button size="sm" variant="primary" onClick={handleAdd}>
            + Add First Project
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((proj, index) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                {/* Summary Bar */}
                <div
                  className="px-4 py-3 bg-slate-50/60 border-b border-slate-200/80 flex items-center justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {proj.title || 'Untitled Project'}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {proj.technologies?.slice(0, 3).join(', ') || 'No tech listed'}
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
                      disabled={index === projects.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(proj.id)}
                      title="Delete"
                      className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Expanded Form Fields */}
                {isExpanded && (
                  <div className="p-4 space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Project Name"
                        value={proj.title}
                        onChange={(e) => handleUpdate(proj.id, { title: e.target.value })}
                        placeholder="e.g. Distributed Cache Engine"
                      />
                      <Input
                        label="Project Link / Demo URL"
                        value={proj.liveUrl || ''}
                        onChange={(e) => handleUpdate(proj.id, { liveUrl: e.target.value })}
                        placeholder="e.g. https://github.com/alex/cache-engine"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-slate-700">
                          Project Description
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            handleOpenAiImprove({
                              title: `Project Description — ${proj.title || 'Untitled Project'}`,
                              sectionType: 'project-description',
                              originalContent: proj.description || '',
                              context: {
                                projectTitle: proj.title,
                                technologies: proj.technologies,
                              },
                              onApply: (improved) => {
                                handleUpdate(proj.id, { description: improved });
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
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleUpdate(proj.id, { description: e.target.value })}
                        placeholder="What problem did it solve? What architecture did you create and what was the result?"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>

                    {/* Technologies */}
                    <div className="space-y-1.5 pt-1">
                      <label className="block text-xs font-semibold text-slate-700">
                        Technologies Used
                      </label>
                      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                        {proj.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px]"
                          >
                            <span>{tech}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(proj.id, tech)}
                              className="text-slate-400 hover:text-slate-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <input
                        type="text"
                        placeholder="Type technology (e.g. Go, Redis, Next.js) and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddTech(proj.id, e.currentTarget.value);
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
