"use client";
import React from "react";
import { motion } from "framer-motion";

const skill = [
  {
    category: "Python & OOP",
    icon: "M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5",
    items: ["Data Structures & Algorithms", "OOP Design Patterns", "Async Programming", "Type Hints & Testing"],
    color: "from-emerald-500 to-green-400",
    colorText: "text-emerald-400",
    colorBg: "bg-emerald-500/10",
    colorBorder: "border-emerald-500/20",
    colorGlow: "from-emerald-500/10",
  },
  {
    category: "Agentic AI",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
    items: ["OpenAI Agents SDK", "Multi-Agent Orchestration", "RAG & Vector Search", "Tool Design & Guardrails"],
    color: "from-purple-500 to-purple-400",
    colorText: "text-purple-400",
    colorBg: "bg-purple-500/10",
    colorBorder: "border-purple-500/20",
    colorGlow: "from-purple-500/10",
  },
  {
    category: "Full-Stack & Web",
    icon: "M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z",
    items: ["Next.js & React", "TypeScript & Tailwind", "REST API & Node.js", "Docker & Vercel"],
    color: "from-blue-500 to-cyan-400",
    colorText: "text-blue-400",
    colorBg: "bg-blue-500/10",
    colorBorder: "border-blue-500/20",
    colorGlow: "from-blue-500/10",
  },
];

const techIcons = [
  { name: "Python", color: "#3776AB" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Node.js", color: "#339933" },
  { name: "Docker", color: "#2496ED" },
  { name: "OpenAI", color: "#10A37F" },
  { name: "Git", color: "#F05032" },
  { name: "Vercel", color: "#ffffff" },
  { name: "Streamlit", color: "#FF4B4B" },
  { name: "Pandas", color: "#150458" },
  { name: "Gemini", color: "#4285F4" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "LangChain", color: "#1C3C3C" },
  { name: "Framer Motion", color: "#BB4BFF" },
];

const TechMarqueeRow = ({ items, direction }: { items: typeof techIcons; direction: "left" | "right" }) => {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden mb-3">
      <div className={`flex gap-3 w-max ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}>
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#111118] border border-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group whitespace-nowrap"
          >
            <div
              className="w-2.5 h-2.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors font-medium">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const Skill = () => {
  return (
    <section id="skill" className="relative min-h-screen bg-[#0a0a0f] text-white py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">
              Skills
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            A curated set of technologies and tools I use to bring ideas to life.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-purple-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-violet-500/50" />
          </div>
        </motion.div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {skill.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group relative bg-[#111118] border border-white/[0.06] rounded-2xl p-6 sm:p-7 hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
            >
              {/* Hover glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${group.colorGlow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

              {/* Top accent line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${group.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />

              {/* Icon */}
              <div className="relative mb-5">
                <div className={`w-12 h-12 rounded-xl ${group.colorBg} border ${group.colorBorder} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <svg className={`w-6 h-6 ${group.colorText}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={group.icon} />
                  </svg>
                </div>
              </div>

              {/* Title */}
              <h3 className="relative text-lg sm:text-xl font-bold text-white mb-4">
                {group.category}
              </h3>

              {/* Skills */}
              <ul className="relative space-y-2.5">
                {group.items.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-gray-400 group-hover:text-gray-300 transition-colors">
                    <div className={`w-1.5 h-1.5 rounded-full ${group.colorText.replace("text-", "bg-")} opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
                    <span className="text-sm sm:text-[15px] leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Card number */}
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                <span className="text-[10px] font-mono text-white/[0.08] group-hover:text-white/20 transition-colors">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-white/10" />
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">Tech Stack</p>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
          <TechMarqueeRow items={techIcons.slice(0, 8)} direction="left" />
          <TechMarqueeRow items={techIcons.slice(8)} direction="right" />
        </motion.div>
      </div>
    </section>
  );
};

export default Skill;
