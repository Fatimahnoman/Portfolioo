"use client";

import { Search, X } from "lucide-react";

type ProjectSearchProps = {
  value: string;
  onChange: (value: string) => void;
  /** How many projects the current filter + query returns. */
  resultCount: number;
  totalCount: number;
};

/**
 * Live search over project title and tech stack.
 *
 * The input is a controlled component and filtering happens in the parent via
 * `searchProjects`, so there is no debounce to tune and the result count is
 * announced to the user rather than left ambiguous.
 */
export default function ProjectSearch({
  value,
  onChange,
  resultCount,
  totalCount,
}: ProjectSearchProps) {
  const isFiltering = value.trim().length > 0;

  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <div className="relative flex items-center">
        <Search
          className="pointer-events-none absolute left-3.5 h-4 w-4 text-gray-500"
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title or tech…"
          aria-label="Search projects by title or tech stack"
          className="w-full rounded-lg border border-white/[0.08] bg-white/[0.02] py-2.5 pl-10 pr-10 text-sm text-white placeholder-gray-500 outline-none transition-all duration-300 focus:border-[var(--electric-blue)]/50 focus:bg-white/[0.04] [&::-webkit-search-cancel-button]:hidden"
        />
        {isFiltering && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Clear project search"
            className="absolute right-3 cursor-pointer rounded p-0.5 text-gray-500 transition-colors hover:text-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      <p aria-live="polite" className="px-0.5 font-mono text-[11px] text-gray-500">
        {isFiltering
          ? `${resultCount} of ${totalCount} projects`
          : `${resultCount} project${resultCount === 1 ? "" : "s"}`}
      </p>
    </div>
  );
}