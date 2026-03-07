"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Image as ImageIcon, Star, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, highlighted: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch quick stats from Supabase
    const fetchStats = async () => {
      const { data, error } = await supabase.from("projects").select("is_highlight");
      if (!error && data) {
        setStats({
          total: data.length,
          highlighted: data.filter(p => p.is_highlight).length
        });
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, Basith! 👋</h1>
        <p className="text-brand-muted">Here is an overview of your portfolio.</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-brand-accent/20 flex items-center justify-center">
            <ImageIcon className="w-6 h-6 text-brand-accent" />
          </div>
          <div>
            <p className="text-brand-muted text-sm font-medium">Total Artworks</p>
            <h3 className="text-3xl font-bold text-white">{loading ? "-" : stats.total}</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center">
            <Star className="w-6 h-6 text-brand-orange" />
          </div>
          <div>
            <p className="text-brand-muted text-sm font-medium">Highlighted Works</p>
            <h3 className="text-3xl font-bold text-white">{loading ? "-" : stats.highlighted}</h3>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-brand-muted text-sm font-medium">System Status</p>
            <h3 className="text-xl font-bold text-white">Online</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
}