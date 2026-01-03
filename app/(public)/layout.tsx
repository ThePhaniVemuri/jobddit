import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SavedJobsProvider } from "../savedJobsContext";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SavedJobsProvider>
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
        </SavedJobsProvider>
    );
}
