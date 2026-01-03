"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { create } from "domain";
import { createClient } from "@/libs/supabase/client";

export default function PricingPage() {
    async function buyPremium() {
        const res = await fetch("/api/payments/checkout", {
            method: "POST",
        });
        const data = await res.json();
        window.location.href = data.checkoutUrl;
    }


    const supabase = createClient();    
    const handleClick = async () => {
        const { data: { session }} = await supabase.auth.getSession();
        if (!session) {
            // User is not logged in, redirect to login page
            window.location.href = '/login';
            return;
        }
        else{
            buyPremium();
        }   
    }
        
  return (        
    <>
    <Navbar />
    <div className="w-full bg-brand-cream border-t-2 border-brand-dark">        
      <div className="mx-auto max-w-6xl px-4 py-24">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-brand-dark">
            Simple, honest pricing.
          </h1>
          <p className="mt-4 text-xl text-gray-700 font-medium">
            No subscriptions. Pay once. Early access forever.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* FREE PLAN */}
          <Card className="bg-white border-2 border-brand-dark p-8 flex flex-col">
            <h2 className="text-2xl font-black text-brand-dark mb-2">
              Free
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              Try the core experience.
            </p>

            <div className="text-4xl font-black text-brand-dark mb-8">
              $0
            </div>

            <ul className="space-y-4 text-sm font-medium text-gray-700 mb-10">
              <li>✅ Fixed subreddit fetch</li>
              <li>✅ New jobs a few times per day</li>
              <li>✅ Basic filters</li>
            </ul>

            <Link href="/jobs" className="mt-auto">
              <Button variant="outline" size="lg" className="w-full">
                Start Free
              </Button>
            </Link>
          </Card>

          {/* PAID PLAN */}
          <Card className="bg-yellow-300 border-4 border-brand-dark p-8 flex flex-col shadow-brutal">
            <div className="mb-3 inline-block rounded-full border-2 border-brand-dark bg-white px-4 py-1 text-xs font-black uppercase">
              Early Access to all these features!
            </div>

            <h2 className="text-2xl font-black text-brand-dark mb-2">
              Pro (One-time)
            </h2>
            <p className="text-gray-800 font-medium mb-6">
              Built for serious job hunters.
            </p>

            <div className="text-4xl font-black text-brand-dark mb-2">
              $3
            </div>
            <p className="text-sm font-bold text-gray-700 mb-8">
              One-time payment • Lifetime access
            </p>

            <ul className="space-y-4 text-sm font-medium text-gray-800 mb-10">
              <li>🔥 Everything in Free</li>
              <li>🤖 AI-powered job filtering</li>
              <li>🧠 Your own subreddit list</li>
              <li>🔔 Instant job alerts</li>
              <li>✍️ Personalized messages to founders</li>
            </ul>

            <Button size="lg" className="mt-auto w-full" onClick={handleClick}>
              Unlock Pro for $3
            </Button>
          </Card>
        </div>
      </div>
    </div>
    </>
  );
}
