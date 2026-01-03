import { createClient } from "@/libs/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const before = searchParams.get("before");

  if (!before) {
    return NextResponse.json({ jobs: [] });
  }

  const supabase = await createClient();

  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("is_flagged", false)
    .lt("created_utc", Number(before))
    .order("created_utc", { ascending: false })
    .limit(25);

  if (error) {
    return NextResponse.json({ jobs: [] }, { status: 500 });
  }

  return NextResponse.json({ jobs });
}
