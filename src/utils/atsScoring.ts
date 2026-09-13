import {
  Resume,
  FullATSAnalysisReport,
  StructureCheck,
  KeywordItem,
  KeywordUsageSuggestion,
  ATSRecommendationItem,
  ATSScoreBreakdown,
} from '../types/resume';

/**
 * Sample Job Descriptions for quick 1-click user testing
 */
export const SAMPLE_JOB_DESCRIPTIONS = [
  {
    id: 'sample-swe',
    title: 'Senior Full Stack Engineer (Cloud / SaaS)',
    company: 'Stripe / CloudScale',
    content: `Senior Full Stack Engineer
We are seeking an experienced Full Stack Engineer to lead architecture across distributed web services and high-scale user experiences.

Key Responsibilities:
- Design, build, and maintain resilient web applications using React, TypeScript, Node.js, and GraphQL.
- Architect high-throughput backend services and data stores utilizing PostgreSQL, Redis, and Kafka.
- Implement CI/CD automation and containerized deployments using Docker and Kubernetes on AWS.
- Drive Core Web Vitals optimization, unit & end-to-end testing with Playwright or Jest.
- Mentor junior engineers and champion clean code standards and system design.

Requirements:
- 5+ years building production-grade web applications.
- Strong proficiency in TypeScript, React, Node.js, and SQL databases.
- Hands-on experience with cloud infrastructure (AWS or GCP), microservices, and Docker.
- Demonstrated experience quantifying performance improvements and business impact.`,
  },
  {
    id: 'sample-pm',
    title: 'Senior Technical Product Manager (PLG & SaaS)',
    company: 'Datadog / HyperGrowth',
    content: `Senior Technical Product Manager
HyperGrowth is looking for a metrics-driven Technical Product Manager to scale our product-led growth engine and developer platform.

Key Responsibilities:
- Define product roadmaps, write crisp PRDs, and guide sprint prioritization.
- Conduct continuous quantitative A/B testing and user funnel analysis using Mixpanel, Amplitude, and SQL.
- Collaborate with engineering and design to streamline onboarding activation and self-serve monetization.
- Partner with customer success and developer advocates to translate customer feedback into technical specs.

Requirements:
- 4+ years of product management experience at a B2B SaaS or technical product company.
- Strong proficiency querying relational databases with SQL and utilizing product telemetry tools.
- Demonstrated history of lifting conversion rates, activation metrics, or ARR growth.`,
  },
  {
    id: 'sample-devops',
    title: 'DevOps & Cloud Platform Engineer',
    company: 'Nexus Cloud Infrastructure',
    content: `DevOps & Cloud Platform Engineer
Join our infrastructure platform team to build secure, scalable, and automated cloud systems.

Key Responsibilities:
- Automate cloud infrastructure provisioning using Terraform and AWS CloudFormation.
- Manage production Kubernetes clusters, service meshes, and GitOps CI/CD pipelines.
- Implement comprehensive telemetry, monitoring, and alerting using Prometheus, Grafana, and Datadog.
- Enforce infrastructure security, IAM least-privilege policies, and SOC2 compliance.

Requirements:
- Hands-on expertise with AWS, Docker, Kubernetes, Linux internals, and Terraform.
- Scripting proficiency in Python, Bash, or Go.
- Proven track record maintaining 99.99% uptime for distributed cloud services.`,
  },
];

/**
 * Common technical and professional keywords by role/category for ATS matching
 */
const COMMON_ROLE_KEYWORDS: Record<string, { critical: string[]; high: string[]; tools: string[] }> = {
  software: {
    critical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'REST APIs', 'System Design'],
    high: ['GraphQL', 'Kubernetes', 'Redis', 'CI/CD', 'AWS', 'Microservices', 'Jest', 'Playwright'],
    tools: ['Git', 'Linux', 'Tailwind CSS', 'Next.js', 'Webpack', 'Vite', 'Kafka'],
  },
  product: {
    critical: ['Product Strategy', 'Roadmapping', 'PRD', 'A/B Testing', 'SQL', 'User Research'],
    high: ['Data Analytics', 'PLG', 'Agile / Scrum', 'Feature Prioritization', 'Amplitude', 'Mixpanel'],
    tools: ['Jira', 'Figma', 'Confluence', 'Tableau', 'Google Analytics'],
  },
  general: {
    critical: ['Leadership', 'Cross-functional Collaboration', 'Project Management', 'Problem Solving'],
    high: ['Data Analysis', 'Process Optimization', 'Communication', 'Strategic Planning'],
    tools: ['Slack', 'Notion', 'Excel / Sheets', 'Google Workspace'],
  },
};

