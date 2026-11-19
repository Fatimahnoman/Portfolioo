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
      {/* 3D rotating gold ring */}
      <motion.div
        className="absolute w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-transparent border-t-gold border-r-gold-deep"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner ring rotating opposite direction */}
      <motion.div
        className="absolute w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-transparent border-b-gold-light border-l-gold"
        animate={{ rotate: -360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Center dot with gold glow */}
      <motion.div
        className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-gold-light to-gold-deep"
        animate={{
          boxShadow: [
            "0 0 8px 2px rgba(212, 175, 55, 0.35)",
            "0 0 18px 5px rgba(244, 228, 188, 0.55)",
            "0 0 8px 2px rgba(212, 175, 55, 0.35)",
          ],
        }}
        transition={{ duration: 2.4, repeat: Infinity }}
      />

      {/* FN monogram */}
      <motion.span
        className="ml-8 font-display text-2xl md:text-4xl font-bold text-gold-gradient"
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
