export interface AdminStat {
  id: string;
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  period: string;
  color: string;
}

export interface AdminActivity {
  id: string;
  user: string;
  userEmail: string;
  action: string;
  target: string;
  timeAgo: string;
  timestamp: string;
  type: 'resume' | 'user' | 'ai' | 'template' | 'system';
}

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'Active' | 'Suspended' | 'Pending';
  plan: 'Free' | 'Pro' | 'Enterprise';
  resumesCount: number;
  aiRuns: number;
  lastActive: string;
  joinedDate: string;
}

export interface AdminResumeRecord {
  id: string;
  title: string;
  ownerName: string;
  ownerEmail: string;
  targetRole: string;
  templateName: string;
  atsScore: number;
  createdDate: string;
  lastModified: string;
  status: 'Draft' | 'Analyzed' | 'Ready';
  summaryPreview?: string;
  skills?: string[];
}

export interface AdminTemplateRecord {
  id: string;
  name: string;
  category: 'Modern' | 'Classic' | 'Minimalist' | 'Executive' | 'Technical' | string;
  targetCompany: string;
  previewStyle?: 'modern' | 'classic' | 'minimal' | 'professional' | 'executive' | 'technical' | string;
  description: string;
  isActive: boolean;
  usageCount: number;
  rating: number;
  lastUpdated: string;
}

export interface AdminAnalyticsData {
  dailyScans: { day: string; count: number; analyses: number }[];
  scoreDistribution: { label: string; count: number; percentage: number; color: string }[];
  featureAdoption: { name: string; percentage: number; count: number }[];
  topRoles: { role: string; resumes: number; matchRate: string }[];
}

export const initialAdminStats: AdminStat[] = [
  {
    id: 'stat-users',
    title: 'Total Users',
    value: '3,240',
    change: '+14.2%',
    isPositive: true,
    period: 'vs last month',
    color: 'indigo',
  },
  {
    id: 'stat-resumes',
    title: 'Total Resumes',
    value: '7,180',
    change: '+19.8%',
    isPositive: true,
    period: 'vs last month',
    color: 'blue',
  },
  {
    id: 'stat-ai',
    title: 'Total AI Analyses',
    value: '24,910',
    change: '+28.4%',
    isPositive: true,
    period: 'vs last month',
    color: 'purple',
  },
  {
    id: 'stat-ats',
    title: 'Average ATS Score',
    value: '85.8%',
    change: '+3.4 pts',
    isPositive: true,
    period: 'benchmarked across scans',
    color: 'emerald',
  },
];

export const initialAdminActivities: AdminActivity[] = [
  {
    id: 'act-1',
    user: 'Alex Morgan',
    userEmail: 'alex.morgan@example.com',
    action: 'ran ATS Score Analyzer on',
    target: 'Senior Full Stack Engineer Resume (92%)',
    timeAgo: '4 mins ago',
    timestamp: '2026-09-14T09:02:00Z',
    type: 'ai',
  },
  {
    id: 'act-2',
    user: 'Sarah Jenkins',
    userEmail: 'sarah.j@example.com',
    action: 'matched resume against job post at',
    target: 'Stripe, Inc. — Senior Frontend Architect',
    timeAgo: '18 mins ago',
    timestamp: '2026-09-14T08:48:00Z',
    type: 'resume',
  },
  {
    id: 'act-3',
    user: 'Elena Rostova',
    userEmail: 'elena.r@example.com',
    action: 'created new resume draft with template',
    target: 'Modern Executive Layout',
    timeAgo: '42 mins ago',
    timestamp: '2026-09-14T08:24:00Z',
    type: 'template',
  },
  {
    id: 'act-4',
    user: 'Marcus Thorne',
    userEmail: 'm.thorne@example.com',
    action: 'upgraded account tier to',
    target: 'ResumeAI Pro Membership',
    timeAgo: '1 hour ago',
    timestamp: '2026-09-14T08:05:00Z',
    type: 'user',
  },
  {
    id: 'act-5',
    user: 'System Bot',
    userEmail: 'system@resumeai.io',
    action: 'synced ATS parsing rule index with',
    target: 'Workday & Greenhouse ATS Profiles',
    timeAgo: '2 hours ago',
    timestamp: '2026-09-14T07:12:00Z',
    type: 'system',
  },
  {
    id: 'act-6',
    user: 'Priya Patel',
    userEmail: 'priya.p@example.com',
    action: 'exported tailored PDF version for',
    target: 'Staff Machine Learning Engineer',
    timeAgo: '3 hours ago',
    timestamp: '2026-09-14T06:20:00Z',
    type: 'resume',
  },
];

