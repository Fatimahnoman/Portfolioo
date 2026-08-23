"use client";
import React from "react";

const items = [
  "Agentic AI",
  "Full Stack",
  "Automation",
  "Multi-Agent Systems",
  "Next.js",
  "Python",
  "RAG Pipelines",
  "OpenAI SDK",
];

type MarqueeProps = {
  reverse?: boolean;
};

const Marquee = ({ reverse = false }: MarqueeProps) => {
  const doubled = [...items, ...items];
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.015] py-5 sm:py-7 select-none"
    >
      <div className={`flex whitespace-nowrap ${reverse ? "animate-marquee-right" : "animate-marquee-left"}`}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center text-3xl sm:text-5xl font-extrabold uppercase tracking-tight mr-10 sm:mr-14">
            {i % 2 === 0 ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                {item}
              </span>
            ) : (
              <span className="text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}>
                {item}
              </span>
            )}
            <span className="ml-10 sm:ml-14 w-2 h-2 rounded-full bg-fuchsia-500/50" />
          </span>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#070512] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#070512] to-transparent pointer-events-none" />
    </div>
  );
};

export default Marquee;
