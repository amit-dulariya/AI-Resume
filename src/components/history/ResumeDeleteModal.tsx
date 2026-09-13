import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import { Button } from '../common/Button';
import { Resume } from '../../types/resume';

interface ResumeDeleteModalProps {
  isOpen: boolean;
  resume: Resume | null;
  onClose: () => void;
  onConfirm: (resumeId: string) => void;
  isDeleting?: boolean;
}

export const ResumeDeleteModal: React.FC<ResumeDeleteModalProps> = ({
  isOpen,
  resume,
  onClose,
  onConfirm,
  isDeleting = false,
}) => {
  if (!isOpen || !resume) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 pb-0 flex items-start justify-between">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-5 space-y-2">
          <h3 id="delete-modal-title" className="text-base font-bold text-slate-900">
            Delete Resume?
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Are you sure you want to permanently delete{' '}
            <strong className="text-slate-900 font-semibold">"{resume.title}"</strong>?
            This will remove all saved content, section configurations, and export drafts.
          </p>

          <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/80 text-[11px] text-amber-800">
            ⚠️ This action is irreversible. You cannot recover this resume once deleted.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            className="border-slate-300 text-slate-700 hover:bg-white"
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="danger"
            size="sm"
            onClick={() => onConfirm(resume.id)}
            disabled={isDeleting}
            className="bg-rose-600 hover:bg-rose-700 text-white font-medium"
          >
            <Trash2 className="w-3.5 h-3.5 mr-1.5" />
            {isDeleting ? 'Deleting...' : 'Delete Resume'}
          </Button>
        </div>
      </div>
    </div>
  );
};