export const initialAdminUsers: AdminUserRecord[] = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Pro',
    resumesCount: 4,
    aiRuns: 28,
    lastActive: 'Today, 09:02 AM',
    joinedDate: 'Aug 10, 2026',
  },
  {
    id: 'usr-2',
    name: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Pro',
    resumesCount: 3,
    aiRuns: 19,
    lastActive: 'Today, 08:48 AM',
    joinedDate: 'Aug 18, 2026',
  },
  {
    id: 'usr-3',
    name: 'Michael Chang',
    email: 'm.chang@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Enterprise',
    resumesCount: 8,
    aiRuns: 64,
    lastActive: 'Yesterday, 04:30 PM',
    joinedDate: 'Jul 22, 2026',
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Free',
    resumesCount: 2,
    aiRuns: 7,
    lastActive: 'Today, 08:24 AM',
    joinedDate: 'Sep 02, 2026',
  },
  {
    id: 'usr-5',
    name: 'David Kim',
    email: 'david.kim@example.com',
    role: 'user',
    status: 'Suspended',
    plan: 'Free',
    resumesCount: 1,
    aiRuns: 2,
    lastActive: 'Sep 04, 2026',
    joinedDate: 'Jun 14, 2026',
  },
  {
    id: 'usr-6',
    name: 'Priya Patel',
    email: 'priya.p@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Pro',
    resumesCount: 5,
    aiRuns: 41,
    lastActive: 'Today, 06:20 AM',
    joinedDate: 'Jul 29, 2026',
  },
  {
    id: 'usr-7',
    name: 'Marcus Thorne',
    email: 'm.thorne@example.com',
    role: 'user',
    status: 'Active',
    plan: 'Pro',
    resumesCount: 3,
    aiRuns: 15,
    lastActive: 'Today, 08:05 AM',
    joinedDate: 'Sep 09, 2026',
  },
  {
    id: 'usr-8',
    name: 'System Admin',
    email: 'admin@resumeai.io',
    role: 'admin',
    status: 'Active',
    plan: 'Enterprise',
    resumesCount: 12,
    aiRuns: 140,
    lastActive: 'Just now',
    joinedDate: 'Jan 01, 2026',
  },
];

