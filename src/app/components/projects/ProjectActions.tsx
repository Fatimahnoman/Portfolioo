"use client";

import { ArrowUpRight, FileText, type LucideIcon } from "lucide-react";
// lucide-react 1.x dropped brand marks, so the authentic GitHub logo comes
// from react-icons, which this project already depends on.
import { FaGithub } from "react-icons/fa";
import {
  getLiveUrl,
  getPreviewLabel,
  type InteractivePreviewKind,
  type Project,
} from "@/lib/projects";

type ProjectActionsProps = {
  project: Project;
  /**
   * Called only for in-page modal previews. Omit it for live-URL previews —
   * those render as a plain anchor and need no handler.
   */
  onOpenInteractive?: (kind: InteractivePreviewKind) => void;
  /** Opens the case-study modal. */
  onOpenCaseStudy?: () => void;
};

const PREVIEW_ICON: Record<Project["preview"]["kind"], LucideIcon> = {
  live: ArrowUpRight,
  studies: ArrowUpRight,
  wellness: ArrowUpRight,
};

const PRIMARY =
  "relative flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] px-3.5 py-2.5 font-semibold text-[#05060f] shadow-[0_0_24px_-6px_var(--electric-blue)] transition-all duration-300 hover:shadow-[0_0_30px_-4px_var(--electric-blue)] hover:brightness-110";

const SECONDARY =
  "flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.10] bg-white/[0.03] px-3.5 py-2.5 font-medium text-gray-300 transition-all duration-300 hover:border-[var(--electric-blue)]/40 hover:bg-[var(--electric-blue)]/[0.08] hover:text-white";

/**
 * The single definition of a project's actions.
 *
 * Every card renders through here, so the action set cannot drift between
 * cards, and the "is this a URL or a modal?" decision is made in exactly one
 * place instead of being restated per button.
 */
export default function ProjectActions({
  project,
  onOpenInteractive,
  onOpenCaseStudy,
}: ProjectActionsProps) {
  const liveUrl = getLiveUrl(project);
  const isInteractive = liveUrl === null;
  const PreviewIcon = PREVIEW_ICON[project.preview.kind];

  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex items-center gap-2.5">
        {isInteractive ? (
          <button
            type="button"
            onClick={() => onOpenInteractive?.(project.preview.kind as InteractivePreviewKind)}
            aria-label={`${getPreviewLabel(project)} — ${project.title}`}
            className={`${PRIMARY} flex-1 cursor-pointer`}
          >
            <PreviewIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {getPreviewLabel(project)}
          </button>
        ) : (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${getPreviewLabel(project)} — ${project.title} (opens in a new tab)`}
            className={`${PRIMARY} flex-1`}
          >
            <PreviewIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
            {getPreviewLabel(project)}
          </a>
        )}

        <a
          href={project.gitUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub repository for ${project.title} (opens in a new tab)`}
          className={`${SECONDARY} flex-1`}
        >
          <FaGithub className="h-4 w-4 shrink-0" aria-hidden="true" />
          GitHub
        </a>
      </div>

      {onOpenCaseStudy && (
        <button
          type="button"
          onClick={onOpenCaseStudy}
          aria-label={`View case study for ${project.title}`}
          className={`${SECONDARY} w-full cursor-pointer hover:border-[var(--deep-purple)]/50 hover:bg-[var(--deep-purple)]/[0.10]`}
        >
          <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
          View Case Study
        </button>
      )}
    </div>
  );
}