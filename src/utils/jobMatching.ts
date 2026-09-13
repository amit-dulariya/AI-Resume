import {
  Resume,
  DetailedJobMatchReport,
  SkillMatchItem,
  SectionRelevanceItem,
  MatchImprovementSuggestion,
  AIImprovementRecommendation,
} from '../types/resume';

export interface PresetJobItem {
  id: string;
  title: string;
  company: string;
  description: string;
}

export const PRESET_JOB_DESCRIPTIONS: PresetJobItem[] = [
  {
    id: 'preset-stripe-swe',
    title: 'Staff Full Stack Engineer (Core Payments)',
    company: 'Stripe',
    description: `Staff Full Stack Engineer - Core Payments Architecture
Stripe is seeking an experienced Staff Full Stack Engineer to lead technical design across distributed payment checkout workflows and mission-critical payment rails.

Key Responsibilities:
- Architect high-throughput distributed systems using React, TypeScript, Node.js, and PostgreSQL.
- Build low-latency microservices handling millions of transactions with 99.999% uptime.
- Implement containerized deployments and CI/CD pipelines using Docker, Kubernetes, and AWS infrastructure.
- Optimize frontend Core Web Vitals, checkout bundle sizes, and state machines with modern testing (Jest, Playwright).
- Partner with security teams to ensure strict PCI-DSS and SOC2 compliance.
- Mentor senior engineers and drive cross-functional engineering standards.

Qualifications:
- 6+ years of production experience with TypeScript, React, and distributed backend systems (Node.js, Go, or Java).
- Hands-on expertise with relational databases (PostgreSQL), Redis caching, and message queues (Kafka).
- Deep experience in cloud infrastructure (AWS or GCP), Docker, and Kubernetes.
- Bachelor's or Master's degree in Computer Science, Software Engineering, or equivalent practical experience.`,
  },
  {
    id: 'preset-datadog-pm',
    title: 'Lead Technical Product Manager (Telemetry & APM)',
    company: 'Datadog',
    description: `Lead Technical Product Manager - Telemetry & APM Platform
Datadog is hiring a Lead Technical Product Manager to scale our application performance monitoring (APM) and developer observability suite.

Key Responsibilities:
- Define product strategy, write detailed PRDs, and guide sprint backlogs for observability engineers.
- Drive quantitative user behavior analysis and funnel conversion metrics using SQL, Mixpanel, and Amplitude.
- Champion Product-Led Growth (PLG), self-serve developer activation, and feature telemetry.
- Partner with customer engineering and enterprise clients to translate observability needs into product specifications.

Qualifications:
- 5+ years in technical product management for B2B SaaS, cloud infrastructure, or developer tools.
- Proficiency in SQL queries, data visualization (Tableau, Looker), and Agile / Scrum execution.
- Strong technical fluency in distributed systems, APIs, and cloud architectures.
- Bachelor's degree in Computer Science, Information Systems, or business-related field.`,
  },
  {
    id: 'preset-nexus-devops',
    title: 'Senior DevOps & Platform Engineer',
    company: 'Nexus Cloud Infrastructure',
    description: `Senior DevOps & Platform Engineer
Join our infrastructure platform team to build automated, secure, and resilient cloud architectures for enterprise applications.

Key Responsibilities:
- Automate infrastructure as code (IaC) using Terraform and AWS CloudFormation.
- Manage and scale multi-tenant Kubernetes clusters (EKS), service meshes (Istio), and GitOps CI/CD pipelines.
- Implement comprehensive telemetry, logging, and synthetic monitoring using Prometheus, Grafana, and Datadog.
- Enforce IAM least-privilege security policies, secrets rotation, and automated vulnerability scanning.

Qualifications:
- 4+ years dedicated DevOps, SRE, or cloud infrastructure platform experience.
- Deep expertise in AWS, Linux internals, Docker, Kubernetes, and Terraform.
- Scripting fluency in Python, Bash, or Go.
- Proven track record maintaining 99.99% service availability.`,
  },
  {
    id: 'preset-meta-frontend',
    title: 'Senior Frontend Architect (Design Systems & Web)',
    company: 'Meta / NextGen Labs',
    description: `Senior Frontend Architect - Design Systems & Web Performance
We are looking for a Senior Frontend Architect to champion web excellence, design systems, and frontend architecture across high-traffic web applications.

Key Responsibilities:
- Lead the architecture and implementation of scalable component design systems using React, TypeScript, and Tailwind CSS.
- Drive Core Web Vitals optimizations (LCP, FID, CLS) and frontend build tooling with Vite, Webpack, and Next.js.
- Champion modern web testing frameworks (Playwright, Jest, Cypress) to maintain 90%+ test coverage.
- Collaborate closely with Product Designers in Figma to turn design tokens into robust UI components.

Qualifications:
- 5+ years of dedicated web frontend engineering with TypeScript, modern React, and design system governance.
- Demonstrated experience auditing and optimizing web performance metrics at scale.
- Familiarity with accessibility standards (WCAG 2.1 AA) and responsive layouts across viewports.`,
  },
];

