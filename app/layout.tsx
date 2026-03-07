import type { Metadata, Viewport } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

// Optimize font loading
const heebo = Heebo({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-heebo',
});

export const viewport: Viewport = {
  themeColor: "#161b21", // Dark slate color for a premium feel
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// NEW: Added PWA manifest and Apple Web App meta tags
export const metadata: Metadata = {
  metadataBase: new URL("https://basithmanoorcv.vercel.app"),
  title: "Basith Manoor | Graphic Designer",
  description: "Portfolio of Basith Manoor, a skilled graphic designer specializing in branding, digital art, and visual storytelling. Explore my work and contact me for collaborations.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "BasithCV",
  },
  openGraph: {
    title: "Basith Manoor | Graphic Designer",
    description: "Portfolio of Basith Manoor, a skilled graphic designer specializing in branding, digital art, and visual storytelling. Explore my work and contact me for collaborations.",
    url: "https://basithmanoorcv.vercel.app",
    siteName: "BasithCV",
    images: [
      {
        url: "/web-app-manifest-512x512.png", // Using the icon we know is in your public folder
        width: 512,
        height: 512,
        alt: "Manor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  applicationName: "BasithCV",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${heebo.variable} font-heebo bg-brand-dark text-white antialiased flex flex-col min-h-screen`}>
        {/* We removed the Navbar and Footer from here! */}
        {children}
      </body>
    </html>
  );
}