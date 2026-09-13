import { useState } from 'react';
import { Resume } from '../types/resume';
import { mockResumes } from '../data/mockData';

export function useResumes() {
  const [resumes, setResumes] = useState<Resume[]>(mockResumes);

  const getResumeById = (id: string): Resume | undefined => {
    return resumes.find((r) => r.id === id);
  };

  const addResume = (newResume: Resume) => {
    setResumes((prev) => [newResume, ...prev]);
  };

  const updateResume = (id: string, updated: Partial<Resume>) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updated, lastModified: new Date().toISOString() } : r))
    );
  };

  const deleteResume = (id: string) => {
    setResumes((prev) => prev.filter((r) => r.id !== id));
  };

  return {
    resumes,
    getResumeById,
    addResume,
    updateResume,
    deleteResume,
  };
}
