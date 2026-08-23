"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.85 }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll back to top"
          className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-xl bg-[#120e20]/90 backdrop-blur-md border border-violet-500/25 text-violet-300 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/15 flex items-center justify-center shadow-lg shadow-black/40 transition-colors duration-300 cursor-pointer"
        >
          <svg className="w-4.5 h-4.5" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
