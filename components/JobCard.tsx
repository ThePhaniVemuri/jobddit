"use client";

import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Job } from '@/libs/reddit/steady-api-reddit';
import { redirect } from 'next/navigation';
import { createClient } from '@/libs/supabase/client';
import { useEffect, useState } from 'react';
import { useSavedJobs } from '@/app/savedJobsContext';
import { SavedJobRow } from '@/app/dashboard/page';

// Type definition (can be moved to a types file)

export function JobCard({ job }: { job: Job }) {
    const [appliedjobs, setAppliedJobs] = useState<Job[]>([])     
    const supabase = createClient();           

    async function saveJob(jobId: string) {        
        const { data: { session }} = await supabase.auth.getSession();

        const { error } = await supabase
            .from("saved_jobs")
            .insert({
                job_id: jobId,
                user_id: session?.user.id,            
            });

        if (error) {
            // Ignore duplicate saves (unique constraint)
            if (error.code !== "23505") {
            console.error(error);
            }        
        }
    }    

    async function applyJob(jobId: string, note: string = " ") {        
        const { data: { session }} = await supabase.auth.getSession();

        const { error } = await supabase
            .from("applied_jobs")
            .insert({
                job_id: jobId,
                user_id: session?.user.id,
                notes: note || ""
            });

        if (error) {
            // Ignore duplicate saves (unique constraint)
            if (error.code !== "23505") {
            console.error(error);
            }        
        }
    }

    const getAppliedJobs = async () => {
        const { data: appliedjobs } = await supabase
          .from("applied_jobs")
          .select(`
            job:jobs (*)
          `)
          .order("applied_at", { ascending: false })
          .returns<SavedJobRow[]>();
    
        const appliedJobs = 
            appliedjobs?.map((row) => row.job).filter((job): job is Job => job !== null) ?? [];        
        // setnoAppliedJobs(appliedJobs.length)
    }

    useEffect(() => {
        getAppliedJobs();
    }, []);

    const { savedJobs, setSavedJobs } = useSavedJobs();           

    const handleSave = async () => {
        await saveJob(job.id);
        setSavedJobs(prev => [...prev, job])   // your save function        
    }; 
    
    const handleApply = async () => {
        await applyJob(job.id)
        setAppliedJobs(prev => [...prev, job]);
    }

    return (
        <Card hoverEffect className="flex flex-col gap-4 h-full">
            <div className="flex justify-between items-start">
        <div>
            <h3 className="text-xl font-black text-brand-dark leading-tight">
            {job.title}
            </h3>
            <p className="text-sm font-bold text-gray-500 mt-1">
            {job.subreddit} • {new Date(job.created_utc * 1000).toUTCString()}
            </p>
        </div>

        {/* Buttons container */}
        <div className="flex gap-2">
            {savedJobs.some(j => j.id === job.id) ? (
            <Button variant="outline" size="sm" disabled>
                Saved
            </Button>
            ) : (
            <Button variant="outline" size="sm" onClick={handleSave}>
                Save
            </Button>
            )}

            {appliedjobs.some(j => j.id === job.id) ? (
            <Button variant="outline" size="sm" disabled>
                Applied
            </Button>
            ) : (
            <Button variant="outline" size="sm" onClick={handleApply}>
                Mark as Applied
            </Button>
            )}
        </div>
        </div>

            <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-gray-100 border border-brand-dark rounded text-xs font-bold">Scam score: {job.scam_score || "0"}</span>
                <span className="px-2 py-1 bg-green-100 border border-brand-dark rounded text-xs font-bold text-green-800">{}</span>
                {/* {job.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-brand-cream border border-brand-dark rounded text-xs font-medium text-gray-600">
                        #{tag}
                    </span>
                ))} */}
            </div>

            <p className="text-sm text-gray-700 line-clamp-3 grow font-medium border-l-4 border-gray-200 pl-3 italic">
                "{job.description}"
            </p>

            <div className="grid grid-cols-2 gap-3 mt-auto pt-4">
                <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm" onClick={() => {window.open(job.author_dm_url, "_blank")}}>DM Founder</Button>
                <Button variant="primary" size="sm" className="w-full text-xs sm:text-sm" onClick={() => {window.open(job.post_url, "_blank")}}>View on Reddit</Button>
            </div>
        </Card>
    );
}