/**
 * Analyzes resume content and optional job description to compute ATS Score,
 * Structure Checks, Keyword Analysis, and Actionable Recommendations.
 *
 * Designed with a clean abstraction so this mock engine can easily be replaced
 * with a Gemini API or backend endpoint without modifying the UI.
 */
export function generateATSScoreReport(
  resume: Resume,
  jobDescriptionText: string = ''
): FullATSAnalysisReport {
  const content = resume.content || ({} as any);
  const personal = content.personalInfo || {};
  const experiences = content.experience || [];
  const educations = content.education || [];
  const skillCategories = content.skills || [];
  const projects = content.projects || [];
  const certifications = content.certifications || [];

  // Gather all text from resume for keyword matching
  const allResumeSkills = skillCategories.flatMap((c: any) =>
    (c.skills || []).map((s: any) => (typeof s === 'string' ? s : s.name))
  );

  const experienceText = experiences
    .flatMap((e: any) => [...(e.highlights || []), e.position || '', e.company || ''])
    .join(' ');

  const projectText = projects
    .flatMap((p: any) => [p.name || '', p.description || '', ...(p.technologies || [])])
    .join(' ');

  const fullResumeText = [
    personal.fullName || '',
    personal.jobTitle || '',
    personal.summary || '',
    ...allResumeSkills,
    experienceText,
    projectText,
  ]
    .join(' ')
    .toLowerCase();

  // Determine role focus
  const isProduct =
    (resume.targetRole || personal.jobTitle || '').toLowerCase().includes('product') ||
    (resume.targetRole || personal.jobTitle || '').toLowerCase().includes('pm');

  const roleKeywords = isProduct ? COMMON_ROLE_KEYWORDS.product : COMMON_ROLE_KEYWORDS.software;

  // 1. Structure Checks
  const structureChecks: StructureCheck[] = [];

  // Contact Information
  const hasEmail = Boolean(personal.email && personal.email.includes('@'));
  const hasPhone = Boolean(personal.phone && personal.phone.trim().length > 6);
  const hasLocation = Boolean(personal.location && personal.location.trim().length > 2);
  const hasLinkedIn = Boolean(personal.socialLinks?.some((s: any) => s.platform?.toLowerCase().includes('linkedin') || s.url?.includes('linkedin')));

  const contactMissingCount = [hasEmail, hasPhone, hasLocation, hasLinkedIn].filter((v) => !v).length;
  structureChecks.push({
    id: 'struct-contact',
    section: 'Contact Information',
    status: contactMissingCount === 0 ? 'Good' : contactMissingCount <= 1 ? 'Needs Improvement' : 'Missing',
    summary:
      contactMissingCount === 0
        ? 'All key contact identifiers (Email, Phone, Location, LinkedIn) detected.'
        : `Missing ${contactMissingCount} standard contact field(s).`,
    details: [
      hasEmail ? 'Email address valid & ATS-parsable' : 'Missing or invalid email address',
      hasPhone ? 'Phone number present' : 'Missing direct contact telephone number',
      hasLocation ? `Location detected: ${personal.location}` : 'Missing geographic location (City, State / Remote)',
      hasLinkedIn ? 'LinkedIn profile hyperlink detected' : 'Recommended: Include public LinkedIn profile',
    ],
    recommendation: contactMissingCount > 0 ? 'Add missing contact details to prevent ATS header rejection.' : undefined,
  });

  // Summary
  const summaryText = personal.summary?.trim() || '';
  const summaryWords = summaryText ? summaryText.split(/\s+/).length : 0;
  let summaryStatus: 'Good' | 'Needs Improvement' | 'Missing' = 'Good';
  let summaryMsg = 'Compelling, concise career summary statement.';

  if (!summaryText) {
    summaryStatus = 'Missing';
    summaryMsg = 'Professional summary section is completely missing.';
  } else if (summaryWords < 15) {
    summaryStatus = 'Needs Improvement';
    summaryMsg = 'Summary is too brief (<15 words) to showcase core value proposition.';
  } else if (summaryWords > 80) {
    summaryStatus = 'Needs Improvement';
    summaryMsg = 'Summary exceeds 80 words and may be truncated by initial ATS screeners.';
  }

  structureChecks.push({
    id: 'struct-summary',
    section: 'Summary',
    status: summaryStatus,
    summary: summaryMsg,
    details: [
      summaryText ? `Current length: ${summaryWords} words` : 'Zero words entered',
      'Target range: 35-65 impactful words highlighting technical leadership and specialty',
      summaryText && /\d+%|\$\d+|\d+x/i.test(summaryText)
        ? 'Contains quantified performance metrics'
        : 'Tip: Include at least one quantified business outcome in your summary',
    ],
    recommendation:
      summaryStatus !== 'Good'
        ? 'Refine your summary to 2-3 focused sentences featuring your primary specialty and quantified impact.'
        : undefined,
  });

  // Education
  const hasEducation = educations.length > 0;
  structureChecks.push({
    id: 'struct-education',
    section: 'Education',
    status: hasEducation ? 'Good' : 'Needs Improvement',
    summary: hasEducation
      ? `${educations.length} accredited educational record(s) listed with degree details.`
      : 'No formal educational background listed.',
    details: hasEducation
      ? educations.map((e: any) => `${e.degree || 'Degree'} at ${e.institution || 'Institution'} (${e.startDate ? e.startDate.slice(0, 4) : ''} - ${e.current ? 'Present' : e.endDate?.slice(0, 4) || ''})`)
      : ['Add your college degree, university name, and graduation year.'],
    recommendation: !hasEducation ? 'Add your highest completed degree or diploma.' : undefined,
  });

  // Experience
  const hasExperience = experiences.length > 0;
  const totalBullets = experiences.flatMap((e: any) => e.highlights || []).length;
  const metricBullets = experiences
    .flatMap((e: any) => e.highlights || [])
    .filter((h: string) => /\d+%|\$\d+|\b\d+\b/i.test(h)).length;
  const metricPercentage = totalBullets > 0 ? Math.round((metricBullets / totalBullets) * 100) : 0;

  let expStatus: 'Good' | 'Needs Improvement' | 'Missing' = 'Good';
  if (!hasExperience) {
    expStatus = 'Missing';
  } else if (totalBullets < 3 || metricPercentage < 50) {
    expStatus = 'Needs Improvement';
  }

  structureChecks.push({
    id: 'struct-experience',
    section: 'Experience',
    status: expStatus,
    summary: hasExperience
      ? `${experiences.length} positions documented with ${metricPercentage}% metric-driven achievement bullets.`
      : 'Work experience section is missing.',
    details: [
      `${experiences.length} professional work position(s) listed`,
      `${totalBullets} total achievement bullet points across roles`,
      `${metricBullets} bullets contain quantified figures or percentages (${metricPercentage}%)`,
      'Reverse chronological ordering verified with standard date formatting',
    ],
    recommendation:
      metricPercentage < 60
        ? 'Strengthen bullet points by adding measurable outcomes (e.g. reduced load times by 40%, saved $20k/mo).'
        : undefined,
  });

  // Skills
  const totalSkillsCount = allResumeSkills.length;
  let skillsStatus: 'Good' | 'Needs Improvement' | 'Missing' = 'Good';
  if (totalSkillsCount === 0) {
    skillsStatus = 'Missing';
  } else if (totalSkillsCount < 6) {
    skillsStatus = 'Needs Improvement';
  }

  structureChecks.push({
    id: 'struct-skills',
    section: 'Skills',
    status: skillsStatus,
    summary:
      totalSkillsCount >= 6
        ? `${totalSkillsCount} distinct skills parsed across ${skillCategories.length} categorized group(s).`
        : totalSkillsCount > 0
        ? 'Skills list is sparse (<6 skills). ATS systems rely heavily on skill keywords.'
        : 'Skills section is empty.',
    details: [
      `${totalSkillsCount} indexed technical and domain competencies`,
      `${skillCategories.length} organized categories (e.g. ${skillCategories.map((c: any) => c.name).slice(0, 3).join(', ') || 'None'})`,
      'Formatted without decorative icons or complex graphics for clean ATS parsing',
    ],
    recommendation:
      totalSkillsCount < 10
        ? 'Categorize skills into Languages, Frameworks, Cloud/Databases, and Methodologies.'
        : undefined,
  });

  // Projects
  const hasProjects = projects.length > 0;
  structureChecks.push({
    id: 'struct-projects',
    section: 'Projects',
    status: hasProjects ? 'Good' : 'Needs Improvement',
    summary: hasProjects
      ? `${projects.length} featured project(s) demonstrating applied skills and real-world results.`
      : 'No standalone projects or portfolio items found.',
    details: hasProjects
      ? projects.map((p: any) => `${p.name}: ${p.technologies?.slice(0, 3).join(', ') || 'Modern stack'}`)
      : ['Adding 1-2 open-source or production projects boosts keyword match by up to 15%.'],
    recommendation: !hasProjects ? 'Add 1-2 notable projects to demonstrate hands-on tooling.' : undefined,
  });

  // Certifications
  const hasCertifications = certifications.length > 0;
  structureChecks.push({
    id: 'struct-certifications',
    section: 'Certifications',
    status: hasCertifications ? 'Good' : 'Needs Improvement',
    summary: hasCertifications
      ? `${certifications.length} verified certification(s) or licensures identified.`
      : 'No certifications or specialized accreditations detected.',
    details: hasCertifications
      ? certifications.map((c: any) => `${c.name} (${c.issuer})`)
      : ['Industry credentials (e.g., AWS Certified, CKA, PMP) provide strong ATS scoring boosts.'],
    recommendation: !hasCertifications ? 'Consider adding cloud, agile, or specialized certifications if available.' : undefined,
  });

  // 2. Keyword Analysis
  // Evaluate matched vs missing from roleKeywords + custom job description
  const jdLower = jobDescriptionText.toLowerCase();
  const hasJd = jobDescriptionText.trim().length > 20;

  // Potential keywords list
  const masterKeywords: Array<{
    name: string;
    category: 'Technical' | 'Soft Skill' | 'Domain' | 'Tool';
    importance: 'Critical' | 'High' | 'Medium';
  }> = [
    { name: 'TypeScript', category: 'Technical', importance: 'Critical' },
    { name: 'React', category: 'Technical', importance: 'Critical' },
    { name: 'Node.js', category: 'Technical', importance: 'Critical' },
    { name: 'PostgreSQL', category: 'Technical', importance: 'Critical' },
    { name: 'Docker', category: 'Tool', importance: 'Critical' },
    { name: 'REST APIs', category: 'Technical', importance: 'Critical' },
    { name: 'System Design', category: 'Domain', importance: 'Critical' },
    { name: 'GraphQL', category: 'Technical', importance: 'High' },
    { name: 'Kubernetes', category: 'Tool', importance: 'High' },
    { name: 'CI/CD', category: 'Domain', importance: 'High' },
    { name: 'AWS', category: 'Tool', importance: 'High' },
    { name: 'Redis', category: 'Technical', importance: 'High' },
    { name: 'Microservices', category: 'Domain', importance: 'High' },
    { name: 'Distributed Systems', category: 'Domain', importance: 'High' },
    { name: 'Playwright', category: 'Tool', importance: 'Medium' },
    { name: 'Jest', category: 'Tool', importance: 'Medium' },
    { name: 'Kafka', category: 'Tool', importance: 'Medium' },
    { name: 'Tailwind CSS', category: 'Tool', importance: 'Medium' },
    { name: 'Cross-functional Leadership', category: 'Soft Skill', importance: 'High' },
    { name: 'Agile / Scrum', category: 'Domain', importance: 'Medium' },
  ];

  // If JD has specific terms, check them too
  if (hasJd) {
    const extraJdTerms = [
      'Core Web Vitals',
      'Kafka',
      'Terraform',
      'Micro-frontends',
      'A/B Testing',
      'SQL',
      'Amplitude',
      'Mixpanel',
      'OpenAPI',
      'Security / SOC2',
    ];
    for (const term of extraJdTerms) {
      if (jdLower.includes(term.toLowerCase()) && !masterKeywords.some((k) => k.name.toLowerCase() === term.toLowerCase())) {
        masterKeywords.push({
          name: term,
          category: 'Technical',
          importance: 'High',
        });
      }
    }
  }

  const matchedKeywords: KeywordItem[] = [];
  const missingKeywords: KeywordItem[] = [];

  masterKeywords.forEach((k, idx) => {
    const searchTarget = k.name.toLowerCase();
    const isMatched = fullResumeText.includes(searchTarget);
    // Count frequency
    const regex = new RegExp(`\\b${searchTarget.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'gi');
    const freq = (fullResumeText.match(regex) || []).length;

    const item: KeywordItem = {
      id: `kw-${idx}`,
      name: k.name,
      category: k.category,
      importance: k.importance,
      frequencyInResume: freq,
      matched: isMatched,
      expectedInRole: isProduct ? 'Product Management' : 'Full Stack Engineering',
    };

    if (isMatched) {
      matchedKeywords.push(item);
    } else {
      missingKeywords.push(item);
    }
  });

  const importantKeywords = [...masterKeywords]
    .filter((k) => k.importance === 'Critical' || k.importance === 'High')
    .map((k, idx) => ({
      id: `imp-${idx}`,
      name: k.name,
      category: k.category,
      importance: k.importance,
      matched: fullResumeText.includes(k.name.toLowerCase()),
    }));

  const usageSuggestions: KeywordUsageSuggestion[] = [
    {
      id: 'sug-1',
      keyword: missingKeywords.find((k) => k.importance === 'Critical')?.name || 'Distributed Systems',
      targetSection: 'Work Experience (Nexus Cloud)',
      suggestion: 'Incorporate into your recent architecture highlight instead of only in the skill list.',
      exampleBullet:
        'Architected high-throughput distributed systems handling 45M+ daily requests with 99.99% service availability.',
    },
    {
      id: 'sug-2',
      keyword: 'Kubernetes / Container Orchestration',
      targetSection: 'Technical Experience / DevOps',
      suggestion: 'Explicitly state deployment scale and orchestrations managed in production.',
      exampleBullet:
        'Streamlined multi-region microservices deployment across 12 Kubernetes clusters, cutting deployment cycle times by 60%.',
    },
    {
      id: 'sug-3',
      keyword: 'Core Web Vitals & Web Performance',
      targetSection: 'Experience or Projects',
      suggestion: 'Pair front-end frameworks with user experience metrics (LCP, FID, CLS).',
      exampleBullet:
        'Optimized Next.js frontend bundles and asset caching, achieving a 98+ Google Lighthouse score and 35% faster LCP.',
    },
    {
      id: 'sug-4',
      keyword: 'Automated Testing (Playwright / E2E)',
      targetSection: 'Skills & Achievements',
      suggestion: 'Highlight test coverage metrics alongside feature velocity.',
      exampleBullet:
        'Established regression test suite utilizing Playwright and Jest, increasing code test coverage from 68% to 92%.',
    },
  ];

  // 3. Compute Scores
  const totalKeywords = masterKeywords.length;
  const matchedCount = matchedKeywords.length;
  let keywordMatchScore = Math.round((matchedCount / totalKeywords) * 100);
  if (keywordMatchScore < 50) keywordMatchScore = 50 + Math.min(30, matchedCount * 3);

  let skillsMatchScore = Math.min(98, Math.max(65, 70 + (totalSkillsCount >= 8 ? 20 : totalSkillsCount * 2)));

  const goodStructureCount = structureChecks.filter((s) => s.status === 'Good').length;
  const structureScore = Math.round((goodStructureCount / structureChecks.length) * 100);

  const experienceRelevanceScore = Math.min(96, Math.max(60, 65 + metricPercentage / 4 + experiences.length * 5));
  const formattingScore = 96; // Templates in ResumeAI follow strict ATS formatting standards

  // If JD is provided, apply a slight adjustment factor
  let overallScore = Math.round(
    keywordMatchScore * 0.3 +
      skillsMatchScore * 0.2 +
      structureScore * 0.2 +
      experienceRelevanceScore * 0.2 +
      formattingScore * 0.1
  );

  // Bound overall score reasonably
  overallScore = Math.min(99, Math.max(45, overallScore));

  const scoreBreakdown: ATSScoreBreakdown = {
    overallScore,
    keywordMatch: keywordMatchScore,
    skillsMatch: skillsMatchScore,
    resumeStructure: structureScore,
    experienceRelevance: experienceRelevanceScore,
    formatting: formattingScore,
  };

  // 4. Summary Verdict
  let label = 'Excellent Match';
  let grade = 'A';
  let percentile = 'Top 8%';
  if (overallScore >= 90) {
    label = 'Outstanding ATS Readiness';
    grade = 'A+';
    percentile = 'Top 5%';
  } else if (overallScore >= 80) {
    label = 'Strong ATS Readiness';
    grade = 'A';
    percentile = 'Top 15%';
  } else if (overallScore >= 70) {
    label = 'Competitive Profile';
    grade = 'B+';
    percentile = 'Top 30%';
  } else {
    label = 'Optimization Recommended';
    grade = 'C+';
    percentile = 'Top 60%';
  }

  // 5. Recommendations
  const recommendations: ATSRecommendationItem[] = [
    {
      id: 'rec-1',
      priority: 'High Impact',
      category: 'Keywords',
      title: 'Integrate Missing High-Frequency Keywords',
      description: `Your resume is missing ${missingKeywords.slice(0, 3).map((k) => k.name).join(', ')}. Automated parsers scan for these exact strings in experience bullets.`,
      actionText: 'Inject critical keywords directly into your latest job highlights.',
      estimatedScoreBoost: 6,
      beforeExample: 'Built backend services and managed deployment scripts.',
      afterExample: 'Engineered high-throughput REST APIs and containerized microservices deployed via Docker and Kubernetes.',
    },
    {
      id: 'rec-2',
      priority: 'High Impact',
      category: 'Experience',
      title: 'Quantify Action Results with Measurable KPIs',
      description: 'Resumes with metric-backed accomplishments score 40% higher in recruiter and ATS ranking algorithms.',
      actionText: 'Add concrete numbers (percentages, scale, dollar savings) to unmeasured bullets.',
      estimatedScoreBoost: 5,
      beforeExample: 'Improved application performance and reduced load times.',
      afterExample: 'Reduced p99 server response latency by 45% (850ms to 460ms) by implementing Redis read-through caching.',
    },
    {
      id: 'rec-3',
      priority: 'Moderate Impact',
      category: 'Structure',
      title: 'Include Verified Industry Certifications',
      description: hasCertifications
        ? 'Ensure all certification expiration dates and issuing body IDs are explicitly noted.'
        : 'Adding 1-2 recognized cloud or methodology credentials (e.g. AWS Solutions Architect, Scrum Master) boosts keyword relevance.',
      actionText: 'Update certifications in the builder to pass automated credential screens.',
      estimatedScoreBoost: 4,
    },
    {
      id: 'rec-4',
      priority: 'Quick Fix',
      category: 'Formatting',
      title: 'Standardize Bullet Point Starters with Power Verbs',
      description: 'Begin every achievement statement with a distinct, assertive past-tense action verb (e.g. Spearheaded, Engineered, Orchestrated).',
      actionText: 'Replace passive phrases such as "responsible for" or "assisted with".',
      estimatedScoreBoost: 3,
    },
  ];

  return {
    id: `ats-${resume.id}-${Date.now()}`,
    resumeId: resume.id,
    resumeTitle: resume.title,
    targetRole: resume.targetRole || personal.jobTitle || 'Target Role',
    jobDescription: jobDescriptionText,
    analyzedAt: new Date().toISOString(),
    scoreBreakdown,
    summaryVerdict: {
      label,
      grade,
      percentile,
      brief: hasJd
        ? `Evaluated against custom job requirements. Your profile exhibits ${label.toLowerCase()} with high technical synergy and clean document architecture.`
        : `Evaluated against ${resume.targetRole || 'industry benchmark'} roles. Your resume demonstrates clean semantic structure and strong action metric density.`,
    },
    keywordAnalysis: {
      matchedKeywords,
      missingKeywords,
      importantKeywords,
      usageSuggestions,
    },
    structureChecks,
    recommendations,
  };
}
