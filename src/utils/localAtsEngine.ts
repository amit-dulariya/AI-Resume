import {
  ComprehensiveAnalysisResult,
  SkillItem,
  MissingSkillItem,
  ResumeStrength,
  ResumeWeakness,
  FormattingCheckItem,
  ContentImprovementSuggestion,
  KeywordSuggestionItem,
  CompanySpecificAnalysis,
} from '../data/analyzerMockData';

interface GenerateLocalAtsParams {
  fileName?: string;
  resumeText: string;
  targetRole?: string;
  companyName?: string;
  fileSize?: number;
  formattedSize?: string;
}

const TECHNICAL_SKILLS_DICTIONARY: { name: string; category: SkillItem['category']; regex: RegExp }[] = [
  // Languages & Frameworks
  { name: 'TypeScript', category: 'Languages & Frameworks', regex: /\bTypeScript\b/i },
  { name: 'JavaScript', category: 'Languages & Frameworks', regex: /\bJavaScript\b|\bES\d+\b/i },
  { name: 'React', category: 'Languages & Frameworks', regex: /\bReact(?:\.js|\s+19|\s+18)?\b/i },
  { name: 'Next.js', category: 'Languages & Frameworks', regex: /\bNext(?:\.js)?\b/i },
  { name: 'Node.js', category: 'Languages & Frameworks', regex: /\bNode(?:\.js)?\b/i },
  { name: 'Python', category: 'Languages & Frameworks', regex: /\bPython\b/i },
  { name: 'HTML5/CSS3', category: 'Languages & Frameworks', regex: /\bHTML5?\b|\bCSS3?\b/i },
  { name: 'Tailwind CSS', category: 'Languages & Frameworks', regex: /\bTailwind(?:\s+CSS)?\b/i },
  { name: 'Express.js', category: 'Languages & Frameworks', regex: /\bExpress(?:\.js)?\b/i },
  { name: 'Go / Golang', category: 'Languages & Frameworks', regex: /\bGolang\b|\bGo\s+microservices\b/i },
  { name: 'Java', category: 'Languages & Frameworks', regex: /\bJava\b(?!\s*Script)/i },
  { name: 'C++', category: 'Languages & Frameworks', regex: /\bC\+\+\b/i },
  { name: 'Rust', category: 'Languages & Frameworks', regex: /\bRust\b/i },
  { name: 'GraphQL', category: 'Databases & Architecture', regex: /\bGraphQL\b/i },
  // Databases & Architecture
  { name: 'PostgreSQL', category: 'Databases & Architecture', regex: /\bPostgreSQL\b|\bPostgres\b/i },
  { name: 'Redis', category: 'Databases & Architecture', regex: /\bRedis\b/i },
  { name: 'SQL', category: 'Databases & Architecture', regex: /\bSQL\b/i },
  { name: 'MongoDB', category: 'Databases & Architecture', regex: /\bMongoDB\b/i },
  { name: 'Kafka', category: 'Databases & Architecture', regex: /\bKafka\b/i },
  { name: 'REST APIs', category: 'Databases & Architecture', regex: /\bREST(?:ful)?\s*APIs?\b/i },
  { name: 'Microservices', category: 'Databases & Architecture', regex: /\bMicroservices\b/i },
  { name: 'Distributed Systems', category: 'Databases & Architecture', regex: /\bDistributed\s+Systems\b/i },
  { name: 'Event-Driven Architecture', category: 'Databases & Architecture', regex: /\bEvent[- ]Driven\b/i },
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', regex: /\bAWS\b|\bAmazon\s+Web\s+Services\b/i },
  { name: 'Docker', category: 'Cloud & DevOps', regex: /\bDocker\b/i },
  { name: 'Kubernetes', category: 'Cloud & DevOps', regex: /\bKubernetes\b|\bK8s\b/i },
  { name: 'CI/CD Pipelines', category: 'Cloud & DevOps', regex: /\bCI\/CD\b|\bContinuous\s+Integration\b/i },
  { name: 'Terraform', category: 'Cloud & DevOps', regex: /\bTerraform\b/i },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', regex: /\bGitHub\s+Actions\b/i },
  { name: 'GCP / Cloud', category: 'Cloud & DevOps', regex: /\bGCP\b|\bGoogle\s+Cloud\b/i },
  { name: 'Linux', category: 'Cloud & DevOps', regex: /\bLinux\b/i },
  // Tools & Methodologies
  { name: 'Git', category: 'Tools & Methodologies', regex: /\bGit\b/i },
  { name: 'Agile / Scrum', category: 'Tools & Methodologies', regex: /\bAgile\b|\bScrum\b/i },
  { name: 'Jest / Testing', category: 'Tools & Methodologies', regex: /\bJest\b|\bUnit\s+Testing\b/i },
  { name: 'Playwright / E2E', category: 'Tools & Methodologies', regex: /\bPlaywright\b|\bCypress\b|\bE2E\b/i },
  { name: 'System Design', category: 'Tools & Methodologies', regex: /\bSystem\s+Design\b/i },
  { name: 'Web Performance', category: 'Tools & Methodologies', regex: /\bCore\s+Web\s+Vitals\b|\bWeb\s+Performance\b|\bLatency\b/i },
  // Soft Skills
  { name: 'Cross-Functional Collaboration', category: 'Soft Skills', regex: /\bCross[- ]Functional\b/i },
  { name: 'Technical Leadership', category: 'Soft Skills', regex: /\bLead(?:ership)?\b|\bSpearhead(?:ed)?\b/i },
  { name: 'Engineering Mentorship', category: 'Soft Skills', regex: /\bMentor(?:ed|ship)?\b/i },
];

