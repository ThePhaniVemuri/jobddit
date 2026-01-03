"use client";

import { Button } from "@/components/ui/Button";
import { createClient } from "@/libs/supabase/client";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("")

    const supabase = createClient();
    async function signInWithEmail() {
        console.log("function called")
        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                // set this to false if you do not want the user to be automatically signed up
                shouldCreateUser: true,
                emailRedirectTo: 'http://localhost:3000/dashboard',
            },
        })
    }

    async function signInWithGoogle(){
        supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `http://localhost:3000/auth/callback`,
            }
        })
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-brand-cream px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">

                {/* Header */}
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-extrabold text-brand-dark tracking-tight">
                        Welcome!
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Sign in to access your dashboard
                    </p>
                </div>

                {/* Card */}
                <div className="bg-white p-8 border-brutal shadow-brutal">
                    <div className="space-y-6">

                        {/* Google Login */}
                        <div>
                            <Button
                                variant="outline"
                                className="w-full flex items-center justify-center gap-3"
                                onClick={signInWithGoogle}
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24">
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Sign in with Google
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t-2 border-brand-dark opacity-10" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500 font-medium">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* Email Form */}
                        <form className="space-y-6" 
                            onSubmit={
                                (e) => { 
                                    e.preventDefault();    
                                    console.log("email:", email)                                 
                                    signInWithEmail(); 
                                }
                            }>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-bold text-brand-dark"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"                                        
                                        type="email"
                                        autoComplete="email"
                                        required
                                        placeholder="you@example.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="block w-full border-2 border-brand-dark bg-brand-gray px-4 py-3 placeholder-gray-500 focus:border-brand-orange focus:outline-none focus:ring-0 sm:text-sm shadow-[4px_4px_0px_0px_rgba(18,18,18,1)] focus:shadow-[2px_2px_0px_0px_rgba(18,18,18,1)] focus:translate-x-0.5 focus:translate-y-0.5 transition-all duration-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Send Magic Link
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500">
                    By signing in, you agree to our{' '}
                    <a href="#" className="font-medium text-brand-orange hover:text-brand-orange-hover">
                        Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-brand-orange hover:text-brand-orange-hover">
                        Privacy Policy
                    </a>
                </p>
            </div>
        </div>
    );
}
