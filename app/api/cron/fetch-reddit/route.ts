import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/libs/supabase/supabase-admin";
import { getPosts } from "@/libs/reddit/steady-api-reddit";
// import { analyzeRedditJob } from "@/libs/ai/gemini-job-analyzer";
import { passesBasicFilters } from "@/libs/reddit/reddit-filters";

const SUBREDDITS = [
  // "jobs",  
  "hiring",
  // "jobhunting",  
  "remotejobs",
  "jobbit",
  "freelance_forhire",
  // "freelance"
];

export async function GET() {
  // 1️⃣ Read last fetch time
  const { data: setting, error } = await supabaseAdmin
    .from("settings")
    .select("value")
    .eq("key", "last_reddit_fetch")
    .single();

  if (error) {
    console.error("Failed to read last fetch timestamp", error);
    return NextResponse.json({ error: "settings read failed" }, { status: 500 });
  }

  const lastFetch = Number(setting?.value || 0);
  let newestTimestamp = lastFetch;

  // 2️⃣ Fetch posts per subreddit
  for (const subreddit of SUBREDDITS) {
    const posts = await getPosts(subreddit);
    console.log(`Fetched ${posts.length} posts from r/${subreddit}`); // only in server logs

    for (const post of posts) {
      // Skip old posts
      if (post.created_utc <= lastFetch) continue;

      // Basic filters
      if (!passesBasicFilters(post)) continue;


      // // 🔮 AI analysis (THIS IS THE NEW GATE)
      // const ai = await analyzeRedditJob(post);

      // // Reject if AI says no
      // if (!ai.is_legit || ai.confidence < 0.5 || ai.quality_score < 6) {
      //   continue;
      // }

      newestTimestamp = Math.max(newestTimestamp, post.created_utc);

      // 3️⃣ Normalize + insert
      const insertPayload = {
        reddit_post_id: post.name,                  // t3_xxx
        reddit_post_short_id: post.id,              // short id

        title: post.title,
        description: post.selftext || null,

        author_username: post.author,
        author_id: post.author_fullname || null,
        author_profile_url: `https://www.reddit.com/user/${post.author}`,
        author_dm_url: `https://www.reddit.com/message/compose/?to=${post.author}`,

        subreddit: post.subreddit,
        subreddit_prefixed: post.subreddit_name_prefixed,
        subreddit_subscribers: post.subreddit_subscribers || null,

        upvotes: post.ups || 0,
        comments_count: post.num_comments || 0,
        score: post.score || 0,

        post_url: post.url,
        permalink: post.permalink,

        created_utc: post.created_utc,

        is_self_post: post.is_self,
        is_nsfw: post.over_18,
        is_locked: post.locked,
        is_stickied: post.stickied,

        source: "reddit",
        // is_legit: ai.is_legit,
        // ai_confidence: ai.confidence,
        // ai_reason: ai.reason,
        // quality_score: ai.quality_score,

        // job_type: ai.job_type,
        // seniority: ai.seniority,
        // remote_type: ai.remote,

        // salary_min: ai.salary?.min ?? null,
        // salary_max: ai.salary?.max ?? null,
        // salary_currency: ai.salary?.currency ?? null,
      };

      try {
        await supabaseAdmin
          .from("jobs")
          .insert(insertPayload);
      } catch (err) {
        // Ignore duplicate inserts (unique constraint)
        continue;
      }
    }
  }

  // 4️⃣ Update fetch timestamp
  await supabaseAdmin
    .from("settings")
    .update({ value: String(newestTimestamp) })
    .eq("key", "last_reddit_fetch");

  return NextResponse.json({ status: "ok" });
}