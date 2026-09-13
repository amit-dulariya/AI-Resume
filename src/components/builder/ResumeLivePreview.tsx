import React from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Linkedin,
  Github,
  Calendar,
  ExternalLink,
  Award,
} from 'lucide-react';
import { Resume } from '../../types/resume';

interface ResumeLivePreviewProps {
  resume: Resume;
  scale?: number;
  id?: string;
}

export const ResumeLivePreview: React.FC<ResumeLivePreviewProps> = ({
  resume,
  scale = 1,
  id = 'resume-a4-preview-sheet',
}) => {
  const { content, templateId } = resume;
  const { personalInfo, experience, education, skills, projects, certifications, achievements, languages } = content;

  // Social & Web links
  const linkedinLink = personalInfo.socialLinks?.find((s) => s.platform === 'LinkedIn')?.url;
  const githubLink = personalInfo.socialLinks?.find((s) => s.platform === 'GitHub')?.url;
  const portfolioLink = personalInfo.website || personalInfo.socialLinks?.find((s) => s.platform === 'Portfolio')?.url;

  // Split technical skills and soft skills
  const softSkillsCategory = skills.find((c) => c.name.toLowerCase().includes('soft'));
  const technicalCategories = skills.filter((c) => !c.name.toLowerCase().includes('soft'));

  // Determine active template
  const isClassic = templateId === 'tpl-classic';
  const isMinimal = templateId === 'tpl-minimal' || templateId === 'tpl-minimalist';
  const isProfessional = templateId === 'tpl-professional' || templateId === 'tpl-technical';
  const isExecutive = templateId === 'tpl-executive';
  // Default to Modern if tpl-modern or unassigned
  const isModern = !isClassic && !isMinimal && !isProfessional && !isExecutive;

  // Theme styling definitions for ATS-friendly presentation
  const theme = {
    fontFamily: isClassic
      ? 'font-serif font-normal'
      : isExecutive
      ? 'font-sans'
      : isMinimal
      ? 'font-sans'
      : isProfessional
      ? 'font-sans'
      : 'font-sans',

    headerAlign: isClassic || isExecutive ? 'text-center' : 'text-left',

    nameColor: isExecutive
      ? 'text-slate-950 font-bold tracking-tight'
      : isClassic
      ? 'text-slate-900 font-serif font-bold tracking-normal'
      : isMinimal
      ? 'text-slate-900 font-light tracking-wide'
      : isProfessional
      ? 'text-slate-900 font-extrabold tracking-tight'
      : 'text-slate-900 font-extrabold tracking-tight',

    jobTitleColor: isClassic
      ? 'text-slate-700 italic font-serif text-sm'
      : isExecutive
      ? 'text-blue-900 font-bold uppercase tracking-widest text-xs mt-1'
      : isMinimal
      ? 'text-slate-600 font-medium text-xs tracking-wider uppercase'
      : isProfessional
      ? 'text-slate-700 font-semibold text-xs'
      : 'text-indigo-600 font-semibold text-xs',

    headerBorder: isExecutive
      ? 'border-b-2 border-slate-900 pb-3 mb-4 text-center'
      : isClassic
      ? 'border-b border-slate-400 pb-3 mb-4 text-center'
      : isMinimal
      ? 'border-b border-slate-200 pb-2.5 mb-3.5'
      : isProfessional
      ? 'border-b-2 border-slate-700 pb-3 mb-4'
      : 'border-b border-indigo-100 pb-3 mb-4',

    sectionHeading: isClassic
      ? 'text-xs font-serif font-bold uppercase tracking-wider text-slate-900 border-b border-slate-400 pb-0.5 mb-2'
      : isExecutive
      ? 'text-xs font-bold uppercase tracking-widest text-blue-950 border-b-2 border-blue-950 pb-0.5 mb-2.5 flex items-center justify-between'
      : isMinimal
      ? 'text-xs font-semibold uppercase tracking-widest text-slate-700 border-b border-slate-200 pb-0.5 mb-2'
      : isProfessional
      ? 'text-xs font-bold uppercase tracking-wider text-slate-900 bg-slate-100 px-2 py-1 rounded-xs mb-2.5 border-l-3 border-slate-800'
      : 'text-xs font-bold uppercase tracking-wider text-indigo-950 border-b border-indigo-200 pb-1 mb-2.5',

    highlightBullet: isClassic
      ? 'list-disc list-outside pl-4 space-y-1 text-[10.5px] text-slate-800 leading-relaxed font-serif'
      : isExecutive
      ? 'list-disc list-outside pl-4 space-y-1 text-[10.5px] text-slate-800 leading-relaxed'
      : isMinimal
      ? 'list-disc list-outside pl-4 space-y-0.5 text-[10.5px] text-slate-700 leading-relaxed'
      : isProfessional
      ? 'list-disc list-outside pl-4 space-y-1 text-[10.5px] text-slate-700 leading-relaxed'
      : 'list-disc list-outside pl-4 space-y-1 text-[10.5px] text-slate-700 leading-relaxed',

    techBadge: isProfessional
      ? 'text-[9px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-300 rounded-xs'
      : isMinimal
      ? 'text-[9.5px] text-slate-600'
      : isClassic
      ? 'text-[9.5px] font-serif italic text-slate-700'
      : isExecutive
      ? 'text-[9.5px] px-1.5 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded-xs font-medium'
      : 'text-[9.5px] font-mono px-1.5 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xs',
  };

  return (
    <div
      id={id}
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center',
      }}
      className={`w-full max-w-[800px] bg-white text-slate-800 shadow-xl border border-slate-200/90 rounded-xs p-8 sm:p-10 min-h-[1050px] transition-transform duration-150 select-text ${theme.fontFamily}`}
    >
      {/* 1. Header & Contact Information */}
      <div className={theme.headerBorder}>
        <div className={theme.headerAlign}>
          <h1 className={`text-2xl sm:text-3xl ${theme.nameColor}`}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>

          <p className={theme.jobTitleColor}>
            {personalInfo.jobTitle || 'Target Professional Role'}
          </p>

          {/* Contact Details Line */}
          <div
            className={`flex flex-wrap items-center gap-y-1 gap-x-3 text-[11px] text-slate-600 mt-2 ${
              isClassic || isExecutive ? 'justify-center' : ''
            }`}
          >
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </span>
            )}

            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.phone}</span>
              </span>
            )}

            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                <span>{personalInfo.location}</span>
              </span>
            )}

            {portfolioLink && (
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                <span className={isClassic ? 'text-slate-800 underline' : 'text-indigo-600 truncate max-w-[140px]'}>
                  {portfolioLink.replace(/^https?:\/\//, '')}
                </span>
              </span>
            )}

            {linkedinLink && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-slate-400 shrink-0" />
                <span className={isClassic ? 'text-slate-800 underline' : 'text-indigo-600 truncate max-w-[140px]'}>
                  {linkedinLink.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, 'in/')}
                </span>
              </span>
            )}

            {githubLink && (
              <span className="flex items-center gap-1">
                <Github className="w-3 h-3 text-slate-400 shrink-0" />
                <span className={isClassic ? 'text-slate-800 underline' : 'text-indigo-600 truncate max-w-[140px]'}>
                  {githubLink.replace(/^https?:\/\/(www\.)?github\.com\//, 'gh/')}
                </span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Main Resume Body Sections */}
      <div className="space-y-4">
        {/* 2. Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className={theme.sectionHeading}>
              {isClassic ? 'Professional Summary' : 'Summary'}
            </h2>
            <p className={`text-[11px] leading-relaxed ${isClassic ? 'font-serif text-slate-800' : 'text-slate-700'}`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* 3. Work Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className={`font-bold text-slate-900 ${isClassic ? 'font-serif' : ''}`}>
                        {exp.position}
                      </span>
                      <span className="text-slate-600 font-medium"> — {exp.company}</span>
                      {exp.location && (
                        <span className="text-slate-400 text-[10px]"> ({exp.location})</span>
                      )}
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium shrink-0">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate || 'Present'}
                    </div>
                  </div>

                  {exp.description && (
                    <p className="text-[10.5px] text-slate-600 leading-snug">
                      {exp.description}
                    </p>
                  )}

                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className={theme.highlightBullet}>
                      {exp.highlights.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      <span className="text-[9.5px] text-slate-400 font-medium uppercase">
                        Technologies:
                      </span>
                      {isMinimal ? (
                        <span className="text-[10px] text-slate-600">
                          {exp.technologies.join(', ')}
                        </span>
                      ) : (
                        exp.technologies.map((tech, idx) => (
                          <span key={idx} className={theme.techBadge}>
                            {tech}
                          </span>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 4. Education */}
        {education && education.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div>
                      <span className={`font-bold text-slate-900 ${isClassic ? 'font-serif' : ''}`}>
                        {edu.institution}
                      </span>
                      <span className="text-slate-700"> — {edu.degree} in {edu.fieldOfStudy}</span>
                      {edu.location && <span className="text-slate-400 text-[10px]"> ({edu.location})</span>}
                    </div>
                    <div className="text-[10.5px] text-slate-500 font-medium shrink-0">
                      {edu.startDate ? `${edu.startDate} – ` : ''}{edu.current ? 'Present' : edu.endDate}
                    </div>
                  </div>

                  {edu.gpa && (
                    <div className="text-[10px] text-slate-500">
                      GPA: <strong className="text-slate-700">{edu.gpa}</strong>
                    </div>
                  )}

                  {edu.description && (
                    <p className="text-[10.5px] text-slate-600 leading-snug">
                      {edu.description}
                    </p>
                  )}

                  {edu.honors && edu.honors.length > 0 && (
                    <div className="text-[10px] text-slate-500">
                      Honors: {edu.honors.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 5. Key Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Key Projects
            </h2>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-slate-900 ${isClassic ? 'font-serif' : ''}`}>
                        {proj.title}
                      </span>
                      {proj.liveUrl && (
                        <a
                          href={proj.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-0.5 text-[9.5px] text-indigo-600 hover:underline"
                        >
                          <span>Live Demo</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                    {(proj.startDate || proj.endDate) && (
                      <span className="text-[10px] text-slate-400">
                        {proj.startDate} – {proj.endDate || 'Present'}
                      </span>
                    )}
                  </div>

                  <p className="text-[10.5px] text-slate-600 leading-snug">
                    {proj.description}
                  </p>

                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 pt-0.5">
                      {isMinimal ? (
                        <span className="text-[9.5px] text-slate-500">
                          Built with: {proj.technologies.join(', ')}
                        </span>
                      ) : (
                        proj.technologies.map((t, idx) => (
                          <span key={idx} className={theme.techBadge}>
                            {t}
                          </span>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 6. Skills & Competencies */}
        {skills && skills.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Skills & Competencies
            </h2>
            <div className="space-y-1 text-[10.5px]">
              {technicalCategories.map((cat) => (
                <div key={cat.id} className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                  <span className={`font-bold text-slate-800 sm:w-44 shrink-0 ${isClassic ? 'font-serif' : ''}`}>
                    {cat.name}:
                  </span>
                  <span className="text-slate-600 leading-relaxed">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}

              {softSkillsCategory && (
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 pt-0.5">
                  <span className={`font-bold text-slate-800 sm:w-44 shrink-0 ${isClassic ? 'font-serif' : ''}`}>
                    Soft Skills:
                  </span>
                  <span className="text-slate-600 leading-relaxed">
                    {softSkillsCategory.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Certifications & Credentials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-1.5 rounded-xs bg-slate-50 border border-slate-200/80">
                  <div className={`font-bold text-slate-900 ${isClassic ? 'font-serif' : ''}`}>
                    {cert.name}
                  </div>
                  <div className="text-[9.5px] text-slate-500">
                    {cert.issuer} {cert.issueDate && `· ${cert.issueDate}`}
                  </div>
                  {cert.credentialId && (
                    <div className="text-[9px] text-slate-400 font-mono">ID: {cert.credentialId}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. Achievements */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Honors & Achievements
            </h2>
            <div className="space-y-1.5 text-[10.5px]">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex justify-between items-start gap-2">
                  <div>
                    <span className={`font-bold text-slate-900 ${isClassic ? 'font-serif' : ''}`}>
                      {ach.title}
                    </span>
                    {ach.organization && <span className="text-slate-500"> — {ach.organization}</span>}
                    {ach.description && (
                      <p className="text-[10px] text-slate-600 leading-snug mt-0.5">{ach.description}</p>
                    )}
                  </div>
                  {ach.date && <span className="text-[9.5px] text-slate-400 shrink-0">{ach.date}</span>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 9. Languages */}
        {languages && languages.length > 0 && (
          <section>
            <h2 className={theme.sectionHeading}>
              Languages
            </h2>
            <div className="flex flex-wrap gap-2 text-[10.5px]">
              {languages.map((l) => (
                <span key={l.id} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-800">{l.language}</span>
                  <span className="text-[9.5px] text-slate-500">({l.proficiency})</span>
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
