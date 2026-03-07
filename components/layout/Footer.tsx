"use client";

import Link from "next/link";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Dynamic year

  // Variants for the overall footer entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15, // Stagger the appearance of icons
      },
    },
  };

  // Variants for individual social icons pop-in
  const iconVariants: Variants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  };

  return (
    <motion.footer
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }} // Animates when 50% of the footer is in view
      className="w-full flex flex-col items-center justify-center py-12 mt-10 border-t border-white/10 bg-brand-surface/30"
    >

      <div className="flex items-center gap-8 mb-6">
        <motion.div
          variants={iconVariants}
          whileHover={{ y: -8, scale: 1.15 }} // Bouncy physical lift on hover
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="https://www.facebook.com/abdulbasithpv.manoor.7?mibextid=LQQJ4d"
            target="_blank"
            className="text-white hover:text-brand-orange transition-colors duration-300 block"
          >
            <Facebook className="w-8 h-8" />
          </Link>
        </motion.div>

        <motion.div
          variants={iconVariants}
          whileHover={{ y: -8, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="https://www.instagram.com/digiassist_hub?igsh=OGd1eGMxanp6ZmUy&utm_source=qr"
            target="_blank"
            className="text-white hover:text-brand-orange transition-colors duration-300 block"
          >
            <Instagram className="w-8 h-8" />
          </Link>
        </motion.div>

        <motion.div
          variants={iconVariants}
          whileHover={{ y: -8, scale: 1.15 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link
            href="https://www.linkedin.com/in/basith-manoor-10150b261?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
            target="_blank"
            className="text-white hover:text-brand-orange transition-colors duration-300 block"
          >
            <Linkedin className="w-8 h-8" />
          </Link>
        </motion.div>
      </div>

      <motion.p
        variants={iconVariants}
        className="text-brand-muted text-sm font-medium"
      >
        Copyright ©{currentYear}, All rights reserved.
      </motion.p>
    </motion.footer>
  );
}