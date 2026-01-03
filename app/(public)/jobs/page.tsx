import { createClient } from '@/libs/supabase/server';
import { redirect } from 'next/navigation';
import JobsClient from './jobs-client';

export default async function JobsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('is_flagged', false)
    .order('created_utc', { ascending: false })
    .limit(50);

  return (
    <JobsClient initialJobs={jobs ?? []} />
  );
}
