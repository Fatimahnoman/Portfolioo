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
          <span className="text-sm sm:text-base">Advanced Python & OOP Patterns</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base">Agentic AI & Multi-Agent Systems</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base">API Integration & Full-Stack Development</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-teal-400 mt-1 flex-shrink-0">▹</span>
          <span className="text-sm sm:text-base">Docker, Vercel & Scalable Architectures</span>
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
    <section id="about" className="relative bg-[#0e0e0e] py-16 sm:py-20 px-4 sm:px-6 md:px-10 lg:px-24 text-white overflow-hidden">
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
                I&apos;m <span className="text-white font-semibold">Fatimah Noman</span>, an AI Developer and Automation Specialist dedicated to building intelligent systems that work as hard as you do.
              </p>
              
              <p>
                My technical journey began with mastering <span className="text-indigo-400 font-medium">Python</span>—from core OOP to advanced architectural patterns. This foundation led me into the world of <span className="text-teal-400 font-medium">Agentic AI</span>, where I now design autonomous agents, multi-agent systems, and intelligent solutions that solve real-world problems.
              </p>
              
              <p>
                Currently, I am pursuing a <span className="text-blue-400 font-medium">Bachelor of Business Administration (BBA)</span> to bridge the gap between technical innovation and business strategy. I believe the future of AI lies in its ability to drive efficiency and value within a professional ecosystem.
              </p>
              
              <p className="text-white font-medium">
                I am constantly evolving at the intersection of AI, automation, and management, aiming to deliver intelligent systems that empower innovation.
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
