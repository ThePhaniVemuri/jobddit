import Link from 'next/link';

export function DashboardSidebar() {
    const links = [
        { label: 'Browse Jobs', href: '/jobs', active: false, prem: false },
        { label: 'Saved', href: '/saved-jobs', active: false, prem: false },
        { label: 'Alerts', href: '#', active: false, prem: true },
        { label: 'Settings', href: '#', active: false, prem: true },
    ];

    return (
        <aside className="w-64 border-r-2 border-brand-dark bg-white min-h-screen p-6 hidden md:flex flex-col">
            <div className="mb-10">
                <Link href="/" className="flex items-center gap-1">
                    <span className="text-2xl font-black tracking-tight text-brand-dark">
                        jobddit<span className="text-brand-orange">.</span>
                    </span>
                </Link>
            </div>

            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}                        
                        className={`block rounded-lg px-4 py-2 text-sm font-bold transition-all border-2 ${link.active
                                ? 'bg-brand-orange text-white border-brand-dark shadow-brutal-sm'
                                : 'bg-transparent text-gray-600 border-transparent hover:bg-gray-100 hover:border-brand-dark'
                            }`}                        
                    >
                        {link.label}
                        {link.prem ? <>🔒</> : <></>}
                    </Link>
                ))}
            </nav>

            <div className="mt-auto">
                <div className="rounded-xl border-2 border-brand-dark bg-yellow-100 p-4 shadow-brutal-sm">
                    <p className="text-xs font-bold text-brand-dark mb-2">Pro Plan</p>
                    <p className="text-xs font-medium text-gray-700 mb-2">Get instant alerts and unlimited searches.</p>
                    <button className="w-full rounded border-2 border-brand-dark bg-white py-1 text-xs font-black shadow-sm hover:translate-x-1 hover:translate-y-1 transition-transform">
                        Upgrade
                    </button>
                </div>
            </div>
        </aside>
    );
}