/**
 * Parses job description and candidate resume to compute detailed matching metrics
 */
export function analyzeJobMatch(
  resume: Resume,
  jobDescription: string
): DetailedJobMatchReport {
  const content = resume.content || ({} as any);
  const personal = content.personalInfo || {};
  const experiences = content.experience || [];
  const educations = content.education || [];
  const skillCategories = content.skills || [];
  const projects = content.projects || [];
  const certifications = content.certifications || [];

  const jdLower = jobDescription.toLowerCase();

  // Extract job title and company heuristics from JD
  let detectedTitle = 'Target Role';
  let detectedCompany = 'Target Company';

  const titleMatch = jobDescription.match(/(?:Senior|Lead|Staff|Principal|Head of|Junior)?\s*(?:Full Stack|Frontend|Backend|Software|DevOps|Platform|Cloud|Product|Data|System)\s*(?:Engineer|Architect|Manager|Developer)/i);
  if (titleMatch) {
    detectedTitle = titleMatch[0].trim();
  } else if (resume.targetRole) {
    detectedTitle = resume.targetRole;
  }

  const companyMatch = jobDescription.match(/(?:at|join|company:|team at|is seeking an?|is hiring an?)\s*([A-Z][A-Za-z0-9&., ]+?)(?:\s+(?:is|to|for|we|\n))/);
  if (companyMatch && companyMatch[1].trim().length < 30) {
    detectedCompany = companyMatch[1].trim();
  } else {
    detectedCompany = 'Prospective Employer';
  }

  // Gather text tokens from resume
  const allResumeSkills = skillCategories.flatMap((c: any) =>
    (c.skills || []).map((s: any) => (typeof s === 'string' ? s : s.name))
  );

  const experienceText = experiences
    .flatMap((e: any) => [...(e.highlights || []), e.position || '', e.company || ''])
    .join(' ');

  const projectText = projects
    .flatMap((p: any) => [p.name || '', p.description || '', ...(p.technologies || [])])
    .join(' ');

  const educationText = educations
    .map((e: any) => `${e.degree || ''} ${e.institution || ''} ${e.fieldOfStudy || ''}`)
    .join(' ');

  const fullResumeText = [
    personal.fullName || '',
    personal.jobTitle || '',
    personal.summary || '',
    ...allResumeSkills,
    experienceText,
    projectText,
    educationText,
  ]
    .join(' ')
    .toLowerCase();

  // Database of potential skills to test against the JD
  const candidateSkillsCatalog: Array<{
    name: string;
    category: string;
    importance: 'Required' | 'Preferred' | 'Bonus';
  }> = [
    { name: 'TypeScript', category: 'Programming Languages', importance: 'Required' },
    { name: 'React', category: 'Frontend Frameworks', importance: 'Required' },
    { name: 'Node.js', category: 'Backend Technologies', importance: 'Required' },
    { name: 'PostgreSQL', category: 'Databases & Storage', importance: 'Required' },
    { name: 'Docker', category: 'DevOps & Containers', importance: 'Required' },
    { name: 'AWS', category: 'Cloud Platforms', importance: 'Required' },
    { name: 'Kubernetes', category: 'Container Orchestration', importance: 'Preferred' },
    { name: 'GraphQL', category: 'APIs & Networking', importance: 'Preferred' },
    { name: 'Redis', category: 'Databases & Caching', importance: 'Preferred' },
    { name: 'Kafka', category: 'Streaming & Queues', importance: 'Preferred' },
    { name: 'CI/CD', category: 'Automation & DevOps', importance: 'Required' },
    { name: 'Terraform', category: 'Infrastructure as Code', importance: 'Preferred' },
    { name: 'Tailwind CSS', category: 'Frontend Styling', importance: 'Bonus' },
    { name: 'Jest', category: 'Testing & QA', importance: 'Preferred' },
    { name: 'Playwright', category: 'End-to-End Testing', importance: 'Preferred' },
    { name: 'Core Web Vitals', category: 'Web Performance', importance: 'Preferred' },
    { name: 'Microservices', category: 'System Architecture', importance: 'Required' },
    { name: 'Distributed Systems', category: 'System Architecture', importance: 'Required' },
    { name: 'SQL', category: 'Databases & Analytics', importance: 'Required' },
    { name: 'Python', category: 'Programming Languages', importance: 'Bonus' },
    { name: 'Go', category: 'Programming Languages', importance: 'Bonus' },
    { name: 'Agile / Scrum', category: 'Methodologies', importance: 'Bonus' },
    { name: 'Figma', category: 'Design & Collaboration', importance: 'Bonus' },
    { name: 'Prometheus', category: 'Monitoring & Telemetry', importance: 'Bonus' },
    { name: 'Datadog', category: 'Monitoring & Observability', importance: 'Preferred' },
    { name: 'Security / SOC2', category: 'Compliance & Security', importance: 'Preferred' },
  ];

  // Filter catalog to skills mentioned or implied in the job description
  const jdSkills = candidateSkillsCatalog.filter((s) =>
    jdLower.includes(s.name.toLowerCase())
  );

  // If JD has few matching known skills, fall back to core relevant ones
  const activeSkillsList =
    jdSkills.length >= 5
      ? jdSkills
      : [
          ...jdSkills,
          ...candidateSkillsCatalog.slice(0, 8).filter((s) => !jdSkills.some((j) => j.name === s.name)),
        ];

  // Matched vs Missing Skills
  const matchedSkills: SkillMatchItem[] = [];
  const missingSkills: SkillMatchItem[] = [];

  activeSkillsList.forEach((skill, index) => {
    const isFound = fullResumeText.includes(skill.name.toLowerCase());
    const item: SkillMatchItem = {
      id: `skill-${index}`,
      name: skill.name,
      category: skill.category,
      importance: skill.importance,
      foundInResume: isFound,
      contextInResume: isFound
        ? allResumeSkills.some((s: string) => s.toLowerCase().includes(skill.name.toLowerCase()))
          ? 'Listed in Skills section'
          : 'Mentioned in Experience / Projects'
        : undefined,
    };

    if (isFound) {
      matchedSkills.push(item);
    } else {
      missingSkills.push(item);
    }
  });

  // Keywords matching
  const keyTerms = [
    'TypeScript',
    'React',
    'Node.js',
    'PostgreSQL',
    'Docker',
    'AWS',
    'Kubernetes',
    'GraphQL',
    'Redis',
    'CI/CD',
    'Microservices',
    'Core Web Vitals',
    'System Design',
    'Scalability',
    'Testing',
    'Agile',
    'SOC2',
    'Telemetry',
    'High Availability',
    'REST APIs',
  ];

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  keyTerms.forEach((term) => {
    const inJd = jdLower.includes(term.toLowerCase());
    const inResume = fullResumeText.includes(term.toLowerCase());

    if (inJd && inResume) {
      matchedKeywords.push(term);
    } else if (inJd && !inResume) {
      missingKeywords.push(term);
    } else if (inResume && matchedKeywords.length < 8) {
      matchedKeywords.push(term);
    }
  });

  // Ensure lists have items
  if (missingKeywords.length === 0) {
    missingKeywords.push('Micro-frontends', 'State Machines (XState)', 'gRPC');
  }

  // 1. Compute Skills Match Score (0 - 100)
  const totalSkills = matchedSkills.length + missingSkills.length;
  const skillsMatchScore = totalSkills > 0 ? Math.round((matchedSkills.length / totalSkills) * 100) : 78;

  // 2. Compute Keyword Match Score (0 - 100)
  const totalKeywords = matchedKeywords.length + missingKeywords.length;
  const keywordMatchScore = totalKeywords > 0 ? Math.round((matchedKeywords.length / totalKeywords) * 100) : 75;

  // 3. Compute Experience Match Score (0 - 100)
  // Check experience tenure and metrics
  const totalBullets = experiences.flatMap((e: any) => e.highlights || []).length;
  const metricBullets = experiences
    .flatMap((e: any) => e.highlights || [])
    .filter((h: string) => /\d+%|\$\d+|\b\d+\b/i.test(h)).length;
  const metricRatio = totalBullets > 0 ? metricBullets / totalBullets : 0.5;

  let experienceMatchScore = Math.round(
    Math.min(95, Math.max(55, 60 + experiences.length * 7 + metricRatio * 20))
  );

  // 4. Compute Education Match Score (0 - 100)
  const hasDegree = educations.length > 0;
  const hasStemField = educations.some((e: any) =>
    /(computer|software|engineering|technology|science|mathematics|information)/i.test(
      `${e.degree || ''} ${e.fieldOfStudy || ''}`
    )
  );
  let educationMatchScore = hasDegree ? (hasStemField ? 95 : 85) : 60;
  if (certifications.length > 0) {
    educationMatchScore = Math.min(98, educationMatchScore + 5);
  }

  // 5. Compute Overall Score
  // Weighted: Skills 35%, Keywords 25%, Experience 25%, Education 15%
  const overallScore = Math.min(
    98,
    Math.max(
      45,
      Math.round(
        skillsMatchScore * 0.35 +
          keywordMatchScore * 0.25 +
          experienceMatchScore * 0.25 +
          educationMatchScore * 0.15
      )
    )
  );

  // Summary Verdict
  let label = 'Strong Candidate Alignment';
  let grade = 'A';
  let summary = `Your resume achieves an outstanding ${overallScore}% alignment with the requirements for ${detectedTitle}. Key technical proficiencies and leadership experiences align closely with this job description.`;

  if (overallScore >= 90) {
    label = 'Exceptional Match';
    grade = 'A+';
    summary = `Top-tier alignment with ${detectedTitle} at ${detectedCompany}. Your technical stack and experience metrics surpass the vast majority of applicants.`;
  } else if (overallScore >= 80) {
    label = 'Strong Match';
    grade = 'A';
    summary = `High technical synergy with ${detectedTitle}. Addressing missing critical keywords will maximize ATS ranking and callback probabilities.`;
  } else if (overallScore >= 70) {
    label = 'Moderate Match';
    grade = 'B+';
    summary = `Good foundational alignment for ${detectedTitle}. Adding specific missing tools and aligning job bullet outcomes will significantly strengthen your positioning.`;
  } else {
    label = 'Needs Tailoring';
    grade = 'C+';
    summary = `Several core qualifications and role-specific requirements are missing from your resume. Incorporating target keywords will bridge the gap.`;
  }

  // Relevant Resume Sections
  const relevantSections: SectionRelevanceItem[] = [
    {
      id: 'sec-exp',
      sectionName: 'Work Experience',
      relevanceScore: experienceMatchScore,
      status: experienceMatchScore >= 85 ? 'Strong Alignment' : 'Moderate Alignment',
      matchingHighlights: [
        `${experiences.length} career positions mapped to required responsibilities`,
        `${Math.round(metricRatio * 100)}% of experience bullets feature quantified performance outcomes`,
        'Demonstrated leadership in distributed software architecture and team mentorship',
      ],
      recommendation:
        'Inject missing keywords like ' +
        (missingKeywords.slice(0, 2).join(' and ') || 'Kubernetes and CI/CD') +
        ' into your most recent position bullets.',
    },
    {
      id: 'sec-skills',
      sectionName: 'Technical Skills',
      relevanceScore: skillsMatchScore,
      status: skillsMatchScore >= 85 ? 'Strong Alignment' : 'Moderate Alignment',
      matchingHighlights: [
        `${matchedSkills.length} of ${totalSkills} core qualifications confirmed`,
        'High-density indexing of modern web technologies and cloud databases',
        'Structured categorization recognized by standard ATS scrapers',
      ],
      recommendation:
        'Add ' +
        (missingSkills.slice(0, 2).map((s) => s.name).join(', ') || 'specialized tools') +
        ' to your categorized skills list to boost automated keyword weighting.',
    },
    {
      id: 'sec-projects',
      sectionName: 'Projects & Portfolio',
      relevanceScore: projects.length > 0 ? 92 : 65,
      status: projects.length > 0 ? 'Strong Alignment' : 'Needs Tailoring',
      matchingHighlights:
        projects.length > 0
          ? projects.map((p: any) => `${p.name}: ${p.technologies?.slice(0, 3).join(', ') || 'Modern Stack'}`)
          : ['No standalone open source or portfolio projects listed'],
      recommendation:
        projects.length > 0
          ? 'Reference these projects in your interview discussions as proof of applied architecture.'
          : 'Add 1-2 featured projects highlighting hands-on proficiency with required tools.',
    },
    {
      id: 'sec-edu',
      sectionName: 'Education & Accreditations',
      relevanceScore: educationMatchScore,
      status: educationMatchScore >= 85 ? 'Strong Alignment' : 'Moderate Alignment',
      matchingHighlights: educations.map(
        (e: any) => `${e.degree || 'Degree'} at ${e.institution || 'University'}`
      ),
      recommendation:
        certifications.length > 0
          ? 'Industry certifications verified and properly credited.'
          : 'Consider listing relevant cloud or agile certifications (e.g., AWS Certified, CKA).',
    },
    {
      id: 'sec-sum',
      sectionName: 'Professional Summary',
      relevanceScore: 82,
      status: 'Moderate Alignment',
      matchingHighlights: [
        'Clear career trajectory highlighting full-stack engineering seniority',
        'Direct statement of technical domain specialization',
      ],
      recommendation:
        `Customize the opening sentence to mirror the target title: "${detectedTitle}".`,
    },
  ];

  // Improvement Suggestions
  const improvementSuggestions: MatchImprovementSuggestion[] = [
    {
      id: 'imp-1',
      title: 'Embed High-Priority Missing Keywords',
      type: 'Keyword',
      priority: 'High',
      description: `The job description emphasizes ${missingKeywords.slice(0, 3).join(', ')}, which were not found in your current resume text.`,
      action: 'Incorporate these exact terms into your experience highlights or summary statement.',
      potentialScoreGain: 8,
    },
    {
      id: 'imp-2',
      title: 'Align Job Titles & Headline with Job Posting',
      type: 'Experience',
      priority: 'High',
      description: `Hiring managers and ATS filters quickly match candidates when the resume headline directly reflects "${detectedTitle}".`,
      action: `Update your resume target title or summary headline to "${detectedTitle}".`,
      potentialScoreGain: 5,
    },
    {
      id: 'imp-3',
      title: 'Quantify Specific Scale and Performance Impacts',
      type: 'Experience',
      priority: 'Medium',
      description: 'The job posting calls for experience with high-scale or high-throughput architectures.',
      action: 'Add exact request volumes (e.g., 40M+ req/day), latency reductions (e.g., 45%), or ARR revenue metrics to unquantified bullets.',
      potentialScoreGain: 4,
    },
    {
      id: 'imp-4',
      title: 'Expand Relevant Technical Skills Category',
      type: 'Skill',
      priority: 'Medium',
      description: `Include ${missingSkills.slice(0, 2).map((s) => s.name).join(' and ')} in your Skills section to pass initial automated keyword filters.`,
      action: 'Add these technologies under Frameworks or DevOps categories.',
      potentialScoreGain: 4,
    },
  ];

  // AI Recommendations: "How to Improve Your Match"
  const aiRecommendations: AIImprovementRecommendation[] = [
    {
      id: 'ai-rec-1',
      stepNumber: 1,
      category: 'Keyword Insertion',
      headline: `Incorporate Missing Critical Keywords into Experience Highlights`,
      rationale: `ATS systems scan bullet points rather than just skills lists to verify that keywords are demonstrated in context.`,
      actionableAdvice: `Add ${missingKeywords.slice(0, 2).join(' and ')} to your most recent position at ${experiences[0]?.company || 'your current company'}.`,
      suggestedBullet: {
        original: experiences[0]?.highlights?.[0] || 'Engineered backend microservices and handled deployment pipelines.',
        improved: `Architected high-throughput microservices using ${matchedSkills[0]?.name || 'TypeScript'} and ${missingKeywords[0] || 'Docker'}, deploying containerized workloads via ${missingKeywords[1] || 'Kubernetes'} to achieve 99.99% availability.`,
        section: `Experience • ${experiences[0]?.company || 'Current Company'}`,
      },
    },
    {
      id: 'ai-rec-2',
      stepNumber: 2,
      category: 'Summary Customization',
      headline: `Tailor Your Professional Summary for ${detectedTitle}`,
      rationale: `A customized summary immediately reassures the hiring manager that you are applying deliberately for this specific opportunity.`,
      actionableAdvice: `Frame your opening statement to emphasize your specialty in ${detectedTitle} methodologies and cloud technologies.`,
      suggestedBullet: {
        original: personal.summary || 'Experienced software engineer focused on building web applications.',
        improved: `${detectedTitle} with 6+ years driving resilient full-stack systems and scalable cloud infrastructure. Proven history delivering high-throughput applications, optimizing performance, and accelerating delivery cycles.`,
        section: 'Professional Summary',
      },
    },
    {
      id: 'ai-rec-3',
      stepNumber: 3,
      category: 'Outcome Quantification',
      headline: `Link Responsibilities to Business & Performance KPIs`,
      rationale: `The job description seeks candidates who can demonstrate business results and system optimization.`,
      actionableAdvice: `Pair technical decisions with business metrics: latency reduction, team velocity, or cost savings.`,
      suggestedBullet: {
        original: experiences[1]?.highlights?.[0] || 'Built user interface components and resolved customer bugs.',
        improved: `Refactored frontend architecture and state management, boosting Core Web Vitals score to 98 and cutting page load times by 42% across 1.2M monthly users.`,
        section: `Experience • ${experiences[1]?.company || 'Previous Company'}`,
      },
    },
  ];

  return {
    id: `jmr-${resume.id}-${Date.now()}`,
    resumeId: resume.id,
    resumeTitle: resume.title,
    jobTitle: detectedTitle,
    companyName: detectedCompany,
    dateAnalyzed: new Date().toISOString(),
    jobDescription,
    overallScore,
    skillsMatchScore,
    keywordMatchScore,
    experienceMatchScore,
    educationMatchScore,
    verdict: {
      label,
      grade,
      summary,
    },
    matchedSkills,
    missingSkills,
    matchedKeywords,
    missingKeywords,
    relevantSections,
    improvementSuggestions,
    aiRecommendations,
  };
}
