"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check element under cursor
      const target = e.target as HTMLElement;
      const cursorStyle = window.getComputedStyle(target).cursor;
      
      if (cursorStyle === "pointer") {
        setCursorVariant("pointer");
      } else if (cursorStyle === "not-allowed") {
        setCursorVariant("not-allowed");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  const variants = {
    default: { scale: 1, borderColor: "#a855f7" },
    pointer: { scale: 1.5, borderColor: "#ec4899" },
    "not-allowed": { scale: 0.8, borderColor: "#ef4444" },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 pointer-events-none z-[9999] flex items-center justify-center"
      animate={{ 
        x: mousePosition.x - 16, 
        y: mousePosition.y - 16,
        ...variants[cursorVariant as keyof typeof variants]
      }}
      transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-2 h-2 rounded-full bg-pink-500" />
    </motion.div>
  );
};

export default CustomCursor;
