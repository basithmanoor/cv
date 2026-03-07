"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function Hero() {
  // Animation Variants for staggering children
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  // Blur & Slide up effect for text
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  // Staggered letter variants for the interactive text
  const letterContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.6,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.5 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    },
  };

  // Spring effect for image and button
  const springVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 }
    },
  };

  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 lg:px-36 py-12 md:py-20 gap-12 min-h-[calc(100vh-100px)] overflow-hidden">

      {/* Text Content */}
      <motion.div
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight"
          variants={textVariants}
        >
          <span className="block mb-2 text-white">Hello, I'm</span>
          <span className="block mb-2 text-white">Basith Manoor,</span>

          {/* Interactive Animated Gradient Text */}
          <motion.div
            className="block cursor-pointer mt-2"
            whileHover={{ scale: 1.05, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          >
            <motion.span
              className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-brand-accent via-brand-orange to-brand-accent bg-[length:200%_auto]"
              animate={{
                backgroundPosition: ["0% center", "200% center"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <motion.span variants={letterContainerVariants} initial="hidden" animate="visible" className="flex flex-wrap justify-center md:justify-start">
                {"Graphic Designer".split("").map((char, index) => (
                  <motion.span key={index} variants={letterVariants} className="inline-block">
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.span>
            </motion.span>
          </motion.div>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-gray-400 mb-10 max-w-lg leading-relaxed font-light"
          variants={textVariants}
        >
          "Passionate and versatile graphic designer dedicated to crafting visually compelling solutions that resonate with audiences and exceed client expectations."
        </motion.p>

        <motion.div variants={springVariants}>
          <Link
            href="#feature"
            className="group relative flex items-center gap-2 bg-brand-accent text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-brand-orange transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(255,159,42,0.6)] overflow-hidden"
          >
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>

            <span className="relative z-10">Featured Works</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Profile Image with entrance scaling and floating animation */}
      <motion.div
        className="w-full md:w-1/2 flex justify-center md:justify-end relative"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <div className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px]">

          {/* Decorative Animated Glowing Orbs Behind Image */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-brand-accent/20 blur-[80px] rounded-full"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>

          <motion.div
            className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/30 blur-[60px] rounded-full"
            animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          ></motion.div>

          {/* Main Image with controlled subtle floating effect */}
          <motion.div
            className="relative w-full h-full"
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="https://ucarecdn.com/77bcc905-48cb-4139-90fc-ead7a8be907e/BASITH.png"
              alt="Basith Manoor"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover rounded-full shadow-2xl border border-white/10 relative z-10 backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}