export const initialAdminResumes: AdminResumeRecord[] = [
  {
    id: 'res-1',
    title: 'Senior Full Stack Engineer Resume',
    ownerName: 'Alex Morgan',
    ownerEmail: 'alex.morgan@example.com',
    targetRole: 'Staff / Senior Software Engineer',
    templateName: 'Modern',
    atsScore: 92,
    createdDate: 'Aug 10, 2026',
    lastModified: 'Today, 09:02 AM',
    status: 'Analyzed',
    summaryPreview: 'High-impact engineer with 8+ years architecting fault-tolerant microservices, modern React web applications, and distributed event architectures.',
    skills: ['React', 'TypeScript', 'Node.js', 'Go', 'Kubernetes', 'AWS', 'GraphQL'],
  },
  {
    id: 'res-2',
    title: 'Staff Frontend Architect - Design Systems',
    ownerName: 'Sarah Jenkins',
    ownerEmail: 'sarah.j@example.com',
    targetRole: 'Frontend Architect',
    templateName: 'Professional',
    atsScore: 88,
    createdDate: 'Aug 18, 2026',
    lastModified: 'Today, 08:48 AM',
    status: 'Analyzed',
    summaryPreview: 'Design systems lead driving accessible UI foundations, component libraries, and frontend performance across multi-brand enterprise platforms.',
    skills: ['Design Systems', 'TypeScript', 'React 19', 'Tailwind CSS', 'Figma Tokens', 'Web Components'],
  },
  {
    id: 'res-3',
    title: 'Engineering Director / VP of Eng',
    ownerName: 'Michael Chang',
    ownerEmail: 'm.chang@example.com',
    targetRole: 'Director of Engineering',
    templateName: 'Executive',
    atsScore: 94,
    createdDate: 'Jul 22, 2026',
    lastModified: 'Yesterday',
    status: 'Ready',
    summaryPreview: 'Engineering executive managing 45+ distributed engineers, scaling headcount 3x, and leading cloud modernization initiatives with $14M P&L budget.',
    skills: ['Engineering Leadership', 'Strategic Roadmap', 'Cloud Migration', 'Team Mentorship', 'Budget Oversight'],
  },
  {
    id: 'res-4',
    title: 'Cloud Infrastructure & SRE Specialist',
    ownerName: 'Alex Morgan',
    ownerEmail: 'alex.morgan@example.com',
    targetRole: 'Site Reliability Engineer',
    templateName: 'Minimal',
    atsScore: 78,
    createdDate: 'Aug 28, 2026',
    lastModified: '3 days ago',
    status: 'Analyzed',
    summaryPreview: 'Infrastructure practitioner specializing in Kubernetes cluster orchestration, Terraform IaC pipelines, and observability monitoring.',
    skills: ['Terraform', 'Kubernetes', 'Prometheus', 'Datadog', 'AWS ECS', 'Linux Kernel'],
  },
  {
    id: 'res-5',
    title: 'Machine Learning & LLM Systems Lead',
    ownerName: 'Priya Patel',
    ownerEmail: 'priya.p@example.com',
    targetRole: 'Lead ML Engineer',
    templateName: 'Technical',
    atsScore: 95,
    createdDate: 'Jul 29, 2026',
    lastModified: 'Today, 06:20 AM',
    status: 'Ready',
    summaryPreview: 'AI/ML specialist developing fine-tuned LLM inference pipelines, RAG semantic vector search, and latency-optimized embedding models.',
    skills: ['PyTorch', 'Hugging Face', 'Vector DBs', 'Python', 'FastAPI', 'CUDA Optimization'],
  },
  {
    id: 'res-6',
    title: 'Product Management & Growth Lead',
    ownerName: 'Elena Rostova',
    ownerEmail: 'elena.r@example.com',
    targetRole: 'Principal Product Manager',
    templateName: 'Classic',
    atsScore: 82,
    createdDate: 'Sep 02, 2026',
    lastModified: 'Today, 08:24 AM',
    status: 'Draft',
    summaryPreview: 'Data-driven product strategist leading 0-to-1 SaaS products, user onboarding funnel conversion optimizations, and growth experiments.',
    skills: ['Product Discovery', 'Cohort Analysis', 'Roadmapping', 'User Interviews', 'Mixpanel', 'SQL'],
  },
  {
    id: 'res-7',
    title: 'Product Designer (Design Systems & UX)',
    ownerName: 'Marcus Thorne',
    ownerEmail: 'm.thorne@example.com',
    targetRole: 'Senior UX/UI Designer',
    templateName: 'Modern',
    atsScore: 89,
    createdDate: 'Sep 09, 2026',
    lastModified: 'Today, 08:05 AM',
    status: 'Analyzed',
    summaryPreview: 'Product and interaction designer crafting high-fidelity design prototypes, user journey workflows, and WCAG AA accessible components.',
    skills: ['Figma', 'Prototyping', 'User Research', 'Information Architecture', 'Design Tokens'],
  },
  {
    id: 'res-8',
    title: 'DevOps & CI/CD Automation Engineer',
    ownerName: 'David Kim',
    ownerEmail: 'david.kim@example.com',
    targetRole: 'Senior DevOps Engineer',
    templateName: 'Minimal',
    atsScore: 74,
    createdDate: 'Jun 14, 2026',
    lastModified: 'Sep 04, 2026',
    status: 'Draft',
    summaryPreview: 'CI/CD pipeline automation specialist implementing GitHub Actions, containerized Docker builds, and zero-downtime deployment strategies.',
    skills: ['GitHub Actions', 'Docker', 'Bash', 'AWS', 'SonarQube', 'ArgoCD'],
  },
];

