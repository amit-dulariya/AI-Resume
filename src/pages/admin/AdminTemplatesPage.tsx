import React, { useState, useMemo } from 'react';
import {
  LayoutTemplate,
  Plus,
  Power,
  Trash2,
  Edit2,
  Star,
  Users,
  Search,
  Building2,
  Layers,
  AlertTriangle,
  CheckCircle2,
  X,
  RotateCcw,
  Sparkles,
  Eye,
  Check,
} from 'lucide-react';
import { initialAdminTemplates, AdminTemplateRecord } from '../../data/adminMockData';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';

// Mini visual layout renderer for template previews
interface TemplateThumbnailProps {
  styleName?: string;
  category?: string;
}

const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ styleName, category }) => {
  const normalized = (styleName || category || 'modern').toLowerCase();

  if (normalized.includes('classic')) {
    return (
      <div className="w-full h-36 bg-white p-3.5 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-serif">
        <div className="text-center pb-2 border-b border-slate-300 flex flex-col items-center">
          <div className="h-2 w-24 bg-slate-800 rounded-xs mb-1" />
          <div className="h-1 w-16 bg-slate-500 rounded-xs mb-1" />
          <div className="flex justify-center gap-2">
            <div className="h-1 w-8 bg-slate-300 rounded-xs" />
            <div className="h-1 w-8 bg-slate-300 rounded-xs" />
          </div>
        </div>
        <div className="space-y-2 mt-1.5">
          <div>
            <div className="border-b border-slate-300 pb-0.5 mb-1 flex justify-between">
              <div className="h-1.5 w-14 bg-slate-800 rounded-xs" />
              <div className="h-1 w-8 bg-slate-400 rounded-xs" />
            </div>
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
            </div>
          </div>
          <div>
            <div className="border-b border-slate-300 pb-0.5 mb-1">
              <div className="h-1.5 w-16 bg-slate-800 rounded-xs" />
            </div>
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normalized.includes('minimal')) {
    return (
      <div className="w-full h-36 bg-white p-3.5 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-sans">
        <div className="border-b border-slate-200 pb-1.5">
          <div className="h-2 w-20 bg-slate-900 rounded-xs mb-1" />
          <div className="h-1 w-12 bg-slate-400 rounded-xs mb-1" />
          <div className="h-1 w-20 bg-slate-200 rounded-xs" />
        </div>
        <div className="space-y-2.5 my-auto">
          <div>
            <div className="h-1 w-10 bg-slate-700 rounded-xs mb-1 uppercase" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
            </div>
          </div>
          <div>
            <div className="h-1 w-12 bg-slate-700 rounded-xs mb-1 uppercase" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-2/3 bg-slate-200 rounded-xs" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normalized.includes('professional')) {
    return (
      <div className="w-full h-36 bg-white p-3.5 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-sans">
        <div className="border-b-2 border-slate-700 pb-1.5 flex justify-between items-end">
          <div>
            <div className="h-2.5 w-24 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1.5 w-14 bg-slate-600 rounded-xs" />
          </div>
          <div className="h-1.5 w-10 bg-slate-300 rounded-xs" />
        </div>
        <div className="space-y-2 mt-1">
          <div className="border-l-2 border-slate-700 pl-1.5 py-0.5">
            <div className="h-1.5 w-14 bg-slate-800 rounded-xs mb-1" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
            </div>
          </div>
          <div className="border-l-2 border-slate-700 pl-1.5 py-0.5">
            <div className="h-1.5 w-12 bg-slate-800 rounded-xs mb-1" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (normalized.includes('executive')) {
    return (
      <div className="w-full h-36 bg-white p-3 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-sans">
        <div className="bg-slate-900 text-white p-2 rounded-sm text-center flex flex-col items-center">
          <div className="h-2 w-24 bg-white rounded-xs mb-1" />
          <div className="h-1 w-16 bg-indigo-300 rounded-xs" />
        </div>
        <div className="space-y-1.5 mt-1.5">
          <div className="border-b border-indigo-900/40 pb-0.5">
            <div className="h-1.5 w-16 bg-slate-900 rounded-xs" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-5/6 bg-slate-200 rounded-xs" />
          </div>
          <div className="border-b border-indigo-900/40 pb-0.5">
            <div className="h-1.5 w-14 bg-slate-900 rounded-xs" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-3/4 bg-slate-200 rounded-xs" />
          </div>
        </div>
      </div>
    );
  }

  if (normalized.includes('technical')) {
    return (
      <div className="w-full h-36 bg-white p-3.5 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-sans">
        <div className="border-b border-indigo-200 pb-1.5 flex justify-between items-center">
          <div>
            <div className="h-2 w-20 bg-slate-900 rounded-xs mb-1" />
            <div className="h-1 w-14 bg-indigo-600 rounded-xs" />
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-indigo-200" />
            <div className="w-2 h-2 rounded-full bg-indigo-400" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-1.5">
          <div className="col-span-2 space-y-1.5">
            <div className="h-1.5 w-12 bg-slate-800 rounded-xs" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
              <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
            </div>
            <div className="h-1.5 w-14 bg-slate-800 rounded-xs" />
            <div className="space-y-0.5">
              <div className="h-1 w-full bg-slate-200 rounded-xs" />
            </div>
          </div>
          <div className="col-span-1 border-l border-slate-100 pl-1.5 space-y-1">
            <div className="h-1 w-8 bg-indigo-600 rounded-xs" />
            <div className="h-1.5 w-full bg-indigo-50 border border-indigo-100 rounded-xs" />
            <div className="h-1.5 w-full bg-indigo-50 border border-indigo-100 rounded-xs" />
            <div className="h-1.5 w-full bg-indigo-50 border border-indigo-100 rounded-xs" />
          </div>
        </div>
      </div>
    );
  }

  // Default: Modern Clean with Indigo Accent
  return (
    <div className="w-full h-36 bg-white p-3.5 select-none flex flex-col justify-between overflow-hidden rounded-t-xl border-b border-slate-100 font-sans">
      <div className="border-b border-indigo-100 pb-1.5">
        <div className="h-2.5 w-24 bg-slate-900 rounded-xs mb-1" />
        <div className="h-1.5 w-16 bg-indigo-600 rounded-xs mb-1" />
        <div className="flex gap-1.5">
          <div className="h-1 w-8 bg-slate-200 rounded-xs" />
          <div className="h-1 w-10 bg-slate-200 rounded-xs" />
          <div className="h-1 w-6 bg-slate-200 rounded-xs" />
        </div>
      </div>
      <div className="space-y-1.5 mt-1">
        <div>
          <div className="h-1.5 w-12 bg-indigo-900 rounded-xs mb-0.5" />
          <div className="space-y-0.5">
            <div className="h-1 w-full bg-slate-200 rounded-xs" />
            <div className="h-1 w-4/5 bg-slate-200 rounded-xs" />
          </div>
        </div>
        <div className="flex gap-1 flex-wrap pt-0.5">
          <div className="h-2 w-6 bg-indigo-50 border border-indigo-200 rounded-xs" />
          <div className="h-2 w-7 bg-indigo-50 border border-indigo-200 rounded-xs" />
          <div className="h-2 w-5 bg-indigo-50 border border-indigo-200 rounded-xs" />
          <div className="h-2 w-6 bg-indigo-50 border border-indigo-200 rounded-xs" />
        </div>
      </div>
    </div>
  );
};

export const AdminTemplatesPage: React.FC = () => {
  const [templates, setTemplates] = useState<AdminTemplateRecord[]>(initialAdminTemplates);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [companyFilter, setCompanyFilter] = useState<string>('All');

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<AdminTemplateRecord | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<AdminTemplateRecord | null>(null);
  const [previewingTemplate, setPreviewingTemplate] = useState<AdminTemplateRecord | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  // Form states for Add / Edit
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<string>('Modern');
  const [formTargetCompany, setFormTargetCompany] = useState<string>('Google & Big Tech');
  const [formDescription, setFormDescription] = useState('');
  const [formPreviewStyle, setFormPreviewStyle] = useState<string>('modern');

  // Dynamically extract unique categories and companies
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    templates.forEach((t) => set.add(t.category));
    return ['All', ...Array.from(set)];
  }, [templates]);

  const availableCompanies = useMemo(() => {
    const set = new Set<string>();
    templates.forEach((t) => {
      if (t.targetCompany) set.add(t.targetCompany);
    });
    return ['All', ...Array.from(set)];
  }, [templates]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return templates.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        (t.targetCompany && t.targetCompany.toLowerCase().includes(q)) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);

      const matchesCategory = categoryFilter === 'All' || t.category === categoryFilter;
      const matchesCompany = companyFilter === 'All' || t.targetCompany === companyFilter;

      return matchesSearch && matchesCategory && matchesCompany;
    });
  }, [templates, searchQuery, categoryFilter, companyFilter]);

  // Toggle template enabled / disabled
  const handleToggleStatus = (id: string) => {
    setTemplates((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextActive = !t.isActive;
          const statusText = nextActive ? 'enabled' : 'disabled';
          setNotification(`"${t.name}" template has been ${statusText}.`);
          setTimeout(() => setNotification(null), 3500);
          return { ...t, isActive: nextActive };
        }
        return t;
      })
    );
  };

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingTemplate(null);
    setFormName('');
    setFormCategory('Modern');
    setFormTargetCompany('Google & Big Tech');
    setFormDescription('');
    setFormPreviewStyle('modern');
    setShowAddModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (tpl: AdminTemplateRecord) => {
    setEditingTemplate(tpl);
    setFormName(tpl.name);
    setFormCategory(tpl.category);
    setFormTargetCompany(tpl.targetCompany || 'General Tech');
    setFormDescription(tpl.description);
    setFormPreviewStyle(tpl.previewStyle || tpl.category.toLowerCase());
    setShowAddModal(true);
  };

  // Save Add / Edit
  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingTemplate) {
      // Update existing template
      setTemplates((prev) =>
        prev.map((t) =>
          t.id === editingTemplate.id
            ? {
                ...t,
                name: formName.trim(),
                category: formCategory,
                targetCompany: formTargetCompany.trim(),
                description: formDescription.trim(),
                previewStyle: formPreviewStyle,
                lastUpdated: 'Just now',
              }
            : t
        )
      );
      setNotification(`Template "${formName.trim()}" updated successfully.`);
    } else {
      // Create new template
      const newTpl: AdminTemplateRecord = {
        id: `tpl-${Date.now().toString().slice(-5)}`,
        name: formName.trim(),
        category: formCategory,
        targetCompany: formTargetCompany.trim() || 'General Enterprise',
        previewStyle: formPreviewStyle,
        description:
          formDescription.trim() ||
          'Optimized ATS layout designed for streamlined applicant tracking scoring and readability.',
        isActive: true,
        usageCount: 0,
        rating: 5.0,
        lastUpdated: 'Just now',
      };
      setTemplates((prev) => [newTpl, ...prev]);
      setNotification(`Template "${newTpl.name}" created and published to registry.`);
    }

    setTimeout(() => setNotification(null), 3500);
    setShowAddModal(false);
  };

  // Confirm Delete
  const handleConfirmDelete = () => {
    if (!templateToDelete) return;
    const name = templateToDelete.name;
    setTemplates((prev) => prev.filter((t) => t.id !== templateToDelete.id));
    setTemplateToDelete(null);
    setNotification(`Template "${name}" has been permanently removed.`);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setCompanyFilter('All');
  };

  const isFiltered =
    searchQuery.trim() !== '' || categoryFilter !== 'All' || companyFilter !== 'All';

  // Metrics
  const totalCount = templates.length;
  const activeCount = templates.filter((t) => t.isActive).length;
  const disabledCount = templates.filter((t) => !t.isActive).length;
  const totalUsage = templates.reduce((acc, curr) => acc + (curr.usageCount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-xl text-xs flex items-center justify-between shadow-2xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="font-medium">{notification}</span>
          </div>
          <button
            type="button"
            onClick={() => setNotification(null)}
            className="text-indigo-500 hover:text-indigo-800 p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Resume Templates
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure ATS formatting presets, target company archetypes, and template availability.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button
            variant="brand"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={handleOpenAddModal}
          >
            Add Template
          </Button>
        </div>
      </div>

      {/* Metric Quick Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Templates</span>
            <LayoutTemplate className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{totalCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Presets in catalog</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-emerald-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Active Status</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-600">{activeCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Available for candidates</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-slate-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Disabled</span>
            <Power className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-700">{disabledCount}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Temporarily offline</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <div className="flex items-center justify-between text-indigo-600 mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Resumes Built</span>
            <Users className="w-3.5 h-3.5 text-indigo-500" />
          </div>
          <div className="text-2xl font-bold text-indigo-600">{totalUsage.toLocaleString()}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all templates</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4 border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Template Search */}
          <div className="w-full lg:w-80">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search templates or target company..."
              leftIcon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>

          {/* Category & Company Filters */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">
                Category:
              </span>
              <select
                id="template-category-filter"
                aria-label="Filter by template category"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
              >
                {availableCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Company Filter */}
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium text-slate-500 text-[11px] uppercase tracking-wider hidden sm:inline">
                Target Company:
              </span>
              <select
                id="template-company-filter"
                aria-label="Filter by target company"
                value={companyFilter}
                onChange={(e) => setCompanyFilter(e.target.value)}
                className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-2xs"
              >
                {availableCompanies.map((comp) => (
                  <option key={comp} value={comp}>
                    {comp === 'All' ? 'All Companies' : comp}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="inline-flex items-center gap-1 px-2.5 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                title="Reset filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter Feedback */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-800">{filteredTemplates.length}</strong> of{' '}
            <strong className="text-slate-800">{templates.length}</strong> templates
          </span>
          {isFiltered && (
            <span className="text-slate-400 italic">
              Filtered results active
            </span>
          )}
        </div>
      </Card>

      {/* Templates Clean Grid */}
      {filteredTemplates.length === 0 ? (
        <Card className="p-12 text-center border border-slate-200/80 shadow-2xs">
          <div className="max-w-xs mx-auto space-y-2">
            <LayoutTemplate className="w-10 h-10 mx-auto text-slate-300" />
            <h3 className="font-semibold text-slate-800 text-sm">No templates match</h3>
            <p className="text-xs text-slate-500">
              No resume templates match your active search or category/company filter.
            </p>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-xs"
            >
              Reset Filters
            </Button>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className="overflow-hidden border border-slate-200/80 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group bg-white"
            >
              <div>
                {/* Template Visual Preview Header */}
                <div
                  className="relative bg-slate-50 group-hover:bg-slate-100/70 transition-colors border-b border-slate-100 cursor-pointer"
                  onClick={() => setPreviewingTemplate(template)}
                  title="Click to view template full preview"
                >
                  <TemplateThumbnail
                    styleName={template.previewStyle}
                    category={template.category}
                  />

                  {/* Overlay Quick Info */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border shadow-2xs backdrop-blur-xs ${
                        template.isActive
                          ? 'bg-emerald-50/95 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100/95 text-slate-600 border-slate-300'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          template.isActive ? 'bg-emerald-500' : 'bg-slate-400'
                        }`}
                      />
                      {template.isActive ? 'Active' : 'Disabled'}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-2.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/90 text-slate-700 border border-slate-200/70 shadow-2xs backdrop-blur-xs">
                      <Eye className="w-3 h-3 text-slate-400" />
                      Preview
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {template.name}
                      </h3>
                      {/* Target Company / Category */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold border border-indigo-100">
                          <Building2 className="w-3 h-3 text-indigo-500" />
                          {template.targetCompany || 'General Tech'}
                        </span>
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium border border-slate-200/60">
                          <Layers className="w-2.5 h-2.5 text-slate-400" />
                          {template.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200/60 shrink-0">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {template.rating}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 min-h-[2.5rem]">
                    {template.description}
                  </p>

                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {template.usageCount.toLocaleString()}
                      </span>
                      <span>uses</span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      Updated {template.lastUpdated}
                    </span>
                  </div>
                </div>
              </div>

              {/* Template Card Action Strip */}
              <div className="bg-slate-50/90 px-4 py-2.5 border-t border-slate-200/70 flex items-center justify-between">
                {/* Enable / Disable Action */}
                <button
                  type="button"
                  onClick={() => handleToggleStatus(template.id)}
                  title={template.isActive ? 'Disable template from user catalog' : 'Enable template for users'}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    template.isActive
                      ? 'text-amber-700 bg-amber-50 hover:bg-amber-100/80 border-amber-200'
                      : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200'
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  <span>{template.isActive ? 'Disable' : 'Enable'}</span>
                </button>

                {/* Edit and Delete Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleOpenEditModal(template)}
                    title="Edit template details"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-lg transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTemplateToDelete(template)}
                    title="Delete template"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Template Modal with Preview Selection */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 relative animate-in zoom-in-95 duration-150 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
                  <LayoutTemplate className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingTemplate ? 'Edit Resume Template' : 'Add Resume Template'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {editingTemplate
                      ? 'Update template layout specifications and target audience.'
                      : 'Configure and publish a new ATS-optimized resume format.'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveTemplate} className="space-y-4 text-xs">
              {/* Template Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Template Name <span className="text-rose-500">*</span>
                </label>
                <Input
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Modern Clean, Silicon Valley Tech"
                  required
                />
              </div>

              {/* Target Company / Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category Archetype
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                  >
                    <option value="Modern">Modern</option>
                    <option value="Classic">Classic</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Executive">Executive</option>
                    <option value="Technical">Technical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target Company / Industry
                  </label>
                  <input
                    type="text"
                    value={formTargetCompany}
                    onChange={(e) => setFormTargetCompany(e.target.value)}
                    placeholder="e.g. Google & Big Tech, Startups"
                    className="w-full text-xs font-medium bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Template Description
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Describe visual formatting, column structure, font choices, and ideal candidate personas..."
                  className="w-full text-xs bg-white border border-slate-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
                />
              </div>

              {/* Preview Style Selector & Live Thumbnail */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700">
                  Preview Layout Archetype & Live Mockup
                </label>

                {/* Archetype Selector Chips */}
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'modern', label: 'Modern Accent' },
                    { id: 'classic', label: 'Classic Serif' },
                    { id: 'minimal', label: 'Minimal Clean' },
                    { id: 'professional', label: 'Pro Slate' },
                    { id: 'executive', label: 'Executive Box' },
                    { id: 'technical', label: 'Tech Grid' },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setFormPreviewStyle(style.id)}
                      className={`px-2.5 py-1.5 text-[11px] font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                        formPreviewStyle === style.id
                          ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-2xs'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>

                {/* Live mini preview render */}
                <div className="mt-2 rounded-xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="px-3 py-1 bg-slate-100 text-[10px] font-semibold text-slate-500 border-b border-slate-200 flex justify-between items-center">
                    <span>Live Thumbnail Preview</span>
                    <span className="text-indigo-600 capitalize">{formPreviewStyle} style</span>
                  </div>
                  <TemplateThumbnail styleName={formPreviewStyle} category={formCategory} />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex gap-2.5 pt-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="brand"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  {editingTemplate ? 'Save Template Changes' : 'Create & Publish Template'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Template Full Preview Details Modal */}
      {previewingTemplate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setPreviewingTemplate(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  Template Preview
                </span>
                <h3 className="text-base font-bold text-slate-900">{previewingTemplate.name}</h3>
                <p className="text-xs text-slate-500">{previewingTemplate.targetCompany}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreviewingTemplate(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Visual Thumbnail */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <TemplateThumbnail
                styleName={previewingTemplate.previewStyle}
                category={previewingTemplate.category}
              />
            </div>

            {/* Template Specs */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">Category</span>
                <span className="font-semibold text-slate-800">{previewingTemplate.category}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">Active Status</span>
                <span
                  className={`font-semibold ${
                    previewingTemplate.isActive ? 'text-emerald-600' : 'text-slate-500'
                  }`}
                >
                  {previewingTemplate.isActive ? 'Active (Enabled)' : 'Disabled'}
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">Total Candidate Uses</span>
                <span className="font-semibold text-slate-800">
                  {previewingTemplate.usageCount.toLocaleString()} resumes
                </span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/60">
                <span className="text-slate-400 block text-[10px]">ATS Rating</span>
                <span className="font-semibold text-slate-800">
                  ★ {previewingTemplate.rating} / 5.0
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              &ldquo;{previewingTemplate.description}&rdquo;
            </p>

            <div className="flex gap-2 pt-2 border-t border-slate-100">
              <Button
                variant={previewingTemplate.isActive ? 'danger' : 'brand'}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => {
                  handleToggleStatus(previewingTemplate.id);
                  setPreviewingTemplate((prev) =>
                    prev ? { ...prev, isActive: !prev.isActive } : null
                  );
                }}
              >
                {previewingTemplate.isActive ? 'Disable Template' : 'Enable Template'}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setPreviewingTemplate(null)}
              >
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {templateToDelete && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setTemplateToDelete(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-6 space-y-4 relative animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Delete Template Confirmation
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Are you sure you want to permanently delete this resume template?
                </p>
              </div>
            </div>

            {/* Targeted template info box */}
            <div className="p-3.5 bg-rose-50/50 border border-rose-100 rounded-xl space-y-1 text-xs">
              <div className="font-semibold text-slate-900">{templateToDelete.name}</div>
              <div className="text-slate-600 flex items-center gap-1 text-[11px]">
                <Building2 className="w-3 h-3 text-slate-400" />
                <span>Target Company: {templateToDelete.targetCompany}</span>
              </div>
              <div className="text-slate-600 flex items-center gap-1 text-[11px]">
                <Layers className="w-3 h-3 text-slate-400" />
                <span>Category: {templateToDelete.category} Style</span>
              </div>
            </div>

            <p className="text-xs text-slate-500">
              Deleting this template will unpublish it from the catalog. Existing resumes built with this template will retain their archived styling.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <Button
                variant="secondary"
                size="sm"
                className="text-xs"
                onClick={() => setTemplateToDelete(null)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="sm"
                className="text-xs"
                onClick={handleConfirmDelete}
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Confirm Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
