export interface UploadedFileInfo {
  name: string;
  size: number;
  formattedSize: string;
  type: string;
  lastModified: string;
  pageCount: number;
  extractedText?: string;
  base64?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Languages & Frameworks' | 'Cloud & DevOps' | 'Databases & Architecture' | 'Tools & Methodologies' | 'Soft Skills';
  level: 'Expert' | 'Advanced' | 'Proficient';
  frequency: number;
}

export interface MissingSkillItem {
  id: string;
  name: string;
  category: string;
  priority: 'Critical' | 'High' | 'Recommended';
  demandPercentage: number;
  reason: string;
}

export interface ResumeStrength {
  id: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
}

export interface ResumeWeakness {
  id: string;
  title: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  fixRecommendation: string;
}

export interface FormattingCheckItem {
  id: string;
  name: string;
  status: 'passed' | 'warning' | 'failed';
  description: string;
  details: string;
  tip?: string;
}

export interface ContentImprovementSuggestion {
  id: string;
  section: string;
  title: string;
  issue: string;
  originalText?: string;
  improvedText?: string;
  scoreBoost: string;
  priority: 'High Impact' | 'Moderate Impact' | 'Quick Fix';
}

export interface KeywordSuggestionItem {
  id: string;
  keyword: string;
  category: string;
  matched: boolean;
  importance: 'Critical' | 'High' | 'Medium';
  frequency: number;
  recommendedPlacement: string;
  tip: string;
}

export interface CompanyExpectedSkill {
  name: string;
  category: string;
  importance: 'Core Expectation' | 'Preferred' | 'Bonus';
}

export interface CompanyMissingSkill {
  name: string;
  priority: 'Critical' | 'High' | 'Medium';
  recommendation: string;
}

export interface CompanyKeyword {
  keyword: string;
  matched: boolean;
  importance: 'High' | 'Medium';
}

export interface CompanyRecommendationItem {
  type: 'project' | 'certification' | 'skill';
  title: string;
  description: string;
  expectedImpact: string;
}

export interface CompanySpecificAnalysis {
  companyName: string;
  companyScore: number;
  selectionReadinessLevel: 'Interview Ready' | 'Highly Competitive' | 'Moderate Match' | 'Needs Targeted Work';
  expectedSkills: CompanyExpectedSkill[];
  presentSkills: string[];
  missingSkills: CompanyMissingSkill[];
  importantKeywords: CompanyKeyword[];
  companyStrengths: string[];
  companyWeaknesses: string[];
  recommendedProjectsAndCertifications: CompanyRecommendationItem[];
  improvementSuggestions: string[];
}

export interface ComprehensiveAnalysisResult {
  id: string;
  fileInfo: UploadedFileInfo;
  analyzedAt: string;
  targetRole: string;
  overallScore: number;
  overallVerdict: {
    label: string;
    grade: string;
    percentile: string;
    summary: string;
  };
  atsCompatibilityScore: number;
  atsBreakdown: {
    machineReadability: number;
    headingHierarchy: number;
    contactExtraction: number;
    layoutCleanliness: number;
    keywordPlacement: number;
  };
  skillsDetected: SkillItem[];
  missingSkills: MissingSkillItem[];
  strengths: ResumeStrength[];
  weaknesses: ResumeWeakness[];
  formattingIssues: FormattingCheckItem[];
  contentSuggestions: ContentImprovementSuggestion[];
  keywordSuggestions: KeywordSuggestionItem[];
  companyAnalysis?: CompanySpecificAnalysis;
  isFallback?: boolean;
  engineNotice?: string;
}

export const SAMPLE_RESUME_FILES: { id: string; label: string; role: string; fileName: string; sizeBytes: number; formattedSize: string }[] = [
  {
    id: 'swe-sample',
    label: 'Senior Full Stack Engineer',
    role: 'Senior Full Stack Engineer',
    fileName: 'Alex_Morgan_Senior_Software_Engineer.pdf',
    sizeBytes: 248500,
    formattedSize: '242 KB',
  },
  {
    id: 'pm-sample',
    label: 'Lead Product Manager',
    role: 'Lead Product Manager (SaaS & PLG)',
    fileName: 'Sarah_Chen_Lead_Product_Manager.pdf',
    sizeBytes: 198200,
    formattedSize: '194 KB',
  },
  {
    id: 'devops-sample',
    label: 'DevOps & Cloud Architect',
    role: 'Staff Cloud & DevOps Engineer',
    fileName: 'David_Kim_DevOps_Cloud_Architect.pdf',
    sizeBytes: 265400,
    formattedSize: '259 KB',
  },
];

