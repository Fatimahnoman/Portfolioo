"use client";
import React from "react";
import Link from "next/link";
import { FaGithub, FaEnvelope, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { title: "Quick Links", links: [
      { label: "Home", href: "#", external: false },
      { label: "About", href: "#about", external: false },
      { label: "Experience", href: "#experience", external: false },
      { label: "Skills", href: "#skill", external: false },
      { label: "Projects", href: "#project", external: false },
    ]},
      { title: "Connect", links: [
        { label: "X (Twitter)", href: "https://x.com/FatimahBuildsAI", external: true },
        { label: "GitHub", href: "https://github.com/Fatimahnoman", external: true },
        { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=fatimahnoman452@gmail.com", external: true },
        { label: "Facebook", href: "https://www.facebook.com/share/1Bx8NV5RLU/", external: true },
        { label: "Instagram", href: "https://www.instagram.com/fatimah_builds_ai", external: true },
    ]},
  ];

  return (
    <motion.footer 
      className="relative bg-gradient-to-t from-[#050508] to-[#070512] text-white pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 border-t border-white/[0.06]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* Brand Section */}
          <div className="sm:col-span-2">
            <motion.div
              className="mb-3 sm:mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-600 mb-1 sm:mb-2">
                Fatimah Noman
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm">
                Founder of{" "}
                <a
                  href="https://www.sflyra.site/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 underline decoration-violet-400/30 underline-offset-2 transition-colors"
                >
                  SFlyra Labs
                </a>{" "}
                · Full Stack Developer &amp; AI Specialist
              </p>
            </motion.div>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 max-w-md">
              Founder of SFlyra Labs — building intelligent AI systems, automation, and seamless digital experiences.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-3 sm:gap-4">
              <motion.a
                href="https://x.com/FatimahBuildsAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fatimah Noman on X (Twitter)"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-500 hover:border-fuchsia-500 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.facebook.com/share/1Bx8NV5RLU/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fatimah Noman on Facebook"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-600 hover:border-fuchsia-600 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://github.com/Fatimahnoman"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fatimah Noman on GitHub"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300"
              >
                <FaGithub size={16} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/fatimayy-n/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fatimah Noman on LinkedIn"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-sky-400 hover:border-sky-500 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/fatimah_builds_ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fatimah Noman on Instagram"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-500 hover:border-fuchsia-500 transition-all duration-300"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </motion.a>
              <motion.a
                href="mailto:fatimahnoman452@gmail.com"
                aria-label="Email Fatimah Noman"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-fuchsia-500 hover:border-fuchsia-500 transition-all duration-300"
              >
                <FaEnvelope size={16} />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{footerLinks[0].title}</h4>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">{footerLinks[1].title}</h4>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-gray-400 hover:text-violet-400 transition-colors text-xs sm:text-sm"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              &copy; {currentYear} Fatimah Noman. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs sm:text-sm flex items-center gap-2">
              Made with <FaHeart className="text-fuchsia-500" size={12} /> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
