"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";

const Heamberction = () => {
  return (
    <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0a0a0f] overflow-hidden">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[180px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-amber-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-500/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-7xl mx-auto w-full">
        {/* ── Left Content ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left"
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-amber-500/[0.07] border border-amber-500/20 mb-6 sm:mb-8 backdrop-blur-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400 text-xs sm:text-sm font-medium">Available for opportunities</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-white mb-5 sm:mb-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1]">
            <span className="text-gray-500 text-lg sm:text-xl md:text-2xl font-medium block mb-3">
              Hello, I&apos;m
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400">
              Fatimah Noman
            </span>
          </h1>

          {/* Type animation */}
          <div className="h-10 sm:h-12 mb-5 sm:mb-6 flex items-center justify-center lg:justify-start">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-300 mr-2">I&apos;m a</span>
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "AI Engineer",
                2000,
                "UI/UX Designer",
                2000,
                "Automation Specialist",
                2000,
              ]}
              wrapper="span"
              speed={40}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-400 font-bold"
            />
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10">
            Building{" "}
            <span className="text-amber-400 font-semibold">intelligent AI systems</span>{" "}
            that work for you. Focused on{" "}
            <span className="text-amber-400 font-semibold">agentic AI</span>, automation, and
            solutions that transform businesses.
          </p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/#contact"
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-white hover:from-amber-500 hover:via-amber-400 hover:to-yellow-400 transition-all duration-500 text-sm sm:text-base font-semibold shadow-xl shadow-amber-500/30 hover:shadow-amber-500/40 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                Let&apos;s Talk
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Link>

            <Link
              href="/#project"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.04] border border-amber-500/20 text-gray-300 hover:text-white hover:bg-amber-500/10 hover:border-amber-500/40 transition-all duration-500 text-sm sm:text-base font-medium backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>
              View Projects
            </Link>

            <a
              href="/MyResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.04] border border-amber-500/20 text-gray-300 hover:text-white hover:bg-amber-500/10 hover:border-amber-500/40 transition-all duration-500 text-sm sm:text-base font-medium backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
              Resume
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex items-center gap-3 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <a href="https://x.com/FatimahBuildsAI" target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-amber-500/15 flex items-center justify-center hover:bg-amber-500/15 hover:border-amber-500/40 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="https://github.com/Fatimahnoman" target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-amber-500/15 flex items-center justify-center hover:bg-amber-500/15 hover:border-amber-500/40 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.084-.73.084-.73 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.303-5.466-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a href="https://www.facebook.com/share/1Bx8NV5RLU/" target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-amber-500/15 flex items-center justify-center hover:bg-yellow-500/15 hover:border-yellow-500/40 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="https://www.instagram.com/fatimah_builds_ai?utm_source=qr&igsh=MTFrYzdka3U0djF5Nw==" target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-amber-500/15 flex items-center justify-center hover:bg-yellow-500/15 hover:border-yellow-500/40 transition-all duration-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-yellow-400 transition-colors">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fatimahnoman452@gmail.com" target="_blank" rel="noopener noreferrer"
              className="group w-10 h-10 rounded-xl bg-white/[0.04] border border-amber-500/15 flex items-center justify-center hover:bg-amber-500/15 hover:border-amber-500/40 transition-all duration-300">
              <svg className="w-4 h-4 text-gray-500 group-hover:text-amber-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
            </a>
          </motion.div>
        </motion.div>

        {/* ── Right Image ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div className="absolute -inset-6 bg-gradient-to-r from-amber-500/25 via-amber-500/15 to-yellow-500/25 rounded-full blur-3xl animate-pulse" style={{ animationDuration: "4s" }} />

            {/* Rotating border */}
            <motion.div
              className="absolute -inset-3 rounded-full"
              style={{
                background: "conic-gradient(from 0deg, transparent, #f59e0b, transparent, #facc15, transparent, #fbbf24, transparent)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />

            {/* Second rotating ring (opposite direction) */}
            <motion.div
              className="absolute -inset-5 rounded-full opacity-30"
              style={{
                background: "conic-gradient(from 180deg, transparent, #facc15, transparent, #f59e0b, transparent)",
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            />

            {/* Image container */}
            <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full bg-[#0a0a0f] p-2">
              <Image
                src="/my.jpg"
                alt="Fatimah Noman"
                className="w-full h-full rounded-full object-cover"
                width={360}
                height={360}
                priority
              />
            </div>

            {/* Floating tech badges */}
            <motion.div
              className="absolute -right-2 top-1/4 px-3 py-1.5 rounded-lg bg-[#12121a] border border-amber-500/25 text-xs font-mono text-amber-400 shadow-lg shadow-amber-500/10"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Next.js
            </motion.div>
            <motion.div
              className="absolute -left-2 top-1/2 px-3 py-1.5 rounded-lg bg-[#12121a] border border-amber-500/25 text-xs font-mono text-amber-400 shadow-lg shadow-amber-500/10"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              Python
            </motion.div>
            <motion.div
              className="absolute -right-2 bottom-1/4 px-3 py-1.5 rounded-lg bg-[#12121a] border border-yellow-500/25 text-xs font-mono text-yellow-400 shadow-lg shadow-yellow-500/10"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
              AI/ML
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-gray-600 text-[10px] font-mono uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Heamberction;
