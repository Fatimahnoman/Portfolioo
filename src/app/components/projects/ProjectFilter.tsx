"use client";

import { motion } from "framer-motion";
import {
  Bot,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { projectFilters, type ProjectCategoryId } from "@/lib/projects";

type ProjectFilterProps = {
  active: ProjectCategoryId;
  onChange: (category: ProjectCategoryId) => void;
};

/** Icon per category id. Lives here rather than in the data layer so
 *  `@/lib/projects` stays free of React imports. */
const ICONS: Record<ProjectCategoryId, LucideIcon> = {
  all: LayoutGrid,
  agents: Bot,
  fullstack: LayoutGrid,
};

/**
 * Category filter tabs.
 *
 * Options and per-category counts are read straight from `@/lib/projects`, so
 * this component never needs editing when the catalogue changes.
 */
export default function ProjectFilter({
  active,
  onChange,
}: ProjectFilterProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center gap-2"
    >
      {projectFilters.map((filter) => {
        const isActive = filter.id === active;
        const Icon = ICONS[filter.id];

        return (
          <motion.button
            key={filter.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`${filter.label}, ${filter.count} project${
              filter.count === 1 ? "" : "s"
            }`}
            onClick={() => onChange(filter.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`group relative flex cursor-pointer items-center gap-2 rounded-lg py-2 pl-3.5 pr-3 font-mono text-[11px] uppercase tracking-wider transition-colors duration-300 ${
              isActive
                ? "bg-gradient-to-r from-[var(--deep-purple)] to-[var(--electric-blue)] text-[#05060f] shadow-lg shadow-[var(--electric-blue)]/20"
                : "border border-white/[0.08] bg-white/[0.02] text-gray-400 hover:border-[var(--electric-blue)]/40 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Icon
              className={`h-3.5 w-3.5 shrink-0 ${
                isActive
                  ? "text-[#05060f]"
                  : "text-[var(--electric-blue)]/70 group-hover:text-[var(--electric-blue)]"
              }`}
              aria-hidden="true"
            />
            {filter.label}
            <span
              className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                isActive ? "bg-black/25 text-[#05060f]" : "bg-white/[0.05] text-gray-500"
              }`}
            >
              {filter.count}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}