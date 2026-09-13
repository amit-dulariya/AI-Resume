import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GraduationCap,
} from 'lucide-react';
import { Education } from '../../types/resume';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface EducationSectionProps {
  education: Education[];
  onChange: (items: Education[]) => void;
}

export const EducationSection: React.FC<EducationSectionProps> = ({
  education,
  onChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(
    education[0]?.id || null
  );

  const handleAdd = () => {
    const newId = `edu-${Date.now()}`;
    const newItem: Education = {
      id: newId,
      institution: '',
      degree: 'Bachelor of Science',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: '',
      description: '',
      honors: [],
    };
    onChange([newItem, ...education]);
    setExpandedId(newId);
  };

  const handleUpdate = (id: string, updates: Partial<Education>) => {
    onChange(
      education.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleRemove = (id: string) => {
    onChange(education.filter((item) => item.id !== id));
    if (expandedId === id) {
      setExpandedId(null);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= education.length) return;
    const newItems = [...education];
    const [moved] = newItems.splice(index, 1);
    newItems.splice(targetIndex, 0, moved);
    onChange(newItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Add degrees, certifications, universities, or secondary education.
        </p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
          onClick={handleAdd}
        >
          Add Education
        </Button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-xs font-semibold text-slate-700">No education records</p>
          <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1 mb-3">
            Add your degrees or relevant academic qualifications.
          </p>
          <Button size="sm" variant="primary" onClick={handleAdd}>
            + Add Degree
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {education.map((edu, index) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs"
              >
                {/* Item Summary Bar */}
                <div
                  className="px-4 py-3 bg-slate-50/60 border-b border-slate-200/80 flex items-center justify-between gap-3 cursor-pointer select-none"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {edu.degree || 'Degree'} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}
                        {edu.institution && <span className="text-slate-500 font-normal"> — {edu.institution}</span>}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {edu.startDate || 'Start'} – {edu.current ? 'Present' : edu.endDate || 'Graduation'}
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
                      disabled={index === education.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      title="Move Down"
                      className="p-1 rounded text-slate-400 hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200/60"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemove(edu.id)}
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
                        label="Institution / University"
                        value={edu.institution}
                        onChange={(e) => handleUpdate(edu.id, { institution: e.target.value })}
                        placeholder="e.g. Stanford University"
                      />
                      <Input
                        label="Degree"
                        value={edu.degree}
                        onChange={(e) => handleUpdate(edu.id, { degree: e.target.value })}
                        placeholder="e.g. B.S., M.S., Ph.D."
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <Input
                        label="Field of Study / Major"
                        value={edu.fieldOfStudy}
                        onChange={(e) => handleUpdate(edu.id, { fieldOfStudy: e.target.value })}
                        placeholder="e.g. Computer Science & AI"
                      />
                      <Input
                        label="Location (Optional)"
                        value={edu.location || ''}
                        onChange={(e) => handleUpdate(edu.id, { location: e.target.value })}
                        placeholder="e.g. Stanford, CA"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Input
                        label="Start Date"
                        value={edu.startDate}
                        onChange={(e) => handleUpdate(edu.id, { startDate: e.target.value })}
                        placeholder="e.g. Sep 2017"
                      />
                      <Input
                        label="End Date / Expected"
                        value={edu.current ? 'Present' : edu.endDate || ''}
                        disabled={edu.current}
                        onChange={(e) => handleUpdate(edu.id, { endDate: e.target.value })}
                        placeholder="e.g. Jun 2021"
                      />
                      <Input
                        label="GPA (Optional)"
                        value={edu.gpa || ''}
                        onChange={(e) => handleUpdate(edu.id, { gpa: e.target.value })}
                        placeholder="e.g. 3.9 / 4.0"
                      />
                    </div>

                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={edu.current}
                        onChange={(e) =>
                          handleUpdate(edu.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : edu.endDate,
                          })
                        }
                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>I am currently enrolled here</span>
                    </label>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Academic Highlights / Thesis / Description (Optional)
                      </label>
                      <textarea
                        rows={2}
                        value={edu.description || ''}
                        onChange={(e) => handleUpdate(edu.id, { description: e.target.value })}
                        placeholder="e.g. Magna Cum Laude, President of ACM Student Chapter, focused on Distributed Systems."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
