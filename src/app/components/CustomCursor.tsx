"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const hasTouch = window.matchMedia("(hover: none)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hasTouch || prefersReduced) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    let rafId: number | null = null;
    let lastTarget: Element | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
        rafId = null;
      });

      const target = e.target as HTMLElement;
      if (target && target !== lastTarget) {
        lastTarget = target;
        const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
        const cursorStyle = window.getComputedStyle(target).cursor;
        if (cursorStyle === "not-allowed") {
          setCursorVariant("not-allowed");
        } else if (cursorStyle === "pointer" || isInteractive) {
          setCursorVariant("pointer");
        } else {
          setCursorVariant("default");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const variants = {
    default: { scale: 1, borderColor: "#8b5cf6" },
    pointer: { scale: 1.5, borderColor: "#d946ef" },
    "not-allowed": { scale: 0.8, borderColor: "#ef4444" },
  };

  if (!isEnabled) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9998] flex items-center justify-center"
      animate={{ 
        x: mousePosition.x - 16, 
        y: mousePosition.y - 16,
        opacity: isVisible ? 1 : 0,
        ...variants[cursorVariant as keyof typeof variants]
      }}
      transition={{ 
        x: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        y: { type: "spring", stiffness: 500, damping: 28, mass: 0.5 },
        opacity: { duration: 0.2 },
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
    >
      <div className="w-2 h-2 rounded-full bg-violet-400" />
    </motion.div>
  );
};

export default CustomCursor;
