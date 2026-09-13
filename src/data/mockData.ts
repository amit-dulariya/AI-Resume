import {
  Resume,
  ResumeTemplate,
  ResumeAnalysis,
  JobMatchAnalysis,
  UserSettings,
} from '../types/resume';

export const mockTemplates: ResumeTemplate[] = [
  {
    id: 'tpl-modern',
    name: 'Modern',
    description: 'Clean structured layout with contemporary sans-serif typography, subtle indigo accents, and optimized section hierarchy.',
    thumbnail: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&auto=format&fit=crop&q=80',
    category: 'Modern',
    isPopular: true,
  },
  {
    id: 'tpl-classic',
    name: 'Classic',
    description: 'Timeless single-column design with distinguished serif headings, horizontal rules, and traditional corporate formatting.',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=400&auto=format&fit=crop&q=80',
    category: 'Executive',
    isPopular: true,
  },
  {
    id: 'tpl-minimal',
    name: 'Minimal',
    description: 'Ultra-clean, uncluttered format maximizing whitespace and typographic precision with zero distractions for pure ATS parsing.',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&auto=format&fit=crop&q=80',
    category: 'Minimalist',
  },
  {
    id: 'tpl-professional',
    name: 'Professional',
    description: 'Balanced slate-accented layout designed for business, corporate consulting, engineering management, and finance.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&auto=format&fit=crop&q=80',
    category: 'Technical',
    isNew: true,
  },
  {
    id: 'tpl-executive',
    name: 'Executive',
    description: 'Authoritative styling featuring centered header, elegant navy dividers, and highlighted credentials for senior leaders and directors.',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&auto=format&fit=crop&q=80',
    category: 'Executive',
  },
];

