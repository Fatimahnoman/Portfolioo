"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SpotlightCard from "./SpotlightCard";
import SectionHeader from "./SectionHeader";

const stats = {
  projects: { label: "Projects Built", value: 16, suffix: "+", icon: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" },
  tech: { label: "Technologies", value: 15, suffix: "+", icon: "M11.42 15.17l-5.1-3.4a.75.75 0 010-1.24l5.1-3.4a.75.75 0 011.18.59v6.86a.75.75 0 01-1.18.59zM17.25 15.17l-5.1-3.4a.75.75 0 010-1.24l5.1-3.4a.75.75 0 011.18.59v6.86a.75.75 0 01-1.18.59z" },
  repos: { label: "GitHub Repos", value: 25, suffix: "+", icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" },
  hackathons: { label: "Hackathons", value: 3, suffix: "+", icon: "M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0116.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.015 6.015 0 01-3.52 1.108m3.52-1.108a6.015 6.015 0 00-3.52-1.108m0 0H12m6.25 0V2.721" },
};

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(target);
      return;
    }

    let start: number | null = null;
    const duration = 2000;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const StatIcon = ({ d }: { d: string }) => (
  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:border-violet-500/30 transition-colors duration-300">
    <svg className="w-5 h-5 text-gray-500 group-hover:text-violet-400 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d={d} />
    </svg>
  </div>
);

const commitBars = [38, 62, 45, 80, 55, 92, 70];

const StatsSection = () => {
  return (
    <section className="relative bg-[#070512] py-20 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/[0.02] via-transparent to-fuchsia-500/[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-500/5 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <SectionHeader
          index="01"
          label="By The Numbers"
          titleA="Impact"
          titleB="& Achievements"
        />

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Projects — featured tile */}
          <motion.div
            initial={{ opacity: 0, x: -64, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="col-span-2"
          >
            <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 sm:p-7 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden">
              <div className="relative flex flex-col h-full">
                <StatIcon d={stats.projects.icon} />
                <p className="relative mt-auto pt-6 text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400 mb-2 leading-none">
                  <CountUp target={stats.projects.value} suffix={stats.projects.suffix} />
                </p>
                <p className="text-white text-sm sm:text-base font-semibold">{stats.projects.label}</p>
                <p className="text-gray-600 text-xs mt-1">Production-ready apps shipped end-to-end</p>
              </div>
              <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-violet-500/[0.06] rounded-full blur-2xl" />
            </SpotlightCard>
          </motion.div>

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 64, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
          >
            <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden">
              <div className="relative flex flex-col items-center justify-center h-full gap-2 py-2">
                <StatIcon d={stats.tech.icon} />
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400 leading-none">
                  <CountUp target={stats.tech.value} suffix={stats.tech.suffix} />
                </p>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">{stats.tech.label}</p>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* GitHub */}
          <motion.div
            initial={{ opacity: 0, x: -64, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.2, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
          >
            <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 sm:p-6 text-center transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden">
              <div className="relative flex flex-col items-center justify-center h-full gap-2">
                <StatIcon d={stats.repos.icon} />
                <p className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400 leading-none">
                  <CountUp target={stats.repos.value} suffix={stats.repos.suffix} />
                </p>
                <p className="text-gray-500 text-xs sm:text-sm font-medium">{stats.repos.label}</p>
                <div className="flex items-end gap-1 h-5 pt-1 w-full justify-center">
                  {commitBars.map((h, i) => (
                    <motion.span
                      key={i}
                      initial={{ height: 2 }}
                      whileInView={{ height: `${h * 0.2}px` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                      className={`w-1.5 rounded-sm ${i % 2 === 0 ? "bg-violet-500/50" : "bg-fuchsia-500/40"}`}
                    />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Hackathons — wide tile with badges */}
          <motion.div
            initial={{ opacity: 0, x: 64, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.3, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="col-span-2"
          >
            <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-violet-500/30 rounded-2xl p-5 sm:p-7 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 overflow-hidden">
              <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 h-full">
                <StatIcon d={stats.hackathons.icon} />
                <div className="flex-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-violet-400 to-fuchsia-400 mb-1 leading-none">
                    <CountUp target={stats.hackathons.value} suffix={stats.hackathons.suffix} />
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium mb-3">{stats.hackathons.label}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-violet-500/15 text-violet-400 text-[10px] sm:text-xs font-bold border border-violet-500/20 uppercase tracking-wider">Top 10 Finalist</span>
                    <span className="px-2.5 py-1 rounded-lg bg-fuchsia-500/15 text-fuchsia-400 text-[10px] sm:text-xs font-bold border border-fuchsia-500/20 uppercase tracking-wider">Best AI Project</span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Live status flair tile */}
          <motion.div
            initial={{ opacity: 0, y: 44, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: 0.4, duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
            whileHover={{ y: -4 }}
            className="col-span-2"
          >
            <SpotlightCard className="h-full bg-[#120e20] border border-white/[0.06] hover:border-emerald-500/25 rounded-2xl p-5 sm:p-6 transition-all duration-500 overflow-hidden">
              <div className="relative flex items-center gap-4 h-full">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="font-mono text-left">
                  <p className="text-emerald-400 text-xs sm:text-sm">agents_online: <span className="text-white">true</span></p>
                  <p className="text-gray-600 text-[10px] sm:text-xs mt-1">{"// always building something new"}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
