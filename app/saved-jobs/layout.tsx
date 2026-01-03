import { DashboardSidebar } from "@/components/DashboardSidebar";
import { SavedJobsProvider } from "../savedJobsContext";

export default function SavedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SavedJobsProvider>
            <div className="flex min-h-screen bg-brand-cream font-sans">
                <DashboardSidebar />
                <div className="flex-1 flex flex-col min-h-screen">
                    {/* Mobile Header Placeholder */}
                    <div className="md:hidden flex items-center justify-between p-4 border-b-2 border-brand-dark bg-white">
                        <span className="font-black text-xl">jobddit.</span>
                        <button className="text-sm font-bold underline">Menu</button>
                    </div>
                    <main className="flex-1 p-4 md:p-8 overflow-y-auto h-screen">{children}</main>
                </div>
            </div>
        </SavedJobsProvider>
    );
}
