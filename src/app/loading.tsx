"use client";
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0e0e0e]">
      {/* Animated Rings */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-transparent border-t-indigo-500 border-r-teal-500"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-transparent border-b-teal-500 border-l-indigo-500"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-indigo-500 to-teal-500"
          animate={{
            boxShadow: [
              "0 0 10px 3px rgba(99,102,241,0.4)",
              "0 0 20px 6px rgba(20,184,166,0.6)",
              "0 0 10px 3px rgba(99,102,241,0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* FN Text */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        FN
      </motion.h1>

      {/* Shimmer Loading Bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Loading;
