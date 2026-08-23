"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOOT_LINES = [
  "> initializing agents...",
  "> loading neural pathways...",
  "> connecting tools & guardrails...",
  "> system ready",
];

const Preloader = () => {
  const [done, setDone] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const lineTimer = setInterval(() => setLineCount((c) => Math.min(c + 1, BOOT_LINES.length)), 400);
    const endTimer = setTimeout(() => setDone(true), BOOT_LINES.length * 400 + 700);
    return () => {
      clearInterval(lineTimer);
      clearTimeout(endTimer);
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] bg-[#070512] flex items-center justify-center"
        >
          <div className="w-[280px] sm:w-[340px]">
            <div className="flex items-center gap-3 mb-8">
              <motion.div
                className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </motion.div>
              <div>
                <p className="text-white text-sm font-semibold">Fatimah Noman</p>
                <p className="text-gray-600 text-[11px] font-mono">AI SYSTEM v2.0</p>
              </div>
            </div>

            <div className="space-y-2 mb-7 min-h-[104px]">
              {BOOT_LINES.slice(0, lineCount + 1).map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`font-mono text-xs ${
                    i === BOOT_LINES.length - 1 ? "text-emerald-400" : "text-gray-500"
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <div className="h-[3px] w-full rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-400 transition-all duration-300 ease-out"
                style={{ width: `${(lineCount / BOOT_LINES.length) * 100}%` }}
              />
            </div>
            <p className="mt-3 text-right font-mono text-[10px] text-gray-600">
              {Math.min(Math.round((lineCount / BOOT_LINES.length) * 100), 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
