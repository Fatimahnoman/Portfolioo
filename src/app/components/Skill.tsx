"use client";
import React from "react";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import SpotlightCard from "./SpotlightCard";

type Skill = {
  name: string;
  level: number;
  icon: string;
};

type Category = {
  title: string;
  icon: string;
  blurb: string;
  skills: Skill[];
};

const categories: Category[] = [
  {
    title: "AI & Agents",
    icon: "🤖",
    blurb: "Agentic systems, retrieval and orchestration.",
    skills: [
      { name: "OpenAI Agents SDK", level: 92, icon: "🧠" },
      { name: "Multi-Agent Orchestration", level: 88, icon: "🕸️" },
      { name: "RAG & Vector Search", level: 85, icon: "🔍" },
      { name: "Tool Design & Guardrails", level: 80, icon: "🛡️" },
      { name: "LangChain", level: 82, icon: "⛓️" },
      { name: "LLM Integration", level: 86, icon: "✨" },
    ],
  },
  {
    title: "Languages",
    icon: "🧬",
    blurb: "The languages I build and ship in.",
    skills: [
      { name: "Python", level: 93, icon: "🐍" },
      { name: "JavaScript", level: 91, icon: "🟨" },
      { name: "TypeScript", level: 90, icon: "🟦" },
      { name: "SQL", level: 84, icon: "🗄️" },
    ],
  },
  {
    title: "Fundamentals",
    icon: "🧠",
    blurb: "The theory underneath everything.",
    skills: [
      { name: "Data Structures & Algorithms", level: 86, icon: "📐" },
      { name: "OOP Design Patterns", level: 85, icon: "🧱" },
      { name: "Async Programming", level: 83, icon: "⚡" },
      { name: "Type Hints & Testing", level: 80, icon: "✅" },
    ],
  },
  {
    title: "Frontend & UI",
    icon: "🎨",
    blurb: "Interfaces that feel fast and look deliberate.",
    skills: [
      { name: "Next.js", level: 92, icon: "▲" },
      { name: "React", level: 91, icon: "⚛️" },
      { name: "Tailwind CSS", level: 90, icon: "🎀" },
      { name: "Framer Motion", level: 86, icon: "🎞️" },
      { name: "UI/UX Design", level: 80, icon: "🖌️" },
    ],
  },
  {
    title: "Backend & Cloud",
    icon: "⚙️",
    blurb: "APIs, data layers and shipping to production.",
    skills: [
      { name: "REST API Design", level: 86, icon: "🔌" },
      { name: "Node.js", level: 87, icon: "🟩" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "Docker", level: 80, icon: "🐳" },
      { name: "Vercel & Deployment", level: 88, icon: "▲" },
      { name: "Git & GitHub", level: 90, icon: "🐙" },
    ],
  },
  {
    title: "Data & Automation",
    icon: "📊",
    blurb: "Pipelines, analysis and removing busywork.",
    skills: [
      { name: "Pandas", level: 84, icon: "🐼" },
      { name: "Automation & Scraping", level: 85, icon: "🤖" },
      { name: "Streamlit", level: 82, icon: "🎛️" },
      { name: "Testing & Debugging", level: 82, icon: "🧪" },
    ],
  },
];

const BRAND_GRADIENT = "linear-gradient(90deg, #b026ff, #ff1493)";

const EASE = [0.22, 1, 0.36, 1] as const;

const SkillRow = ({ skill, index }: { skill: Skill; index: number }) => (
  <li className="group/skill flex items-center gap-2.5 sm:gap-4">
    {/* icon */}
    <span
      aria-hidden="true"
      className="w-7 h-7 sm:w-9 sm:h-9 shrink-0 flex items-center justify-center text-sm sm:text-lg rounded-lg bg-white/[0.04] border border-white/[0.07] group-hover/skill:border-[#b026ff]/40 group-hover/skill:bg-[#b026ff]/10 transition-all duration-300"
    >
      {skill.icon}
    </span>

    {/* name — min-w-0 lets it shrink and wrap instead of overflowing the card */}
    <span className="min-w-0 text-[13px] sm:text-[15px] leading-snug text-gray-300 group-hover/skill:text-white transition-colors duration-300">
      {skill.name}
    </span>

    {/* track */}
    <span className="flex-1 h-1.5 min-w-[24px] rounded-full bg-white/[0.06] overflow-hidden relative">
      <motion.span
        className="absolute inset-y-0 left-0 rounded-full"
        style={{
          backgroundImage: BRAND_GRADIENT,
          backgroundSize: "200% 100%",
          animation: "shimmer 2.4s linear infinite",
        }}
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1, delay: 0.08 + index * 0.07, ease: EASE }}
      />
    </span>

    {/* value */}
    <span
      className="w-8 sm:w-9 shrink-0 text-right font-mono text-xs tabular-nums text-transparent bg-clip-text"
      style={{ backgroundImage: BRAND_GRADIENT }}
    >
      {skill.level}
    </span>
  </li>
);

const Skill = () => {
  const total = categories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <section
      id="skill"
      className="relative text-white py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-[#b026ff]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-[#ff1493]/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          index="04"
          label="What I Use"
          titleA="Technical"
          titleB="Expertise"
          subtitle="The tools and disciplines I reach for when turning an idea into something that actually ships."
        />

        {/* Summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-10 sm:mb-14 pb-6 border-b border-white/[0.07]"
        >
          {[
            { value: categories.length, label: "Disciplines" },
            { value: total, label: "Technologies" },
            { value: "24/7", label: "Building" },
          ].map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#b026ff] to-[#ff1493]">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Category cards — 3 columns, matching the ProjectSection grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-x-8 lg:gap-y-12">
          {categories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: catIndex * 0.1, ease: EASE }}
            >
              <SpotlightCard
                glowColor="rgba(176, 38, 255, 0.09)"
                className="h-full rounded-2xl border border-white/[0.07] bg-[#0d0919]/70 backdrop-blur-sm hover:border-[#b026ff]/35 transition-colors duration-500"
              >
                {/* top accent reveal */}
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundImage: BRAND_GRADIENT }}
                />

                <div className="relative p-6 sm:p-7">
                  {/* header */}
                  <div className="flex items-start gap-3.5 mb-6">
                    <span
                      aria-hidden="true"
                      className="w-11 h-11 shrink-0 flex items-center justify-center text-xl rounded-xl bg-[#b026ff]/10 border border-[#b026ff]/20"
                    >
                      {category.icon}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                        {category.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1 leading-relaxed">
                        {category.blurb}
                      </p>
                    </div>
                  </div>

                  {/* skills */}
                  <ul className="space-y-3.5 sm:space-y-4">
                    {category.skills.map((skill, i) => (
                      <SkillRow key={skill.name} skill={skill} index={i} />
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skill;
