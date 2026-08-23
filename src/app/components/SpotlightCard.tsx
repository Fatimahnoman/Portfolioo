"use client";
import React, { useRef } from "react";

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
};

const SpotlightCard = ({ children, className = "", glowColor = "rgba(139, 92, 246, 0.10)" }: SpotlightCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className={`group relative ${className}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(480px circle at var(--spot-x, 50%) var(--spot-y, 50%), ${glowColor}, transparent 45%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
