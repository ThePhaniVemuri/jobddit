"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  SetStateAction,
  Dispatch,
} from "react";
import { Job } from "@/libs/reddit/steady-api-reddit";
import { createClient } from "@/libs/supabase/client";
import { useRouter } from "next/navigation";

type SavedJobsContextType = {
  savedJobs: Job[];
  loading: boolean;
  setSavedJobs: Dispatch<SetStateAction<Job[]>>;
};

type SavedJobRow = {
  job: Job | null;
};

const SavedJobsContext = createContext<SavedJobsContextType | undefined>(
  undefined
);

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSavedJobs = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

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
        return;
      }

      const jobs =
        data
          ?.map((row) => row.job)
          .filter((job): job is Job => job !== null) ?? [];

      setSavedJobs(jobs);
      setLoading(false);
    };

    fetchSavedJobs();
  }, [router]);

  return (
    <SavedJobsContext.Provider value={{ savedJobs, loading, setSavedJobs }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used inside SavedJobsProvider");
  }
  return context;
}