import {
  ImprovementTone,
  ImprovementGoal,
  ImprovementSectionType,
  AIImprovementContext,
  AIImprovementResult,
} from '../types/aiImprovement';

/**
 * Powerful action verbs categorized by domain
 */
const POWER_VERBS = [
  'Architected',
  'Spearheaded',
  'Engineered',
  'Accelerated',
  'Orchestrated',
  'Streamlined',
  'Optimized',
  'Pioneered',
  'Automated',
  'Scaled',
  'Delivered',
  'Championed',
  'Revamped',
  'Instituted',
  'Consolidated',
];

/**
 * Metric templates for quantifying achievements
 */
const QUANTIFIED_METRICS = [
  'reducing latency by 38%',
  'increasing operational throughput by 45%',
  'saving 18+ engineering hours per sprint',
  'supporting 2.5M+ daily active requests',
  'achieving 99.98% service uptime SLA',
  'cutting AWS cloud infrastructure costs by 26%',
  'boosting customer conversion rates by 19%',
];

/**
 * ATS Keywords bank by context
 */
const ATS_KEYWORDS = [
  'Microservices Architecture',
  'CI/CD Automation',
  'Distributed Systems',
  'RESTful APIs',
  'Test-Driven Development (TDD)',
  'Cloud Infrastructure (AWS/GCP)',
  'Cross-Functional Leadership',
  'System Scalability',
  'Agile Scrum Methodology',
  'Performance Optimization',
];

/**
 * Generate simulated AI improvements tailored to section, tone, goal, and context
 */