export function getMockAnalysisForFile(fileInfo: UploadedFileInfo): ComprehensiveAnalysisResult {
  const fileNameLower = fileInfo.name.toLowerCase();

  // Role detection heuristic
  const isPM = fileNameLower.includes('product') || fileNameLower.includes('pm') || fileNameLower.includes('manager');
  const isDevOps = fileNameLower.includes('devops') || fileNameLower.includes('cloud') || fileNameLower.includes('infrastructure') || fileNameLower.includes('sre');

  if (isPM) {
    return {
      id: `ana-${Date.now()}`,
      fileInfo,
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      targetRole: 'Lead Product Manager (SaaS & PLG)',
      overallScore: 85,
      overallVerdict: {
        label: 'Strong Product Candidate',
        grade: 'A-',
        percentile: 'Top 12%',
        summary: 'Excellent narrative focus on user engagement, metrics, and roadmap leadership. Could further strengthen alignment with modern data stack and engineering partner telemetry.',
      },
      atsCompatibilityScore: 89,
      atsBreakdown: {
        machineReadability: 94,
        headingHierarchy: 92,
        contactExtraction: 96,
        layoutCleanliness: 90,
        keywordPlacement: 85,
      },
      skillsDetected: [
        { id: 's-1', name: 'Product Roadmapping', category: 'Tools & Methodologies', level: 'Expert', frequency: 7 },
        { id: 's-2', name: 'A/B Testing & Experimentation', category: 'Tools & Methodologies', level: 'Expert', frequency: 5 },
        { id: 's-3', name: 'SQL & Data Querying', category: 'Languages & Frameworks', level: 'Advanced', frequency: 4 },
        { id: 's-4', name: 'Product-Led Growth (PLG)', category: 'Tools & Methodologies', level: 'Expert', frequency: 6 },
        { id: 's-5', name: 'User Journey Mapping', category: 'Tools & Methodologies', level: 'Advanced', frequency: 3 },
        { id: 's-6', name: 'Amplitude & Mixpanel', category: 'Tools & Methodologies', level: 'Advanced', frequency: 4 },
        { id: 's-7', name: 'Agile & Scrum Leadership', category: 'Tools & Methodologies', level: 'Expert', frequency: 5 },
        { id: 's-8', name: 'Figma Prototyping', category: 'Tools & Methodologies', level: 'Proficient', frequency: 2 },
        { id: 's-9', name: 'Cross-Functional Team Alignment', category: 'Soft Skills', level: 'Expert', frequency: 6 },
        { id: 's-10', name: 'GTM Strategy', category: 'Soft Skills', level: 'Advanced', frequency: 3 },
      ],
      missingSkills: [
        { id: 'ms-1', name: 'API Specifications / OpenAPI', category: 'Technical Architecture', priority: 'High', demandPercentage: 74, reason: 'Crucial for technical PM roles coordinating directly with backend architects.' },
        { id: 'ms-2', name: 'PostHog / Modern Product Analytics', category: 'Analytics Tooling', priority: 'Recommended', demandPercentage: 62, reason: 'Rapidly growing standard for self-serve event tracking and session replays.' },
        { id: 'ms-3', name: 'Pricing & Packaging Economics', category: 'Business Strategy', priority: 'Critical', demandPercentage: 81, reason: 'Essential differentiator for senior/lead monetization product managers.' },
        { id: 'ms-4', name: 'Snowflake / BigQuery', category: 'Data Infrastructure', priority: 'Recommended', demandPercentage: 58, reason: 'Demonstrates ability to perform self-directed cohort modeling.' },
      ],
      strengths: [
        {
          id: 'str-1',
          title: 'High Density of Business KPIs',
          category: 'Impact Metrics',
          description: 'Experience bullets clearly quantify revenue impact, retention uplifts (+18% D30 retention), and ARR contributions ($4.2M).',
          highlight: '9 out of 11 bullets include hard percentages or monetary numbers.',
        },
        {
          id: 'str-2',
          title: 'Clear Career Progression',
          category: 'Experience Structure',
          description: 'Smooth promotional path from Associate PM to Senior to Group PM visible across consecutive tenures.',
          highlight: 'Demonstrates proven reliability and leadership recognition.',
        },
        {
          id: 'str-3',
          title: 'Strong Leadership Power Verbs',
          category: 'Writing Style',
          description: 'Bullets launch with authoritative product verbs: "Orchestrated", "Spearheaded", "Scaled", "Prioritized".',
          highlight: 'Conveys executive ownership rather than passive task delegation.',
        },
      ],
      weaknesses: [
        {
          id: 'w-1',
          title: 'Technical Depth Not Explicit',
          category: 'Technical Alignment',
          severity: 'Medium',
          description: 'Does not explicitly describe collaboration on technical trade-offs (e.g. microservices vs monolith, database latency).',
          fixRecommendation: 'Add 1 bullet explaining how you worked with staff engineers on architectural constraints or API performance.',
        },
        {
          id: 'w-2',
          title: 'Professional Summary is Dense',
          category: 'Readability',
          severity: 'Low',
          description: 'The opening summary block contains 5 long sentences, which can cause recruiter fatigue during 6-second scans.',
          fixRecommendation: 'Condense into 2-3 punchy bulleted highlights with bolded domain specialties.',
        },
      ],
      formattingIssues: [
        {
          id: 'fmt-1',
          name: 'Single Column Layout Hierarchy',
          status: 'passed',
          description: 'Layout follows clean top-down flow without sidebar columns.',
          details: 'Verified compatible with Workday, Lever, and Taleo parsers.',
        },
        {
          id: 'fmt-2',
          name: 'Contact Header Parsing',
          status: 'passed',
          description: 'Email, phone, and public LinkedIn profile were extracted seamlessly.',
          details: 'All contact nodes located within the body stream.',
        },
        {
          id: 'fmt-3',
          name: 'Date Range Formatting',
          status: 'warning',
          description: 'Mixed date formats detected ("03/2023 - Present" vs "Jan 2021 - Feb 2023").',
          details: 'ATS parsers calculate tenure more accurately when a unified "MMM YYYY" format is applied across all roles.',
          tip: 'Standardize all dates to "Month Year" (e.g., "Jan 2021 – Feb 2023").',
        },
        {
          id: 'fmt-4',
          name: 'Standard ATS-Safe Typography',
          status: 'passed',
          description: 'Clean sans-serif fonts without exotic ligature symbols.',
          details: '10.5pt to 12pt body text provides optimal optical OCR fidelity.',
        },
      ],
      contentSuggestions: [
        {
          id: 'cs-1',
          section: 'Nexus Cloud • Lead PM Experience',
          title: 'Quantify User Discovery Scope',
          issue: 'Bullet describes user interviews vaguely without customer volume or outcome.',
          originalText: 'Conducted customer discovery interviews to inform the upcoming Q3 product release.',
          improvedText: 'Conducted 35+ customer discovery interviews across enterprise buyers, prioritizing 3 core feature pillars that lifted trial-to-paid conversion by 22%.',
          scoreBoost: '+4 pts',
          priority: 'High Impact',
        },
        {
          id: 'cs-2',
          section: 'Professional Summary',
          title: 'Highlight PLG and ARR Milestones Immediately',
          issue: 'Summary focuses on generalist management rather than hard product milestones.',
          originalText: 'Experienced product manager passionate about collaborating with cross-functional teams to build intuitive software.',
          improvedText: 'Product Lead with 7+ years scaling B2B SaaS platforms from $5M to $30M ARR. Specialized in product-led growth, automated onboarding funnels, and data-driven feature prioritization.',
          scoreBoost: '+3 pts',
          priority: 'Moderate Impact',
        },
      ],
      keywordSuggestions: [
        { id: 'kw-1', keyword: 'Customer Lifetime Value (LTV)', category: 'Metrics', matched: false, importance: 'High', frequency: 0, recommendedPlacement: 'Professional Summary & Experience', tip: 'Pair with CAC (Customer Acquisition Cost) to demonstrate unit economics mastery.' },
        { id: 'kw-2', keyword: 'Product Roadmapping', category: 'Core Skill', matched: true, importance: 'Critical', frequency: 7, recommendedPlacement: 'Skills & Experience', tip: 'Well represented across recent job positions.' },
        { id: 'kw-3', keyword: 'A/B Testing', category: 'Methodology', matched: true, importance: 'Critical', frequency: 5, recommendedPlacement: 'Experience Highlights', tip: 'Highlight statistical significance thresholds if possible.' },
        { id: 'kw-4', keyword: 'Go-To-Market (GTM)', category: 'Strategy', matched: false, importance: 'High', frequency: 0, recommendedPlacement: 'Recent Role Highlights', tip: 'Include alongside product launch milestones.' },
      ],
    };
  }

  if (isDevOps) {
    return {
      id: `ana-${Date.now()}`,
      fileInfo,
      analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
      targetRole: 'Staff Cloud & DevOps Engineer',
      overallScore: 91,
      overallVerdict: {
        label: 'Exceptional Infrastructure Profile',
        grade: 'A',
        percentile: 'Top 5%',
        summary: 'Outstanding technical depth covering containerization, infrastructure as code, and observability. Extremely high ATS keyword alignment.',
      },
      atsCompatibilityScore: 95,
      atsBreakdown: {
        machineReadability: 98,
        headingHierarchy: 96,
        contactExtraction: 98,
        layoutCleanliness: 95,
        keywordPlacement: 92,
      },
      skillsDetected: [
        { id: 's-1', name: 'Kubernetes (K8s)', category: 'Cloud & DevOps', level: 'Expert', frequency: 9 },
        { id: 's-2', name: 'Terraform (IaC)', category: 'Cloud & DevOps', level: 'Expert', frequency: 8 },
        { id: 's-3', name: 'AWS (EKS, IAM, VPC, S3)', category: 'Cloud & DevOps', level: 'Expert', frequency: 11 },
        { id: 's-4', name: 'Docker & Containerization', category: 'Cloud & DevOps', level: 'Expert', frequency: 7 },
        { id: 's-5', name: 'CI/CD (GitHub Actions, ArgoCD)', category: 'Cloud & DevOps', level: 'Expert', frequency: 6 },
        { id: 's-6', name: 'Prometheus & Grafana', category: 'Cloud & DevOps', level: 'Advanced', frequency: 5 },
        { id: 's-7', name: 'Python & Bash Automation', category: 'Languages & Frameworks', level: 'Advanced', frequency: 4 },
        { id: 's-8', name: 'Go (Golang)', category: 'Languages & Frameworks', level: 'Proficient', frequency: 3 },
        { id: 's-9', name: 'SOC2 & Zero-Trust Security', category: 'Tools & Methodologies', level: 'Advanced', frequency: 3 },
      ],
      missingSkills: [
        { id: 'ms-1', name: 'eBPF / Cilium Network Mesh', category: 'Cloud Networking', priority: 'High', demandPercentage: 68, reason: 'Leading modern Kubernetes observability and security mesh paradigm.' },
        { id: 'ms-2', name: 'FinOps / Cloud Cost Optimization', category: 'Cloud Management', priority: 'Critical', demandPercentage: 84, reason: 'High-visibility metric for executive engineering leaders controlling AWS spend.' },
        { id: 'ms-3', name: 'Crossplane', category: 'Infrastructure as Code', priority: 'Recommended', demandPercentage: 45, reason: 'Gaining strong adoption for multi-cloud Kubernetes control planes.' },
      ],
      strengths: [
        {
          id: 'str-1',
          title: 'High-Reliability Uptime Metrics',
          category: 'System Impact',
          description: 'Quantifies SLA guarantees (99.99% uptime) and incident recovery (MTTD reduced from 45m to 4m).',
          highlight: 'Direct proof of operational excellence and production stewardship.',
        },
        {
          id: 'str-2',
          title: 'GitOps & Zero-Downtime Deployments',
          category: 'Tooling Maturity',
          description: 'Highlights automated canary rollouts and automated rollback pipelines across 40+ microservices.',
          highlight: 'Aligns with top 1% of cloud engineering candidate pools.',
        },
      ],
      weaknesses: [
        {
          id: 'w-1',
          title: 'Missing Dollar Figures on Cloud Cost Savings',
          category: 'Cost Accountability',
          severity: 'Medium',
          description: 'Mentions "optimized EC2 usage", but omitting dollar figures loses executive impact.',
          fixRecommendation: 'Specify estimated annual savings (e.g. "reduced AWS monthly infrastructure costs by $14,000/mo").',
        },
      ],
      formattingIssues: [
        {
          id: 'fmt-1',
          name: 'Strict ATS Linear Structure',
          status: 'passed',
          description: 'Zero nested tables, graphics, or non-standard symbols.',
          details: 'Passes all 6 major applicant tracking parsers.',
        },
        {
          id: 'fmt-2',
          name: 'Contact Header Parsing',
          status: 'passed',
          description: 'Email, phone, GitHub profile, and location parsed cleanly.',
          details: 'Direct links verified.',
        },
        {
          id: 'fmt-3',
          name: 'Certification Section Hierarchy',
          status: 'passed',
          description: 'AWS Certified Solutions Architect & CKA certificates listed with dates and credential IDs.',
          details: 'Easily recognized by enterprise scanners.',
        },
      ],
      contentSuggestions: [
        {
          id: 'cs-1',
          section: 'Cloud Platform Engineer Experience',
          title: 'Incorporate FinOps Cloud Savings',
          issue: 'Bullet on resource right-sizing misses quantitative dollar impact.',
          originalText: 'Right-sized Kubernetes clusters and cleaned up unused EBS storage volumes.',
          improvedText: 'Implemented automated FinOps spot-instance policies and storage lifecycle rules, eliminating $180k in annual redundant cloud infrastructure costs.',
          scoreBoost: '+5 pts',
          priority: 'High Impact',
        },
      ],
      keywordSuggestions: [
        { id: 'kw-1', keyword: 'Infrastructure as Code (IaC)', category: 'Cloud Skill', matched: true, importance: 'Critical', frequency: 8, recommendedPlacement: 'Summary & Experience', tip: 'Already prominent in technical bullet points.' },
        { id: 'kw-2', keyword: 'FinOps', category: 'Cost Management', matched: false, importance: 'High', frequency: 0, recommendedPlacement: 'Experience Highlights', tip: 'Add alongside AWS compute optimization achievements.' },
        { id: 'kw-3', keyword: 'Zero-Trust Architecture', category: 'Security', matched: true, importance: 'Critical', frequency: 2, recommendedPlacement: 'Technical Skills', tip: 'Highlights mature modern security practices.' },
      ],
    };
  }

  // Default: Senior Full Stack / Software Engineer Profile
  return {
    id: `ana-${Date.now()}`,
    fileInfo,
    analyzedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', Today',
    targetRole: 'Senior Full Stack Software Engineer',
    overallScore: 88,
    overallVerdict: {
      label: 'High-Impact Technical Resume',
      grade: 'A',
      percentile: 'Top 8%',
      summary: 'Strong technical profile with excellent metric-driven experience bullets, modern technology stack, and clean linear layout. A few targeted keywords will maximize interview conversions.',
    },
    atsCompatibilityScore: 92,
    atsBreakdown: {
      machineReadability: 96,
      headingHierarchy: 94,
      contactExtraction: 98,
      layoutCleanliness: 92,
      keywordPlacement: 88,
    },
    skillsDetected: [
      { id: 's-1', name: 'TypeScript', category: 'Languages & Frameworks', level: 'Expert', frequency: 9 },
      { id: 's-2', name: 'React 19 & Next.js', category: 'Languages & Frameworks', level: 'Expert', frequency: 8 },
      { id: 's-3', name: 'Node.js & Express', category: 'Languages & Frameworks', level: 'Expert', frequency: 6 },
      { id: 's-4', name: 'PostgreSQL & SQL', category: 'Databases & Architecture', level: 'Advanced', frequency: 5 },
      { id: 's-5', name: 'Docker & Microservices', category: 'Cloud & DevOps', level: 'Advanced', frequency: 4 },
      { id: 's-6', name: 'GraphQL & REST APIs', category: 'Databases & Architecture', level: 'Advanced', frequency: 5 },
      { id: 's-7', name: 'AWS (ECS, S3, RDS)', category: 'Cloud & DevOps', level: 'Advanced', frequency: 4 },
      { id: 's-8', name: 'System Architecture & Design', category: 'Databases & Architecture', level: 'Expert', frequency: 4 },
      { id: 's-9', name: 'Git & CI/CD Workflows', category: 'Tools & Methodologies', level: 'Expert', frequency: 5 },
      { id: 's-10', name: 'Tailwind CSS & Design Systems', category: 'Languages & Frameworks', level: 'Expert', frequency: 4 },
      { id: 's-11', name: 'Agile & Sprint Mentorship', category: 'Soft Skills', level: 'Advanced', frequency: 3 },
      { id: 's-12', name: 'Core Web Vitals & Web Performance', category: 'Tools & Methodologies', level: 'Advanced', frequency: 3 },
    ],
    missingSkills: [
      { id: 'ms-1', name: 'Kubernetes (K8s)', category: 'Container Orchestration', priority: 'High', demandPercentage: 72, reason: 'Listed in 72% of senior backend/full stack enterprise postings.' },
      { id: 'ms-2', name: 'Redis / Distributed Caching', category: 'Data Architecture', priority: 'High', demandPercentage: 65, reason: 'Strong proof of handling high-traffic throughput and low latency.' },
      { id: 'ms-3', name: 'Playwright or Cypress (E2E Testing)', category: 'Automated QA', priority: 'Recommended', demandPercentage: 58, reason: 'Demonstrates end-to-end testing rigor beyond unit tests.' },
      { id: 'ms-4', name: 'Cloud Security / OAuth2 & IAM', category: 'Security & Auth', priority: 'Recommended', demandPercentage: 51, reason: 'Crucial for senior engineers handling enterprise customer data.' },
    ],
    strengths: [
      {
        id: 'str-1',
        title: 'Quantified Business & Technical Impact',
        category: 'Bullet Quality',
        description: 'Over 80% of experience statements feature concrete numbers, percentages, or dollar values.',
        highlight: 'e.g. "Reduced API latency by 45%", "Supported 800+ hospital networks", "Saved 120 engineer-hours/mo".',
      },
      {
        id: 'str-2',
        title: 'Clean Linear Section Hierarchy',
        category: 'ATS Compliance',
        description: 'Standard section titles (Experience, Education, Skills, Projects) recognized immediately by parsers.',
        highlight: 'Zero non-standard headers that could cause Taleo or Workday rejection.',
      },
      {
        id: 'str-3',
        title: 'Strong Leadership Action Verbs',
        category: 'Voice & Tone',
        description: 'Bullets avoid passive phrasing ("assisted with", "responsible for") in favor of active verbs.',
        highlight: 'Consistently uses "Architected", "Engineered", "Pioneered", "Overhauled".',
      },
      {
        id: 'str-4',
        title: 'Categorized Technical Competencies',
        category: 'Skill Grouping',
        description: 'Skills are cleanly broken down into languages, cloud, and databases rather than an unorganized word cloud.',
        highlight: 'Allows recruiters to verify core stack within 3 seconds.',
      },
    ],
    weaknesses: [
      {
        id: 'w-1',
        title: 'Earlier Experience Bullets Lack Metrics',
        category: 'Experience Depth',
        severity: 'Medium',
        description: 'The two oldest roles on the resume focus on duties rather than measurable outcomes.',
        fixRecommendation: 'Add at least one quantifiable outcome per junior/mid role (e.g., number of releases shipped or test coverage increase).',
      },
      {
        id: 'w-2',
        title: 'Summary Statement Could Mirror Target Role',
        category: 'Role Positioning',
        severity: 'Low',
        description: 'The summary uses general "Senior Engineer" rather than highlighting specific cloud/SaaS domain depth.',
        fixRecommendation: 'Incorporate target domain keywords (e.g. "Cloud SaaS", "High-Throughput Distributed Systems") into the first sentence.',
      },
      {
        id: 'w-3',
        title: 'No Explicit Hyperlink Fallbacks',
        category: 'Technical Formatting',
        severity: 'Low',
        description: 'Project links use display text only without raw URL fallbacks.',
        fixRecommendation: 'Add text URLs (e.g., "github.com/user/project") in parentheses to survive link-stripping ATS exporters.',
      },
    ],
    formattingIssues: [
      {
        id: 'fmt-1',
        name: 'Single Column Layout & Flow',
        status: 'passed',
        description: 'Document uses a standard single-column structure without floating text boxes.',
        details: 'Zero parsing misalignments detected across ATS simulation test engines.',
      },
      {
        id: 'fmt-2',
        name: 'Standard Margins & White Space',
        status: 'passed',
        description: 'Document margins are set to 0.75 inches with consistent 16px section padding.',
        details: 'Ensures reliable printing and PDF text-layer extraction.',
      },
      {
        id: 'fmt-3',
        name: 'Font Safety & Standard Typography',
        status: 'passed',
        description: 'Uses ATS-safe standard sans-serif font family with clean hierarchy.',
        details: '11pt body text with distinct bold section headings.',
      },
      {
        id: 'fmt-4',
        name: 'Table & Multi-Column Avoidance',
        status: 'passed',
        description: 'No tables detected in experience or skill sections.',
        details: 'Tables often jumble reading order in older ATS engines; linear layout prevents this.',
      },
      {
        id: 'fmt-5',
        name: 'Date Range Consistency',
        status: 'warning',
        description: 'Minor date formatting variance detected in older role.',
        details: 'Uses "09/2016 - 05/2020" in Education versus "May 2021 – Present" in Experience.',
        tip: 'Standardize to "MMM YYYY" format across all sections (e.g. "Sep 2016 – May 2020").',
      },
      {
        id: 'fmt-6',
        name: 'Contact Information in Document Body',
        status: 'passed',
        description: 'Header information is part of the main text stream, not in PDF header/footer margins.',
        details: 'Ensures parsers do not drop contact numbers or email.',
      },
    ],
    contentSuggestions: [
      {
        id: 'cs-1',
        section: 'Nexus Cloud • Staff Full Stack Role',
        title: 'Elevate Latency & Microservice Scale',
        issue: 'Bullet point mentions telemetry dashboard without mentioning scale or user count.',
        originalText: 'Built real-time telemetry dashboard using React and WebSockets for monitoring network traffic.',
        improvedText: 'Architected real-time telemetry dashboard using React, TypeScript, and WebSockets, reducing mean-time-to-detect (MTTD) by 42% across 800+ hospital production clusters.',
        scoreBoost: '+4 pts',
        priority: 'High Impact',
      },
      {
        id: 'cs-2',
        section: 'Technical Skills Section',
        title: 'Incorporate Redis & Caching Layer',
        issue: 'Experience bullets mention database queries but omit distributed caching technology.',
        originalText: 'Managed PostgreSQL queries and database schemas for customer records.',
        improvedText: 'Engineered PostgreSQL database schemas and integrated Redis caching layer, decreasing database query load by 55% during peak traffic spikes.',
        scoreBoost: '+3 pts',
        priority: 'Moderate Impact',
      },
      {
        id: 'cs-3',
        section: 'Professional Summary',
        title: 'Add Distributed Systems & Scaled DAU Positioning',
        issue: 'Opening summary is slightly humble given 7+ years of engineering experience.',
        originalText: 'Full Stack Engineer with 7 years of experience building web applications and collaborating with teams.',
        improvedText: 'Senior Full Stack Engineer with 7+ years architecting high-scale distributed web applications and design systems. Track record scaling platforms to 800k+ DAU with 99.99% uptime.',
        scoreBoost: '+3 pts',
        priority: 'Quick Fix',
      },
    ],
    keywordSuggestions: [
      { id: 'kw-1', keyword: 'Distributed Systems', category: 'Architecture', matched: true, importance: 'Critical', frequency: 4, recommendedPlacement: 'Professional Summary & Recent Role', tip: 'Essential keyword for senior and staff grade software engineering roles.' },
      { id: 'kw-2', keyword: 'Kubernetes (K8s)', category: 'Cloud Infrastructure', matched: false, importance: 'High', frequency: 0, recommendedPlacement: 'Skills & Experience Bullets', tip: 'Add to Nexus Cloud containerization bullets to capture DevOps-heavy searches.' },
      { id: 'kw-3', keyword: 'CI/CD Pipelines', category: 'DevOps', matched: true, importance: 'Critical', frequency: 5, recommendedPlacement: 'Experience Highlights', tip: 'Strong alignment with automated deployment job filters.' },
      { id: 'kw-4', keyword: 'Redis / Caching', category: 'Databases', matched: false, importance: 'High', frequency: 0, recommendedPlacement: 'Technical Skills & Backend Projects', tip: 'Pair with PostgreSQL to demonstrate end-to-end data performance.' },
      { id: 'kw-5', keyword: 'Microservices Architecture', category: 'System Design', matched: true, importance: 'Critical', frequency: 3, recommendedPlacement: 'Professional Experience', tip: 'Highlights modular backend engineering background.' },
      { id: 'kw-6', keyword: 'Unit & E2E Testing (Jest/Playwright)', category: 'Testing', matched: false, importance: 'Medium', frequency: 0, recommendedPlacement: 'Skills & Nexus Cloud Highlights', tip: 'Signals commitment to test automation and zero-regression deployments.' },
    ],
  };
}
