import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createClient } from '@/libs/supabase/server';

export default function LandingPage() {

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            <section className="relative w-full border-b-2 border-brand-dark bg-brand-cream overflow-hidden">
                {/* Abstract decorative shapes */}
                <div className="absolute top-20 -right-12.5 h-64 w-64 rounded-full border-4 border-brand-dark bg-yellow-400 shadow-brutal hidden lg:block animate-pulse" style={{ animationDuration: '3s' }}></div>
                <div className="absolute -bottom-5 -left-5 h-32 w-32 rotate-12 border-4 border-brand-dark bg-purple-400 shadow-brutal hidden lg:block"></div>

                <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8 lg:pt-14 lg:pb-32 flex flex-col items-center text-center relative z-10">
                    <div className="mb-6 inline-flex items-center rounded-full border-2 border-brand-dark bg-yellow-300 px-4 py-1.5 shadow-brutal-sm">
                        <span className="text-sm font-black uppercase tracking-wide text-brand-dark">V1 Release</span>
                    </div>
                    <h1 className="mb-8 text-5xl font-black uppercase tracking-tight text-brand-dark md:text-7xl max-w-4xl">
                        Find <span className="text-brand-orange underline decoration-wavy underline-offset-4 decoration-4">Real Jobs</span> from Reddit, Faster.
                    </h1>
                    <p className="mb-10 max-w-2xl text-xl font-medium text-gray-700 md:text-2xl">
                        Stop scrolling through endless subreddits. We curate the best hidden gigs, freelance contracts, and full-time roles into one clean feed.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link href="/jobs">
                            <Button size="lg" className="w-full sm:w-auto">Start Browsing</Button>
                        </Link>
                        <Link href="/dashboard">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto">View Dashboard Demo</Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Why This Exists */}
            <section className="relative w-full border-b-2 border-brand-dark bg-white py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-black text-brand-dark md:text-5xl">Why Jobddit?</h2>
                        <p className="mt-4 text-xl text-gray-600">Reddit is a goldmine, but searching it sucks.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card hoverEffect className="bg-blue-100">
                            <div className="mb-4 text-4xl">🔍</div>
                            <h3 className="mb-2 text-2xl font-bold text-brand-dark">Curated Feed</h3>
                            <p className="font-medium text-gray-700">We filter out spam, scams, and low-quality posts so you only see high-value opportunities.</p>
                        </Card>
                        <Card hoverEffect className="bg-pink-100">
                            <div className="mb-4 text-4xl">🚀</div>
                            <h3 className="mb-2 text-2xl font-bold text-brand-dark">Direct Access</h3>
                            <p className="font-medium text-gray-700">Skip the ATS. DM founders and hiring managers directly on Reddit for faster replies.</p>
                        </Card>
                        <Card hoverEffect className="bg-green-100">
                            <div className="mb-4 text-4xl">🔔</div>
                            <div></div>
                            <h3 className="mb-2 text-2xl font-bold text-brand-dark">Instant Alerts 🔒</h3>
                            <p className="font-medium text-gray-700">Get notified the second a relevant job is posted in any of the top 50+ career subreddits.</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* How it Works / Steps */}
            <section className="bg-brand-orange py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
                        <div>
                            <h2 className="mb-6 text-4xl font-black text-white md:text-6xl">Easy as 1, 2, 3.</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark bg-white font-black text-brand-dark shadow-brutal-sm">1</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Select your skills</h3>
                                        <p className="font-medium text-white/90">Tell us if you are a dev, designer, or writer.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark bg-white font-black text-brand-dark shadow-brutal-sm">2</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Browse the feed</h3>
                                        <p className="font-medium text-white/90">See a live stream of new posts from r/forhire, r/jobbit, and more.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brand-dark bg-white font-black text-brand-dark shadow-brutal-sm">3</div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Apply directly</h3>
                                        <p className="font-medium text-white/90">Click "View on Reddit" and message the OP immediately.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <Card className="rotate-3 transform bg-white p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                                    <div>
                                        <div className="h-4 w-32 bg-gray-200 rounded"></div>
                                        <div className="h-3 w-20 bg-gray-100 rounded mt-1"></div>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-gray-100 rounded mb-2"></div>
                                <div className="h-4 w-3/4 bg-gray-100 rounded mb-6"></div>
                                <div className="flex gap-2">
                                    <div className="h-8 w-24 bg-brand-orange rounded border-2 border-brand-dark"></div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-brand-cream py-24 border-b-2 border-brand-dark">
                <div className="mx-auto max-w-4xl px-4 text-center">
                    <h2 className="mb-8 text-4xl font-black text-brand-dark">Ready to find your next gig?</h2>
                    <Link href="/jobs">
                        <Button size="lg" className="text-xl px-12 py-6">Get Started Now</Button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
