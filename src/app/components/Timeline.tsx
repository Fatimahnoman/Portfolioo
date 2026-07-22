"use client";
import React from "react";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "2024",
    title: "Agentic AI Mastery",
    description: "Mastered OpenAI Agents SDK, built multi-agent systems including StudiesHelper and WellnessOracle agents.",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    side: "left" as const,
  },
  {
    year: "2024",
    title: "Full-Stack Development",
    description: "Built 10+ web applications using Next.js, React, TypeScript, and Tailwind CSS. Deployed on Vercel.",
    icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
    side: "right" as const,
  },
  {
    year: "2023",
    title: "Python & OOP Deep Dive",
    description: "Mastered advanced Python patterns, data structures, OOP principles, and CLI application development.",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    side: "left" as const,
  },
  {
    year: "2022",
    title: "Web Development Journey",
    description: "Began building web projects — from HTML/CSS games to responsive landing pages and e-commerce platforms.",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    side: "right" as const,
  },
];

const Timeline = () => {
  return (
    <section id="timeline" className="relative bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-[350px] h-[350px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[350px] h-[350px] bg-yellow-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
              Journey
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            A timeline of the milestones that shaped my technical journey.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-5 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-amber-500/40 via-yellow-500/40 to-amber-500/40" />

          {timelineData.map((item, index) => {
            const isLeft = item.side === "left";
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className={`relative flex items-start mb-10 sm:mb-14 ${
                  isLeft ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot with glow */}
                <div className="absolute left-5 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className="relative">
                    <div className="absolute inset-0 w-5 h-5 rounded-full bg-amber-500/20 blur-md" />
                    <div className="relative w-3 h-3 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 border-2 border-[#0a0a0f] mt-1.5 ml-1" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                    isLeft ? "md:pr-10 md:text-right" : "md:pl-10"
                  }`}
                >
                  <div className="group relative bg-[#111118] border border-white/[0.06] rounded-2xl p-5 sm:p-6 hover:border-white/[0.12] transition-all duration-500 overflow-hidden">
                    {/* Top accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-500 to-yellow-500 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />

                    <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : ""}`}>
                      <span className="inline-block px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20 font-mono">
                        {item.year}
                      </span>
                    </div>

                    <div className={`flex items-start gap-3 ${isLeft ? "md:flex-row-reverse md:text-right" : ""}`}>
                      <div className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-4.5 h-4.5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-yellow-400 transition-all duration-300">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
