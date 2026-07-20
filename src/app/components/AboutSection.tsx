"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import { motion } from "framer-motion";

const TAB_DATA = [
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">▹</span>
          <div>
            <span className="text-sm sm:text-base font-semibold text-white">Bachelor of Business Administration (BBA)</span>
            <p className="text-xs sm:text-sm text-gray-400">Pursuing | Bridging AI expertise with business strategy and management.</p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">▹</span>
          <div>
            <span className="text-sm sm:text-base font-semibold text-white">Intermediate in Commerce</span>
            <p className="text-xs sm:text-sm text-gray-400">St. Patrick&apos;s College, Karachi | Accounting, Economics & Business.</p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">▹</span>
          <div>
            <span className="text-sm sm:text-base font-semibold text-white">Matriculation</span>
            <p className="text-xs sm:text-sm text-gray-400">St. Patrick&apos;s Girls High School, Saddar | Strong analytical foundation.</p>
          </div>
        </li>
      </ul>
    ),
  },
  {
    title: "Expertise",
    id: "expertise",
    content: (
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-start gap-2">
          <span className="text-teal-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base"><span className="text-white font-medium">Python & Advanced OOP</span> — Architectural patterns, data structures, and clean, scalable code.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base"><span className="text-white font-medium">Agentic AI & Multi-Agent Systems</span> — Autonomous agents, RAG pipelines, and intelligent orchestration.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base"><span className="text-white font-medium">Full-Stack & API Integration</span> — Next.js, React, TypeScript, RESTful APIs, and end-to-end product development.</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-indigo-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base"><span className="text-white font-medium">DevOps & Deployment</span> — Docker, Vercel, CI/CD pipelines, and cloud-native scalable architectures.</span>
        </li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("education");
  const [, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section id="about" className="relative bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6 md:px-10 lg:px-24 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full filter blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-96 sm:h-96 bg-teal-500/5 rounded-full filter blur-3xl -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-none mx-auto md:mx-0 w-full"
          >
            <div className="relative group">
              {/* Decorative border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-teal-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              
              <Image
                src="/about.webp.png"
                width={500}
                height={500}
                alt="About Fatimah Noman"
                className="relative rounded-2xl shadow-xl shadow-teal-500/10 w-full object-cover"
              />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg shadow-lg text-xs sm:text-sm"
                whileHover={{ scale: 1.05 }}
              >
                <span className="font-semibold">AI Specialist</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Section */}
          <motion.div 
            className="mt-8 md:mt-0 text-left flex flex-col h-full"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 mb-4 sm:mb-6"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            <div className="text-sm sm:text-base md:text-lg text-gray-400 leading-relaxed mb-4 sm:mb-6 space-y-4">
              <p>
                Hey, I&apos;m <span className="text-white font-semibold">Fatimah Noman</span> — an{" "}
                <span className="text-indigo-400 font-medium">AI Developer</span> &{" "}
                <span className="text-teal-400 font-medium">Automation Specialist</span> who thrives
                at the intersection of code, intelligence, and real-world impact.
              </p>

              <p>
                I started by falling in love with <span className="text-indigo-400 font-medium">Python</span> — from writing my first OOP classes to architecting complex systems. That obsession naturally pulled me toward{" "}
                <span className="text-teal-400 font-medium">Agentic AI</span>, where I now build
                autonomous agents and multi-agent systems that don&apos;t just follow instructions — they{" "}
                <span className="text-white font-medium">think, adapt, and solve</span>.
              </p>

              <p>
                Beyond the terminal, I&apos;m pursuing a{" "}
                <span className="text-blue-400 font-medium">Bachelor of Business Administration (BBA)</span>{" "}
                because the best technology is useless without understanding the people and businesses it serves.
                I believe AI&apos;s true power lies in{" "}
                <span className="text-white font-medium">driving efficiency where it matters most</span>.
              </p>

              <p>
                Every day, I&apos;m pushing the boundaries of what&apos;s possible — blending{" "}
                <span className="text-indigo-400 font-medium">AI</span>,{" "}
                <span className="text-teal-400 font-medium">automation</span>, and{" "}
                <span className="text-blue-400 font-medium">strategic thinking</span>{" "}
                to build systems that don&apos;t just work — they{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-400 font-semibold">empower</span>.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-3 sm:gap-4 mt-4 sm:mt-6 flex-wrap">
              <TabButton
                selectTab={() => handleTabChange("education")}
                active={tab === "education"}
              >
                Education
              </TabButton>
              <TabButton
                selectTab={() => handleTabChange("expertise")}
                active={tab === "expertise"}
              >
                Expertise
              </TabButton>
            </div>

            {/* Tab Content */}
            <motion.div 
              className="mt-4 sm:mt-6 text-gray-300 text-sm sm:text-base md:text-lg bg-white/5 p-3 sm:p-4 rounded-lg border border-white/10"
              key={tab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {TAB_DATA.find((t) => t.id === tab)?.content}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
