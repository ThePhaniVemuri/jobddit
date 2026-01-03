import { createClient } from "@/libs/supabase/client";
import { Job } from "@/libs/reddit/steady-api-reddit";
import { useRef, useEffect } from "react";

export default function RealtimeJobs({
  onNewJob,
}: {
  onNewJob: (job: Job) => void;
}) {
  const supabaseRef = useRef<ReturnType<typeof createClient> | null>(null);

  if (!supabaseRef.current) {
    supabaseRef.current = createClient();
  }

  useEffect(() => {
    const supabase = supabaseRef.current!;

    const channel = supabase
      .channel("jobs-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "jobs" },
        (payload) => {
          onNewJob(payload.new as Job);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [onNewJob]);

  return null;
}
