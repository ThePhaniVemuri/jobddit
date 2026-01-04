import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full border-t-2 border-brand-dark bg-white py-12">
            <div className="mx max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-16 md:grid-cols-3">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-xl font-black text-brand-dark">jobddit.</h3>
                        <p className="text-sm font-medium text-gray-500">
                            The #1 place to find hidden gigs and jobs on Reddit. Curated, filtered, and ready for you.
                        </p>
                    </div>

                    {/* <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-dark">Platform</h4>
                        <ul className="space-y-2 text-sm font-medium text-gray-600">
                            <li><Link href="/jobs" className="hover:text-brand-orange">Browse Jobs</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Post a Job</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Success Stories</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Pricing</Link></li>
                        </ul>
                    </div> */}

                    {/* <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-dark">Resources</h4>
                        <ul className="space-y-2 text-sm font-medium text-gray-600">
                            <li><Link href="#" className="hover:text-brand-orange">Blog</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Guides</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Help Center</Link></li>
                        </ul>
                    </div> */}

                    <div>
                        <h4 className="mb-4 text-sm font-black uppercase tracking-wider text-brand-dark">Legal</h4>
                        <ul className="space-y-2 text-sm font-medium text-gray-600">
                            <li><Link href="#" className="hover:text-brand-orange">Privacy</Link></li>
                            <li><Link href="#" className="hover:text-brand-orange">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 flex items-center justify-between border-t-2 border-brand-dark pt-8">
                    <p className="text-sm font-bold text-gray-500">© 2026 Jobddit Inc.</p>
                    <div className="flex gap-4">
                        {/* Social icons placeholder */}
                        <div className="h-6 w-6 rounded-full bg-brand-dark"></div>
                        <div className="h-6 w-6 rounded-full bg-brand-dark"></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
