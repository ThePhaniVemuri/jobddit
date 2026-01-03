import Link from 'next/link';
import { Button } from './ui/Button';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b-2 border-brand-dark bg-brand-cream/90 backdrop-blur-sm">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-2xl font-black tracking-tight text-brand-dark">
                            jobddit<span className="text-brand-orange">.</span>
                        </span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-bold text-brand-dark">
                        <Link href="/jobs" className="hover:text-brand-orange transition-colors">
                            Browse Jobs
                        </Link>
                        {/* <Link href="/dashboard" className="hover:text-brand-orange transition-colors">
                            Gigs
                        </Link> */}
                        {/* <Link href="#" className="hover:text-brand-orange transition-colors">
                            Salaries
                        </Link> */}
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    {/* <Link href="/dashboard" className="hidden sm:block font-bold text-brand-dark hover:underline">
                        Log in
                    </Link> */}
                    <Link href="/dashboard">
                        <Button variant="primary" size="sm">
                            To Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
