"use client";

import { useEffect, useMemo, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import RealtimeJobs from "./realtime-jobs";
import { Job } from "@/libs/reddit/steady-api-reddit";
import { redirect } from "next/navigation";

const JOB_TYPES = ["Full-time", "Contract", "Freelance", "Part-time"];
const SUBREDDITS = [
  "jobs",  
  "hiring",
  "jobhunting",  
  "remotejobs",
  "jobbit",
  "freelance"
];

export default function JobsClient({ initialJobs }: { initialJobs: Job[] }) {
  const [allJobs, setAllJobs] = useState<Job[]>(initialJobs);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<string[]>([]);
  const [keyword, setKeyword] = useState("");

  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // cursor = timestamp of last job loaded
  const lastCreatedUtc = allJobs[allJobs.length - 1]?.created_utc;


  // 🔹 Apply filters in-memory
  const filteredJobs = useMemo(() => {
    return allJobs.filter(job => {
      if (selectedTypes.length && !selectedTypes.includes(job.job_type)) {
        return false;
      }

      if (selectedSubs.length && !selectedSubs.includes(job.subreddit)) {
        return false;
      }

      if (keyword) {
        const text = `${job.title} ${job.description ?? ""}`.toLowerCase();
        if (!text.includes(keyword.toLowerCase())) return false;
      }

      return true;
    });
  }, [allJobs, selectedTypes, selectedSubs, keyword]);  

  // realtime INSERT handler
  const onNewJob = (job: Job) => {
    setAllJobs(prev => {
      if (prev.some(j => j.id === job.id)) return prev;
      return [job, ...prev];
    });
  };

  async function loadMoreJobs() {
    if (!hasMore || loadingMore) return;

    setLoadingMore(true);

    const res = await fetch(
      `/api/jobs/load-more?before=${lastCreatedUtc}`
    );

    const { jobs: newJobs } = await res.json();

    if (!newJobs.length) {
      setHasMore(false);
    } else {
      setAllJobs(prev => [...prev, ...newJobs]);
    }

    setLoadingMore(false);
  }

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            <div>
              <h3 className="text-lg font-black text-brand-dark mb-4 uppercase tracking-wider">
                Filters
              </h3>

              <Card className="space-y-4">
                <div>
                  <h4 className="font-bold text-sm mb-2">Job Type</h4>
                  {JOB_TYPES.map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"                        
                        className="sr-only peer"
                        onChange={(e) => {
                          setSelectedTypes(prev =>
                            e.target.checked
                              ? [...prev, type.toLowerCase()]
                              : prev.filter(t => t !== type.toLowerCase())
                          );
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-brand-dark rounded bg-white
                peer-checked:bg-brand-dark peer-checked:border-brand-dark" />
                      <span className="text-sm font-medium text-gray-700">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="border-t-2 border-gray-100 pt-4">
                  <h4 className="font-bold text-sm mb-2">Subreddits</h4>
                  {SUBREDDITS.map(sub => (
                    <label key={sub} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"      
                        className="sr-only peer"                  
                        onChange={(e) => {
                          setSelectedSubs(prev =>
                            e.target.checked
                              ? [...prev, sub]
                              : prev.filter(s => s !== sub)
                          );
                        }}
                      />
                      <div className="w-5 h-5 border-2 border-brand-dark rounded bg-white
                peer-checked:bg-brand-dark peer-checked:border-brand-dark" />
                      <span className="text-sm font-medium text-gray-700">
                        {sub}
                      </span>
                    </label>
                  ))}
                </div>
              </Card>              

                <div className="mt-auto">
                <div className="rounded-xl border-2 border-brand-dark bg-yellow-100 p-4 shadow-brutal-sm">
                    <p className="text-xs font-bold text-brand-dark mb-2">Help me improve this!</p>
                    <p className="text-xs font-medium text-gray-700 mb-2">join waitlist for pro features including AI</p>
                    <button className="w-full rounded border-2 border-brand-dark bg-white py-1 text-xs font-black shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform" onClick={()=>redirect('/payment')}>
                        join waitlist
                    </button>
                </div>

            </div>

            </div>
          </aside>

          {/* Main Feed */}
          <div className="flex-1">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-black text-brand-dark">Latest Jobs</h1>

              <div className="flex w-full sm:w-auto gap-2">
                <input
                  type="text"
                  placeholder="Search via keyword..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full sm:w-80 px-4 py-2 border-2 border-brand-dark rounded-lg"
                />
                <Button variant="secondary">Search</Button>
              </div>
            </div>

            <RealtimeJobs onNewJob={onNewJob} />

            <div className="grid grid-cols-1 gap-6"> 
              {filteredJobs.map(job => ( //using filteredjobs is causing the filtering to work
                <JobCard key={job.id} job={job} />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              {hasMore && (
                <Button
                  variant="outline"
                  disabled={loadingMore}
                  onClick={loadMoreJobs}
                >
                  {loadingMore ? "Loading..." : "Load More Jobs"}
                </Button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
