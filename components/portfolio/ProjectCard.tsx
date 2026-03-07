"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

interface ProjectProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ProjectCard({ title, description, imageUrl }: ProjectProps) {

  // Smooth, slow zoom for the image
  const imageVariants: Variants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.08,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
    }
  };

  // Fade out the dark overlay to reveal bright image
  const overlayVariants: Variants = {
    initial: { opacity: 0.4 },
    hover: {
      opacity: 0,
      transition: { duration: 0.4 }
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
      className="flex flex-col gap-4 cursor-pointer w-full"
      initial="initial"
      whileHover="hover"
    >
      {/* Image Container with aspect ratio lock */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-brand-surface shadow-lg">
        <motion.div variants={imageVariants} className="w-full h-full relative">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </motion.div>

        {/* Subtle dark overlay that clears on hover */}
        <motion.div
          variants={overlayVariants}
          className="absolute inset-0 bg-black pointer-events-none"
        />
      </div>

      {/* Project Details */}
      <motion.div variants={textContainerVariants}>
        <h3 className="text-xl font-bold text-white transition-colors duration-300 hover:text-brand-accent">
          {title}
        </h3>
        <p className="text-brand-muted text-sm mt-1 line-clamp-2">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}