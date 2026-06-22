"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen lg:py-10 py-16 px-4 sm:px-6 md:px-12 lg:px-24 bg-[#0e0e0e] overflow-hidden">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 sm:-top-40 sm:-right-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 sm:-bottom-40 sm:-left-40 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:col-span-7 order-2 lg:order-1 place-self-center text-center lg:text-left px-2 sm:px-4 md:px-0 md:pl-4 lg:pl-8"
        >
          <motion.div
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-4 sm:mb-6 backdrop-blur-sm text-xs sm:text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-gray-300">👋 Welcome to my portfolio</span>
          </motion.div>

          <h1 className="text-white mb-4 sm:mb-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-400 to-indigo-400">
              Hello, I&apos;m{" "}
            </span>
            <br />
            <TypeAnimation
              sequence={[
                "Fatimah Noman",
                1000,
                "Full Stack Developer",
                1000,
                "UI/UX Designer",
                1000,
                "Automation Specialist",
                1000,
                "AI Enthusiast",
                1000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-500 block sm:inline"
            />
          </h1>

          <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl mt-3 sm:mt-4 max-w-2xl leading-relaxed mx-auto lg:mx-0 px-2 sm:px-0">
            Building <span className="text-indigo-400 font-medium">Intelligent AI Systems</span> That Work For You. 
            Focused on <span className="text-teal-400 font-medium">Agentic AI</span>, automation, and intelligent solutions that transform businesses.
          </p>

          <motion.div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/#contact"
              className="group relative px-6 py-3 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-teal-500 hover:to-indigo-600 transition-all duration-300 text-base sm:text-lg font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 overflow-hidden"
            >
              <span className="relative z-10">Hire Me</span>
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-teal-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <Link
              href="/MyResume.pdf"
              download
              className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-indigo-500 text-indigo-400 hover:text-white hover:bg-indigo-500/20 hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 text-base sm:text-lg font-medium backdrop-blur-sm"
            >
              Download CV
            </Link>
            <Link
              href="/MyResume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group px-6 py-3 sm:px-8 sm:py-4 rounded-full border-2 border-teal-500 text-teal-400 hover:text-white hover:bg-teal-500/20 hover:shadow-lg hover:shadow-teal-500/30 transition-all duration-300 text-base sm:text-lg font-medium backdrop-blur-sm"
            >
              View CV
            </Link>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-gray-400 text-xs sm:text-sm">Follow me:</span>
            <motion.a
              href="https://x.com/noman62987"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-400 transition-all duration-300 text-xs sm:text-sm"
            >
              X
            </motion.a>
            <motion.a
              href="https://github.com/Fatimahnoman"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all duration-300 text-xs sm:text-sm"
            >
              GH
            </motion.a>
            <motion.a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=fatimahnoman452@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, y: -2 }}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-teal-400 hover:border-teal-400 transition-all duration-300 text-xs sm:text-sm"
            >
              <FaEnvelope size={16} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:col-span-5 order-1 lg:order-2 place-self-center mt-6 sm:mt-0"
        >
          <motion.div 
            className="rounded-full w-[200px] h-[200px] xs:w-[250px] xs:h-[250px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[350px] lg:h-[350px] relative"
            animate={{ 
              boxShadow: [
                "0 0 20px 5px rgba(99, 102, 241, 0.3)",
                "0 0 40px 10px rgba(20, 184, 166, 0.4)",
                "0 0 20px 5px rgba(99, 102, 241, 0.3)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Rotating ring around image */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-500/50"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="rounded-full w-full h-full overflow-hidden absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 p-2 flex items-center justify-center">
              <Image
                src="/my.jpg"
                alt="Fatimah Noman - Full Stack Developer"
                className="rounded-full object-cover aspect-square"
                width={350}
                height={350}
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5 sm:p-2">
          <motion.div 
            className="w-1 h-1.5 sm:h-2 bg-white rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
