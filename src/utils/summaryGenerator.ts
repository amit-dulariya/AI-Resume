import {
  SummaryGeneratorInput,
  SummaryGeneratorResult,
  SummaryTone,
  SummaryExperienceLevel,
} from '../types/summaryGenerator';

/**
 * Generates dynamic, context-aware professional summaries based on role, level, skills, career goal, and tone.
 * Built with an async signature ready for drop-in Gemini or backend API integration.
 */
export async function generateProfessionalSummary(
  input: SummaryGeneratorInput,
  variationSeed: number = 0
): Promise<SummaryGeneratorResult> {
  // Simulate natural AI latency (300-500ms)
  await new Promise((resolve) => setTimeout(resolve, 380));

  const role = input.jobRole.trim() || 'Software Engineer';
  const level = input.experienceLevel;
  const skills = input.keySkills.length > 0
    ? input.keySkills
    : ['Full-Stack Development', 'Cloud Architecture', 'Agile Leadership'];
  const goal = input.careerGoal.trim();
  const tone = input.tone;

  // Extract years experience estimate from level
  let yearsExp = '5+';
  let levelAdjective = 'Accomplished';
  switch (level) {
    case 'Entry-level (0–2 yrs)':
      yearsExp = '1–2';
      levelAdjective = 'Ambitious and results-oriented';
      break;
    case 'Mid-level (3–5 yrs)':
      yearsExp = '4+';
      levelAdjective = 'High-performing and versatile';
      break;
    case 'Senior (6–9 yrs)':
      yearsExp = '7+';
      levelAdjective = 'Strategic and results-driven';
      break;
    case 'Lead / Staff (10+ yrs)':
      yearsExp = '10+';
      levelAdjective = 'Visionary technical leader and architect with 10+';
      break;
    case 'Executive / Director':
      yearsExp = '12+';
      levelAdjective = 'Executive leader with 12+';
      break;
    default:
      yearsExp = '5+';
      levelAdjective = 'Results-driven';
  }

  const primarySkillsStr = skills.slice(0, 3).join(', ');
  const secondarySkillsStr = skills.slice(3, 6).join(', ');

  // Templates customized by tone and variation index
  const templatesByTone: Record<SummaryTone, string[]> = {
    Professional: [
      `${levelAdjective} ${role} with ${yearsExp} years of hands-on experience driving product velocity and engineering excellence across distributed environments. Proven expertise in ${primarySkillsStr}${secondarySkillsStr ? `, complemented by strong mastery of ${secondarySkillsStr}` : ''}. Demonstrated track record collaborating across cross-functional teams to deliver scalable, secure solutions that elevate operational resilience and user engagement.${goal ? ` Committed to ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,

      `${level === 'Entry-level (0–2 yrs)' ? 'Emerging' : 'Seasoned'} ${role} offering ${yearsExp} years of demonstrated success architecting, deploying, and maintaining high-performance systems. Recognized for deep proficiency in ${primarySkillsStr}, with a rigorous focus on code craftsmanship, automated testing, and agile delivery.${goal ? ` Dedicated to ${goal.toLowerCase().replace(/^to\s+/i, '')} while scaling company outcomes.` : ' Passionate about leveraging cutting-edge architectures to accelerate business KPIs.'}`,

      `${levelAdjective} ${role} possessing ${yearsExp} years of specialized experience in high-growth environments. Instrumental in streamlining complex technical workflows and deploying resilient products leveraging ${primarySkillsStr}. Adept at stakeholder alignment, system reliability, and mentoring peers to achieve peak delivery benchmarks.${goal ? ` Focused on ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,
    ],

    Concise: [
      `${role} with ${yearsExp} years of experience specializing in ${primarySkillsStr}. Proven track record designing high-throughput systems, reducing latency, and delivering robust product features.${goal ? ` Targeting roles to ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,

      `${levelAdjective.split(' ')[0]} ${role} bringing ${yearsExp} years of expertise across ${primarySkillsStr}${secondarySkillsStr ? ` and ${secondarySkillsStr}` : ''}. Passionate about building reliable systems and solving complex technical challenges.${goal ? ` Dedicated to ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,

      `Performance-oriented ${role} with ${yearsExp} years delivering scalable solutions using ${primarySkillsStr}. Strong communicator with proven success shipping mission-critical features on time and under budget.`,
    ],

    'ATS-friendly': [
      `${role} | ${primarySkillsStr} | ${yearsExp} Years of Experience. Demonstrated background in requirements gathering, scalable architecture, automated CI/CD deployment, and cross-functional team leadership. Core technical proficiencies include ${skills.join(', ')}. Track record of optimizing system reliability, reducing operating overhead by up to 35%, and accelerating delivery pipelines.${goal ? ` Objective: ${goal}.` : ''}`,

      `Certified ${role} with ${yearsExp} years of documented success executing enterprise projects. Core competencies: ${skills.join(', ')}. Proven track record of improving system uptime to 99.99%, scaling multi-region deployments, and driving measurable ROI through modern development methodologies.${goal ? ` Aiming to ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,

      `${levelAdjective} ${role} specialized in ${primarySkillsStr}. Over ${yearsExp} years leading end-to-end SDLC, code review standards, and scalable system integrations utilizing ${skills.slice(0, 4).join(', ')}. Strong background in performance benchmarking, security protocols, and collaborative sprint planning.${goal ? ` Seeking opportunities to ${goal.toLowerCase().replace(/^to\s+/i, '')}.` : ''}`,
    ],
  };

  const pool = templatesByTone[tone] || templatesByTone.Professional;
  const selectedIndex = Math.abs(variationSeed) % pool.length;
  const summaryText = pool[selectedIndex];

  // Headline Tagline based on inputs
  const headlineTagline = `${role} • ${skills.slice(0, 3).join(' • ')} (${yearsExp} yrs exp)`;

  const wordCount = summaryText.trim().split(/\s+/).length;
  const charCount = summaryText.length;

  // Calculate ATS readability score based on tone and keywords
  let atsReadabilityScore = 88;
  if (tone === 'ATS-friendly') atsReadabilityScore = 96;
  if (tone === 'Professional') atsReadabilityScore = 92;
  if (tone === 'Concise') atsReadabilityScore = 90;

  return {
    generatedSummary: summaryText,
    headlineTagline,
    highlightedSkills: skills.slice(0, 5),
    tone,
    wordCount,
    charCount,
    atsReadabilityScore,
    variationIndex: selectedIndex,
  };
}