export const initialAdminTemplates: AdminTemplateRecord[] = [
  {
    id: 'tpl-modern',
    name: 'Modern Clean',
    category: 'Modern',
    targetCompany: 'Google & Big Tech',
    previewStyle: 'modern',
    description: 'Clean structured layout with contemporary sans-serif typography and optimized section hierarchy.',
    isActive: true,
    usageCount: 2840,
    rating: 4.9,
    lastUpdated: 'Sep 10, 2026',
  },
  {
    id: 'tpl-classic',
    name: 'Classic Serif',
    category: 'Classic',
    targetCompany: 'Fortune 500 & Corporate',
    previewStyle: 'classic',
    description: 'Timeless single-column design with distinguished serif headings, horizontal rules, and formal structure.',
    isActive: true,
    usageCount: 1950,
    rating: 4.7,
    lastUpdated: 'Sep 02, 2026',
  },
  {
    id: 'tpl-minimal',
    name: 'Minimalist Whitespace',
    category: 'Minimalist',
    targetCompany: 'Startups & Y Combinator',
    previewStyle: 'minimal',
    description: 'Ultra-clean, uncluttered format maximizing whitespace and typographic precision for pure ATS parsing.',
    isActive: true,
    usageCount: 1420,
    rating: 4.8,
    lastUpdated: 'Aug 28, 2026',
  },
  {
    id: 'tpl-professional',
    name: 'Professional Slate',
    category: 'Technical',
    targetCompany: 'McKinsey & Consulting',
    previewStyle: 'professional',
    description: 'Balanced slate-accented layout designed for corporate strategy, tech consultants, and finance analysts.',
    isActive: true,
    usageCount: 970,
    rating: 4.6,
    lastUpdated: 'Aug 15, 2026',
  },
  {
    id: 'tpl-executive',
    name: 'Executive Navy',
    category: 'Executive',
    targetCompany: 'Enterprise & C-Suite',
    previewStyle: 'executive',
    description: 'Authoritative styling featuring centered navy headers and highlighted leadership milestones for VPs & Directors.',
    isActive: true,
    usageCount: 780,
    rating: 4.8,
    lastUpdated: 'Sep 05, 2026',
  },
  {
    id: 'tpl-technical',
    name: 'Technical Architect',
    category: 'Technical',
    targetCompany: 'Amazon & Cloud Engineering',
    previewStyle: 'technical',
    description: 'Optimized two-column skill matrix, technology tags, and concise achievement bullet format for senior engineers.',
    isActive: false,
    usageCount: 620,
    rating: 4.7,
    lastUpdated: 'Sep 11, 2026',
  },
];

export const adminAnalyticsData: AdminAnalyticsData = {
  dailyScans: [
    { day: 'Mon', count: 540, analyses: 1420 },
    { day: 'Tue', count: 620, analyses: 1680 },
    { day: 'Wed', count: 710, analyses: 1940 },
    { day: 'Thu', count: 680, analyses: 1810 },
    { day: 'Fri', count: 850, analyses: 2310 },
    { day: 'Sat', count: 490, analyses: 1190 },
    { day: 'Sun', count: 520, analyses: 1350 },
  ],
  scoreDistribution: [
    { label: '90 - 100% (Exceptional)', count: 2840, percentage: 39.5, color: 'bg-emerald-500 text-emerald-700' },
    { label: '80 - 89% (Competitive)', count: 2450, percentage: 34.1, color: 'bg-blue-500 text-blue-700' },
    { label: '70 - 79% (Needs Polish)', count: 1280, percentage: 17.8, color: 'bg-amber-500 text-amber-700' },
    { label: 'Under 70% (High Risk)', count: 610, percentage: 8.6, color: 'bg-rose-500 text-rose-700' },
  ],
  featureAdoption: [
    { name: 'ATS Audit Engine', percentage: 46, count: 11450 },
    { name: 'Bullet Point Polishing', percentage: 29, count: 7220 },
    { name: 'Job Matcher Scanner', percentage: 18, count: 4480 },
    { name: 'AI Summary Generator', percentage: 7, count: 1760 },
  ],
  topRoles: [
    { role: 'Senior Software Engineer', resumes: 1420, matchRate: '92%' },
    { role: 'Product Manager', resumes: 980, matchRate: '87%' },
    { role: 'Data Scientist & ML', resumes: 840, matchRate: '90%' },
    { role: 'DevOps / Cloud Architect', resumes: 710, matchRate: '89%' },
    { role: 'UI/UX Product Designer', resumes: 630, matchRate: '86%' },
  ],
};
