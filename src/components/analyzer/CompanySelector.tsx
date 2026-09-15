import React, { useState } from 'react';
import { Building2, Check, Sparkles, Plus, X } from 'lucide-react';

export const COMMON_COMPANIES = [
  { name: 'Google', category: 'Tech Giant', color: 'from-blue-500 to-emerald-500' },
  { name: 'Microsoft', category: 'Enterprise Tech', color: 'from-blue-600 to-cyan-500' },
  { name: 'Amazon', category: 'Cloud & E-Commerce', color: 'from-amber-500 to-orange-500' },
  { name: 'Meta', category: 'Social & AI', color: 'from-blue-600 to-indigo-600' },
  { name: 'Infosys', category: 'IT & Consulting', color: 'from-sky-600 to-blue-700' },
  { name: 'TCS', category: 'Global Delivery', color: 'from-indigo-600 to-purple-600' },
  { name: 'Wipro', category: 'Digital Transformation', color: 'from-violet-600 to-indigo-700' },
  { name: 'Accenture', category: 'Strategy & Cloud', color: 'from-purple-600 to-pink-600' },
];

interface CompanySelectorProps {
  selectedCompany: string;
  onSelectCompany: (company: string) => void;
}

export const CompanySelector: React.FC<CompanySelectorProps> = ({
  selectedCompany,
  onSelectCompany,
}) => {
  const [isCustomActive, setIsCustomActive] = useState(
    Boolean(
      selectedCompany &&
        !COMMON_COMPANIES.some(
          (c) => c.name.toLowerCase() === selectedCompany.toLowerCase()
        )
    )
  );
  const [customInput, setCustomInput] = useState(
    selectedCompany &&
      !COMMON_COMPANIES.some(
        (c) => c.name.toLowerCase() === selectedCompany.toLowerCase()
      )
      ? selectedCompany
      : ''
  );

  const handleSelectPredefined = (name: string) => {
    setIsCustomActive(false);
    onSelectCompany(name);
  };

  const handleApplyCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customInput.trim().length > 0) {
      onSelectCompany(customInput.trim());
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Target Company Specific Analysis
            </h3>
            <p className="text-xs text-slate-500">
              Benchmark your resume directly against specific company hiring rubrics & tech stacks
            </p>
          </div>
        </div>

        {selectedCompany && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Selected:</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
              <Sparkles className="w-3 h-3 text-indigo-600" />
              {selectedCompany}
              <button
                type="button"
                onClick={() => {
                  onSelectCompany('');
                  setIsCustomActive(false);
                  setCustomInput('');
                }}
                className="hover:text-indigo-900 ml-0.5 p-0.5"
                title="Clear company selection"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Grid of predefined companies */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3.5">
        {COMMON_COMPANIES.map((company) => {
          const isSelected = selectedCompany.toLowerCase() === company.name.toLowerCase();
          return (
            <button
              key={company.name}
              type="button"
              onClick={() => handleSelectPredefined(company.name)}
              className={`flex items-center justify-between p-2.5 rounded-lg border text-left transition-all text-xs font-semibold ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 shadow-xs ring-1 ring-indigo-600/30'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className={`w-2 h-2 rounded-full bg-gradient-to-r ${company.color} flex-shrink-0`}
                />
                <span className="truncate">{company.name}</span>
              </div>
              {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      {/* Custom Company option */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center gap-3">
        {!isCustomActive ? (
          <button
            type="button"
            onClick={() => setIsCustomActive(true)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Custom Company (e.g. Netflix, Uber, Stripe, Nvidia)
          </button>
        ) : (
          <form onSubmit={handleApplyCustom} className="flex items-center gap-2 w-full sm:max-w-md">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter company name..."
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-indigo-300 bg-indigo-50/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-800"
              autoFocus
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg disabled:opacity-50 transition-colors cursor-pointer"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={() => setIsCustomActive(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
            >
              Cancel
            </button>
          </form>
        )}

        <div className="text-[11px] text-slate-400 sm:ml-auto">
          {selectedCompany
            ? `Generating tailored report for ${selectedCompany}`
            : 'Select a company or leave blank for general ATS evaluation'}
        </div>
      </div>
    </div>
  );
};
