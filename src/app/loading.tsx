"use client";
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0e0e0e]">
      {/* Animated Rings */}
      <div className="relative flex items-center justify-center mb-8">
        <motion.div
          className="absolute w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-transparent border-t-gold border-r-gold"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-transparent border-b-gold border-l-gold"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-gradient-to-r from-gold-deep via-gold to-gold-light"
          animate={{
            boxShadow: [
              "0 0 10px 3px rgba(212, 175, 55, 0.4)",
              "0 0 20px 6px rgba(244, 228, 188, 0.6)",
              "0 0 10px 3px rgba(212, 175, 55, 0.4)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      {/* FN Text */}
      <motion.h1
        className="text-4xl md:text-6xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-gold-deep mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        FN
      </motion.h1>

      {/* Shimmer Loading Bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-deep via-gold to-gold-light rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Loading;