export const mockResumes: Resume[] = [
  {
    id: 'res-1',
    title: 'Senior Full Stack Engineer Resume',
    targetRole: 'Staff / Senior Software Engineer',
    templateId: 'tpl-modern',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    createdAt: '2026-08-10T14:30:00.000Z',
    atsScore: 92,
    status: 'analyzed',
    pageCount: 1,
    content: {
      personalInfo: {
        fullName: 'Alexander Wright',
        jobTitle: 'Senior Full Stack Engineer',
        email: 'alex.wright@example.com',
        phone: '+1 (555) 349-2910',
        location: 'San Francisco, CA (Open to Remote)',
        website: 'https://alexwright.dev',
        summary:
          'High-impact software engineer with 7+ years architecting distributed web platforms, high-throughput APIs, and modern frontend systems. Proven track record reducing latency by 45% and leading cross-functional squads to scale products to 2M+ active users.',
        socialLinks: [
          { id: 's1', platform: 'LinkedIn', url: 'https://linkedin.com/in/alex-wright' },
          { id: 's2', platform: 'GitHub', url: 'https://github.com/alexwright' },
        ],
      },
      experience: [
        {
          id: 'exp-1',
          company: 'Nexus Cloud Platforms',
          position: 'Lead Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2023-03-01',
          current: true,
          highlights: [
            'Architected event-driven microservices processing 45M daily requests with 99.99% uptime utilizing Go and TypeScript.',
            'Spearheaded migration of legacy monolith to modular React frontends, improving Core Web Vitals LCP by 62%.',
            'Mentored 6 engineers and standardized automated CI/CD deployment pipelines with zero-downtime rolling releases.',
          ],
          technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
        },
        {
          id: 'exp-2',
          company: 'Vanguard Health Technologies',
          position: 'Senior Frontend Developer',
          location: 'Austin, TX',
          startDate: '2020-08-01',
          endDate: '2023-02-28',
          current: false,
          highlights: [
            'Built real-time telemetry dashboard using React, WebSockets, and D3.js utilized by over 800 hospital networks.',
            'Implemented strict WCAG 2.1 AA accessibility compliance across all patient-facing portals.',
            'Engineered reusable design system library reducing feature sprint delivery time by 30%.',
          ],
          technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
        },
      ],
      education: [
        {
          id: 'edu-1',
          institution: 'University of California, Berkeley',
          degree: 'Bachelor of Science',
          fieldOfStudy: 'Computer Science',
          location: 'Berkeley, CA',
          startDate: '2016-09-01',
          endDate: '2020-05-30',
          current: false,
          gpa: '3.85 / 4.0',
          honors: ['Dean’s Honors List (2018-2020)', 'UGC Computer Society Chair'],
        },
      ],
      skills: [
        {
          id: 'cat-1',
          name: 'Core Languages & Frameworks',
          skills: [
            { id: 'sk-1', name: 'TypeScript', level: 'Expert' },
            { id: 'sk-2', name: 'React 19', level: 'Expert' },
            { id: 'sk-3', name: 'Node.js', level: 'Advanced' },
            { id: 'sk-4', name: 'Python', level: 'Intermediate' },
            { id: 'sk-5', name: 'Next.js', level: 'Advanced' },
          ],
        },
        {
          id: 'cat-2',
          name: 'Cloud & Infrastructure',
          skills: [
            { id: 'sk-6', name: 'Docker', level: 'Advanced' },
            { id: 'sk-7', name: 'PostgreSQL', level: 'Advanced' },
            { id: 'sk-8', name: 'AWS (ECS, S3, RDS)', level: 'Advanced' },
            { id: 'sk-9', name: 'Redis', level: 'Intermediate' },
          ],
        },
      ],
      projects: [
        {
          id: 'proj-1',
          title: 'PulseOps — Distributed Tracing Tool',
          description: 'Open-source distributed observability lightweight agent for containerized microservices.',
          liveUrl: 'https://pulseops.dev',
          githubUrl: 'https://github.com/alexwright/pulseops',
          highlights: [
            'Grew to 1,400+ GitHub stars and featured on Hacker News front page.',
            'Engineered low-overhead memory buffer keeping tracing impact <0.5% CPU overhead.',
          ],
          technologies: ['Go', 'TypeScript', 'WebAssembly', 'ClickHouse'],
        },
      ],
      certifications: [
        {
          id: 'cert-1',
          name: 'AWS Certified Solutions Architect – Associate',
          issuer: 'Amazon Web Services',
          issueDate: '2024-04-15',
          expiryDate: '2027-04-15',
          credentialId: 'AWS-992381204',
        },
      ],
      achievements: [
        {
          id: 'ach-1',
          title: 'Nexus Innovation Hackathon Winner',
          organization: 'Nexus Cloud Platforms',
          description: '1st place out of 40 cross-engineering teams for building an automated generative telemetry summarizer.',
          date: '2024-11-10',
        },
      ],
      languages: [
        { id: 'lang-1', language: 'English', proficiency: 'Native' },
        { id: 'lang-2', language: 'Spanish', proficiency: 'Professional' },
      ],
    },
  },
  {
    id: 'res-2',
    title: 'Product Manager - SaaS Growth',
    targetRole: 'Senior Product Manager',
    templateId: 'tpl-minimalist',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 1 day ago
    createdAt: '2026-08-20T10:15:00.000Z',
    atsScore: 78,
    status: 'analyzed',
    pageCount: 1,
    content: {
      personalInfo: {
        fullName: 'Alexander Wright',
        jobTitle: 'Technical Product Manager',
        email: 'alex.wright@example.com',
        phone: '+1 (555) 349-2910',
        location: 'San Francisco, CA',
        summary:
          'Product leader with engineering background bridging complex systems and user experience. Driven 3.2x self-serve revenue growth through experimental onboarding funnels and data-backed monetization strategies.',
        socialLinks: [{ id: 's1', platform: 'LinkedIn', url: 'https://linkedin.com/in/alex-wright' }],
      },
      experience: [
        {
          id: 'exp-p1',
          company: 'HyperGrowth SaaS',
          position: 'Senior Product Manager, Growth',
          startDate: '2023-01-01',
          current: true,
          highlights: [
            'Owned self-serve PLG engine generating $18M ARR; ran 40+ iterative A/B experiments boosting conversion rate by 24%.',
            'Partnered with UX research and data engineering to overhaul activation milestone tracking.',
          ],
          technologies: ['Mixpanel', 'Figma', 'SQL', 'Amplitude', 'Jira'],
        },
      ],
      education: [
        {
          id: 'edu-2',
          institution: 'UC Berkeley',
          degree: 'B.S. in Computer Science',
          fieldOfStudy: 'Computer Science & Economics',
          startDate: '2016-09-01',
          endDate: '2020-05-30',
          current: false,
        },
      ],
      skills: [
        {
          id: 'cat-pm',
          name: 'Product & Analytics',
          skills: [
            { id: 'pm-1', name: 'Product Analytics & SQL', level: 'Expert' },
            { id: 'pm-2', name: 'A/B Testing & Experimentation', level: 'Expert' },
            { id: 'pm-3', name: 'Roadmapping & PRDs', level: 'Advanced' },
          ],
        },
      ],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [{ id: 'l1', language: 'English', proficiency: 'Native' }],
    },
  },
  {
    id: 'res-3',
    title: 'Consulting & Strategy Lead',
    targetRole: 'Strategy Consultant',
    templateId: 'tpl-executive',
    lastModified: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    createdAt: '2026-07-14T08:00:00.000Z',
    atsScore: 84,
    status: 'draft',
    pageCount: 2,
    content: {
      personalInfo: {
        fullName: 'Alexander Wright',
        jobTitle: 'Strategy & Operations Consultant',
        email: 'alex.wright@example.com',
        phone: '+1 (555) 349-2910',
        location: 'San Francisco, CA',
        summary:
          'Versatile strategist leading digital transformation initiatives for Fortune 500 enterprises across cloud migration and operational optimization.',
        socialLinks: [],
      },
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: [],
      achievements: [],
      languages: [],
    },
  },
];

