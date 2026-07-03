"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import TerminalModal from "./TerminalModal";

const projectsData = [
  {
    id: 1,
    title: "The Embroidery Atelier",
    description: "A premium, fully responsive e-commerce platform dedicated to the art of handcrafted embroidery. Built for elegance and high conversion.",
    image: "/embroidery.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Fatimahnoman/The-Embroidery-Atelier",
    previewUrl: "https://the-embroidery-atelier.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
  },
  {
    id: 2,
    title: "AI Humanoid Robotics Textbook",
    description: "An AI-powered interactive platform for learning Physical AI and Humanoid Robotics, featuring a RAG-based chatbot for educational support.",
    image: "/Book%20image.png",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/Hack01-Physical-AI-Humanoid-Robotics-TextBook-With-Chatbot",
    previewUrl: "https://hack01-physical-ai-humanoid-robotic-eta.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "RAG Chatbot", "OpenRouter"],
  },
  {
    id: 3,
    title: "Intelligent Bibliographic Ecosystem",
    description: "A modern, web-based Python application to manage your personal book collection with an intuitive interface and interactive visualizations.",
    image: "/booklibrary.png",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/Personal_Library_Manager",
    previewUrl: "https://personallibrarymanager-qbs6yru2nqftb7laufkpqs.streamlit.app/",
    techStack: ["Python", "Streamlit", "Pandas", "Data Vis"],
  },
  {
    id: 4,
    title: "Precision Countdown Timer",
    description: "A sleek and functional timer application built with Streamlit, designed for precision time tracking and productivity management.",
    image: "/timer.png",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/Countdown-Timer",
    previewUrl: "https://countdown-timer-kopdyqzaiz8xvwu76v5yrt.streamlit.app/",
    techStack: ["Python", "Streamlit", "CSS styling"],
  },
  {
    id: 5,
    title: "OOP CLI Calc Suite",
    description: "A professional-grade terminal-based calculator using Object-Oriented Programming (OOP) for robust mathematical processing.",
    image: "/Calculator.jpg",
    tag: ["All", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/Python_Calculator",
    previewUrl: "terminal-mockup",
    techStack: ["Python", "OOP", "CLI Interface"],
  },
  {
    id: 6,
    title: "Interactive Hangman Game",
    description: "A sleek, modern, and interactive Hangman Game with a graphical interface, fully responsive and web-ready via GitHub Pages.",
    image: "/Hangman%20pic.webp",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/Hangman_Game",
    previewUrl: "https://fatimahnoman.github.io/Hangman_Game/",
    techStack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
  },
  {
    id: 7,
    title: "StudiesHelper Agent",
    description: "An intelligent multi-agent system built with OpenAI Agents SDK, featuring specialized agents for study reminders and motivation.",
    image: "/Agenthelper.jpg",
    tag: ["All", "Agents"],
    gitUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    previewUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    techStack: ["OpenAI SDK", "Python", "Multi-Agent System"],
  },
  {
    id: 8,
    title: "Dynamic Story Generator",
    description: "An interactive, web-based word game that prompts users for input to dynamically construct humorous and creative stories in real-time.",
    image: "/story_generator.png",
    tag: ["All", "Web", "Python"],
    gitUrl: "https://github.com/Fatimahnoman/MadLibs_Game",
    previewUrl: "https://mad-libs-game-zeta.vercel.app/",
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Vercel"],
  },
  {
    id: 9,
    title: "WellnessOracle Agent",
    description: "An intelligent multi-agent AI system powered by Google Gemini, featuring specialized agents for nutrition guidance, injury support, workout planning, and goal tracking.",
    image: "/wellness_agent.jpg",
    tag: ["All", "Agents"],
    gitUrl: "https://github.com/Fatimahnoman/Health_Wellness_Agent",
    previewUrl: "wellness-terminal",
    techStack: ["Python", "Gemini API", "Multi-Agent", "Guardrails"],
  },
  {
    id: 10,
    title: "Crown Carat Ring Boutique",
    description: "A luxury, premium e-commerce web platform showcasing exquisite rings, designed with a sleek user interface, smooth transitions, and high-end aesthetics.",
    image: "/crown_carat.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Fatimahnoman/Crown-Carat-Ring-Boutique",
    previewUrl: "https://crown-carat-ring-boutique.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    id: 11,
    title: "Snake Game",
    description: "A classic snake game redeployed on Vercel with smooth controls and responsive design for web play.",
    image: "/snake-game.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/Fatimahnoman/Snake-Game",
    previewUrl: "https://snake-game-one-pearl.vercel.app/",
    techStack: ["JavaScript", "HTML", "CSS", "Vercel"],
  },
  {
  id: 12,
  title: "Whack-a-Mole Game",
  description: "A fun and interactive arcade-style Whack-a-Mole game featuring responsive gameplay, score tracking, and smooth animations, deployed on Vercel for seamless web access.",
  image: "/whack_a_mole.png",
  tag: ["All", "Web"],
  gitUrl: "https://github.com/Fatimahnoman/Whack-a-Mole-Game",
  previewUrl: "https://whack-a-mole-game-flax.vercel.app/",
  techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
  {
  id: 13,
  title: "Crema Coffee Landing Page",
  description: "A modern and visually appealing coffee shop landing page with a premium UI, smooth animations, responsive design, and fast performance, deployed on Vercel.",
  image: "/crema-image.png",
  tag: ["All", "Web"],
  gitUrl: "https://github.com/Fatimahnoman/Crema-Coffee-Landing-Page",
  previewUrl: "https://crema-coffee-landing-page.vercel.app/",
  techStack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Vercel"],
},

{
  id: 14,
  title: "AI Mini Textbook",
  description: "An interactive AI learning platform designed to explain artificial intelligence concepts in a clear and engaging way, featuring a clean interface, responsive layout, and optimized performance.",
  image: "/Mini-Textbook.png",
  tag: ["All", "Web"],
  gitUrl: "https://github.com/Fatimahnoman/AI-Mini-Textbook",
  previewUrl: "https://ai-mini-textbook.vercel.app/",
  techStack: ["HTML", "CSS", "JavaScript", "AI", "Vercel"],
},

{
  id: 15,
  title: "Portfolio V2",
  description: "A modern AI Developer portfolio showcasing projects, skills, achievements, and contact information with responsive design, smooth animations, and optimized user experience.",
  image: "/FN-V2-image.png",
  tag: ["All", "Web"],
  gitUrl: "https://github.com/Fatimahnoman/FN-Portfolio-V2",
  previewUrl: "https://fn-portfolio-v2.vercel.app/",
  techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
},
];

const ProjectSection = () => {
  const [tag, setTag] = useState("All");
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [terminalType, setTerminalType] = useState<"calculator" | "studies-helper" | "wellness-agent">("calculator");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        delay: i * 0.1 
      }
    }),
  };

  return (
    <section
      id="project"
      className="relative bg-[#0e0e0e] py-16 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 text-white overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-48 h-48 sm:w-96 sm:h-96 bg-indigo-500/5 rounded-full filter blur-3xl -translate-x-1/2 -z-10" />
      
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
            <span className="text-gray-300">Recent Work</span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-500 mb-3 sm:mb-4">
            My Projects
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto px-2">
            Explore my latest projects and experiments in web development, AI, and more.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <ProjectTag
            onClick={handleTagChange}
            name="All"
            isSelected={tag === "All"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Web"
            isSelected={tag === "Web"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Python"
            isSelected={tag === "Python"}
          />
          <ProjectTag
            onClick={handleTagChange}
            name="Agents"
            isSelected={tag === "Agents"}
          />
        </motion.div>

        {/* Projects Grid */}
        <motion.ul
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imgUrl={project.image}
                gitUrl={project.gitUrl}
                previewUrl={project.previewUrl === "terminal-mockup" || project.previewUrl === "wellness-terminal" ? "#" : project.previewUrl}
                techStack={project.techStack}
                onPreviewClick={
                    project.previewUrl === "terminal-mockup" 
                    ? () => { setTerminalType("calculator"); setIsTerminalOpen(true); } 
                    : project.id === 7 
                    ? () => { setTerminalType("studies-helper"); setIsTerminalOpen(true); }
                    : project.previewUrl === "wellness-terminal"
                    ? () => { setTerminalType("wellness-agent"); setIsTerminalOpen(true); }
                    : undefined
                }
              />
            </motion.div>
          ))}
        </motion.ul>
      </div>

      <TerminalModal 
        isOpen={isTerminalOpen} 
        onClose={() => setIsTerminalOpen(false)}
        projectType={terminalType}
      />
    </section>
  );
};

export default ProjectSection;
