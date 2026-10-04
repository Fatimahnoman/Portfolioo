"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProjectFilter from "./projects/ProjectFilter";
import ProjectGrid from "./projects/ProjectGrid";
import ProjectModal from "./projects/ProjectModal";
import ProjectSearch from "./projects/ProjectSearch";
import SectionHeader from "./SectionHeader";
import TerminalModal from "./TerminalModal";
import StudyChatModal from "./StudyChatModal";
import {
  filterProjects,
  projectsData,
  searchProjects,
  type InteractivePreviewKind,
  type Project,
  type ProjectCategoryId,
} from "@/lib/projects";

type TerminalKind = "wellness-agent";

/**
 * The Projects section.
 *
 * A thin orchestrator: it owns the three pieces of state that genuinely belong
 * to the section (active category, search query, which overlay is open) and
 * composes presentational children. What a project *is* — its category, demo
 * behaviour, tech stack — lives in `@/lib/projects` and is never restated here.
 */
const ProjectSection = () => {
  const [category, setCategory] = useState<ProjectCategoryId>("all");
  const [query, setQuery] = useState("");
  const [caseStudy, setCaseStudy] = useState<Project | null>(null);
  const [terminalKind, setTerminalKind] = useState<TerminalKind>("wellness-agent");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isStudyChatOpen, setIsStudyChatOpen] = useState(false);

  // Filtering is cheap and only depends on two primitives, but memoising keeps
  // it off the render path when unrelated state (a modal opening) changes.
  const visibleProjects = useMemo(
    () => searchProjects(filterProjects(category), query),
    [category, query],
  );

  const scopedTotal = useMemo(
    () => filterProjects(category).length,
    [category],
  );

  const handleOpenInteractive = (kind: InteractivePreviewKind) => {
    // Close the case study first so the demo is never stacked behind it.
    setCaseStudy(null);

    if (kind === "studies") {
      setIsStudyChatOpen(true);
      return;
    }
    setTerminalKind("wellness-agent");
    setIsTerminalOpen(true);
  };

  return (
    <section
      id="project"
      aria-labelledby="project-heading"
      className="relative overflow-hidden px-4 py-20 text-white sm:px-6 sm:py-28 md:px-12 lg:px-24"
    >
      {/* ── Background decorations ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-[var(--electric-blue)]/10 blur-[120px]" />
        <div className="absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-[var(--deep-purple)]/8 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-60 w-60 rounded-full bg-[var(--emerald)]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ── Header ── */}
        <motion.div
          className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--emerald)]" />
          <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
            {projectsData.length} Projects
          </span>
        </motion.div>

        <div id="project-heading">
          <SectionHeader
            index="05"
            label="Portfolio"
            titleA="Selected"
            titleB="Work"
            subtitle="Agentic AI systems and production web apps — multi-agent systems, RAG, and real deployed storefronts."
          />
        </div>

        {/* ── Filter + search ── */}
        <motion.div
          className="mb-10 flex flex-col gap-5 sm:mb-12 lg:flex-row lg:items-start lg:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <ProjectFilter
            active={category}
            onChange={(next) => {
              setCategory(next);
              // A stale query can hide everything in a narrower category, so
              // clear it when the scope changes.
              setQuery("");
            }}
          />
          <ProjectSearch
            value={query}
            onChange={setQuery}
            resultCount={visibleProjects.length}
            totalCount={scopedTotal}
          />
        </motion.div>

        {/* ── Grid ── */}
        <ProjectGrid
          projects={visibleProjects}
          onOpenInteractive={handleOpenInteractive}
          onOpenCaseStudy={setCaseStudy}
        />

        {visibleProjects.length === 0 && (
          <div className="py-20 text-center">
            <p className="mb-4 text-sm text-gray-400">
              No projects match{" "}
              <span className="font-semibold text-white">
                &ldquo;{query.trim()}&rdquo;
              </span>
              .
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear project search"
              className="cursor-pointer rounded-lg border border-white/[0.10] px-5 py-2.5 font-mono text-[11px] uppercase tracking-wider text-gray-300 transition-colors hover:border-[var(--electric-blue)]/40 hover:text-white"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* ── Overlays ── */}
      <ProjectModal
        project={caseStudy}
        onClose={() => setCaseStudy(null)}
        onOpenInteractive={handleOpenInteractive}
      />

      <TerminalModal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        projectType={terminalKind}
      />

      <StudyChatModal
        isOpen={isStudyChatOpen}
        onClose={() => setIsStudyChatOpen(false)}
      />
    </section>
  );
};

export default ProjectSection;