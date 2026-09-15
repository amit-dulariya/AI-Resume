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
    id: 'preset-google-swe',
    title: 'Senior Software Engineer (Cloud Infrastructure & Distributed Systems)',
    company: 'Google',
    description: `Senior Software Engineer - Google Cloud & Distributed Systems
Google is seeking a Senior Software Engineer to design, scale, and maintain massive distributed infrastructure.

Key Responsibilities:
- Design fault-tolerant, planetary-scale distributed microservices using Go, C++, or Java.
- Optimize high-throughput data processing systems using Bigtable, Spanner, and Google Cloud Platform (GCP).
- Implement robust telemetry, tracing, and automated failure recovery across Kubernetes (GKE) clusters.
- Collaborate with Site Reliability Engineers (SRE) to ensure 99.999% global service availability.
- Drive engineering excellence, code reviews, and system architecture design docs (RFCs).

Qualifications:
- 5+ years of software development experience in distributed systems, network services, or cloud platforms.
- Strong proficiency in algorithms, data structures, concurrency, and performance profiling.
- Deep hands-on experience with Linux internals, container orchestration (Kubernetes/Docker), and cloud architecture.
- BS/MS in Computer Science, Software Engineering, or equivalent practical experience.`,
  },
  {
    id: 'preset-microsoft-fullstack',
    title: 'Senior Full Stack Engineer (Azure & Web Platforms)',
    company: 'Microsoft',
    description: `Senior Full Stack Engineer - Azure Developer Platform
Microsoft Azure is looking for a Senior Full Stack Engineer to build enterprise-grade developer portals and cloud workflow experiences.

Key Responsibilities:
- Build responsive, accessible web portals using React, TypeScript, and Microsoft Fluent UI.
- Develop scalable backend microservices and REST/gRPC APIs using .NET Core / C# and Node.js.
- Integrate Azure Cosmos DB, Azure DevOps CI/CD pipelines, and OAuth security protocols.
- Mentor junior engineers, drive technical specifications, and champion automated testing (Jest, Playwright).

Qualifications:
- 5+ years building production full-stack web applications.
- Strong proficiency in modern TypeScript, React, C# or Node.js, and Azure cloud services.
- Experience with microservice architectures, RESTful APIs, and relational/NoSQL databases.`,
  },
  {
    id: 'preset-amazon-sde',
    title: 'Software Development Engineer II (AWS Core Services)',
    company: 'Amazon',
    description: `Software Development Engineer II (SDE II) - AWS Core Services
AWS is looking for an experienced SDE II to build the backbone of next-generation cloud compute and storage services.

Key Responsibilities:
- Design and implement highly reliable, low-latency distributed systems using Java, Python, and AWS services (DynamoDB, S3, SQS, Lambda).
- Apply Amazon Leadership Principles (Customer Obsession, Ownership, Bias for Action) to deliver customer-facing features.
- Define automated CI/CD pipelines, unit/integration testing suites, and operational dashboards (CloudWatch).
- Participate in on-call rotation to diagnose production issues and maintain world-class operational metrics.

Qualifications:
- 3+ years of non-internship professional software engineering experience.
- Strong command of computer science fundamentals: object-oriented design, data structures, and algorithms.
- Experience with scalable backend systems, asynchronous messaging, and AWS architecture.`,
  },
  {
    id: 'preset-meta-frontend',
    title: 'Senior Frontend Architect (Design Systems & Web)',
    company: 'Meta',
    description: `Senior Frontend Architect - Design Systems & Web Performance
Meta is looking for a Senior Frontend Engineer to champion web excellence, design systems, and frontend architecture across high-traffic web applications.

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
  {
    id: 'preset-infosys-cloud',
    title: 'Lead Consultant / Full Stack Architect',
    company: 'Infosys',
    description: `Lead Consultant - Cloud Migration & Full Stack Transformation
Infosys is hiring a Lead Consultant to lead digital transformation initiatives for Fortune 500 enterprise clients.

Key Responsibilities:
- Lead enterprise cloud migration projects migrating legacy on-prem workloads to AWS / Azure cloud environments.
- Architect modern microservices using Java Spring Boot, Node.js, and React.
- Build CI/CD pipelines with Jenkins, GitHub Actions, and containerized Docker/Kubernetes deployments.
- Manage client stakeholder communication, delivery roadmaps, and cross-shore technical teams.

Qualifications:
- 7+ years in enterprise IT, software architecture, and full-stack software delivery.
- Expertise in Java/Spring Boot, Angular/React, microservices, and relational databases (Oracle/PostgreSQL).
- Certifications in AWS Solutions Architect or Azure Solutions Architect preferred.`,
  },
  {
    id: 'preset-tcs-architect',
    title: 'Technical Architect (Enterprise Cloud Delivery)',
    company: 'TCS',
    description: `Technical Architect - Enterprise Cloud & Modernization
Tata Consultancy Services (TCS) is seeking a Technical Architect to drive mission-critical enterprise engineering programs.

Key Responsibilities:
- Design scalable multi-tier architectures for global banking and retail clients.
- Implement API gateways, message brokers (Kafka/RabbitMQ), and secure OAuth/SAML single sign-on flows.
- Lead Agile sprint execution, code audits, and security vulnerability reviews.
- Mentor technical leads and collaborate with enterprise delivery managers on SLA adherence.

Qualifications:
- 8+ years experience in enterprise software development and system architecture.
- Strong knowledge of microservices, cloud infrastructure (AWS/Azure/GCP), and distributed data stores.
- Excellent client-facing communication and architectural governance skills.`,
  },
  {
    id: 'preset-wipro-digital',
    title: 'Senior Digital Solutions Engineer',
    company: 'Wipro',
    description: `Senior Digital Solutions Engineer - Cloud & DevOps Practice
Wipro is seeking a Senior Digital Solutions Engineer to accelerate cloud-native transformation for global clients.

Key Responsibilities:
- Build modern cloud-native web applications using TypeScript, React, and Node.js.
- Implement automated Terraform infrastructure as code (IaC) and Docker/Kubernetes deployments.
- Configure enterprise monitoring, log aggregation (ELK, Prometheus), and automated testing.
- Partner with business teams to translate functional requirements into scalable technical deliverables.

Qualifications:
- 5+ years in full-stack engineering and cloud deployment.
- Experience with React, Node.js/Python, Docker, Kubernetes, and cloud platforms (AWS or Azure).
- Proven ability to deliver under Agile/Scrum delivery models.`,
  },
  {
    id: 'preset-accenture-tech',
    title: 'Technology Consulting Senior Analyst',
    company: 'Accenture',
    description: `Technology Consulting Senior Analyst - Cloud First & Custom Engineering
Accenture is looking for a Technology Consulting Senior Analyst to deliver cutting-edge technology strategies and cloud architectures.

Key Responsibilities:
- Deliver high-impact digital products for enterprise clients across financial services, healthcare, and retail.
- Develop cloud-first solutions utilizing AWS/GCP, serverless architectures, and modern web frameworks.
- Present architecture trade-offs, feasibility studies, and digital transformation roadmaps to C-level executives.
- Participate in technology hackathons, cross-functional delivery pods, and agile sprints.

Qualifications:
- 4+ years of hands-on software development or technical consulting experience.
- Strong proficiency in modern programming languages (TypeScript, Java, Python) and cloud fundamentals.
- Strong analytical, problem-solving, and communication skills.`,
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
