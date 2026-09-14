import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { generateLocalAtsAnalysis } from './src/utils/localAtsEngine';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Body parser middleware for handling resume content
app.use(express.json({ limit: '15mb' }));

// Lazy GoogleGenAI client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      'GEMINI_API_KEY environment variable is missing. Please set your Gemini API key in the environment or AI Studio Secrets panel.'
    );
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// ATS Structured Schema for Gemini Output
const atsAnalysisSchema = {
  type: Type.OBJECT,
  properties: {
    targetRole: { type: Type.STRING },
    overallScore: { type: Type.INTEGER },
    overallVerdict: {
      type: Type.OBJECT,
      properties: {
        label: { type: Type.STRING },
        grade: { type: Type.STRING },
        percentile: { type: Type.STRING },
        summary: { type: Type.STRING },
      },
      required: ['label', 'grade', 'percentile', 'summary'],
    },
    atsCompatibilityScore: { type: Type.INTEGER },
    atsBreakdown: {
      type: Type.OBJECT,
      properties: {
        machineReadability: { type: Type.INTEGER },
        headingHierarchy: { type: Type.INTEGER },
        contactExtraction: { type: Type.INTEGER },
        layoutCleanliness: { type: Type.INTEGER },
        keywordPlacement: { type: Type.INTEGER },
      },
      required: [
        'machineReadability',
        'headingHierarchy',
        'contactExtraction',
        'layoutCleanliness',
        'keywordPlacement',
      ],
    },
    skillsDetected: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          level: { type: Type.STRING },
          frequency: { type: Type.INTEGER },
        },
        required: ['id', 'name', 'category', 'level', 'frequency'],
      },
    },
    missingSkills: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          category: { type: Type.STRING },
          priority: { type: Type.STRING },
          demandPercentage: { type: Type.INTEGER },
          reason: { type: Type.STRING },
        },
        required: ['id', 'name', 'category', 'priority', 'demandPercentage', 'reason'],
      },
    },
    strengths: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          description: { type: Type.STRING },
          highlight: { type: Type.STRING },
        },
        required: ['id', 'title', 'category', 'description', 'highlight'],
      },
    },
    weaknesses: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          category: { type: Type.STRING },
          severity: { type: Type.STRING },
          description: { type: Type.STRING },
          fixRecommendation: { type: Type.STRING },
        },
        required: ['id', 'title', 'category', 'severity', 'description', 'fixRecommendation'],
      },
    },
    formattingIssues: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          name: { type: Type.STRING },
          status: { type: Type.STRING },
          description: { type: Type.STRING },
          details: { type: Type.STRING },
          tip: { type: Type.STRING },
        },
        required: ['id', 'name', 'status', 'description', 'details'],
      },
    },
    contentSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          section: { type: Type.STRING },
          title: { type: Type.STRING },
          issue: { type: Type.STRING },
          originalText: { type: Type.STRING },
          improvedText: { type: Type.STRING },
          scoreBoost: { type: Type.STRING },
          priority: { type: Type.STRING },
        },
        required: [
          'id',
          'section',
          'title',
          'issue',
          'originalText',
          'improvedText',
          'scoreBoost',
          'priority',
        ],
      },
    },
    keywordSuggestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          keyword: { type: Type.STRING },
          category: { type: Type.STRING },
          matched: { type: Type.BOOLEAN },
          importance: { type: Type.STRING },
          frequency: { type: Type.INTEGER },
          recommendedPlacement: { type: Type.STRING },
          tip: { type: Type.STRING },
        },
        required: [
          'id',
          'keyword',
          'category',
          'matched',
          'importance',
          'frequency',
          'recommendedPlacement',
          'tip',
        ],
      },
    },
  },
  required: [
    'targetRole',
    'overallScore',
    'overallVerdict',
    'atsCompatibilityScore',
    'atsBreakdown',
    'skillsDetected',
    'missingSkills',
    'strengths',
    'weaknesses',
    'formattingIssues',
    'contentSuggestions',
    'keywordSuggestions',
  ],
};

