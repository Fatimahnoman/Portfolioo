"use client";
import React, { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { motion, useInView } from "framer-motion";

const gamesData = [
  {
    id: 6,
    title: "Interactive Hangman Game",
    description: "A sleek, modern, and interactive Hangman Game with a graphical interface, fully responsive and web-ready via GitHub Pages.",
    image: "/Hangman%20pic.webp",
    tag: ["All", "Web", "Python", "Games"],
    gitUrl: "https://github.com/Fatimahnoman/Hangman_Game",
    previewUrl: "https://fatimahnoman.github.io/Hangman_Game/",
    techStack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
  },
  {
    id: 8,
    title: "Dynamic Story Generator",
    description: "An interactive, web-based word game that prompts users for input to dynamically construct humorous and creative stories in real-time.",
    image: "/story_generator.png",
    tag: ["All", "Web", "Python", "Games"],
    gitUrl: "https://github.com/Fatimahnoman/MadLibs_Game",
    previewUrl: "https://mad-libs-game-zeta.vercel.app/",
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Vercel"],
  },
  {
    id: 11,
    title: "Snake Game",
    description: "A classic snake game redeployed on Vercel with smooth controls and responsive design for web play.",
    image: "/snake-game.png",
    tag: ["All", "Web", "Games"],
    gitUrl: "https://github.com/Fatimahnoman/Snake-Game",
    previewUrl: "https://snake-game-one-pearl.vercel.app/",
    techStack: ["JavaScript", "HTML", "CSS", "Vercel"],
  },
  {
    id: 12,
    title: "Whack-a-Mole Game",
    description: "A fun and interactive arcade-style Whack-a-Mole game featuring responsive gameplay, score tracking, and smooth animations, deployed on Vercel for seamless web access.",
    image: "/whack_a_mole.png",
    tag: ["All", "Web", "Games"],
    gitUrl: "https://github.com/Fatimahnoman/Whack-a-Mole-Game",
    previewUrl: "https://whack-a-mole-game-flax.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
];

const GameSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.15,
      },
    }),
  };

  return (
    <section
      id="games"
      className="relative bg-[#0e0e0e] py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/5 rounded-full filter blur-3xl translate-x-1/2 -z-10" />
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-72 sm:h-72 bg-pink-500/5 rounded-full filter blur-3xl -translate-x-1/2 -z-10" />

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 border border-white/10 mb-3 sm:mb-4 text-xs sm:text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span className="text-purple-400">Fun & Interactive</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-3 sm:mb-4">
            Game Zone
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Check out the games I have built! From classic arcade to word games.
          </p>
        </motion.div>

        {/* Games Grid */}
        <motion.ul
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {gamesData.map((game, index) => (
            <motion.div
              key={game.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <ProjectCard
                title={game.title}
                description={game.description}
                imgUrl={game.image}
                gitUrl={game.gitUrl}
                previewUrl={game.previewUrl}
                techStack={game.techStack}
              />
            </motion.div>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default GameSection;
