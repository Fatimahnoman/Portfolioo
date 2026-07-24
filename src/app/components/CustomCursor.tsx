"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check element under cursor
      const target = e.target as HTMLElement;
      if (target) {
        const cursorStyle = window.getComputedStyle(target).cursor;
        if (cursorStyle === "pointer") {
          setCursorVariant("pointer");
        } else if (cursorStyle === "not-allowed") {
          setCursorVariant("not-allowed");
        } else {
          setCursorVariant("default");
        }
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      setMousePosition({ x: touch.clientX, y: touch.clientY });
      setIsVisible(true);

      const target = touch.target as HTMLElement;
      if (target) {
        const isInteractive = target.closest("a, button, [role='button'], input, textarea, select");
        if (isInteractive) {
          setCursorVariant("pointer");
        } else {
          setCursorVariant("default");
        }
      }
    };

    const handleTouchEnd = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  const variants = {
    default: { scale: 1, borderColor: "#f59e0b" },
    pointer: { scale: 1.5, borderColor: "#facc15" },
    "not-allowed": { scale: 0.8, borderColor: "#ef4444" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] flex items-center justify-center"
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
      <div className="w-2 h-2 rounded-full bg-amber-400" />
    </motion.div>
  );
};

export default CustomCursor;
