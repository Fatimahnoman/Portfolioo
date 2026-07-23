"use client";
import React from "react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Why Agentic AI Will Change How We Build Software",
    description: "Exploring autonomous agents, multi-agent orchestration, and why the future of software is self-improving systems that think before they act.",
    tag: "AI",
    readTime: "4 min read",
    date: "2025",
    url: "https://x.com/FatimahBuildsAI",
  },
  {
    title: "From Python Basics to Building AI Agents: My Journey",
    description: "How I went from writing my first OOP class to building multi-agent systems with OpenAI SDK — and what I learned along the way.",
    tag: "Career",
    readTime: "3 min read",
    date: "2025",
    url: "https://github.com/Fatimahnoman",
  },
  {
    title: "5 Things I Wish I Knew Before My First Hackathon",
    description: "Lessons learned from building AI solutions under pressure — from choosing the right tech stack to presenting your work effectively.",
    tag: "Tips",
    readTime: "2 min read",
    date: "2025",
    url: "https://x.com/FatimahBuildsAI",
  },
];

const ArticlesSection = () => {
  return (
    <section className="relative bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/[0.03] rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            Insights{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400">
              & Writing
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Thoughts on AI, development, and the journey so far.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {articles.map((article, i) => (
            <motion.a
              key={i}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative bg-[#111118] border border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:border-amber-500/25 transition-all duration-500 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Tag + Date */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-medium border border-amber-500/15">
                  {article.tag}
                </span>
                <span className="text-gray-600 text-xs font-mono">{article.date}</span>
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base sm:text-lg leading-snug mb-3 group-hover:text-amber-300 transition-colors duration-300">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-5 line-clamp-3">
                {article.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <span className="text-gray-500 text-xs font-mono">{article.readTime}</span>
                <span className="text-amber-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                  Read
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
