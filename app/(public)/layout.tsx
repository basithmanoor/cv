import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {/* pt-24 pushes the content down so it isn't hidden behind the fixed Navbar */}
      <main className="pt-24 flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
}