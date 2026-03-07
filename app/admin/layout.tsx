"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, PlusSquare, LogOut, Loader2, Menu, X } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else if (session && pathname === "/admin/login") {
        router.push("/admin");
      } else {
        setIsAuthenticated(!!session);
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for auth changes (e.g., logging out)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        router.push('/admin/login');
      } else if (session) {
        setIsAuthenticated(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // Close mobile menu when navigating to a new page
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark">
        <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
      </div>
    );
  }

  // If on login page, just render the login page without the sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // Render the Dashboard layout with Sidebar
  return (
    <div className="min-h-screen bg-brand-dark flex">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 w-full bg-brand-surface/90 backdrop-blur-md border-b border-white/10 z-40 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-white">
          Basith<span className="text-brand-orange">Admin</span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white hover:text-brand-orange transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-brand-surface/95 md:bg-brand-surface/50 border-r border-white/10 flex flex-col fixed h-full z-50 transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <div>
            <Link href="/" className="font-bold text-xl text-white hover:text-brand-accent transition-colors">
              Basith<span className="text-brand-orange">Admin</span>
            </Link>
            <p className="text-xs text-brand-muted mt-1">Portfolio Dashboard</p>
          </div>
          <button className="md:hidden text-gray-400 hover:text-white bg-white/5 p-1.5 rounded-md" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-brand-orange text-black font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link 
            href="/admin/posters" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.includes('/admin/posters') ? 'bg-brand-orange text-black font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <ImageIcon className="w-5 h-5" /> Manage Posters
          </Link>
          <Link 
            href="/admin/upload" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin/upload' ? 'bg-brand-orange text-black font-bold' : 'text-gray-300 hover:bg-white/5 hover:text-white'}`}
          >
            <PlusSquare className="w-5 h-5" /> Upload Work
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-4 sm:p-8 pt-24 md:pt-8 min-h-screen max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