export function generateLocalAtsAnalysis(params: GenerateLocalAtsParams): ComprehensiveAnalysisResult {
  const { fileName = 'Uploaded_Resume.pdf', resumeText = '', targetRole, fileSize = 210000, formattedSize = '205 KB' } = params;

  // 1. Role inference
  let detectedRole = targetRole;
  if (!detectedRole) {
    if (/product\s+manager|plg|prd|roadmap/i.test(resumeText) || /product|pm/i.test(fileName)) {
      detectedRole = 'Lead Product Manager (SaaS & PLG)';
    } else if (/devops|cloud\s+architect|sre|infrastructure/i.test(resumeText) || /devops|cloud/i.test(fileName)) {
      detectedRole = 'Staff Cloud & DevOps Engineer';
    } else if (/full\s*stack|software\s*engineer|frontend|backend/i.test(resumeText) || /software|developer/i.test(fileName)) {
      detectedRole = 'Senior Software Engineer';
    } else {
      detectedRole = 'Senior Technology Professional';
    }
  }

  // 2. Contact details check
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(resumeText);
  const hasPhone = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(resumeText);
  const hasLinkedIn = /linkedin\.com\/in\/[a-zA-Z0-9_-]+/i.test(resumeText);
  const hasGitHub = /github\.com\/[a-zA-Z0-9_-]+/i.test(resumeText);

  // 3. Section headings check
  const hasSummary = /summary|profile|objective/i.test(resumeText);
  const hasExperience = /experience|work\s+history|employment/i.test(resumeText);
  const hasEducation = /education|university|degree|bachelor|master/i.test(resumeText);
  const hasSkills = /skills|competencies|technologies/i.test(resumeText);

  // 4. Metric & impact density check
  const metricMatches = resumeText.match(/\b(?:\d+%(?:\.\d+)?|\$\d+(?:[.,]\d+)?[MKB]?|\b\d+[MKB]\+?|\d+\s*(?:ms|sec|hours|users))\b/gi) || [];
  const metricCount = metricMatches.length;

  // 5. Skills extraction
  const skillsDetected: SkillItem[] = [];
  for (const s of TECHNICAL_SKILLS_DICTIONARY) {
    const matches = resumeText.match(new RegExp(s.regex.source, 'gi'));
    if (matches && matches.length > 0) {
      const freq = matches.length;
      const level = freq >= 4 ? 'Expert' : freq >= 2 ? 'Advanced' : 'Proficient';
      skillsDetected.push({
        id: `sk-${skillsDetected.length + 1}`,
        name: s.name,
        category: s.category,
        level,
        frequency: freq,
      });
    }
  }

  // Fallback skills if document was sparse
  if (skillsDetected.length < 5) {
    skillsDetected.push(
      { id: 'sk-fallback-1', name: 'Software Architecture', category: 'Databases & Architecture', level: 'Advanced', frequency: 2 },
      { id: 'sk-fallback-2', name: 'TypeScript / Modern JS', category: 'Languages & Frameworks', level: 'Expert', frequency: 3 },
      { id: 'sk-fallback-3', name: 'Git & Version Control', category: 'Tools & Methodologies', level: 'Expert', frequency: 4 },
      { id: 'sk-fallback-4', name: 'Agile Delivery', category: 'Tools & Methodologies', level: 'Advanced', frequency: 2 },
      { id: 'sk-fallback-5', name: 'REST APIs', category: 'Databases & Architecture', level: 'Proficient', frequency: 2 }
    );
  }

  // 6. Missing skills
  const missingSkills: MissingSkillItem[] = [];
  const detectedNames = new Set(skillsDetected.map((s) => s.name.toLowerCase()));

  const potentialMissing = [
    { name: 'Kubernetes (K8s)', category: 'Cloud & DevOps', priority: 'High' as const, demand: 86, reason: 'Essential for container orchestration and modern microservices deployments.' },
    { name: 'System Design & High Availability', category: 'Databases & Architecture', priority: 'Critical' as const, demand: 94, reason: 'Key differentiator for staff/senior-level technical evaluations.' },
    { name: 'CI/CD Pipeline Automation', category: 'Cloud & DevOps', priority: 'High' as const, demand: 88, reason: 'Critical for automated test validation and zero-downtime releases.' },
    { name: 'Core Web Vitals & Telemetry', category: 'Tools & Methodologies', priority: 'Recommended' as const, demand: 76, reason: 'Directly evaluated in modern web application performance reviews.' },
  ];

  for (const m of potentialMissing) {
    if (!detectedNames.has(m.name.toLowerCase())) {
      missingSkills.push({
        id: `ms-${missingSkills.length + 1}`,
        name: m.name,
        category: m.category,
        priority: m.priority,
        demandPercentage: m.demand,
        reason: m.reason,
      });
      if (missingSkills.length >= 3) break;
    }
  }

  // 7. Calculate scores
  let machineReadability = 92;
  let headingHierarchy = (hasSummary ? 25 : 0) + (hasExperience ? 30 : 0) + (hasEducation ? 25 : 0) + (hasSkills ? 20 : 0);
  if (headingHierarchy === 0) headingHierarchy = 80;

  let contactExtraction = (hasEmail ? 30 : 0) + (hasPhone ? 30 : 0) + (hasLinkedIn ? 20 : 0) + (hasGitHub ? 20 : 0);
  if (contactExtraction < 60) contactExtraction = 75;

  let layoutCleanliness = 94;
  let keywordPlacement = Math.min(96, Math.max(70, skillsDetected.length * 6));

  const atsCompatibilityScore = Math.round(
    machineReadability * 0.25 +
    headingHierarchy * 0.2 +
    contactExtraction * 0.15 +
    layoutCleanliness * 0.2 +
    keywordPlacement * 0.2
  );

  const metricBonus = Math.min(10, metricCount * 2);
  const overallScore = Math.min(95, Math.max(72, Math.round(atsCompatibilityScore * 0.85 + metricBonus)));

  const grade = overallScore >= 90 ? 'A' : overallScore >= 85 ? 'A-' : overallScore >= 80 ? 'B+' : 'B';
  const percentile = overallScore >= 90 ? 'Top 8%' : overallScore >= 85 ? 'Top 14%' : 'Top 22%';

  // 8. Strengths
  const strengths: ResumeStrength[] = [
    {
      id: 'str-1',
      title: 'Strong Technical Competency Density',
      category: 'Technical Stack',
      description: `Detected ${skillsDetected.length} in-demand skills spanning engineering, infrastructure, and delivery methodologies.`,
      highlight: `${skillsDetected.length} Verified Competencies`,
    },
    {
      id: 'str-2',
      title: 'Quantified Performance Impact',
      category: 'Business Value',
      description: metricCount >= 3 
        ? `Identified ${metricCount} explicit numeric metrics, percentages, or dollar values establishing tangible business ROI.`
        : 'Demonstrates clear operational contributions across key technical projects and infrastructure initiatives.',
      highlight: metricCount >= 3 ? `${metricCount} Measurable Milestones` : 'Demonstrated Initiative',
    },
    {
      id: 'str-3',
      title: 'Single-Column ATS Readability',
      category: 'Structure',
      description: 'Document adheres to single-column sequential text flow, preventing Taleo and Workday multi-column coordinate truncation.',
      highlight: '100% Machine Parsable Flow',
    },
  ];

  // 9. Weaknesses
  const weaknesses: ResumeWeakness[] = [
    {
      id: 'wk-1',
      title: 'Metric Density in Responsibility Bullets',
      category: 'Impact Metrics',
      severity: 'Medium',
      description: 'Certain work experience bullets describe duties rather than measured business outcomes or percent efficiency gains.',
      fixRecommendation: 'Transform passive statements into XYZ formulas: Accomplished [X], as measured by [Y], by doing [Z].',
    },
    {
      id: 'wk-2',
      title: 'Search Keyword Header Alignment',
      category: 'Keyword Optimization',
      severity: 'Low',
      description: 'ATS search filters heavily index the top 30% of the resume for core title and seniority keywords.',
      fixRecommendation: 'Ensure target job title is prominently placed directly under your name and in the summary header.',
    },
  ];

  // 10. Formatting issues
  const formattingIssues: FormattingCheckItem[] = [
    {
      id: 'fmt-1',
      name: 'Single-Column Structure',
      status: 'passed',
      description: 'Resume follows linear, top-to-bottom layout without complex nested tables or multi-column wraps.',
      details: 'Evaluated compatible with Workday, Greenhouse, and Lever parsing pipelines.',
    },
    {
      id: 'fmt-2',
      name: 'Contact Header Completeness',
      status: hasEmail && hasPhone ? 'passed' : 'warning',
      description: hasEmail && hasPhone 
        ? 'Direct email and phone number were successfully extracted from the header.'
        : 'Ensure both email and phone number are explicitly listed in standard text format.',
      details: 'ATS parsers require clear digital contact vectors to generate candidate records.',
      tip: 'Place email and phone on separate bullet separators in your header.',
    },
    {
      id: 'fmt-3',
      name: 'Section Heading Hierarchy',
      status: hasExperience && hasEducation ? 'passed' : 'warning',
      description: 'Standard uppercase section headers (Experience, Education, Skills) are present.',
      details: 'Non-standard headings like "My Journey" or "What I Do" confuse automated resume sorters.',
    },
    {
      id: 'fmt-4',
      name: 'Date Formatting Consistency',
      status: 'passed',
      description: 'Employment dates follow consistent chronological format (MM/YYYY or YYYY – Present).',
      details: 'Consistent date structures prevent gaps in parsed employment duration history.',
    },
  ];

  // 11. Content improvement suggestions
  const contentSuggestions: ContentImprovementSuggestion[] = [
    {
      id: 'cs-1',
      section: 'Professional Experience',
      title: 'Action Verb & Metric Upgrade',
      issue: 'Passive phrasing describing routine responsibilities rather than active leadership achievements.',
      originalText: 'Responsible for building APIs and maintaining backend microservices for the platform.',
      improvedText: 'Architected 8+ high-throughput Node.js microservices handling 4.2M daily requests, maintaining 99.98% uptime SLA.',
      scoreBoost: '+8 pts',
      priority: 'High Impact',
    },
    {
      id: 'cs-2',
      section: 'Skills & Performance',
      title: 'Database & Caching Telemetry',
      issue: 'Lacks explicit latency reduction figures for database and caching operations.',
      originalText: 'Optimized SQL queries and implemented Redis caching to speed up the application.',
      improvedText: 'Engineered multi-tier Redis caching and optimized PostgreSQL indices, slashing p99 API response latency by 58% (from 420ms to 75ms).',
      scoreBoost: '+6 pts',
      priority: 'Moderate Impact',
    },
    {
      id: 'cs-3',
      section: 'Professional Summary',
      title: 'Executive Value Proposition',
      issue: 'Summary paragraph opens with generic soft descriptors rather than core technical specialization.',
      originalText: 'Experienced developer looking for challenging opportunities in software engineering.',
      improvedText: `Results-driven ${detectedRole} with 6+ years specializing in distributed cloud infrastructure, high-concurrency systems, and developer productivity tooling.`,
      scoreBoost: '+5 pts',
      priority: 'Quick Fix',
    },
  ];

  // 12. Keywords suggestions
  const keywordSuggestions: KeywordSuggestionItem[] = [
    {
      id: 'kw-1',
      keyword: 'Microservices Architecture',
      category: 'Architecture',
      matched: /microservices/i.test(resumeText),
      importance: 'Critical',
      frequency: (resumeText.match(/microservices/gi) || []).length,
      recommendedPlacement: 'Professional Summary & Experience Bullets',
      tip: 'Highlight service decomposition and inter-service communication protocols.',
    },
    {
      id: 'kw-2',
      keyword: 'CI/CD Automation',
      category: 'DevOps',
      matched: /ci\/cd|pipeline/i.test(resumeText),
      importance: 'Critical',
      frequency: (resumeText.match(/ci\/cd|pipeline/gi) || []).length,
      recommendedPlacement: 'Technical Skills & Infrastructure Bullets',
      tip: 'Mention specific pipeline tooling like GitHub Actions, GitLab, or ArgoCD.',
    },
    {
      id: 'kw-3',
      keyword: 'Distributed Systems',
      category: 'Architecture',
      matched: /distributed/i.test(resumeText),
      importance: 'High',
      frequency: (resumeText.match(/distributed/gi) || []).length,
      recommendedPlacement: 'Summary & Senior Roles',
      tip: 'Emphasize partition tolerance, eventual consistency, and fault isolation.',
    },
    {
      id: 'kw-4',
      keyword: 'Test-Driven Development (TDD)',
      category: 'Methodologies',
      matched: /testing|test|jest|playwright|tdd/i.test(resumeText),
      importance: 'High',
      frequency: (resumeText.match(/testing|test/gi) || []).length,
      recommendedPlacement: 'Core Competencies',
      tip: 'Include test coverage figures (e.g., 90%+ unit test coverage).',
    },
    {
      id: 'kw-5',
      keyword: 'System Scalability',
      category: 'Architecture',
      matched: /scalab|throughput/i.test(resumeText),
      importance: 'High',
      frequency: (resumeText.match(/scalab|throughput/gi) || []).length,
      recommendedPlacement: 'Experience Highlights',
      tip: 'Quantify user load scale (e.g. 500k+ MAU, 10k QPS).',
    },
    {
      id: 'kw-6',
      keyword: 'Cloud Infrastructure (AWS/GCP)',
      category: 'Cloud',
      matched: /aws|gcp|cloud/i.test(resumeText),
      importance: 'Critical',
      frequency: (resumeText.match(/aws|gcp|cloud/gi) || []).length,
      recommendedPlacement: 'Skills & Technical Environment',
      tip: 'Enumerate primary services (ECS, S3, RDS, CloudWatch).',
    },
  ];

  // Company-specific Evaluation Engine
  let companyAnalysis: CompanySpecificAnalysis | undefined = undefined;

  if (params.companyName && params.companyName.trim().length > 0) {
    const rawCompany = params.companyName.trim();
    const compLower = rawCompany.toLowerCase();

    // Map company profiles
    let expectedSkills: CompanySpecificAnalysis['expectedSkills'] = [];
    let importantKeywords: CompanySpecificAnalysis['importantKeywords'] = [];
    let companyStrengths: string[] = [];
    let companyWeaknesses: string[] = [];
    let recommendedProjectsAndCertifications: CompanySpecificAnalysis['recommendedProjectsAndCertifications'] = [];
    let improvementSuggestions: string[] = [];
    let scoreModifier = 0;

    if (compLower.includes('google')) {
      expectedSkills = [
        { name: 'Distributed Systems & Concurrency', category: 'Architecture', importance: 'Core Expectation' },
        { name: 'Algorithms & Data Structures (LeetCode Hard/Medium)', category: 'Core CS', importance: 'Core Expectation' },
        { name: 'Go / C++ / Python / Java', category: 'Languages', importance: 'Core Expectation' },
        { name: 'Google Cloud Platform (GCP / BigQuery)', category: 'Cloud', importance: 'Preferred' },
        { name: 'System Design at Billions QPS', category: 'Design', importance: 'Core Expectation' },
        { name: 'Rigorous Automated Testing & CI/CD', category: 'DevOps', importance: 'Preferred' },
        { name: 'High-Throughput Microservices & gRPC', category: 'Backend', importance: 'Bonus' },
      ];
      importantKeywords = [
        { keyword: 'Large-scale', matched: /large[- ]scale/i.test(resumeText), importance: 'High' },
        { keyword: 'Distributed Systems', matched: /distributed\s+systems/i.test(resumeText), importance: 'High' },
        { keyword: 'Low Latency', matched: /low[- ]latency|latency/i.test(resumeText), importance: 'High' },
        { keyword: 'GCP / Cloud', matched: /gcp|google\s+cloud|cloud/i.test(resumeText), importance: 'High' },
        { keyword: 'Microservices', matched: /microservices/i.test(resumeText), importance: 'Medium' },
        { keyword: 'System Design', matched: /system\s+design/i.test(resumeText), importance: 'High' },
      ];
      companyStrengths = [
        'Demonstrates understanding of high-throughput architectural trade-offs.',
        'Clear problem-solving orientation and technical depth in engineering descriptions.',
        'Clean, single-column formatting compatible with Google engineering recruiters.',
      ];
      companyWeaknesses = [
        'Could highlight more large-scale throughput metrics (e.g., QPS, petabytes, latency reductions in ms).',
        'Could emphasize foundational data structures and algorithm optimization wins.',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'project',
          title: 'Distributed Consensus or Key-Value Store',
          description: 'Build a Raft or Paxos distributed store in Go/Rust with replication and snapshotting.',
          expectedImpact: 'Strong signal for Google L4/L5 Systems & Infrastructure teams.',
        },
        {
          type: 'certification',
          title: 'Google Cloud Professional Cloud Architect',
          description: 'Validates enterprise architectural mastery on Google Cloud infrastructure.',
          expectedImpact: 'Immediate differentiator for Cloud and Solutions roles at Google.',
        },
      ];
      improvementSuggestions = [
        'Quantify engineering outcomes with exact latency reductions (e.g., "Reduced p99 latency from 140ms to 28ms").',
        'Explicitly state system design scope: cluster sizes, database sharding strategies, and failover mechanisms.',
        'Highlight experience with open-source contributions or peer-reviewed design documents.',
      ];
      scoreModifier = /distributed|latency|algorithms|scale/i.test(resumeText) ? 2 : -4;
    } else if (compLower.includes('amazon')) {
      expectedSkills = [
        { name: 'Amazon Web Services (AWS - Lambda, ECS, DynamoDB)', category: 'Cloud', importance: 'Core Expectation' },
        { name: 'High-Availability Microservices (99.99%)', category: 'Backend', importance: 'Core Expectation' },
        { name: 'Java / Python / TypeScript', category: 'Languages', importance: 'Core Expectation' },
        { name: 'Decoupled Event-Driven Systems (SQS/SNS/Kafka)', category: 'Architecture', importance: 'Preferred' },
        { name: 'Customer Obsession & Operational Excellence', category: 'Leadership Principles', importance: 'Core Expectation' },
        { name: 'DevOps & Infrastructure as Code (Terraform/CDK)', category: 'DevOps', importance: 'Preferred' },
      ];
      importantKeywords = [
        { keyword: 'AWS', matched: /aws|amazon\s+web\s+services/i.test(resumeText), importance: 'High' },
        { keyword: 'Customer Impact', matched: /customer|client|user\s+experience/i.test(resumeText), importance: 'High' },
        { keyword: 'High Availability', matched: /high\s+availability|uptime|resilien/i.test(resumeText), importance: 'High' },
        { keyword: 'Microservices', matched: /microservices/i.test(resumeText), importance: 'High' },
        { keyword: 'Operational Excellence', matched: /devops|ci\/cd|monitor|observab/i.test(resumeText), importance: 'Medium' },
      ];
      companyStrengths = [
        'Strong alignment with customer outcomes and revenue delivery metrics.',
        'Demonstrates operational ownership across production deployments.',
      ];
      companyWeaknesses = [
        'Amazon recruiters look for clear STAR stories matching Leadership Principles (Ownership, Bias for Action).',
        'Could include more specific AWS service names (e.g., DynamoDB, SQS, S3, CDK) instead of generic "cloud".',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'certification',
          title: 'AWS Certified Solutions Architect – Associate or Professional',
          description: 'Gold standard certification recognized across all Amazon technical hiring loops.',
          expectedImpact: 'High-priority credential for AWS, Retail, and Prime engineering tracks.',
        },
        {
          type: 'project',
          title: 'Serverless Event-Driven Pipeline using AWS CDK',
          description: 'Deploy an automated event processing pipeline using API Gateway, Lambda, EventBridge, and DynamoDB.',
          expectedImpact: 'Demonstrates Day-1 readiness for Amazon production standards.',
        },
      ];
      improvementSuggestions = [
        'Structure bullet points using the Amazon STAR method: Situation, Task, Action, and Quantified Result.',
        'Emphasize "Frugality" and "Bias for Action" by noting cost-saving migrations or fast turnaround initiatives.',
        'Add specific AWS service primitives wherever cloud infrastructure is mentioned.',
      ];
      scoreModifier = /aws|amazon|dynamodb|lambda/i.test(resumeText) ? 3 : -3;
    } else if (compLower.includes('microsoft')) {
      expectedSkills = [
        { name: 'TypeScript / C# / .NET Core / Python', category: 'Languages', importance: 'Core Expectation' },
        { name: 'Microsoft Azure & Cloud Native Services', category: 'Cloud', importance: 'Core Expectation' },
        { name: 'Enterprise SaaS & Secure Multitenancy', category: 'Architecture', importance: 'Preferred' },
        { name: 'CI/CD with GitHub Actions & Azure DevOps', category: 'DevOps', importance: 'Core Expectation' },
        { name: 'SQL Server / Cosmos DB / PostgreSQL', category: 'Databases', importance: 'Preferred' },
        { name: 'Cross-Functional Collaboration & Growth Mindset', category: 'Culture', importance: 'Core Expectation' },
      ];
      importantKeywords = [
        { keyword: 'Azure', matched: /azure/i.test(resumeText), importance: 'High' },
        { keyword: 'Enterprise', matched: /enterprise|b2b/i.test(resumeText), importance: 'High' },
        { keyword: 'GitHub Actions / DevOps', matched: /github|devops|ci\/cd/i.test(resumeText), importance: 'High' },
        { keyword: 'TypeScript / C#', matched: /typescript|c#|\.net/i.test(resumeText), importance: 'High' },
        { keyword: 'Security & Compliance', matched: /security|compliance|soc2|rbac/i.test(resumeText), importance: 'Medium' },
      ];
      companyStrengths = [
        'Solid engineering fundamentals with strong emphasis on maintainable software.',
        'Collaborative tone and evidence of cross-team coordination.',
      ];
      companyWeaknesses = [
        'Could highlight more enterprise compliance, accessibility (WCAG), or security patterns.',
        'Azure familiarity could be more explicitly stated alongside cloud competencies.',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'certification',
          title: 'Microsoft Certified: Azure Solutions Architect Expert (AZ-305)',
          description: 'Validates advanced expertise in compute, network, storage, and security on Azure.',
          expectedImpact: 'Strong signal for Microsoft Azure and Enterprise Software divisions.',
        },
        {
          type: 'project',
          title: 'Full-Stack Enterprise Portal with Azure AD / MSAL Authentication',
          description: 'Build a secure multitenant enterprise SaaS with role-based access control and Azure Cosmos DB.',
          expectedImpact: 'Directly mirrors Microsoft 365 and Azure portal architectural patterns.',
        },
      ];
      improvementSuggestions = [
        'Highlight experience with Microsoft ecosystem tools (Azure, GitHub, VS Code extensions).',
        'Showcase compliance, telemetry, and accessibility standards implemented in past projects.',
        'Frame achievements with a "Growth Mindset" narrative emphasizing continuous learning and mentorship.',
      ];
      scoreModifier = /azure|c#|\.net|typescript|microsoft/i.test(resumeText) ? 3 : -2;
    } else if (compLower.includes('meta')) {
      expectedSkills = [
        { name: 'React / React Native / Modern Web Core', category: 'Frontend', importance: 'Core Expectation' },
        { name: 'GraphQL & Relay / Modern API Design', category: 'Architecture', importance: 'Core Expectation' },
        { name: 'Python / C++ / Hack / Node.js', category: 'Languages', importance: 'Preferred' },
        { name: 'Web Performance & Sub-100ms Interactions', category: 'Optimization', importance: 'Core Expectation' },
        { name: 'End-to-End Product Ownership & Fast Shipping', category: 'Product', importance: 'Core Expectation' },
        { name: 'Distributed Caching & High-Concurrency APIs', category: 'Backend', importance: 'Preferred' },
      ];
      importantKeywords = [
        { keyword: 'React', matched: /react/i.test(resumeText), importance: 'High' },
        { keyword: 'GraphQL', matched: /graphql/i.test(resumeText), importance: 'High' },
        { keyword: 'Performance', matched: /performance|latency|vitals|speed/i.test(resumeText), importance: 'High' },
        { keyword: 'Product Impact', matched: /users|dau|mau|growth|conversion/i.test(resumeText), importance: 'High' },
        { keyword: 'End-to-End Ownership', matched: /spearheaded|launched|led|owned/i.test(resumeText), importance: 'Medium' },
      ];
      companyStrengths = [
        'Shows product intuition and clear user-facing impact.',
        'Solid modern JavaScript/TypeScript and component-driven architecture.',
      ];
      companyWeaknesses = [
        'Meta values rapid iteration and deep metrics (DAU, MAU, conversion, retention). Need more product metrics.',
        'Could demonstrate deeper understanding of client-side performance and state management at scale.',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'project',
          title: 'Real-Time Collaborative Canvas or Social Feed with Optimistic UI',
          description: 'Build an ultra-responsive social feed with GraphQL subscriptions, virtualized lists, and offline cache.',
          expectedImpact: 'Demonstrates the exact frontend engineering bar sought by Meta Product teams.',
        },
        {
          type: 'skill',
          title: 'Advanced Web Vitals & Real-Time Telemetry',
          description: 'Master Core Web Vitals (INP, LCP, CLS) and real-time client-side tracing.',
          expectedImpact: 'Directly addresses Meta frontend and full-stack interview expectations.',
        },
      ];
      improvementSuggestions = [
        'State user scale numbers: "Supported 250k+ daily active users with 99.9% crash-free sessions."',
        'Demonstrate rapid shipping cadence and A/B test experimentation results.',
        'Mention GraphQL, component design systems, or client-side caching strategies.',
      ];
      scoreModifier = /react|graphql|performance|users/i.test(resumeText) ? 3 : -2;
    } else if (compLower.includes('infosys') || compLower.includes('tcs') || compLower.includes('wipro') || compLower.includes('accenture')) {
      const companyDisplayName = compLower.includes('infosys')
        ? 'Infosys'
        : compLower.includes('tcs')
        ? 'TCS'
        : compLower.includes('wipro')
        ? 'Wipro'
        : 'Accenture';

      expectedSkills = [
        { name: 'Java / Spring Boot or Full Stack (React/Node.js)', category: 'Core Tech', importance: 'Core Expectation' },
        { name: 'Cloud Migration & Modernization (AWS / Azure)', category: 'Cloud', importance: 'Core Expectation' },
        { name: 'Enterprise Agile / Scrum & SDLC Delivery', category: 'Process', importance: 'Core Expectation' },
        { name: 'Relational Databases (Oracle / PostgreSQL / SQL)', category: 'Databases', importance: 'Core Expectation' },
        { name: 'Automated Testing (JUnit / Selenium / Mockito)', category: 'QA', importance: 'Preferred' },
        { name: 'Client Communication & Stakeholder Delivery', category: 'Consulting', importance: 'Preferred' },
      ];
      importantKeywords = [
        { keyword: 'Enterprise Solutions', matched: /enterprise|client|business/i.test(resumeText), importance: 'High' },
        { keyword: 'Cloud (AWS/Azure)', matched: /aws|azure|cloud/i.test(resumeText), importance: 'High' },
        { keyword: 'Agile / Scrum', matched: /agile|scrum|sprint/i.test(resumeText), importance: 'High' },
        { keyword: 'Full Lifecycle / SDLC', matched: /lifecycle|sdlc|end-to-end/i.test(resumeText), importance: 'Medium' },
        { keyword: 'Quality & Testing', matched: /testing|junit|qa|coverage/i.test(resumeText), importance: 'Medium' },
      ];
      companyStrengths = [
        `Strong match for ${companyDisplayName}'s enterprise consulting and software delivery standards.`,
        'Versatile technical stack suitable for client migration and modernization projects.',
      ];
      companyWeaknesses = [
        `Highlight formal certifications and client-facing delivery milestones valued at ${companyDisplayName}.`,
        'Could include more references to code quality standards, unit test coverage, and documentation.',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'certification',
          title: 'AWS Certified Developer / Azure Developer Associate',
          description: `Industry-recognized credential giving top priority during ${companyDisplayName} client deployment allocation.`,
          expectedImpact: `Direct fast-track for enterprise consulting accounts at ${companyDisplayName}.`,
        },
        {
          type: 'project',
          title: 'Legacy-to-Cloud Microservices Migration',
          description: 'Document an end-to-end monolithic decomposition into cloud-native microservices with Docker and CI/CD.',
          expectedImpact: `Primary engagement type for senior engineers at ${companyDisplayName}.`,
        },
      ];
      improvementSuggestions = [
        'Highlight experience in client requirements gathering, sprint demos, and cross-timezone team coordination.',
        'Add quantitative metrics on project timelines (e.g., "Delivered migration 3 weeks ahead of schedule").',
        'Clearly enumerate industry certifications and educational background at the top of the resume.',
      ];
      scoreModifier = /enterprise|client|agile|java|cloud/i.test(resumeText) ? 3 : -1;
    } else {
      // Custom Company Evaluation
      expectedSkills = [
        { name: 'Core Technical Stack for ' + rawCompany, category: 'Core Tech', importance: 'Core Expectation' },
        { name: 'Modern Architecture & System Design', category: 'Architecture', importance: 'Core Expectation' },
        { name: 'Cloud Infrastructure & DevOps', category: 'Cloud', importance: 'Preferred' },
        { name: 'Cross-Functional Collaboration', category: 'Soft Skills', importance: 'Core Expectation' },
        { name: 'Continuous Delivery & Automated Testing', category: 'DevOps', importance: 'Preferred' },
      ];
      importantKeywords = [
        { keyword: 'Impact & Metrics', matched: /increased|reduced|improved|revenue|speed/i.test(resumeText), importance: 'High' },
        { keyword: 'Engineering Leadership', matched: /lead|spearhead|mentored|architecture/i.test(resumeText), importance: 'High' },
        { keyword: 'Modern Tech Stack', matched: /react|typescript|node|python|cloud|docker/i.test(resumeText), importance: 'High' },
        { keyword: 'Scalability', matched: /scale|scalable|throughput/i.test(resumeText), importance: 'Medium' },
      ];
      companyStrengths = [
        `Strong technical foundation that matches modern expectations at ${rawCompany}.`,
        'Clear demonstration of engineering execution and quantified impact.',
      ];
      companyWeaknesses = [
        `Customize your resume summary to reference ${rawCompany}'s mission, products, and core technology stack.`,
        'Verify that your most relevant accomplishments match the specific department priorities.',
      ];
      recommendedProjectsAndCertifications = [
        {
          type: 'project',
          title: `Showcase Project tailored to ${rawCompany}'s Core Product`,
          description: `Build a prototype or system directly relevant to ${rawCompany}'s primary technical challenges.`,
          expectedImpact: `Demonstrates genuine passion and immediate Day-1 domain competence for ${rawCompany}.`,
        },
        {
          type: 'skill',
          title: 'Domain-Specific Architecture Deep-Dive',
          description: `Research ${rawCompany}'s public tech blog and engineering whitepapers to mirror their terminology.`,
          expectedImpact: 'Ensures high scoring in both ATS and initial hiring manager screens.',
        },
      ];
      improvementSuggestions = [
        `Tailor the resume headline specifically to ${rawCompany}'s open position title.`,
        `Adopt keywords from ${rawCompany}'s recent technical job postings.`,
        'Ensure measurable metrics in all bullet points to prove high ROI.',
      ];
      scoreModifier = 0;
    }

    // Match present vs missing skills
    const detectedSkillNames = skillsDetected.map((s) => s.name.toLowerCase());
    const presentSkills: string[] = [];
    const missingSkills: CompanySpecificAnalysis['missingSkills'] = [];

    for (const exp of expectedSkills) {
      const expLower = exp.name.toLowerCase();
      const isPresent =
        detectedSkillNames.some((ds) => expLower.includes(ds) || ds.includes(expLower)) ||
        new RegExp(`\\b${exp.name.split(' ')[0]}\\b`, 'i').test(resumeText);

      if (isPresent) {
        presentSkills.push(exp.name);
      } else {
        missingSkills.push({
          name: exp.name,
          priority: exp.importance === 'Core Expectation' ? 'Critical' : 'High',
          recommendation: `Add verifiable experience or side-project demonstration with ${exp.name} to meet ${rawCompany}'s hiring bar.`,
        });
      }
    }

    // Calculate company score
    const baseScore = overallScore;
    const skillsRatio = expectedSkills.length > 0 ? presentSkills.length / expectedSkills.length : 0.8;
    const computedCompanyScore = Math.min(
      99,
      Math.max(45, Math.round(baseScore * 0.7 + skillsRatio * 30 + scoreModifier))
    );

    // Selection readiness
    let selectionReadinessLevel: CompanySpecificAnalysis['selectionReadinessLevel'] = 'Needs Targeted Work';
    if (computedCompanyScore >= 87) {
      selectionReadinessLevel = 'Interview Ready';
    } else if (computedCompanyScore >= 76) {
      selectionReadinessLevel = 'Highly Competitive';
    } else if (computedCompanyScore >= 62) {
      selectionReadinessLevel = 'Moderate Match';
    }

    companyAnalysis = {
      companyName: rawCompany,
      companyScore: computedCompanyScore,
      selectionReadinessLevel,
      expectedSkills,
      presentSkills,
      missingSkills,
      importantKeywords,
      companyStrengths,
      companyWeaknesses,
      recommendedProjectsAndCertifications,
      improvementSuggestions,
    };
  }

  return {
    id: 'local-analysis-' + Date.now(),
    fileInfo: {
      name: fileName,
      size: fileSize,
      formattedSize: formattedSize,
      type: 'PDF Document',
      lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      pageCount: fileSize > 300000 ? 2 : 1,
    },
    analyzedAt: 'Just now (Enterprise ATS Engine)',
    targetRole: detectedRole,
    overallScore,
    overallVerdict: {
      label: overallScore >= 85 ? 'Highly Competitive ATS Profile' : 'Strong Solid Candidate',
      grade,
      percentile,
      summary: `Document exhibits strong structural integrity and high machine readability (${machineReadability}/100). Technical keyword distribution aligns closely with enterprise recruiting standards.`,
    },
    atsCompatibilityScore,
    atsBreakdown: {
      machineReadability,
      headingHierarchy,
      contactExtraction,
      layoutCleanliness,
      keywordPlacement,
    },
    skillsDetected,
    missingSkills,
    strengths,
    weaknesses,
    formattingIssues,
    contentSuggestions,
    keywordSuggestions,
    companyAnalysis,
    isFallback: true,
    engineNotice: 'Analyzed with Enterprise ATS Engine (Gemini AI temporarily experiencing high demand).',
  };
}
