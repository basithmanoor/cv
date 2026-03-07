"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn, Loader2, BookOpen } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { supabase } from "@/lib/supabase";

// Define the Project type updated with external_link
type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  poster_image_url: string;
  is_highlight: boolean;
  external_link?: string;
};

const categories = [
  { id: "all", label: "All Works" },
  { id: "poster", label: "Poster Design" },
  { id: "flyer", label: "Flyer Design" },
  { id: "save", label: "Save the Date" },
  { id: "logo", label: "Logo Design" },
  { id: "magazine", label: "Magazine" },
  { id: "bullet", label: "Bulletin" },
];

export default function WorksPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProjects();
  }, []);

  const filteredWorks = activeFilter === "all" ? projects : projects.filter(work => work.category === activeFilter);

  // Function to handle clicking a project
  const handleProjectClick = (work: Project) => {
    // If it's a magazine/bulletin and it has an external link, open it in a new tab!
    if ((work.category === 'magazine' || work.category === 'bullet') && work.external_link) {
      window.open(work.external_link, "_blank", "noopener,noreferrer");
    } else {
      // Otherwise, open the high-res image modal as usual
      setSelectedImage(work.poster_image_url);
    }
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen px-6 md:px-20 lg:px-36 py-12">

      <motion.div variants={headerVariants} initial="hidden" animate="visible" className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio</h1>
        <p className="text-brand-muted max-w-2xl mx-auto">Explore my collection of visual designs, from branding and logos to complex magazine layouts and event posters.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap justify-center gap-3 mb-16">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2.5 rounded-full font-medium text-sm transition-colors duration-300 border relative overflow-hidden ${
              activeFilter === category.id
                ? "text-black border-transparent shadow-[0_4px_14px_0_rgba(255,159,42,0.39)]"
                : "bg-brand-surface border-white/10 text-white hover:border-brand-accent hover:text-brand-accent"
            }`}
          >
            {activeFilter === category.id && (
              <motion.div layoutId="activeFilterBg" className="absolute inset-0 bg-brand-orange -z-10" transition={{ type: "spring", stiffness: 500, damping: 30 }} />
            )}
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
        </div>
      ) : (
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence mode="popLayout">
            {filteredWorks.map((work) => {
              // Determine if this item should link out rather than pop up
              const isReadType = (work.category === 'magazine' || work.category === 'bullet') && work.external_link;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  key={work.id}
                  className="break-inside-avoid relative group cursor-pointer rounded-xl overflow-hidden border border-white/10 bg-brand-surface"
                  onClick={() => handleProjectClick(work)}
                >
                  <Image src={work.poster_image_url} alt={work.title} width={800} height={1000} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">

                    {/* Dynamic Icon based on type */}
                    {isReadType ? (
                      <div className="absolute top-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-2 bg-brand-orange/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
                        <span className="text-xs font-bold text-black uppercase">Read</span>
                        <BookOpen className="w-4 h-4 text-black" />
                      </div>
                    ) : (
                      <ZoomIn className="absolute top-4 right-4 text-white w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
                    )}

                    <span className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {categories.find(c => c.id === work.category)?.label || work.category}
                    </span>
                    <h3 className="text-xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      {work.title}
                    </h3>
                    {work.description && (
                      <p className="text-gray-300 text-sm mt-2 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                        {work.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      )}

      {/* High-Res Image Modal (Only triggers if NO external link exists) */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 text-white hover:text-brand-orange bg-white/10 p-2 rounded-full z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-6 h-6" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={selectedImage} alt="Preview" width={1200} height={1200} className="w-auto h-auto max-w-full max-h-[90vh] object-contain rounded-md" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}