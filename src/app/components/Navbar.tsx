"use client";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  {
    title: "Home",
    path: "#",
  },
  {
    title: "About",
    path: "#about",
  },
  {
    title: "Skills",
    path: "#skill",
  },
  {
    title: "Projects",
    path: "#project",
  },
  {
    title: "Contact",
    path: "#contact",
  },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    localStorage.setItem("theme", next);
  };

  return (
    <motion.nav
      className={`fixed mx-auto top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#121212]/80 backdrop-blur-xl shadow-lg shadow-amber-500/10 border-b border-white/10"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Logo />

        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white hover:bg-white/5 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <div className="mobile-menu block md:hidden">
            {!navbarOpen ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setNavbarOpen(true)}
                className="flex items-center px-3 py-2 border rounded-lg border-slate-200/30 text-slate-200 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                aria-label="Open menu"
              >
                <Bars3Icon className="h-6 w-6" />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setNavbarOpen(false)}
                className="flex items-center px-3 py-2 border rounded-lg border-slate-200/30 text-slate-200 hover:text-white hover:border-white hover:bg-white/5 transition-all"
                aria-label="Close menu"
              >
                <XMarkIcon className="h-6 w-6" />
              </motion.button>
            )}
          </div>
        </div>

        <div className="menu hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-6 lg:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink href={link.path} title={link.title} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {navbarOpen && <MenuOverlay links={navLinks} onClose={() => setNavbarOpen(false)} />}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
