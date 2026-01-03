import { Card } from "@/components/ui/Card";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { Job } from "@/libs/reddit/steady-api-reddit";

export type SavedJobRow = {
  job: Job | null;
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // 🔥 FETCH RECENT JOBS FROM DB
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_flagged', false)
    .order('created_utc', { ascending: false })
    .limit(3);    

    const { data, error } = await supabase
        .from("saved_jobs")
        .select(
          `
          job:jobs (
            *
          )
        `
        )
        .returns<SavedJobRow[]>();

    if (error) {
    console.error(error);
    }

    const savedJobs =
        data?.map((row) => row.job).filter((job): job is Job => job !== null) ?? [];

    const noSavedJobs = savedJobs.length;

    const { data: appliedjobs } = await supabase
      .from("applied_jobs")
      .select(`
        job:jobs (*)
      `)
      .order("applied_at", { ascending: false })
      .returns<SavedJobRow[]>();

    const appliedJobs = 
        appliedjobs?.map((row) => row.job).filter((job): job is Job => job !== null) ?? [];
    const noappliedjobs = appliedJobs.length

    async function isPremiumUser(userId: string) {
      const { data } = await supabase
        .from("user_purchases")
        .select("id")
        .eq("user_id", userId)
        .eq("status", "paid")
        .limit(1)
        .single();

      return !!data;
    }


  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">

      <div>
        <h1 className="text-3xl font-black text-brand-dark">Dashboard</h1>
        <p className="text-gray-600 font-medium">Welcome back, {user.email}</p>
        {await isPremiumUser(user.id) ? "You are a Pro user🔶!" : <></>}
      </div>

      {/* Stats Grid – leave placeholder for now */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card hoverEffect className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h1 className="font-bold">Saved Jobs</h1>
          <h1>{noSavedJobs}</h1>   
        </Card>
        <Card hoverEffect className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <h1 className="font-bold">Applied</h1>
          <h1>{noappliedjobs}</h1>   
        </Card>     
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Matches */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-brand-dark">Recent Matches</h2>
            <Button variant="ghost" size="sm" className="text-xs">View All</Button>
          </div>

          <div className="space-y-4">
            {(jobs ?? []).map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>

        {/* Right column – unchanged */}
        {/* Saved Widget (Empty State) */}
                    <div>
                        <h2 className="text-xl font-black text-brand-dark mb-4">Saved Jobs</h2>

                        <Card className="flex flex-col items-center justify-center py-12 text-center border-dashed border-4 border-gray-200 shadow-none">
                          {savedJobs.length === 0 ? (
                            <>
                              <div className="text-4xl mb-2">📂</div>

                              <p className="font-bold text-brand-dark">
                                No jobs saved yet.
                              </p>

                              <p className="text-xs text-gray-500 max-w-150 mx-auto mt-1">
                                Start browsing the feed to save opportunities.
                              </p>

                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-4 text-brand-orange"
                              >
                                Browse Feed
                              </Button>
                            </>
                          ) : (
                            <div className="w-full space-y-4">
                              {savedJobs.map((job) => (
                                <div key={job.id} className="text-left">
                                  <p className="font-semibold">{job.title}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </Card>
                    </div>

      </div>
    </div>
  );
}
