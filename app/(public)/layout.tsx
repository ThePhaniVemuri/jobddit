import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";


export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (        
        <div className="flex min-h-screen flex-col font-sans">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>        
    );
}
