import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY!});

export async function analyzeRedditJob(post: any) {
  const prompt = `
You analyze Reddit job posts.

Decide if this is a REAL, DELIVERABLE job opportunity.

Reject if:
- Scam, spam, promotion
- Freelance offer spam
- Contact-first (DM me / Telegram)
- Vague or unrealistic

If accepted, extract structured data.

Post:
TITLE: ${post.title}
BODY: ${post.selftext ?? ""}
SUBREDDIT: ${post.subreddit}

Return ONLY valid JSON:

{
  "is_legit": true | false,
  "confidence": 0.0-1.0,
  "reason": "short explanation",

  "job_type": "Full-time | Contract | Freelance | Internship | Unknown",
  "seniority": "Intern | Junior | Mid | Senior | Lead | Unknown",
  "remote": "Remote | Hybrid | Onsite | Unknown",

  "salary": {
    "min": number | null,
    "max": number | null,
    "currency": "USD | INR | EUR | Unknown"
  },

  "quality_score": 1-10
}
`;

  const result = await genAI.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt
  })
  const text = result.text || "";
  
  try {
    return JSON.parse(text);
  } catch {
    return {
      is_legit: false,
      confidence: 0,
      reason: "AI parse failure",
      quality_score: 0,
    };
  }
}
