"use client";
import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion } from "framer-motion";

type ProjectCardProps = {
  imgUrl: string;
  title: string;
  description: string;
  gitUrl: string;
  previewUrl: string;
  techStack: string[];
  onPreviewClick?: () => void;
};

const ProjectCard = ({
  imgUrl,
  title,
  description,
  gitUrl,
  previewUrl,
  techStack,
  onPreviewClick,
}: ProjectCardProps) => {
  return (
    <motion.div 
      className="group relative bg-[#181818] rounded-2xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-all duration-300"
      whileHover={{ 
        y: -10,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative h-48 sm:h-52 md:h-64 overflow-hidden">
        <div
          className="w-full h-full transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        />
        
        {/* Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 sm:gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={gitUrl}
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-purple-500 hover:bg-purple-500/20 transition-all duration-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeBracketIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </Link>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {onPreviewClick ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onPreviewClick();
                }}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-pink-500 hover:bg-pink-500/20 transition-all duration-300 cursor-pointer"
              >
                <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </button>
            ) : (
              <Link
                href={previewUrl}
                className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:border-pink-500 hover:bg-pink-500/20 transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </Link>
            )}
          </motion.div>
        </motion.div>
        
        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#181818] to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <motion.h5 
          className="text-base sm:text-xl font-bold mb-2 text-white group-hover:text-purple-400 transition-colors"
        >
          {title}
        </motion.h5>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
          {description}
        </p>
        
        {/* Tech tags */}
        <div className="mt-3 sm:mt-4 flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <span 
              key={index}
              className={`px-2.5 py-1 text-[10px] sm:text-xs rounded-full border transition-all duration-300 ${
                index % 2 === 0 
                  ? "bg-purple-500/15 text-purple-400 border-purple-500/20 hover:bg-purple-500/25" 
                  : "bg-pink-500/15 text-pink-400 border-pink-500/20 hover:bg-pink-500/25"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
