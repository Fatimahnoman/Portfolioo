"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const recognitions = [
  {
    quote: "Fatimah built a RAG-based chatbot for our Physical AI Textbook project that handled complex robotics queries with impressive accuracy. Her approach to problem-solving and clean code structure stood out immediately.",
    name: "Project Collaborator",
    context: "Physical AI Hackathon · 2025",
    initials: "PC",
    color: "from-amber-500/20 to-yellow-500/20",
    project: "Physical AI Textbook",
  },
  {
    quote: "The StudiesHelper Agent demonstrates solid understanding of multi-agent orchestration. Clean code, well-documented, and actually useful for students preparing for exams.",
    name: "Open Source Review",
    context: "GitHub Community Feedback",
    initials: "OR",
    color: "from-yellow-500/20 to-amber-500/20",
    project: "StudiesHelper Agent",
  },
  {
    quote: "Her e-commerce projects show real attention to detail — responsive design, smooth animations, and production-ready deployment. The kind of quality you'd expect from a senior developer.",
    name: "Tech Community",
    context: "Developer Forum · 2025",
    initials: "TC",
    color: "from-amber-500/20 to-yellow-500/20",
    project: "E-Commerce Platforms",
  },
  {
    quote: "Fatimah's WellnessOracle Agent is one of the most well-structured multi-agent systems I've seen from a junior developer. The guardrails implementation is particularly thoughtful.",
    name: "AI/ML Community",
    context: "AI Solutions Review",
    initials: "AI",
    color: "from-yellow-500/20 to-amber-500/20",
    project: "WellnessOracle Agent",
  },
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % recognitions.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#0a0a0f] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-yellow-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            What People{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400">
              Say
            </span>
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Feedback from hackathons, projects, and collaborations.
          </p>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="w-10 h-px bg-gradient-to-r from-transparent to-amber-500/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <div className="w-10 h-px bg-gradient-to-l from-transparent to-yellow-500/50" />
          </div>
        </motion.div>

        {/* Card */}
        <div className="relative min-h-[320px] sm:min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.5 }}
              className="group relative bg-[#111118] border border-white/[0.06] rounded-2xl p-7 sm:p-9 md:p-10 text-center hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />

              {/* Quote mark */}
              <div className="text-5xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-amber-500/40 to-amber-500/20 mb-3 leading-none select-none">
                &ldquo;
              </div>

              <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-5 max-w-2xl mx-auto italic">
                {recognitions[current].quote}
              </p>

              {/* Project tag */}
              <div className="mb-5">
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/15">
                  {recognitions[current].project}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center justify-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${recognitions[current].color} border border-white/[0.08] flex items-center justify-center`}>
                  <span className="text-xs font-bold text-white/70">{recognitions[current].initials}</span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm sm:text-base leading-tight">{recognitions[current].name}</p>
                  <p className="text-amber-400/70 text-xs sm:text-sm">{recognitions[current].context}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-8">
          {recognitions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === current
                  ? "bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-500 w-7"
                  : "bg-white/10 hover:bg-white/20 w-2"
              }`}
              aria-label={`Go to recognition ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
