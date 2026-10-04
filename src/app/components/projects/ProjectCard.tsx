"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Radio, Sparkles, Zap } from "lucide-react";
import ProjectActions from "./ProjectActions";
import {
  getCategoryLabel,
  getStatusLabel,
  isLivePreview,
  type InteractivePreviewKind,
  type Project,
} from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpenInteractive?: (kind: InteractivePreviewKind) => void;
  onOpenCaseStudy?: () => void;
};

/**
 * A single project card.
 *
 * The hover glow is a border-image gradient rather than a box-shadow spread,
 * because box-shadow cannot produce a two-colour gradient along a single edge.
 * `--glow-angle` is stepped by a keyframe so the highlight travels around the
 * border; see `glow-sweep` in globals.css.
 */
function ProjectCard({
  project,
  index,
  onOpenInteractive,
  onOpenCaseStudy,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLive = isLivePreview(project);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const resetSpotlight = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty("--spot-x", "50%");
    cardRef.current.style.setProperty("--spot-y", "50%");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07 }}
      className="group relative h-full"
    >
      {/* Gradient border layer. `aria-hidden` because it is decorative; the
          visible border lives on the card itself. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100 glow-sweep"
        style={{
          background:
            "linear-gradient(var(--glow-angle, 0deg), var(--deep-purple), var(--electric-blue), var(--deep-purple))",
        }}
      />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={resetSpotlight}
        className="project-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] transition-[border-color,box-shadow] duration-500 hover:border-transparent hover:shadow-[0_18px_50px_-20px_var(--electric-blue)]"
      >
        {/* ── Image ── */}
        <div className="relative h-44 overflow-hidden bg-[#07070f] sm:h-48">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-[#0a0a14]/20 to-transparent" />

          {/* Cursor spotlight */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(420px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(56,189,248,0.14), transparent 45%)",
            }}
          />

          {/* Category badge */}
          <span className="absolute left-3.5 top-3.5 rounded-lg border border-[var(--deep-purple)]/30 bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--deep-purple)] backdrop-blur-sm">
            {getCategoryLabel(project.category)}
          </span>

          {/* Live status indicator */}
          <span className="absolute right-3.5 top-3.5 flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white/75 backdrop-blur-sm">
            {isLive ? (
              <Radio className="h-3 w-3 text-[var(--emerald)]" aria-hidden="true" />
            ) : (
              <Sparkles className="h-3 w-3 text-[var(--electric-blue)]" aria-hidden="true" />
            )}
            {getStatusLabel(project)}
          </span>

          {project.featured && (
            <span className="absolute bottom-3.5 left-3.5 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#05060f]">
              <Sparkles className="h-3 w-3" aria-hidden="true" />
              Featured
            </span>
          )}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-1.5 text-[15px] font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[var(--electric-blue)] sm:text-base">
            {project.title}
          </h3>

          <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-gray-400">
            {project.tagline}
          </p>

          <ul className="mb-4 flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-[5px] text-[11px] font-medium text-gray-300"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Key metrics — rendered only when a project actually has numbers.
              No placeholder is shown, so the card never implies a claim that
              was not made. */}
          {project.metrics && project.metrics.length > 0 && (
            <ul className="mb-4 flex flex-wrap gap-1.5">
              {project.metrics.map((metric) => (
                <li
                  key={metric}
                  className="flex items-center gap-1.5 rounded-md border border-[var(--emerald)]/25 bg-[var(--emerald)]/[0.08] px-2.5 py-[5px] text-[11px] font-semibold text-[var(--emerald)]"
                >
                  <Zap className="h-3 w-3 shrink-0" aria-hidden="true" />
                  {metric}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-auto">
            <div className="mb-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <ProjectActions
              project={project}
              onOpenInteractive={onOpenInteractive}
              onOpenCaseStudy={onOpenCaseStudy}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;