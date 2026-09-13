import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutTemplate, Check, ArrowRight, Star, Sparkles, ShieldCheck } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { mockTemplates } from '../data/mockData';
import { ResumeTemplate } from '../types/resume';
import { TemplateMockVisual } from '../components/templates/TemplateMockVisual';

export const TemplatesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleSelectTemplate = (template: ResumeTemplate) => {
    // Open in builder while keeping existing user draft if present
    navigate(`/builder?template=${template.id}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <LayoutTemplate className="w-5 h-5 text-indigo-600" />
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Resume Templates</h1>
          </div>
          <p className="text-sm text-slate-500">
            5 ATS-friendly templates with clean typography, disciplined spacing, and A4 proportions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="success" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            ATS Parsing Verified
          </Badge>
        </div>
      </div>

      {/* Templates Grid: Exactly 5 Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map((tpl) => (
          <Card
            key={tpl.id}
            hoverEffect
            className="overflow-hidden flex flex-col justify-between group border border-slate-200/90 rounded-2xl bg-white shadow-xs hover:shadow-md transition-all"
          >
            <div>
              {/* Document Preview Frame */}
              <div className="h-64 bg-slate-100/80 relative overflow-hidden border-b border-slate-200/80 p-3 flex items-center justify-center group-hover:bg-slate-200/50 transition-colors">
                {/* Paper sheet representation */}
                <div className="w-48 h-56 bg-white rounded-xs shadow-md border border-slate-200/90 overflow-hidden transform group-hover:scale-103 transition-transform duration-200">
                  <TemplateMockVisual templateId={tpl.id} />
                </div>

                {/* Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {tpl.isPopular && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" /> Popular
                    </span>
                  )}
                  {tpl.isNew && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-xs">
                      New
                    </span>
                  )}
                </div>
              </div>

              {/* Template Meta info */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="font-bold text-slate-900 text-base">{tpl.name}</h3>
                  <Badge variant="neutral" size="sm">{tpl.category}</Badge>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed min-h-[36px]">
                  {tpl.description}
                </p>
              </div>
            </div>

            {/* "Use Template" CTA Button */}
            <div className="p-5 pt-0">
              <Button
                variant="outline"
                size="sm"
                className="w-full group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all font-semibold"
                onClick={() => handleSelectTemplate(tpl)}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                Use Template
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
