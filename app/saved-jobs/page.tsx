"use client";

import { createClient } from "@/libs/supabase/server";
import { redirect } from "next/navigation";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/Button";
import { Job } from "@/libs/reddit/steady-api-reddit";
import { useSavedJobs } from "../savedJobsContext";

export default function SavedJobsPage() {
  const { savedJobs, loading } = useSavedJobs();

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-brand-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-brand-dark">
              Saved Jobs
            </h1>
            <p className="text-gray-600 font-medium mt-1">
              Jobs you’ve bookmarked to revisit later
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"            
          >
            <a href="/jobs">Browse Jobs</a>
          </Button>
        </div>

        {/* Saved Jobs List */}
        {savedJobs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-5xl mb-4">📂</div>
            <p className="font-bold text-brand-dark text-lg">
              No saved jobs yet
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Start saving jobs to see them here.
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-4 text-brand-orange"              
            >
              <a href="/jobs">Browse Jobs</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {savedJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}