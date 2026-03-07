"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { motion, Variants } from "framer-motion";
import ProjectCard from "../portfolio/ProjectCard";
import { supabase } from "@/lib/supabase";

// Define the Project type
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  poster_image_url: string;
  is_highlight: boolean;
};

// Fallback data just in case your database is empty during setup
const fallbackProjects = [
  {
    id: "1",
    title: "MSF Thavanur",
    description: "MSF Thavanur Constituency Committee across 3000 membership",
    poster_image_url: "https://ucarecdn.com/22ccbfbe-e2f7-4772-9d2b-48f6528429e3/-/preview/800x1000/",
    category: "poster",
    is_highlight: true
  },
  {
    id: "2",
    title: "MYL Thavanur",
    description: "MYL Thavanur Leader's special meet @ league house aliyathur",
    poster_image_url: "https://ucarecdn.com/95677744-8771-40bb-b524-3a6f7e35f246/-/preview/837x1000/",
    category: "poster",
    is_highlight: true
  },
  {
    id: "3",
    title: "UDYF Thavanur",
    description: "UDYF Thavanur Constituency Yuvajana Sangamam @ Royal palace auditorium",
    poster_image_url: "https://ucarecdn.com/e882ae40-74c7-48b0-8c79-11a41b2fb674/-/preview/800x1000/",
    category: "poster",
    is_highlight: true
  }
];

export default function FeaturedWorks() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch highlighted projects from Supabase
  useEffect(() => {
    const fetchHighlightedProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_highlight", true)
          .order("created_at", { ascending: false })
          .limit(3); // Limits to 3 items for a perfect row

        if (error) throw error;

        // If we have data, use it. If the database is completely empty, use the fallback data temporarily.
        setProjects(data && data.length > 0 ? data : fallbackProjects);
      } catch (error) {
        console.error("Error fetching highlighted projects:", error);
        setProjects(fallbackProjects); // Use fallback on error
      } finally {
        setLoading(false);
      }
    };

    fetchHighlightedProjects();
  }, []);

  // Container variants for staggering the project cards
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each card appearing
      },
    },
  };

  // Item variants for the individual project cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    },
  };

  return (
    <section id="feature" className="px-6 md:px-20 lg:px-36 py-20 overflow-hidden">

      {/* Animated Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        className="flex items-end justify-between mb-12 border-b border-white/10 pb-6"
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Works</h2>
          <p className="text-brand-muted mt-2">A selection of my best design projects.</p>
        </div>

        <Link
          href="/works"
          className="hidden md:flex items-center gap-1 text-brand-orange hover:text-brand-accent transition-colors font-semibold"
        >
          View Portfolio <ArrowUpRight className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Loading State or Modern CSS Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ProjectCard
                title={project.title}
                description={project.description || ""}
                imageUrl={project.poster_image_url}
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Animated Mobile View All Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="mt-10 md:hidden flex justify-center"
      >
        <Link
          href="/works"
          className="px-6 py-3 border border-brand-orange text-brand-orange rounded-lg hover:bg-brand-orange hover:text-black transition-all font-semibold flex items-center gap-2"
        >
          View Portfolio <ArrowUpRight className="w-4 h-4" />
        </Link>
      </motion.div>

    </section>
  );
}