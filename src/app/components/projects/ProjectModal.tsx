"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
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

const hostLabel = (project: Project): string => {
  const url = getLiveUrl(project);
  if (!url) return "interactive preview · run inside the portfolio";
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return "live preview";
  }
};

/** Mono-numbered micro section header — the "architecture spec" voice used site-wide. */
const SectionHeading = ({
  index,
  children,
  accent,
}: {
  index: string;
  children: ReactNode;
  accent: string;
}) => (
  <h3 className="mb-2.5 flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.3em]">
    <span className="text-gray-700">{index}</span>
    <span className={accent}>{children}</span>
  </h3>
);

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
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-md sm:p-6"
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
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-white/[0.10] bg-[#08080f] shadow-[0_40px_120px_-30px_rgba(56,189,248,0.25)]"
          >
            {/* top accent hairline */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-[2px] bg-gradient-to-r from-[var(--electric-blue)] via-[var(--deep-purple)] to-transparent"
            />

            {/* ── Header image with browser chrome ── */}
            <div className="relative h-48 overflow-hidden bg-[#07070f] sm:h-56">
              {/* chrome bar */}
              <div className="absolute inset-x-0 top-0 z-10 flex h-10 items-center gap-3 border-b border-white/[0.06] bg-black/65 px-4 backdrop-blur-[3px]">
                <span aria-hidden="true" className="flex gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
                  <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#28c840]" />
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-[9px] tracking-wide text-white/55">
                  {hostLabel(project)}
                </span>
                <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-gray-600 sm:inline">
                  Case_Study
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  aria-label="Close case study"
                  className="cursor-pointer rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080f] via-[#08080f]/45 to-transparent" />

              <div className="absolute bottom-4 left-5 flex flex-wrap items-center gap-2">
                <span className="rounded-md border border-[var(--electric-blue)]/30 bg-black/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-[var(--electric-blue)] backdrop-blur-sm">
                  {getCategoryLabel(project.category)}
                </span>
                <span className="flex items-center gap-1.5 rounded-md border border-white/10 bg-black/70 px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-white/75 backdrop-blur-sm">
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
                  <span className="rounded-md bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#05060f]">
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* ── Body ── */}
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain p-6 sm:p-8">
              <h2
                id="project-modal-title"
                className="mb-2 text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-3xl"
              >
                {project.title}
              </h2>
              <p className="mb-7 text-sm leading-relaxed text-gray-400">
                {project.tagline}
              </p>

              {/* Overview */}
              <section className="mb-7">
                <SectionHeading index="01 /" accent="text-[var(--electric-blue)]">
                  Overview
                </SectionHeading>
                <p className="text-sm leading-relaxed text-gray-300">
                  {project.description}
                </p>
              </section>

              {/* Problem statement — only if written */}
              {project.problem && (
                <section className="mb-7 border-l-2 border-[var(--deep-purple)]/50 pl-4">
                  <SectionHeading index="02 /" accent="text-[var(--deep-purple)]">
                    Problem Statement
                  </SectionHeading>
                  <p className="text-sm leading-relaxed text-gray-300">
                    {project.problem}
                  </p>
                </section>
              )}

              {/* Tech stack */}
              <section className="mb-7">
                <SectionHeading index="03 /" accent="text-[var(--electric-blue)]">
                  Tech Stack Architecture
                </SectionHeading>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {project.techStack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 text-center font-mono text-[11px] tracking-wide text-gray-200 transition-colors duration-200 hover:border-[var(--electric-blue)]/30 hover:text-white"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Key features */}
              {project.features.length > 0 && (
                <section className="mb-7">
                  <SectionHeading index="04 /" accent="text-[var(--deep-purple)]">
                    Key Features
                  </SectionHeading>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2.5"
                      >
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
                  <SectionHeading index="05 /" accent="text-[var(--emerald)]">
                    Results &amp; Impact
                  </SectionHeading>
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
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#05060f] shadow-[0_0_24px_-6px_var(--electric-blue)] transition-all duration-300 hover:brightness-110"
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
                    className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#05060f] shadow-[0_0_24px_-6px_var(--electric-blue)] transition-all duration-300 hover:brightness-110"
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
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/[0.10] bg-white/[0.03] px-5 py-3.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-gray-300 transition-all duration-300 hover:border-[var(--electric-blue)]/40 hover:text-white"
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