// Helper to execute Gemini generateContent with multi-model retry and backoff
async function generateAtsAnalysis(ai: GoogleGenAI, contents: any): Promise<string> {
  // Use gemini-3.1-flash-lite as primary high-availability model, followed by gemini-3.8-flash fallback
  const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
  let lastErr: any = null;

  for (const model of candidateModels) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents,
          config: {
            responseMimeType: 'application/json',
            responseSchema: atsAnalysisSchema,
          },
        });

        if (response.text && response.text.trim()) {
          return response.text;
        }
      } catch (err: any) {
        lastErr = err;
        const msg = String(err?.message || '');
        const status = err?.status || err?.code || err?.error?.code;
        const isTransient =
          status === 503 ||
          status === 429 ||
          msg.includes('503') ||
          msg.includes('UNAVAILABLE') ||
          msg.includes('high demand') ||
          msg.includes('Spikes in demand') ||
          msg.includes('429') ||
          msg.includes('RESOURCE_EXHAUSTED');

        if (isTransient && attempt === 1) {
          const delay = 1200 + Math.floor(Math.random() * 400);
          await new Promise((res) => setTimeout(res, delay));
          continue;
        }

        // Move to next candidate model
        break;
      }
    }
  }

  throw lastErr || new Error('Gemini API models currently unavailable.');
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Real Gemini AI Resume Analysis Endpoint with Enterprise ATS Engine fallback
app.post('/api/analyze-resume', async (req, res) => {
  const { fileName, resumeText, resumeBase64, targetRole } = req.body;

  // Validate inputs
  const hasText = typeof resumeText === 'string' && resumeText.trim().length >= 30;
  const hasBase64 = typeof resumeBase64 === 'string' && resumeBase64.length > 100;

  if (!hasText && !hasBase64) {
    return res.status(400).json({
      error:
        'No readable resume content provided. Please upload a PDF with extractable text or selectable fonts.',
    });
  }

  try {
    const ai = getAI();

    const systemPrompt = `You are a world-class Applicant Tracking System (ATS) evaluator and executive technical talent scout.
Analyze the candidate's resume objectively according to modern enterprise ATS engines (Workday, Taleo, Greenhouse, Lever) and real-world hiring criteria.
Evaluate the resume for:
1. Overall Resume Score (0-100), performance grade, candidate percentile rank, and crisp verdict summary.
2. ATS Compatibility Score (0-100) and 5 ATS dimensional ratings (0-100 each: machineReadability, headingHierarchy, contactExtraction, layoutCleanliness, keywordPlacement).
3. Detected Skills: specific technical, product, and soft skills with category, level, and frequency found in text.
4. Missing Skills: 3-5 critical in-demand competencies missing for this specific role and seniority level.
5. Strengths: 3-4 notable positive differentiators (e.g. quantifiable revenue/performance metrics, strong action verbs, leadership).
6. Weaknesses: 2-3 genuine areas holding the candidate back with actionable fix suggestions.
7. Formatting Issues: 4-6 checks evaluating standard single-column structure, margins, font safety, table avoidance, contact details, date consistency.
8. Content Improvement Suggestions: 3-4 concrete bullet point rewrites transforming passive tasks into high-impact metric achievements with before/after comparisons.
9. Important Keywords: 8-12 vital ATS search keywords with match status (true/false), search importance, frequency, and recommended section placement.`;

    const userPrompt = `Target Role / Filename: ${fileName || targetRole || 'Software Professional'}
${targetRole ? `Desired Job Target: ${targetRole}\n` : ''}
${hasText ? `Resume Content:\n${resumeText.slice(0, 15000)}` : ''}`;

    let contentsPayload: any;
    if (hasText) {
      contentsPayload = `${systemPrompt}\n\n${userPrompt}`;
    } else {
      contentsPayload = {
        parts: [
          {
            inlineData: {
              mimeType: 'application/pdf',
              data: resumeBase64,
            },
          },
          {
            text: `${systemPrompt}\n\n${userPrompt}`,
          },
        ],
      };
    }

    let parsed: any = null;
    try {
      const rawText = await generateAtsAnalysis(ai, contentsPayload);
      parsed = JSON.parse(rawText);
    } catch {
      // Graceful fallback to Enterprise ATS Engine if models are at capacity
      const fallbackResult = generateLocalAtsAnalysis({
        fileName,
        resumeText: hasText ? resumeText : (targetRole || 'Software Professional Resume'),
        targetRole,
        fileSize: req.body.fileSize,
        formattedSize: req.body.formattedSize,
      });
      return res.json(fallbackResult);
    }

    // Normalize IDs and values in case model omitted any
    const finalResult = {
      ...parsed,
      id: 'analysis-' + Date.now(),
      analyzedAt: 'Just now (Gemini AI)',
      fileInfo: {
        name: fileName || 'Uploaded_Resume.pdf',
        size: req.body.fileSize || 180000,
        formattedSize: req.body.formattedSize || '180 KB',
        type: 'PDF Document',
        lastModified: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        pageCount: 1,
      },
      skillsDetected: (parsed.skillsDetected || []).map((s: any, idx: number) => ({
        ...s,
        id: s.id || `skill-${idx}`,
        frequency: s.frequency || 1,
      })),
      missingSkills: (parsed.missingSkills || []).map((m: any, idx: number) => ({
        ...m,
        id: m.id || `missing-${idx}`,
      })),
      strengths: (parsed.strengths || []).map((st: any, idx: number) => ({
        ...st,
        id: st.id || `str-${idx}`,
      })),
      weaknesses: (parsed.weaknesses || []).map((w: any, idx: number) => ({
        ...w,
        id: w.id || `wk-${idx}`,
      })),
      formattingIssues: (parsed.formattingIssues || []).map((f: any, idx: number) => ({
        ...f,
        id: f.id || `fmt-${idx}`,
        status: f.status === 'passed' || f.status === 'failed' ? f.status : 'warning',
      })),
      contentSuggestions: (parsed.contentSuggestions || []).map((c: any, idx: number) => ({
        ...c,
        id: c.id || `sug-${idx}`,
      })),
      keywordSuggestions: (parsed.keywordSuggestions || []).map((k: any, idx: number) => ({
        ...k,
        id: k.id || `kw-${idx}`,
      })),
      isFallback: false,
    };

    return res.json(finalResult);
  } catch (err: any) {
    // If Gemini key is missing or general exception, fall back to Enterprise ATS Engine if we have text
    if (hasText) {
      const fallbackResult = generateLocalAtsAnalysis({
        fileName,
        resumeText,
        targetRole,
        fileSize: req.body.fileSize,
        formattedSize: req.body.formattedSize,
      });
      return res.json(fallbackResult);
    }

    let friendlyMessage = 'An error occurred while analyzing the resume.';
    try {
      if (typeof err?.message === 'string' && err.message.startsWith('{')) {
        const parsed = JSON.parse(err.message);
        if (parsed?.error?.message) {
          friendlyMessage = parsed.error.message;
        }
      }
    } catch {
      // ignore JSON parse
    }

    return res.status(500).json({
      error: friendlyMessage,
    });
  }
});

// Vite middleware or static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
