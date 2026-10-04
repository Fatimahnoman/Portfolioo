"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  X,
  Zap,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import {
  getCategoryLabel,
  getLiveUrl,
  getPreviewLabel,
  getStatusLabel,
  isLivePreview,
  type InteractivePreviewKind,
  type Project,
} from "@/lib/projects";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
  onOpenInteractive?: (kind: InteractivePreviewKind) => void;
};

/**
 * Full case study for a single project.
 *
 * Sections with no data are omitted entirely rather than rendered empty —
 * `problem` and `metrics` are optional on purpose, so an unfilled project
 * shows a shorter modal instead of a "coming soon" placeholder.
 */
export default function ProjectModal({
  project,
  onClose,
  onOpenInteractive,
}: ProjectModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  // Escape to close, restore focus to whatever opened the modal, and lock
  // background scroll so the page behind cannot be scrolled by wheel or keys.
  useEffect(() => {
    if (!project) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Move focus into the dialog so keyboard and screen-reader users land here.
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [project, handleKeyDown]);

  const liveUrl = project ? getLiveUrl(project) : null;

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.10] bg-[#08080f] shadow-2xl"
          >
            {/* ── Header image ── */}
            <div className="relative h-48 overflow-hidden bg-[#07070f] sm:h-56">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/40 to-transparent" />

              <div className="absolute left-5 top-5 flex flex-wrap items-center gap-2">
                <span className="rounded-lg border border-[var(--deep-purple)]/30 bg-black/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[var(--deep-purple)] backdrop-blur-sm">
                  {getCategoryLabel(project.category)}
                </span>
                <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-black/70 px-2.5 py-1 text-[10px] font-medium text-white/75 backdrop-blur-sm">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isLivePreview(project)
                        ? "bg-[var(--emerald)]"
                        : "bg-[var(--electric-blue)]"
                    }`}
                  />
                  {getStatusLabel(project)}
                </span>
                {project.featured && (
                  <span className="rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#05060f]">
                    Featured
                  </span>
                )}
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="absolute right-4 top-4 cursor-pointer rounded-lg bg-black/70 p-2 text-gray-400 backdrop-blur-sm transition-colors hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* ── Body ── */}
            <div className="max-h-[60vh] overflow-y-auto p-6 sm:p-8">
              <h2
                id="project-modal-title"
                className="mb-2 text-2xl font-bold leading-tight text-white sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-gray-400">
                {project.tagline}
              </p>

              {/* Overview */}
              <section className="mb-7">
                <h3 className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric-blue)]">
                  <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                  Overview
                </h3>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>
              </section>

              {/* Problem statement — only if written */}
              {project.problem && (
                <section className="mb-7">
                  <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--deep-purple)]">
                    Problem Statement
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.problem}
                  </p>
                </section>
              )}

              {/* Tech stack */}
              <section className="mb-7">
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--electric-blue)]">
                  Tech Stack Architecture
                </h3>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-[13px] font-medium text-gray-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Key features */}
              {project.features.length > 0 && (
                <section className="mb-7">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--deep-purple)]">
                    Key Features
                  </h3>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[var(--emerald)]"
                          aria-hidden="true"
                        />
                        <span className="text-sm leading-relaxed text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Results — only if real numbers exist */}
              {project.metrics && project.metrics.length > 0 && (
                <section className="mb-7">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--emerald)]">
                    Results &amp; Impact
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {project.metrics.map((metric) => (
                      <li
                        key={metric}
                        className="flex items-center gap-1.5 rounded-lg border border-[var(--emerald)]/25 bg-[var(--emerald)]/[0.08] px-3 py-2 text-[13px] font-semibold text-[var(--emerald)]"
                      >
                        <Zap className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        {metric}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* ── Actions ── */}
              <div className="flex flex-wrap gap-2.5 border-t border-white/[0.08] pt-6">
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${getPreviewLabel(project)} — ${project.title} (opens in a new tab)`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-5 py-3 font-semibold text-[#05060f] shadow-[0_0_24px_-6px_var(--electric-blue)] transition-all duration-300 hover:brightness-110"
                  >
                    {getPreviewLabel(project)}
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenInteractive?.(
                        project.preview.kind as InteractivePreviewKind
                      );
                    }}
                    aria-label={`${getPreviewLabel(project)} — ${project.title}`}
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-5 py-3 font-semibold text-[#05060f] shadow-[0_0_24px_-6px_var(--electric-blue)] transition-all duration-300 hover:brightness-110"
                  >
                    {getPreviewLabel(project)}
                    <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                  </button>
                )}

                <a
                  href={project.gitUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.03] px-5 py-3 font-medium text-gray-300 transition-all duration-300 hover:border-[var(--electric-blue)]/40 hover:text-white"
                >
                  <FaGithub className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Repository
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}