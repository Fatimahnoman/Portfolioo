"use client";

import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import type { InteractivePreviewKind, Project } from "@/lib/projects";

type ProjectGridProps = {
  projects: Project[];
  onOpenInteractive: (kind: InteractivePreviewKind) => void;
  onOpenCaseStudy: (project: Project) => void;
};

/**
 * Responsive project grid: 1 column on mobile, 2 on tablet, 3 on desktop.
 *
 * Container measure and gaps deliberately match the Skills section so cards in
 * the two sections line up column-for-column at every breakpoint.
 */
export default function ProjectGrid({
  projects,
  onOpenInteractive,
  onOpenCaseStudy,
}: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-10">
      <AnimatePresence mode="popLayout">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            layout
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{
              duration: 0.32,
              delay: Math.min(index, 5) * 0.04,
              layout: { duration: 0.35 },
            }}
            className="h-full"
          >
            <ProjectCard
              project={project}
              index={index}
              onOpenInteractive={onOpenInteractive}
              onOpenCaseStudy={() => onOpenCaseStudy(project)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}