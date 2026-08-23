"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const learningItems = [
  {
    title: "Agentic AI Systems",
    description: "Building autonomous agents with tool use, guardrails, and multi-agent orchestration using OpenAI's Agents SDK.",
    tag: "AI",
    status: "Active",
    url: "https://github.com/Fatimahnoman",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  },
  {
    title: "Full-Stack with Next.js",
    description: "Modern React patterns, server components, API routes, and production deployment with Vercel and Docker.",
    tag: "Web",
    status: "Active",
    url: "https://github.com/Fatimahnoman",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
  },
  {
    title: "Python Engineering",
    description: "Advanced OOP patterns, async programming, type hints, testing, and building scalable systems.",
    tag: "Backend",
    status: "Core Skill",
    url: "https://github.com/Fatimahnoman",
    icon: "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
  },
  {
    title: "DevOps & Deployment",
    description: "Docker containerization, CI/CD pipelines, Vercel deployments, and cloud-native architecture patterns.",
    tag: "DevOps",
    status: "Active",
    url: "https://github.com/Fatimahnoman",
    icon: "M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z",
  },
];

const WhatIWorkWith = () => {
  return (
    <section className="relative bg-[#070512] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-violet-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          index="08"
          label="Currently Learning"
          titleA="What I"
          titleB="Work With"
          subtitle="Technologies and skills I use to build intelligent systems."
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {learningItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#120e20] border border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:border-violet-500/25 transition-all duration-500 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/15 to-fuchsia-500/15 border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-violet-500/25 transition-colors duration-300">
                  <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tag + Status */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-lg bg-violet-500/10 text-violet-400 text-xs font-medium border border-violet-500/15">
                      {item.tag}
                    </span>
                    <span className="text-gray-600 text-xs font-mono">{item.status}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-2 group-hover:text-violet-300 transition-colors duration-300">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatIWorkWith;
