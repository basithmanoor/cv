"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, Variants } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "About", path: "/about" },
  ];

  // Navbar slide-down animation
  const navVariants: Variants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Individual item drop-in animation
  const itemVariants: Variants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 w-full z-50 px-6 md:px-20 lg:px-36 py-4 flex items-center justify-between backdrop-blur-md bg-brand-dark/80 border-b border-white/5"
    >
      {/* Logo Section */}
      <motion.div variants={itemVariants}>
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            className="relative w-10 h-10 overflow-hidden rounded-full border border-white/10 group-hover:border-brand-accent transition-colors"
          >
            <Image
              src="https://ucarecdn.com/34661382-e670-4ef0-9c9c-4932bb89d9ba/IMG_5382.PNG"
              alt="Basith Manoor Logo"
              fill
              sizes="40px"
              className="object-cover"
            />
          </motion.div>
          <span className="font-bold text-lg tracking-wide hidden md:block group-hover:text-brand-accent transition-colors">
            Basith Manoor
          </span>
        </Link>
      </motion.div>

      {/* Navigation Links */}
      <div className="flex items-center gap-6 md:gap-8 font-semibold">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          return (
            <motion.div key={link.name} variants={itemVariants} whileHover={{ y: -2 }}>
              <Link
                href={link.path}
                className={`relative group pb-1 transition-colors duration-300 ${
                  isActive ? "text-brand-orange" : "text-white hover:text-brand-accent"
                }`}
              >
                {link.name}

                {/* Animated Underline Indicator */}
                <span
                  className={`absolute left-0 bottom-0 h-0.5 rounded-full transition-all duration-300 ease-out ${
                    isActive ? "bg-brand-orange w-full" : "bg-brand-accent w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
}