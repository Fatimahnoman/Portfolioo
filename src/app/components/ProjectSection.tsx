"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";
import TerminalModal from "./TerminalModal";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import Link from "next/link";
import { projectsData } from "@/lib/projects";

const tags = [
  {
    name: "Web",
    icon: "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418",
  },
  {
    name: "Agents",
    icon: "M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25zm.75-12h9v9h-9v-9z",
  },
  {
    name: "Beginner",
    icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z",
  },
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
      className="relative bg-[#070512] py-20 sm:py-28 px-4 sm:px-6 md:px-12 lg:px-24 text-white overflow-hidden"
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-fuchsia-500/6 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-violet-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* ── Header ── */}
        <div className="mb-10 sm:mb-12">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400 text-xs font-medium tracking-wide uppercase">{projectsData.length} Projects</span>
          </motion.div>
        </div>

        <SectionHeader
          index="05"
          label="Portfolio"
          titleA="Selected"
          titleB="Work"
          subtitle="Explore my latest projects and experiments in web development, AI, and interactive experiences."
        />

        {/* ── Filter Bar ── */}
        <motion.div
          ref={gridTopRef}
          className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 sm:mb-14 scroll-mt-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="hidden md:inline font-mono text-[11px] uppercase tracking-[0.25em] text-gray-600 mr-3">
            Filter /
          </span>
          {tags.map((t) => {
            const isActive = tag === t.name;
            return (
              <motion.button
                key={t.name}
                onClick={() => handleTagChange(t.name)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                className={`relative flex items-center gap-2 pl-3.5 pr-2 py-2 rounded-lg text-[11px] font-mono uppercase tracking-wider cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-violet-600 to-fuchsia-500 shadow-lg shadow-violet-500/25"
                    : "text-gray-400 bg-white/[0.02] border border-white/[0.08] hover:text-white hover:border-violet-500/40 hover:bg-white/[0.04]"
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-violet-400/70"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={t.icon} />
                </svg>
                {t.name}
                <span
                  className={`px-1.5 py-0.5 rounded font-mono ${
                    isActive ? "bg-black/25 text-white" : "bg-white/[0.05] text-gray-500"
                  }`}
                >
                  {getTagCount(t.name)}
                </span>
              </motion.button>
            );
          })}
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
            <div className="relative group rounded-2xl overflow-hidden bg-[#120e20] border border-white/[0.06] hover:border-violet-500/25 transition-all duration-500 shadow-2xl shadow-black/30 hover:shadow-violet-500/5">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
                {/* Image — 3 columns */}
                <div className="relative lg:col-span-3 h-64 sm:h-72 md:h-80 lg:h-auto min-h-[280px] overflow-hidden bg-[#0d0919] flex items-center justify-center p-4 sm:p-6">
                  <Image
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-contain transition-all duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#120e20]/80 hidden lg:block" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#120e20] via-transparent to-transparent lg:hidden" />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/8 via-transparent to-fuchsia-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  {/* Featured badge */}
                  <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-xs font-bold shadow-xl shadow-violet-500/25">
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
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-black/60 backdrop-blur-xl border border-white/15 text-white text-sm font-medium hover:bg-violet-500/30 hover:border-violet-500/50 transition-all duration-300 shadow-xl shadow-black/40"
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
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-xl shadow-violet-500/25 hover:from-fuchsia-500 hover:to-violet-600 transition-all duration-300"
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
                        className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold shadow-xl shadow-violet-500/25 hover:from-fuchsia-500 hover:to-violet-600 transition-all duration-300 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" /></svg>
                        Open Terminal
                      </motion.button>
                    )}
                  </div>
                </div>

                {/* Content — 2 columns */}
                <div className="lg:col-span-2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                  <span className="text-[11px] text-violet-400 font-mono mb-3 tracking-wider">FEATURED PROJECT</span>

                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 leading-snug group-hover:text-violet-300 transition-colors duration-300">
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
                            ? "bg-violet-500/8 text-violet-300/90 border-violet-500/15"
                            : "bg-fuchsia-500/8 text-fuchsia-300/90 border-fuchsia-500/15"
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
                    <Link
                      href={`/projects/${featuredProject.id}`}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-violet-500/30 text-violet-300 text-sm font-semibold hover:bg-violet-500/15 hover:border-violet-500/50 hover:text-white transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
                      Case Study
                    </Link>
                    <a
                      href={featuredProject.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-sm font-medium hover:bg-violet-500/10 hover:border-violet-500/30 hover:text-violet-300 transition-all duration-300"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.435.372.81 1.102.81 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.693.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                      Source Code
                    </a>
                    {featuredProject.previewUrl !== "terminal-mockup" && featuredProject.previewUrl !== "wellness-terminal" ? (
                      <a
                        href={featuredProject.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold hover:from-fuchsia-500 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-violet-500/15"
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
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm font-semibold hover:from-fuchsia-500 hover:to-violet-600 transition-all duration-300 shadow-lg shadow-violet-500/15 cursor-pointer"
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

        {/* ── Project Grid ── */}
        <div ref={ref}>
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-x-8 lg:gap-y-12">
              {gridProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: (index % 6) * 0.06,
                    layout: { duration: 0.4 },
                  }}
                  className={index % 3 === 1 ? "lg:mt-10" : ""}
                >
                  <ProjectCard
                    projectId={project.id}
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
              className="group relative px-8 py-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-300 font-medium text-sm hover:text-white hover:border-violet-500/40 transition-all duration-300 flex items-center gap-3 overflow-hidden"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative z-10 flex items-center gap-3">
                {hasMore ? (
                  <>
                    Show More
                    <span className="text-violet-400/80 text-xs">({filteredProjects.length - visibleCount} remaining)</span>
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
