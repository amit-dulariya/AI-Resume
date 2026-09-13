import React, { useState } from 'react';
import { Plus, Trash2, Wrench, Sparkles, Tag } from 'lucide-react';
import { SkillCategory } from '../../types/resume';
import { Button } from '../common/Button';

interface SkillsSectionProps {
  skills: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  onChange,
}) => {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});
  const [newCatName, setNewCatName] = useState('');
  const [isAddingCat, setIsAddingCat] = useState(false);

  // Split technical and soft skills
  const softCategory = skills.find((c) => c.name.toLowerCase().includes('soft'));
  const technicalCategories = skills.filter((c) => !c.name.toLowerCase().includes('soft'));

  // Ensure softCategory exists
  const ensureSoftSkills = () => {
    if (!softCategory) {
      const newSoft: SkillCategory = {
        id: `cat-soft-${Date.now()}`,
        name: 'Soft Skills',
        skills: [
          { id: `s-${Date.now()}-1`, name: 'Cross-functional Collaboration' },
          { id: `s-${Date.now()}-2`, name: 'Agile / Scrum' },
          { id: `s-${Date.now()}-3`, name: 'Technical Leadership' },
        ],
      };
      onChange([...skills, newSoft]);
    }
  };

  const handleAddSkillToCategory = (catId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const category = skills.find((c) => c.id === catId);
    if (!category) return;

    if (category.skills.some((s) => s.name.toLowerCase() === trimmed.toLowerCase())) {
      return;
    }

    const updated = skills.map((c) => {
      if (c.id === catId) {
        return {
          ...c,
          skills: [
            ...c.skills,
            { id: `skill-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`, name: trimmed },
          ],
        };
      }
      return c;
    });

    onChange(updated);
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const handleRemoveSkill = (catId: string, skillId: string) => {
    onChange(
      skills.map((c) => {
        if (c.id === catId) {
          return {
            ...c,
            skills: c.skills.filter((s) => s.id !== skillId),
          };
        }
        return c;
      })
    );
  };

  const handleAddCategory = () => {
    const trimmed = newCatName.trim();
    if (!trimmed) return;
    const newCategory: SkillCategory = {
      id: `cat-${Date.now()}`,
      name: trimmed,
      skills: [],
    };
    onChange([...skills, newCategory]);
    setNewCatName('');
    setIsAddingCat(false);
  };

  const handleRemoveCategory = (catId: string) => {
    onChange(skills.filter((c) => c.id !== catId));
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500">
          Highlight your technical proficiencies and interpersonal capabilities.
        </p>
        <div className="flex items-center gap-2">
          {!softCategory && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={ensureSoftSkills}
            >
              + Enable Soft Skills
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="outline"
            icon={<Plus className="w-3.5 h-3.5 text-indigo-600" />}
            onClick={() => setIsAddingCat(true)}
          >
            Add Category
          </Button>
        </div>
      </div>

      {isAddingCat && (
        <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl flex items-center gap-2">
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="Category name (e.g. Cloud & DevOps, Databases)"
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddCategory();
              }
            }}
          />
          <Button size="sm" variant="primary" onClick={handleAddCategory}>
            Create
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsAddingCat(false)}>
            Cancel
          </Button>
        </div>
      )}

      {/* Technical Skills Categories */}
      <div className="space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
          <Wrench className="w-3.5 h-3.5 text-indigo-600" />
          <span>Technical Skills</span>
        </h4>

        {technicalCategories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 bg-white rounded-xl border border-slate-200 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">{cat.name}</span>
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap items-center gap-1.5 min-h-[32px]">
              {cat.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 text-xs font-medium border border-slate-200"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(cat.id, skill.id)}
                    className="text-slate-400 hover:text-slate-700 font-bold ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}

              {cat.skills.length === 0 && (
                <span className="text-xs text-slate-400 italic">No skills added in this group yet.</span>
              )}
            </div>

            {/* Quick add input */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newSkillInput[cat.id] || ''}
                onChange={(e) =>
                  setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddSkillToCategory(cat.id, newSkillInput[cat.id] || '');
                  }
                }}
                placeholder={`Type skill and press Enter or comma (e.g. TypeScript)...`}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddSkillToCategory(cat.id, newSkillInput[cat.id] || '')
                }
                className="px-3 py-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg"
              >
                + Add
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Soft Skills Category */}
      {softCategory && (
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Soft Skills</span>
          </h4>

          <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-slate-900">Interpersonal & Leadership Competencies</span>
              <button
                type="button"
                onClick={() => handleRemoveCategory(softCategory.id)}
                className="text-slate-400 hover:text-rose-500 p-1"
                title="Remove Soft Skills"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {softCategory.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-purple-50 text-purple-800 text-xs font-medium border border-purple-200"
                >
                  <span>{skill.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(softCategory.id, skill.id)}
                    className="text-purple-400 hover:text-purple-700 font-bold ml-0.5"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newSkillInput[softCategory.id] || ''}
                onChange={(e) =>
                  setNewSkillInput({ ...newSkillInput, [softCategory.id]: e.target.value })
                }
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ',') {
                    e.preventDefault();
                    handleAddSkillToCategory(softCategory.id, newSkillInput[softCategory.id] || '');
                  }
                }}
                placeholder="Type soft skill (e.g. Stakeholder Management, Mentorship)..."
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:bg-white focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddSkillToCategory(softCategory.id, newSkillInput[softCategory.id] || '')
                }
                className="px-3 py-1.5 text-xs font-semibold text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg"
              >
                + Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
