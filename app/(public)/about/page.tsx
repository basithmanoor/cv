"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function AboutPage() {
  // Organizing your experience data
  const experiences = [
    {
      role: "Graphic Designer",
      company: "PMSA Kattilangadi College",
      duration: "2 Years",
      type: "past"
    },
    {
      role: "Staff Member",
      company: "Egate Digital Seva, Edappal",
      duration: "Former",
      type: "past"
    }
  ];

  const currentRoles = [
    {
      role: "Public Relations Officer (PRO)",
      company: "KYHSS School, Athavanad & PTM School, Vettichira"
    },
    {
      role: "Graphic Designer",
      company: "Incare Psychological Wellbeing Center, Malappuram"
    }
  ];

  // The software icons from your HTML
  const softwareStack = [
    { name: "Photoshop", url: "https://ucarecdn.com/4e6bf74c-7ea8-4f6b-a576-025da300376c/ps.png" },
    { name: "Illustrator", url: "https://ucarecdn.com/16b0d1c2-2146-4838-9f25-74d24ca46472/pngwingcom.png" },
    { name: "InDesign", url: "https://ucarecdn.com/f16cad87-edc7-470d-a5b2-8b7cefc5cda3/pngwingcom1.png" },
    { name: "CorelDRAW", url: "https://ucarecdn.com/54d8dfcb-36bc-4bd1-b82b-6e201dadda23/pngwingcom2.png" },
  ];

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-20 lg:px-36 py-12">

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="h-1 bg-brand-orange mx-auto rounded-full"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 flex justify-center lg:sticky lg:top-32"
        >
          <div className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl group">
            <div className="absolute inset-0 bg-brand-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            <Image
              src="https://ucarecdn.com/77bcc905-48cb-4139-90fc-ead7a8be907e/BASITH.png"
              alt="Basith Manoor"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>

        {/* Right Column: Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 flex flex-col gap-10"
        >

          {/* Bio Section */}
          <motion.section variants={sectionVariants}>
            <h2 className="text-3xl font-bold mb-2">I'm Basith Manoor</h2>
            <h3 className="text-xl text-brand-orange font-medium mb-6">Professional Graphic Designer</h3>

            <p className="text-gray-300 leading-relaxed text-lg text-justify mb-8">
              I am a graphic designer specializing in creating eye-catching logos, save-the-dates, and social media posts. I design creative visuals for social platforms, original icons, website assets, apps, and events. With a strong focus on quality graphics, I have successfully completed over <span className="text-brand-accent font-bold">300 projects in the last 4 years</span>. If you have a vision, let's discuss it and bring it to life.
            </p>

            {/* Software Stack */}
            <div className="mb-2">
              <h4 className="text-sm font-bold text-brand-muted uppercase tracking-wider mb-4">Tools of the Trade</h4>
              <div className="flex flex-wrap gap-4">
                {softwareStack.map((software, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className="w-12 h-12 relative bg-white/5 rounded-lg p-2 border border-white/10 hover:border-brand-accent transition-colors"
                    title={software.name}
                  >
                    <Image
                      src={software.url}
                      alt={software.name}
                      fill
                      className="object-contain p-2"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Current Roles Section */}
          <motion.section variants={sectionVariants} className="bg-brand-surface p-8 rounded-2xl border border-white/5">
            <div className="flex items-center gap-3 mb-6">
              <Briefcase className="w-6 h-6 text-brand-accent" />
              <h3 className="text-2xl font-bold">Currently At Work</h3>
            </div>
            <div className="space-y-4">
              {currentRoles.map((role, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-orange mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg text-white">{role.role}</h4>
                    <p className="text-brand-muted">{role.company}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Past Experience Section */}
          <motion.section variants={sectionVariants}>
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-brand-accent" />
              <h3 className="text-2xl font-bold">Past Experience</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="p-5 rounded-xl border border-white/10 bg-white/5 transition-colors cursor-default"
                >
                  <h4 className="font-bold text-lg text-brand-accent">{exp.role}</h4>
                  <p className="text-white text-sm mt-1 mb-3">{exp.company}</p>
                  <span className="inline-block px-3 py-1 bg-brand-dark rounded-full text-xs font-medium text-brand-muted">
                    {exp.duration}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Contact CTA */}
          <motion.section variants={sectionVariants} className="mt-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                href="mailto:basithmanoor6238@gmail.com"
                className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-brand-accent transition-colors shadow-lg"
              >
                <Mail className="w-5 h-5" />
                basithmanoor6238@gmail.com
              </Link>
            </motion.div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  );
}