export const mockAnalysis: ResumeAnalysis = {
  id: 'ana-1',
  resumeId: 'res-1',
  resumeTitle: 'Senior Full Stack Engineer Resume',
  date: '2026-09-12T16:40:00.000Z',
  overallScore: 92,
  breakdown: {
    impactScore: 95,
    brevityScore: 90,
    styleScore: 88,
    atsReadabilityScore: 96,
  },
  summary:
    'Outstanding technical resume with quantifiable metric-driven bullets, clean linear sectioning, and high density of industry-standard skill keywords.',
  keyStrengths: [
    'Strong action verbs paired with quantifiable business outcomes (e.g., "reduced latency by 45%", "$18M ARR").',
    'Standardized date formats and single-tier bullet points easily processed by modern ATS algorithms.',
    'Clear breakdown of technological proficiencies aligned with modern cloud engineering roles.',
  ],
  criticalIssues: [
    'Add 1-2 more specific cloud security or compliance keywords (e.g., SOC2, OAuth2, IAM) if targeting FinTech roles.',
    'Ensure all hyperlinks have readable text fallbacks in case export stripping occurs.',
  ],
  checks: [
    {
      id: 'chk-1',
      category: 'Formatting',
      status: 'passed',
      title: 'Standard Margins & Clean Layout',
      message: 'Document uses 0.75-inch standard margins and avoids complex tables or floating graphics.',
    },
    {
      id: 'chk-2',
      category: 'Keywords',
      status: 'passed',
      title: 'High In-Demand Keyword Density',
      message: 'Detected 24 relevant technical keywords including TypeScript, React 19, Docker, and PostgreSQL.',
    },
    {
      id: 'chk-3',
      category: 'Impact',
      status: 'passed',
      title: 'Action-Driven Metric Statements',
      message: '85% of bullet points contain quantifiable numbers, percentages, or scale metrics.',
    },
    {
      id: 'chk-4',
      category: 'Length',
      status: 'passed',
      title: 'Optimal Page Length (1 Page)',
      message: 'Content fits strictly within a balanced single page for 7 years of work history.',
    },
    {
      id: 'chk-5',
      category: 'Structure',
      status: 'warning',
      title: 'Summary Length',
      message: 'Summary statement is 3 lines; trimming to 2 concise lines may boost scanning speed by 15%.',
      suggestion: 'Remove redundant introductory adjectives and emphasize immediate engineering specializations.',
    },
  ],
};

export const mockJobMatches: JobMatchAnalysis[] = [
  {
    id: 'jm-1',
    resumeId: 'res-1',
    jobTitle: 'Senior Frontend Architect',
    companyName: 'Stripe, Inc.',
    matchScore: 88,
    matchingKeywords: ['TypeScript', 'React', 'Design Systems', 'Core Web Vitals', 'CI/CD', 'Mentorship'],
    missingKeywords: ['Micro-frontends', 'State Machines (XState)', 'E2E Testing (Playwright)'],
    recommendations: [
      'Highlight any large-scale design system token distribution or Playwright automated testing in your Nexus Cloud experience.',
      'Explicitly reference API contract testing or OpenAPI specifications in your architectural summaries.',
    ],
    jobDescriptionSnippet:
      'We are looking for a Senior Frontend Architect to lead technical design across our checkout workflows, maintaining blazing-fast web performance and resilient UI components...',
    dateAnalyzed: '2026-09-11T19:20:00.000Z',
  },
  {
    id: 'jm-2',
    resumeId: 'res-1',
    jobTitle: 'Staff Full Stack Engineer',
    companyName: 'Datadog',
    matchScore: 94,
    matchingKeywords: ['Distributed Systems', 'TypeScript', 'Node.js', 'Go', 'Docker', 'Telemetry', 'PostgreSQL'],
    missingKeywords: ['gRPC', 'Kubernetes Helm'],
    recommendations: [
      'Your PulseOps project provides exceptional alignment with observability requirements. Move it higher or reference it directly in your summary.',
    ],
    jobDescriptionSnippet:
      'Datadog is hiring a Staff Full Stack Engineer for our APM traces and logs intelligence team. Ideal candidates have demonstrated expertise with high-throughput event processing and clean React dashboards...',
    dateAnalyzed: '2026-09-08T11:00:00.000Z',
  },
];

export const mockUserSettings: UserSettings = {
  name: 'Alexander Wright',
  email: 'alex.wright@example.com',
  defaultTemplateId: 'tpl-modern',
  targetIndustry: 'Technology & Cloud Infrastructure',
  experienceLevel: 'Senior',
  notifications: {
    emailAlerts: true,
    weeklyTips: true,
    scoreUpdates: true,
  },
  theme: 'light',
};
