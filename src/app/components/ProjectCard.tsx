"use client";
import React, { useRef } from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Image from "next/image";

type ProjectCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  techStack: string[];
  index?: number;
  onPreviewClick?: () => void;
};

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  techStack,
  index = 0,
  onPreviewClick,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (y - 0.5) * -4;
    const tiltY = (x - 0.5) * 4;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02,1.02,1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl overflow-hidden bg-[#12121a] border border-white/[0.06] hover:border-amber-500/30 transition-[border-color,border-color] duration-500 shadow-xl shadow-black/20 hover:shadow-2xl hover:shadow-amber-500/5"
      style={{ transition: "transform 0.4s cubic-bezier(.25,.46,.45,.94), border-color 0.5s ease, box-shadow 0.5s ease" }}
    >
      {/* ── Image ── */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-[#0a0a12]">
        <Image
          src={imgUrl}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Number tag */}
        <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] font-mono text-white/50 group-hover:text-amber-300 group-hover:border-amber-500/30 transition-all duration-400">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Live indicator */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-1 group-hover:translate-y-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-white/70 font-medium">Live</span>
        </div>

        {/* Center hover overlay with buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-400">
          <motion.a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-medium hover:bg-amber-500/30 hover:border-amber-500/50 transition-all duration-300 shadow-lg shadow-black/40"
          >
            <CodeBracketIcon className="w-4 h-4" />
            Code
          </motion.a>
          {onPreviewClick ? (
            <motion.button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPreviewClick(); }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-medium hover:bg-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-black/40 cursor-pointer"
            >
              <EyeIcon className="w-4 h-4" />
              Live Demo
            </motion.button>
          ) : (
            <motion.a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-white text-xs font-medium hover:bg-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 shadow-lg shadow-black/40"
            >
              <EyeIcon className="w-4 h-4" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="p-5">
        {/* Title */}
        <h5 className="text-[15px] sm:text-base font-bold text-white leading-snug mb-2 group-hover:text-amber-300 transition-colors duration-300">
          {title}
        </h5>

        {/* Description */}
        <p className="text-gray-400 text-[13px] leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {techStack.map((tech, i) => (
            <span
              key={i}
              className={`px-2.5 py-[5px] text-[11px] font-medium rounded-md border transition-colors duration-300 ${
                i % 2 === 0
                  ? "bg-amber-500/8 text-amber-300/90 border-amber-500/15"
                  : "bg-yellow-500/8 text-yellow-300/90 border-yellow-500/15"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-4" />

        {/* Action Buttons — always visible */}
        <div className="flex gap-2.5">
          <a
            href={gitUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 text-[13px] font-medium hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-300 transition-all duration-300"
          >
            <CodeBracketIcon className="w-4 h-4" />
            View Code
          </a>
          {onPreviewClick ? (
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); onPreviewClick(); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-[13px] font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/15 cursor-pointer"
            >
              <EyeIcon className="w-4 h-4" />
              Live Demo
            </button>
          ) : (
            <a
              href={previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 text-white text-[13px] font-semibold hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-500/15"
            >
              <EyeIcon className="w-4 h-4" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
