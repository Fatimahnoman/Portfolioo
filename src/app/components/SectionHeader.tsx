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
        <span className="font-mono text-xs sm:text-sm text-gold font-semibold">{index}</span>
        <span className="h-px w-12 bg-gradient-to-r from-gold/70 to-transparent" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-sand">
          {label}
        </span>
      </div>

      <h2 className="mb-4 sm:mb-5 font-display text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.04] tracking-tight" style={{ backgroundImage: "linear-gradient(180deg, #fbf6e9 0%, #d8d2c4 40%, #6f6a5e 100%)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
        {titleA}{" "}
        {titleB && <span className="text-gold-gradient">{titleB}</span>}
      </h2>

      {subtitle && (
        <p className="text-sand text-base sm:text-lg leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
