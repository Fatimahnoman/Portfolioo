"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const highlights = [
  {
    title: "Physical AI Hackathon",
    role: "AI Agent Developer",
    description: "Built a RAG-based chatbot for an AI-powered textbook that handled complex robotics queries with multi-source retrieval and context-aware responses.",
    tags: ["OpenAI SDK", "RAG", "Python"],
    achievement: "Top 10 Finalist",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
    color: "from-amber-500/20 to-yellow-500/20",
  },
  {
    title: "AI Solutions Showcase",
    role: "Full-Stack + AI",
    description: "Presented StudiesHelper — an autonomous AI agent that helps students study smarter using multi-agent orchestration, tool design, and guardrails.",
    tags: ["Multi-Agent", "Next.js", "TypeScript"],
    achievement: "Best AI Project",
    icon: "M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    title: "Community Impact",
    role: "Open Source Contributor",
    description: "25+ GitHub repos shared with the developer community. Projects range from AI agents to full-stack web apps, all with clean documentation.",
    tags: ["GitHub", "Documentation", "Open Source"],
    achievement: "25+ Repositories",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
    color: "from-amber-500/15 to-yellow-500/15",
  },
  {
    title: "Hackathon Speed Build",
    role: "Solo Developer",
    description: "Designed and deployed production-ready apps within tight deadlines — from concept to Vercel deployment, handling architecture, AI logic, and UI.",
    tags: ["Vercel", "Docker", "CI/CD"],
    achievement: "3+ Events Completed",
    icon: "M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z",
    color: "from-yellow-500/15 to-amber-500/15",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % highlights.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Hackathon{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400">
              Highlights
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Real projects, real deadlines, real results.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* Card */}
        <div className="relative min-h-[320px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-[#111118] border border-white/[0.06] rounded-2xl p-7 sm:p-9 md:p-10 text-center hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              {/* Icon */}
              <div className="mb-4 flex justify-center">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${highlights[current].color} border border-white/[0.08] flex items-center justify-center`}>
                  <svg className="w-7 h-7 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={highlights[current].icon} />
                  </svg>
                </div>
              </div>

              {/* Achievement badge */}
              <div className="mb-4">
                <span className="px-3 py-1 rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20 uppercase tracking-wider">
                  {highlights[current].achievement}
                </span>
              </div>

              {/* Title + Role */}
              <h3 className="text-white font-bold text-lg sm:text-xl mb-1">{highlights[current].title}</h3>
              <p className="text-amber-400/70 text-sm font-medium mb-4">{highlights[current].role}</p>

              {/* Description */}
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-5 max-w-2xl mx-auto">
                {highlights[current].description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {highlights[current].tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-gray-400 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {highlights.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === current
                  ? "bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 w-7"
                  : "bg-white/10 hover:bg-white/20 w-2"
              }`}
              aria-label={`Go to highlight ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