export function generateAIImprovement(
  originalContent: string,
  sectionType: ImprovementSectionType,
  tone: ImprovementTone = 'Professional',
  goal?: ImprovementGoal,
  context?: AIImprovementContext,
  variationSeed: number = 0
): AIImprovementResult {
  const trimmed = (originalContent || '').trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;

  // Derive contextual names
  const role = context?.roleTitle || 'Senior Software Engineer';
  const company = context?.company ? ` at ${context.company}` : '';
  const project = context?.projectTitle || 'High-Performance Platform';
  const achievement = context?.achievementTitle || 'Technical Recognition';

  let improvedContent = '';
  let explanation = '';
  let appliedSuggestions: string[] = [];
  let powerVerbsAdded: string[] = [];
  let metricsAdded: string[] = [];
  let keywordsAdded: string[] = [];

  // ==========================================
  // SECTION 1: PROFESSIONAL SUMMARY
  // ==========================================
  if (sectionType === 'summary') {
    if (tone === 'Concise') {
      improvedContent = trimmed
        ? `Results-oriented ${role} with proven expertise in building scalable distributed systems and high-throughput cloud platforms. Reduced release cycles by 40% while driving 99.99% system reliability across cross-functional engineering initiatives.`
        : `${role} specializing in scalable cloud applications and high-throughput systems. Delivered 40% faster release cadences and maintained 99.99% reliability across enterprise workloads.`;
      explanation =
        'Eliminated passive filler language and condensed the narrative into two high-density, impact-driven sentences tailored for 30-second recruiter scans.';
      appliedSuggestions = [
        'Removed generic clichés and passive intro phrases',
        'Directly linked core technical competencies with business outcomes',
        'Strictly bounded character count for optimal A4 layout density',
      ];
      powerVerbsAdded = ['Results-oriented', 'Reduced', 'Driving'];
      metricsAdded = ['40% release cycles', '99.99% system reliability'];
      keywordsAdded = ['Distributed Systems', 'Cloud Platforms', 'Cross-Functional Engineering'];
    } else if (tone === 'Achievement-focused') {
      improvedContent =
        `Performance-driven ${role} with a documented track record of architecting mission-critical platforms handling 3M+ daily users. Spearheaded cloud-native migrations that lowered infrastructure overhead by 32% and accelerated feature delivery by 2.4x across global agile squads.`;
      explanation =
        'Transformed high-level responsibilities into high-leverage business accomplishments with measurable scale and financial efficiency.';
      appliedSuggestions = [
        'Added concrete scale indicators (3M+ daily users)',
        'Quantified cloud cost savings (32% reduction) and velocity multiplier (2.4x)',
        'Highlighted cross-team leadership and global impact',
      ];
      powerVerbsAdded = ['Performance-driven', 'Architecting', 'Spearheaded', 'Accelerated'];
      metricsAdded = ['3M+ daily users', '32% cost overhead', '2.4x delivery rate'];
      keywordsAdded = ['Cloud-Native Architecture', 'Mission-Critical Platforms', 'Agile Leadership'];
    } else if (tone === 'ATS-friendly') {
      improvedContent =
        `Senior-level ${role} offering 6+ years of expertise in Full-Stack Development, Distributed Systems, Microservices Architecture, and Cloud Infrastructure (AWS/GCP). Proficient in CI/CD pipelines, container orchestration (Docker/Kubernetes), and relational/NoSQL database tuning, consistently delivering robust, secure, and compliant production software.`;
      explanation =
        'Maximized keyword density with industry-standard skills and parser-verified taxonomy, guaranteeing optimal ATS parsing ranking.';
      appliedSuggestions = [
        'Injected 8 top-tier ATS technical keywords matching modern job descriptions',
        'Structured skill taxonomy to pass semantic search algorithms',
        'Explicitly stated seniority level and verified domain proficiencies',
      ];
      powerVerbsAdded = ['Offering', 'Delivering', 'Tuning'];
      metricsAdded = ['6+ years expertise'];
      keywordsAdded = [
        'Full-Stack Development',
        'Microservices Architecture',
        'AWS/GCP',
        'Docker/Kubernetes',
        'CI/CD Pipelines',
      ];
    } else {
      // Professional default
      improvedContent =
        `Accomplished ${role} with comprehensive background in architecting end-to-end distributed systems and enterprise cloud applications. Adept at bridging product vision with rigorous engineering standards, driving continuous delivery, and mentoring agile teams to deliver resilient, customer-facing digital products.`;
      explanation =
        'Refined professional tone with authoritative leadership phrasing, balanced technical depth, and strategic business perspective.';
      appliedSuggestions = [
        'Adopted authoritative executive terminology',
        'Balanced architectural depth with engineering culture and leadership',
        'Polished sentence rhythm for recruiter readability',
      ];
      powerVerbsAdded = ['Accomplished', 'Architecting', 'Bridging', 'Mentoring'];
      metricsAdded = ['End-to-end distributed systems'];
      keywordsAdded = ['Enterprise Cloud Applications', 'Continuous Delivery', 'Agile Mentorship'];
    }
  }

  // ==========================================
  // SECTION 2: EXPERIENCE OVERVIEW / SCOPE
  // ==========================================
  else if (sectionType === 'experience-overview') {
    if (tone === 'Concise') {
      improvedContent =
        `Lead architecture and delivery of core customer checkout and billing services for high-traffic enterprise platforms.`;
      explanation = 'Condensed role scope to a single clear, impactful baseline sentence.';
      appliedSuggestions = ['Eliminated redundant fluff', 'Clarified domain ownership'];
      powerVerbsAdded = ['Lead', 'Delivery'];
      metricsAdded = ['High-traffic platforms'];
      keywordsAdded = ['Enterprise Architecture', 'Core Billing Services'];
    } else if (tone === 'Achievement-focused') {
      improvedContent =
        `Oversee engineering strategy and operational execution for core payment pipelines processing $45M+ in annual transaction volume, driving 99.99% availability.`;
      explanation = 'Framed operational responsibilities around business volume and mission-critical availability.';
      appliedSuggestions = ['Quantified financial throughput ($45M+)', 'Highlighted system SLA uptime'];
      powerVerbsAdded = ['Oversee', 'Driving', 'Processing'];
      metricsAdded = ['$45M+ annual volume', '99.99% uptime'];
      keywordsAdded = ['Payment Pipelines', 'Engineering Strategy'];
    } else if (tone === 'ATS-friendly') {
      improvedContent =
        `Lead cross-functional engineering squads responsible for microservices development, REST API design, and distributed cloud services on AWS/Docker.`;
      explanation = 'Infused high-frequency technical tags recognized by automated hiring screeners.';
      appliedSuggestions = ['Added standard cloud keywords', 'Targeted API and architectural terminology'];
      powerVerbsAdded = ['Lead', 'Responsible for'];
      metricsAdded = ['Cross-functional squads'];
      keywordsAdded = ['Microservices Development', 'REST API Design', 'AWS/Docker'];
    } else {
      improvedContent =
        `Direct end-to-end development of scalable distributed services, collaborating closely with product, DevOps, and QA to ensure rapid, dependable feature releases.`;
      explanation = 'Polished phrasing into an authoritative summary of technical ownership and team synergy.';
      appliedSuggestions = ['Elevated leadership presence', 'Highlighted cross-functional alignment'];
      powerVerbsAdded = ['Direct', 'Collaborating', 'Ensure'];
      metricsAdded = ['End-to-end distribution'];
      keywordsAdded = ['Distributed Services', 'DevOps & QA', 'Scalable Architecture'];
    }
  }

  // ==========================================
  // SECTION 3: EXPERIENCE BULLET POINT / HIGHLIGHT
  // ==========================================
  else if (sectionType === 'experience-bullet') {
    const hasMetric = /\d+%|\$\d+|\d+x|\d+\+/.test(trimmed);

    if (tone === 'Concise') {
      improvedContent = trimmed
        ? `Streamlined CI/CD deployment pipelines, cutting build durations by 38% and reducing release failure rates by 22%.`
        : `Refactored monolithic endpoints into microservices, accelerating query response times by 45%.`;
      explanation =
        'Shortened the sentence structure, removed passive auxiliary verbs, and emphasized direct cause-and-effect.';
      appliedSuggestions = [
        'Used strong opening action verb ("Streamlined" / "Refactored")',
        'Pair action with specific measurable percentage outcomes',
        'Tightened sentence length to keep bullet within standard 1–2 lines',
      ];
      powerVerbsAdded = ['Streamlined', 'Cutting', 'Reducing'];
      metricsAdded = ['38% build duration', '22% failure rate'];
      keywordsAdded = ['CI/CD Pipelines', 'Microservices Architecture'];
    } else if (tone === 'Achievement-focused') {
      improvedContent =
        `Spearheaded the zero-downtime database migration of 4.2TB of customer records to PostgreSQL, decreasing average API latency by 54ms and saving $28K annually in licensing.`;
      explanation =
        'Applied Google XYZ formula ("Accomplished [X] as measured by [Y], by doing [Z]") with prominent dollar and latency metrics.';
      appliedSuggestions = [
        'Implemented the Google "Accomplished [X] as measured by [Y] by doing [Z]" structure',
        'Quantified data scale (4.2TB), speed improvement (54ms), and direct financial savings ($28K)',
        'Signaled high-stakes technical ownership and risk management',
      ];
      powerVerbsAdded = ['Spearheaded', 'Decreasing', 'Saving'];
      metricsAdded = ['4.2TB data migration', '54ms API latency', '$28K annual savings'];
      keywordsAdded = ['PostgreSQL', 'Zero-Downtime Migration', 'API Performance'];
    } else if (tone === 'ATS-friendly') {
      improvedContent =
        `Architected resilient RESTful Microservices and GraphQL endpoints utilizing Node.js, TypeScript, and Redis caching, scaling throughput to 8,500 requests/sec with 99.95% uptime.`;
      explanation =
        'Embedded explicit tech stack entities (GraphQL, TypeScript, Redis) and industry standard performance benchmarks.';
      appliedSuggestions = [
        'Included exact stack technologies required by screening software',
        'Paired technical keywords with throughput and uptime compliance metrics',
        'Structured in clean Action-Verb + Tech-Stack + Quantified-Result sequence',
      ];
      powerVerbsAdded = ['Architected', 'Utilizing', 'Scaling'];
      metricsAdded = ['8,500 req/sec', '99.95% uptime'];
      keywordsAdded = ['RESTful Microservices', 'GraphQL', 'TypeScript', 'Redis Caching'];
    } else {
      // Professional default
      improvedContent =
        `Orchestrated the modular re-architecture of legacy payment services, decoupling core monolith dependencies and accelerating team deployment frequency by 65%.`;
      explanation =
        'Replaced passive description with proactive ownership vocabulary, emphasizing architectural rigor and team enablement.';
      appliedSuggestions = [
        'Replaced weak phrase with executive verb "Orchestrated"',
        'Emphasized modernization of legacy debt and engineering velocity',
        'Maintained polished corporate cadence appropriate for top-tier tech companies',
      ];
      powerVerbsAdded = ['Orchestrated', 'Decoupling', 'Accelerating'];
      metricsAdded = ['65% deployment frequency'];
      keywordsAdded = ['Modular Architecture', 'Payment Services', 'Monolith Decoupling'];
    }
  }

  // ==========================================
  // SECTION 4: PROJECT DESCRIPTION
  // ==========================================
  else if (sectionType === 'project-description') {
    if (tone === 'Concise') {
      improvedContent =
        `Full-stack real-time analytics dashboard built with React, WebSockets, and Go, processing 50K concurrent events with sub-50ms latency.`;
      explanation = 'Crisp, one-sentence product summary featuring tech stack, architecture, and live benchmark.';
      appliedSuggestions = [
        'Eliminated boilerplate introductory narrative',
        'Highlighted core stack and concurrency metric immediately',
      ];
      powerVerbsAdded = ['Built', 'Processing'];
      metricsAdded = ['50K concurrent events', '<50ms latency'];
      keywordsAdded = ['Real-Time Analytics', 'React', 'WebSockets', 'Go'];
    } else if (tone === 'Achievement-focused') {
      improvedContent =
        `Designed and launched an open-source distributed caching utility adopted by 1,200+ GitHub developers, improving Redis failover recovery times by 4x and receiving 350+ GitHub stars.`;
      explanation =
        'Emphasized adoption traction, open-source validation, and concrete operational performance improvements.';
      appliedSuggestions = [
        'Showcased developer adoption (1,200+ users, 350+ stars)',
        'Quantified speedup (4x failover improvement)',
        'Demonstrated self-directed technical initiative',
      ];
      powerVerbsAdded = ['Designed', 'Launched', 'Adopted'];
      metricsAdded = ['1,200+ developers', '4x recovery speed', '350+ stars'];
      keywordsAdded = ['Distributed Caching', 'Redis Failover', 'Open-Source'];
    } else if (tone === 'ATS-friendly') {
      improvedContent =
        `Architected a cloud-native microservices application utilizing React, Node.js, Docker, and AWS ECS, implementing JWT authentication, automated CI/CD unit testing, and Redis caching.`;
      explanation =
        'Includes essential screening keywords for full-stack, cloud-native deployments, and modern security patterns.';
      appliedSuggestions = [
        'Included end-to-end full stack keywords (React, Node, Docker, AWS ECS)',
        'Referenced enterprise security (JWT) and quality controls (CI/CD)',
      ];
      powerVerbsAdded = ['Architected', 'Utilizing', 'Implementing'];
      metricsAdded = ['Automated testing'];
      keywordsAdded = ['Cloud-Native Microservices', 'Docker', 'AWS ECS', 'JWT Authentication'];
    } else {
      improvedContent =
        `Engineered a high-performance distributed task scheduler in Go and gRPC, designed for fault-tolerant background execution with automated dead-letter queues and Prometheus monitoring.`;
      explanation =
        'Positions the project as an advanced enterprise-grade system rather than a basic school or side project.';
      appliedSuggestions = [
        'Framed around enterprise reliability (fault tolerance, dead-letter queues)',
        'Incorporated industry observability standards (Prometheus)',
      ];
      powerVerbsAdded = ['Engineered', 'Designed'];
      metricsAdded = ['Fault-tolerant execution'];
      keywordsAdded = ['Distributed Task Scheduler', 'Go & gRPC', 'Prometheus Monitoring'];
    }
  }

  // ==========================================
  // SECTION 5: ACHIEVEMENT DESCRIPTION
  // ==========================================
  else {
    if (tone === 'Concise') {
      improvedContent =
        `Awarded 1st place out of 180 teams for architecting an automated fraud detection pipeline using streaming ML.`;
      explanation = 'Stripped auxiliary text to focus on the competitive rank and core technical achievement.';
      appliedSuggestions = ['Front-loaded competitive scale', 'Directly stated technical contribution'];
      powerVerbsAdded = ['Awarded', 'Architecting'];
      metricsAdded = ['1st place / 180 teams'];
      keywordsAdded = ['Fraud Detection', 'Streaming ML'];
    } else if (tone === 'Achievement-focused') {
      improvedContent =
        `Secured 1st Place Grand Prize among 250+ international competitors, delivering an AI triage platform that reduced patient wait times by 42% in simulated clinical trials.`;
      explanation =
        'Highlighted the prestigious placement, participant volume, and real-world clinical impact.';
      appliedSuggestions = [
        'Emphasized international competition scale (250+ competitors)',
        'Quantified real-world domain impact (42% wait time reduction)',
      ];
      powerVerbsAdded = ['Secured', 'Delivering', 'Reduced'];
      metricsAdded = ['1st Place Grand Prize', '250+ competitors', '42% wait reduction'];
      keywordsAdded = ['AI Triage Platform', 'Clinical Trial Simulation'];
    } else if (tone === 'ATS-friendly') {
      improvedContent =
        `Recognized with Company-Wide Engineering Excellence Award for leading cloud optimization initiatives that decreased annual AWS operating costs by $120,000.`;
      explanation =
        'Binds the honor directly to high-value corporate keywords (Engineering Excellence, Cloud Optimization, AWS Cost Reduction).';
      appliedSuggestions = [
        'Linked recognition directly to commercial cost savings',
        'Injected cloud financial management keywords',
      ];
      powerVerbsAdded = ['Recognized', 'Leading', 'Decreased'];
      metricsAdded = ['$120,000 annual savings'];
      keywordsAdded = ['Engineering Excellence', 'Cloud Optimization', 'AWS Cost Management'];
    } else {
      improvedContent =
        `Selected for Outstanding Innovation Award out of 400+ internal candidates in recognition of designing an automated compliance validation engine for distributed payments.`;
      explanation =
        'Authoritative wording showcasing competitive internal distinction and governance-level impact.';
      appliedSuggestions = [
        'Added selectivity ratio (top 1 of 400+)',
        'Emphasized high-value fintech compliance domain',
      ];
      powerVerbsAdded = ['Selected', 'Designing'];
      metricsAdded = ['Top of 400+ candidates'];
      keywordsAdded = ['Innovation Award', 'Compliance Engine', 'Distributed Payments'];
    }
  }

  // Adjust for active goal overlay if specified
  if (goal === 'concise' && tone !== 'Concise') {
    appliedSuggestions.unshift('Applied active conciseness filter to tighten word count');
  } else if (goal === 'impact') {
    appliedSuggestions.unshift('Enhanced quantifiable metrics and business impact indicators');
  } else if (goal === 'action-verbs') {
    appliedSuggestions.unshift('Upgraded sentence head with executive active power verbs');
  } else if (goal === 'keywords') {
    appliedSuggestions.unshift('Integrated prioritized ATS keyword taxonomy');
  } else if (goal === 'ats-readability') {
    appliedSuggestions.unshift('Formatted syntax for optimal machine and human parsing');
  }

  const improvedWords = improvedContent.split(/\s+/).length;

  return {
    improvedContent,
    explanation,
    tone,
    activeGoal: goal,
    appliedSuggestions,
    powerVerbsAdded,
    metricsAdded,
    keywordsAdded,
    stats: {
      originalWords: words,
      improvedWords,
      impactScoreEstimate: Math.min(98, 82 + (powerVerbsAdded.length + metricsAdded.length) * 4),
    },
  };
}
