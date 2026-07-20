"use client";
import React from "react";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 3D Rotating Ring */}
      <motion.div
        className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-transparent border-t-purple-500 border-r-violet-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Ring rotating opposite direction */}
      <motion.div
        className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-transparent border-b-blue-500 border-l-violet-500"
        animate={{ rotate: -360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Center dot with glow */}
      <motion.div
        className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-purple-500 to-violet-500"
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(99, 102, 241, 0.4)",
            "0 0 16px 4px rgba(20, 184, 166, 0.6)",
            "0 0 8px 2px rgba(99, 102, 241, 0.4)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* FN Text */}
      <motion.span
        className="ml-8 text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-purple-400"
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      >
        FN
      </motion.span>
    </motion.div>
  );
};

export default Logo;
