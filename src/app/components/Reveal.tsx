"use client";
import React from "react";
import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  direction?: "left" | "right" | "up";
  delay?: number;
  className?: string;
};

const Reveal = ({ children, direction = "up", delay = 0, className = "" }: RevealProps) => {
  const hidden =
    direction === "left"
      ? { opacity: 0, x: -64, y: 0 }
      : direction === "right"
        ? { opacity: 0, x: 64, y: 0 }
        : { opacity: 0, x: 0, y: 44 };

  return (
    <motion.div
      initial={{ ...hidden, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.75, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
