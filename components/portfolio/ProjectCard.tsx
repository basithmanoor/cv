"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectCard({ title, description, imageUrl }: ProjectProps) {
  
  // Smooth, slow zoom for the image on hover
  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05, 
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } 
    }
  };

  // Spring physics for the text sliding up slightly
  const textContainerVariants: Variants = {
    initial: { y: 0 },
    hover: { 
      y: -5, 
      transition: { type: "spring", stiffness: 400, damping: 25 } 
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 cursor-pointer w-full group"
      initial="initial"
      whileHover="hover"
      whileTap="hover" // Ensures the hover effect triggers on mobile tap!
    >
      {/* Image Container 
        - Removed the dark overlay
        - Added a permanent sleek shadow that turns into a brand-accent glow on hover
      */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-brand-surface shadow-2xl transition-shadow duration-500 group-hover:shadow-[0_8px_30px_rgba(220,255,23,0.15)]">
        <motion.div variants={imageVariants} className="w-full h-full relative">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* Project Details */}
      <motion.div variants={textContainerVariants}>
        <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-brand-accent">
          {title}
        </h3>
        <p className="text-brand-muted text-sm mt-1 line-clamp-2">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}
