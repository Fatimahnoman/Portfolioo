"use client";
import React from "react";
import { motion } from "framer-motion";

type SectionHeaderProps = {
  index: string;
  label: string;
  titleA: string;
  titleB?: string;
  subtitle?: string;
};

const SectionHeader = ({ index, label, titleA, titleB, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div
      className="mb-14 sm:mb-20 max-w-3xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="flex items-center gap-4 mb-6">
        <span className="font-mono text-xs sm:text-sm text-fuchsia-400 font-semibold">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-violet-500/70 to-transparent" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-gray-500">
          {label}
        </span>
      </div>

      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-[1.06] tracking-tight mb-4 sm:mb-5">
        {titleA}{" "}
        {titleB && (
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400">
            {titleB}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
