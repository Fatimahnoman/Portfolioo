"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import TerminalModal from "./TerminalModal";

const projectsData = [
  {
    id: 16,
    title: "Blushhaven Shop",
    description: "A luxury beauty and makeup e-commerce platform featuring AI-powered skin quiz, shade finder, routine builder, product comparison, and a premium shopping experience with smooth animations.",
    image: "/Costmectic.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Blushhaven-Shop",
    previewUrl: "https://blushhaven-shop.vercel.app/",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI Tools", "Vercel"],
  },
  {
    id: 1,
    title: "The Embroidery Atelier",
    description: "A premium, fully responsive e-commerce platform dedicated to the art of handcrafted embroidery. Built for elegance and high conversion.",
    image: "/embroidery.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/The-Embroidery-Atelier",
    previewUrl: "https://the-embroidery-atelier.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
  },
  {
    id: 2,
    title: "AI Humanoid Robotics Textbook",
    description: "An AI-powered interactive platform for learning Physical AI and Humanoid Robotics, featuring a RAG-based chatbot for educational support.",
    image: "/Book%20image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Hack01-Physical-AI-Humanoid-Robotics-TextBook-With-Chatbot",
    previewUrl: "https://hack01-physical-ai-humanoid-robotic-eta.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "RAG Chatbot", "OpenRouter"],
  },
  {
    id: 3,
    title: "Intelligent Bibliographic Ecosystem",
    description: "A modern, web-based Python application to manage your personal book collection with an intuitive interface and interactive visualizations.",
    image: "/booklibrary.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Personal_Library_Manager",
    previewUrl: "https://personallibrarymanager-qbs6yru2nqftb7laufkpqs.streamlit.app/",
    techStack: ["Python", "Streamlit", "Pandas", "Data Vis"],
  },
  {
    id: 4,
    title: "Precision Countdown Timer",
    description: "A sleek and functional timer application built with Streamlit, designed for precision time tracking and productivity management.",
    image: "/timer.png",
    tag: ["Web", "Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Countdown-Timer",
    previewUrl: "https://countdown-timer-kopdyqzaiz8xvwu76v5yrt.streamlit.app/",
    techStack: ["Python", "Streamlit", "CSS styling"],
  },
  {
    id: 5,
    title: "OOP CLI Calc Suite",
    description: "A professional-grade terminal-based calculator using Object-Oriented Programming (OOP) for robust mathematical processing.",
    image: "/Calculator.jpg",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Python_Calculator",
    previewUrl: "terminal-mockup",
    techStack: ["Python", "OOP", "CLI Interface"],
  },
  {
    id: 6,
    title: "Interactive Hangman Game",
    description: "A sleek, modern, and interactive Hangman Game with a graphical interface, fully responsive and web-ready via GitHub Pages.",
    image: "/Hangman%20pic.webp",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Hangman_Game",
    previewUrl: "https://fatimahnoman.github.io/Hangman_Game/",
    techStack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
  },
  {
    id: 7,
    title: "StudiesHelper Agent",
    description: "An intelligent multi-agent system built with OpenAI Agents SDK, featuring specialized agents for study reminders and motivation.",
    image: "/Agenthelper.jpg",
    tag: ["Agents"],
    gitUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    previewUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    techStack: ["OpenAI SDK", "Python", "Multi-Agent System"],
  },
  {
    id: 8,
    title: "Dynamic Story Generator",
    description: "An interactive, web-based word game that prompts users for input to dynamically construct humorous and creative stories in real-time.",
    image: "/story_generator.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/MadLibs_Game",
    previewUrl: "https://mad-libs-game-zeta.vercel.app/",
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Vercel"],
  },
  {
    id: 9,
    title: "WellnessOracle Agent",
    description: "An intelligent multi-agent AI system powered by Google Gemini, featuring specialized agents for nutrition guidance, injury support, workout planning, and goal tracking.",
    image: "/wellness_agent.jpg",
    tag: ["Agents"],
    gitUrl: "https://github.com/Fatimahnoman/Health_Wellness_Agent",
    previewUrl: "wellness-terminal",
    techStack: ["Python", "Gemini API", "Multi-Agent", "Guardrails"],
  },
  {
    id: 10,
    title: "Crown Carat Ring Boutique",
    description: "A luxury, premium e-commerce web platform showcasing exquisite rings, designed with a sleek user interface, smooth transitions, and high-end aesthetics.",
    image: "/crown_carat.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Crown-Carat-Ring-Boutique",
    previewUrl: "https://crown-carat-ring-boutique.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    id: 11,
    title: "Snake Game",
    description: "A classic snake game redeployed on Vercel with smooth controls and responsive design for web play.",
    image: "/snake-game.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Snake-Game",
    previewUrl: "https://snake-game-one-pearl.vercel.app/",
    techStack: ["JavaScript", "HTML", "CSS", "Vercel"],
  },
  {
    id: 12,
    title: "Whack-a-Mole Game",
    description: "A fun and interactive arcade-style Whack-a-Mole game featuring responsive gameplay, score tracking, and smooth animations, deployed on Vercel for seamless web access.",
    image: "/whack_a_mole.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Whack-a-Mole-Game",
    previewUrl: "https://whack-a-mole-game-flax.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
  {
    id: 13,
    title: "Crema Coffee Landing Page",
    description: "A modern and visually appealing coffee shop landing page with a premium UI, smooth animations, responsive design, and fast performance, deployed on Vercel.",
    image: "/coffee-image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Crema-Coffee-Landing-Page",
    previewUrl: "https://crema-coffee-landing-page.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Vercel"],
  },
  {
    id: 14,
    title: "AI Mini Textbook",
    description: "An interactive AI learning platform designed to explain artificial intelligence concepts in a clear and engaging way, featuring a clean interface, responsive layout, and optimized performance.",
    image: "/Mini-Textbook.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/AI-Mini-Textbook",
    previewUrl: "https://ai-mini-textbook.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "AI", "Vercel"],
  },
  {
    id: 15,
    title: "Portfolio V2",
    description: "A modern AI Developer portfolio showcasing projects, skills, achievements, and contact information with responsive design, smooth animations, and optimized user experience.",
    image: "/FN-V2-image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/FN-Portfolio-V2",
    previewUrl: "https://fn-portfolio-v2.vercel.app/",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
];

const tags = [
  { name: "Web", icon: "🌐" },
  { name: "Agents", icon: "🤖" },
  { name: "Beginner", icon: "🌱" },
];

const INITIAL_COUNT = 6;
const LOAD_MORE = 6;

const ProjectSection = () => {
  const [tag, setTag] = useState("Web");
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalType, setTerminalType] = useState<"calculator" | "studies-helper" | "wellness-agent">("calculator");
  const ref = useRef<HTMLDivElement>(null);
  const gridTopRef = useRef<HTMLDivElement>(null);

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
    setVisibleCount(INITIAL_COUNT);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;
  const featuredProject = visibleProjects.length > 0 ? visibleProjects[0] : null;
  const gridProjects = featuredProject ? visibleProjects.slice(1) : visibleProjects;

  const getTagCount = (tagName: string) =>
    projectsData.filter((p) => p.tag.includes(tagName)).length;

  return (
    <section
      id="project"
      className="relative bg-[#0a0a0f] py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-24 text-white overflow-hidden"
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-yellow-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <motion.div
          className="text-center mb-14 sm:mb-18"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-5"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">{projectsData.length} Projects</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-5">
            <span className="text-white">My </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400">
              Projects
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Explore my latest projects and experiments in web development, AI, and interactive experiences.
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* ── Featured Project ── */}
        {featuredProject && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mb-12 sm:mb-16"
          >
            <div className="relative group rounded-2xl overflow-hidden bg-[#111118] border border-white/[0.06] hover:border-amber-500/25 transition-all duration-500 shadow-2xl shadow-black/30 hover:shadow-amber-500/5">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Image — 3 columns */}
                <div className="relative lg:col-span-3 h-64 sm:h-72 md:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-[#0a0a12] flex items-center justify-center p-4 sm:p-6">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="w-full h-full object-contain transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111118]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111118] via-transparent to-transparent lg:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-yellow-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Featured badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-xs font-bold shadow-xl shadow-amber-500/25">
                      ⭐ Featured
                    </div>
                  </div>

                  {/* Hover overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.a
                      href={featuredProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 text-white text-sm font-medium hover:bg-amber-500/30 hover:border-amber-500/50 transition-all duration-300 shadow-xl shadow-black/40"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.693.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      View Code
                    </motion.a>
                    {featuredProject.previewUrl !== "terminal-mockup" && featuredProject.previewUrl !== "wellness-terminal" ? (
                      <motion.a
                        href={featuredProject.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-semibold shadow-xl shadow-amber-500/25 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        Live Demo
                      </motion.a>
                    ) : (
                      <motion.button
                        onClick={() => {
                          if (featuredProject.previewUrl === "terminal-mockup") setTerminalType("calculator");
                          else if (featuredProject.id === 7) setTerminalType("studies-helper");
                          else setTerminalType("wellness-agent");
                          setIsTerminalOpen(true);
                        }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-semibold shadow-xl shadow-amber-500/25 hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
                        Open Terminal
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Content — 2 columns */}
                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-[11px] text-amber-400 font-mono mb-3 tracking-wider">FEATURED PROJECT</span>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-amber-300 transition-colors duration-300">
                    {featuredProject.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    {featuredProject.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg border ${
                          i % 2 === 0
                            ? "bg-amber-500/8 text-amber-300/90 border-amber-500/15"
                            : "bg-yellow-500/8 text-yellow-300/90 border-yellow-500/15"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6" />

                  {/* Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={featuredProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm font-medium hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-300 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.693.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      Source Code
                    </a>
                    {featuredProject.previewUrl !== "terminal-mockup" && featuredProject.previewUrl !== "wellness-terminal" ? (
                      <a
                        href={featuredProject.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/15"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
                        Live Demo
                      </a>
                    ) : (
                      <button
                        onClick={() => {
                          if (featuredProject.previewUrl === "terminal-mockup") setTerminalType("calculator");
                          else if (featuredProject.id === 7) setTerminalType("studies-helper");
                          else setTerminalType("wellness-agent");
                          setIsTerminalOpen(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-sm font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/15 cursor-pointer"
                      >
                        Open Terminal
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Filter Tags ── */}
        <motion.div
          ref={gridTopRef}
          className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3 mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {tags.map((t) => {
            const isActive = tag === t.name;
            return (
              <motion.button
                key={t.name}
                onClick={() => handleTagChange(t.name)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-amber-600 to-yellow-500 shadow-lg shadow-amber-500/20"
                    : "text-gray-400 bg-white/[0.03] border border-white/[0.08] hover:text-white hover:border-white/20 hover:bg-white/[0.06]"
                }`}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="text-sm">{t.icon}</span>
                <span>{t.name}</span>
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-md font-mono ${
                    isActive ? "bg-white/20" : "bg-white/[0.06] text-gray-500"
                  }`}
                >
                  {getTagCount(t.name)}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Project Grid ── */}
        <div ref={ref}>
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {gridProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.06,
                    layout: { duration: 0.4 },
                  }}
                >
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    imgUrl={project.image}
                    gitUrl={project.gitUrl}
                    previewUrl={
                      project.previewUrl === "terminal-mockup" || project.previewUrl === "wellness-terminal"
                        ? "#"
                        : project.previewUrl
                    }
                    techStack={project.techStack}
                    index={index + 1}
                    onPreviewClick={
                      project.previewUrl === "terminal-mockup"
                        ? () => { setTerminalType("calculator"); setIsTerminalOpen(true); }
                        : project.id === 7
                        ? () => { setTerminalType("studies-helper"); setIsTerminalOpen(true); }
                        : project.previewUrl === "wellness-terminal"
                        ? () => { setTerminalType("wellness-agent"); setIsTerminalOpen(true); }
                        : undefined
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Show More / Less ── */}
        {filteredProjects.length > INITIAL_COUNT && (
          <motion.div
            className="flex flex-col items-center mt-12 sm:mt-16 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => {
                if (hasMore) {
                  setVisibleCount((prev) => prev + LOAD_MORE);
                } else {
                  setVisibleCount(INITIAL_COUNT);
                  gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
              className="group relative px-8 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-300 font-medium text-sm hover:text-white hover:border-amber-500/40 transition-all duration-300 flex items-center gap-3 overflow-hidden"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                {hasMore ? (
                  <>
                    Show More
                    <span className="text-amber-400/80 text-xs">({filteredProjects.length - visibleCount} remaining)</span>
                    <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                ) : (
                  <>
                    Show Less
                    <svg className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                    </svg>
                  </>
                )}
              </span>
            </motion.button>

            {/* Counter */}
            <p className="text-gray-600 text-xs font-mono">
              {filteredProjects.length} total
            </p>
          </motion.div>
        )}
      </div>

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projectType={terminalType}
      />
    </section>
  );
};

export default ProjectSection;
