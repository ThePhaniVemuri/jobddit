export type Job = {
  id: string;                    // uuid (db primary key)

  // Reddit identifiers
  reddit_post_id: string;        // "t3_1pzr23w" (UNIQUE)
  reddit_post_short_id: string;  // "1pzr23w"

  // Core content
  title: string;
  description: string | null;

  // Author
  author_username: string;       // "Sea-Inspection-191"
  author_id: string | null;      // "t2_xxx" (optional)
  author_profile_url: string;    // https://reddit.com/user/...
  author_dm_url: string;         // https://reddit.com/message/compose/?to=...

  // Meta
  subreddit: string;             // "SaaS"  
  subreddit_prefixed: string;    // "r/SaaS"
  subreddit_subscribers: number;

  // Engagement
  upvotes: number;
  comments_count: number;
  score: number;

  // URLs
  post_url: string;              // https://reddit.com/...
  permalink: string;             // /r/.../comments/...

  // Timing
  created_utc: number;           // reddit timestamp
  inserted_at: string;           // db timestamp (ISO)

  // Flags (filtering & trust)
  is_self_post: boolean;
  is_nsfw: boolean;
  is_locked: boolean;
  is_stickied: boolean;

  // Internal signals
  is_flagged: boolean;            // scam / spam detection
  scam_score: number | null;      // optional (0–1 or 0–100)

  // Ranking helpers
  job_type: "freelance" | "full_time" | "part_time" | "contract" | "";
  extracted_skills: string[];     // ["react", "nextjs"]

  // System
  source: "reddit";
};

type RedditParams = {
  url: string
  sortType: string
}

export async function getPosts(subreddit : string){
    // fetch from steady api
    const url = new URL("https://api.steadyapi.com/v1/reddit/posts")

  const params: RedditParams = {
    url: `https://www.reddit.com/r/${subreddit}`,
    sortType: "new",
  }

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value)
  })

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.STEADY_API_KEY}`,
      Accept: "application/json",
    },
  })

  if (!res.ok) {
    throw new Error("Failed to fetch Reddit posts")
  }

  const json = await res.json();
  return json.body || [];
}