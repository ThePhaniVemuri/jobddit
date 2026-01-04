// ---------- CONFIG ----------
const BLOCKED_WORDS = [
  "telegram",
  "whatsapp",
  "crypto",
  "forex",
  "investment",
  // "signals",
  "[for hire]",
  "[offer]",
  "[hire me]",
];

// Regex patterns catch intent, not just words
const SPAM_PATTERNS = [  
  // /contact\s+me/i,
  // /message\s+me/i,
  /t\.me|wa\.me|telegram/i,
  /crypto|forex|signals|investment/i,
  /earn\s+\$?\d+/i,
  /guaranteed/i,
  /\bno experience\b/i,
  /\bquick money\b/i,
  /\bpassive income\b/i
];

// ---------- SCORING ----------
function scoreJobPost(post: any): number {
  let score = 0;
  const text = `${post.title} ${post.selftext ?? ""}`;

  // Length = effort
  if (text.length > 100) score += 2;
  if (text.length > 300) score += 4;  

  // Formatting = real job post
  if (text.includes("\n-") || text.includes("\n•")) score += 2;

  // External links = real company
  if (post.url && !post.url.includes("reddit.com")) score += 3;

  // Company context
  if (/(we are|our company|startup|team|founded)/i.test(text)) {
    score += 2;
  }

  // Role clarity
  if (/(responsibilities|requirements|qualifications|role)/i.test(text)) {
    score += 2;
  }

  // Karma sanity (light weight)
  if (post.ups >= 1) score += 1;
  if (post.ups >= 3) score += 2;

  return score;
}

// ---------- MAIN FILTER ----------
export function passesBasicFilters(post: any): boolean {
  const text = `${post.title} ${post.selftext ?? ""}`.toLowerCase();

  // ❌ Layer 1: absolute rejects (cheap + fast)  
  if (post.ups < 1) return false;

  if (BLOCKED_WORDS.some(word => text.includes(word))) {
    return false;
  }

  if (SPAM_PATTERNS.some(rx => rx.test(text))) {
    return false;
  }

  // ❌ Layer 2: structural quality gate
  const score = scoreJobPost(post);

  // Tune this number (6–8 is a good range)
  if (score < 3) return false;

  // ✅ Passed all non-AI filters
  return true;
}