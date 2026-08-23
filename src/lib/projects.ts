export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
  techStack: string[];
};

export const projectsData: Project[] = [
  {
    id: 16,
    title: "Blushhaven Shop",
    description: "A luxury beauty and makeup e-commerce platform featuring AI-powered skin quiz, shade finder, routine builder, product comparison, and a premium shopping experience with smooth animations.",
    image: "/Costmectic.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Blushhaven-Shop",
    previewUrl: "https://blushhaven-shop.vercel.app/",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "AI Tools", "Vercel"],
  },
  {
    id: 1,
    title: "The Embroidery Atelier",
    description: "A premium, fully responsive e-commerce platform dedicated to the art of handcrafted embroidery. Built for elegance and high conversion.",
    image: "/embroidery.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/The-Embroidery-Atelier",
    previewUrl: "https://the-embroidery-atelier.vercel.app",
    techStack: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
  },
  {
    id: 2,
    title: "AI Humanoid Robotics Textbook",
    description: "An AI-powered interactive platform for learning Physical AI and Humanoid Robotics, featuring a RAG-based chatbot for educational support.",
    image: "/Book%20image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Hack01-Physical-AI-Humanoid-Robotics-TextBook-With-Chatbot",
    previewUrl: "https://hack01-physical-ai-humanoid-robotic-eta.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "RAG Chatbot", "OpenRouter"],
  },
  {
    id: 3,
    title: "Intelligent Bibliographic Ecosystem",
    description: "A modern, web-based Python application to manage your personal book collection with an intuitive interface and interactive visualizations.",
    image: "/booklibrary.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Personal_Library_Manager",
    previewUrl: "https://personallibrarymanager-qbs6yru2nqftb7laufkpqs.streamlit.app/",
    techStack: ["Python", "Streamlit", "Pandas", "Data Vis"],
  },
  {
    id: 4,
    title: "Precision Countdown Timer",
    description: "A sleek and functional timer application built with Streamlit, designed for precision time tracking and productivity management.",
    image: "/timer.png",
    tag: ["Web", "Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Countdown-Timer",
    previewUrl: "https://countdown-timer-kopdyqzaiz8xvwu76v5yrt.streamlit.app/",
    techStack: ["Python", "Streamlit", "CSS styling"],
  },
  {
    id: 5,
    title: "OOP CLI Calc Suite",
    description: "A professional-grade terminal-based calculator using Object-Oriented Programming (OOP) for robust mathematical processing.",
    image: "/Calculator.jpg",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Python_Calculator",
    previewUrl: "terminal-mockup",
    techStack: ["Python", "OOP", "CLI Interface"],
  },
  {
    id: 6,
    title: "Interactive Hangman Game",
    description: "A sleek, modern, and interactive Hangman Game with a graphical interface, fully responsive and web-ready via GitHub Pages.",
    image: "/Hangman%20pic.webp",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Hangman_Game",
    previewUrl: "https://fatimahnoman.github.io/Hangman_Game/",
    techStack: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
  },
  {
    id: 7,
    title: "StudiesHelper Agent",
    description: "An intelligent multi-agent system built with OpenAI Agents SDK, featuring specialized agents for study reminders and motivation.",
    image: "/Agenthelper.jpg",
    tag: ["Agents"],
    gitUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    previewUrl: "https://github.com/Fatimahnoman/StudiesHelper_Agent",
    techStack: ["OpenAI SDK", "Python", "Multi-Agent System"],
  },
  {
    id: 8,
    title: "Dynamic Story Generator",
    description: "An interactive, web-based word game that prompts users for input to dynamically construct humorous and creative stories in real-time.",
    image: "/story_generator.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/MadLibs_Game",
    previewUrl: "https://mad-libs-game-zeta.vercel.app/",
    techStack: ["HTML", "Tailwind CSS", "JavaScript", "Vercel"],
  },
  {
    id: 9,
    title: "WellnessOracle Agent",
    description: "An intelligent multi-agent AI system powered by Google Gemini, featuring specialized agents for nutrition guidance, injury support, workout planning, and goal tracking.",
    image: "/wellness_agent.jpg",
    tag: ["Agents"],
    gitUrl: "https://github.com/Fatimahnoman/Health_Wellness_Agent",
    previewUrl: "wellness-terminal",
    techStack: ["Python", "Gemini API", "Multi-Agent", "Guardrails"],
  },
  {
    id: 10,
    title: "Crown Carat Ring Boutique",
    description: "A luxury, premium e-commerce web platform showcasing exquisite rings, designed with a sleek user interface, smooth transitions, and high-end aesthetics.",
    image: "/crown_carat.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Crown-Carat-Ring-Boutique",
    previewUrl: "https://crown-carat-ring-boutique.vercel.app/",
    techStack: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    id: 11,
    title: "Snake Game",
    description: "A classic snake game redeployed on Vercel with smooth controls and responsive design for web play.",
    image: "/snake-game.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Snake-Game",
    previewUrl: "https://snake-game-one-pearl.vercel.app/",
    techStack: ["JavaScript", "HTML", "CSS", "Vercel"],
  },
  {
    id: 12,
    title: "Whack-a-Mole Game",
    description: "A fun and interactive arcade-style Whack-a-Mole game featuring responsive gameplay, score tracking, and smooth animations, deployed on Vercel for seamless web access.",
    image: "/whack_a_mole.png",
    tag: ["Beginner"],
    gitUrl: "https://github.com/Fatimahnoman/Whack-a-Mole-Game",
    previewUrl: "https://whack-a-mole-game-flax.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Vercel"],
  },
  {
    id: 13,
    title: "Crema Coffee Landing Page",
    description: "A modern and visually appealing coffee shop landing page with a premium UI, smooth animations, responsive design, and fast performance, deployed on Vercel.",
    image: "/coffee-image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/Crema-Coffee-Landing-Page",
    previewUrl: "https://crema-coffee-landing-page.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive Design", "Vercel"],
  },
  {
    id: 14,
    title: "AI Mini Textbook",
    description: "An interactive AI learning platform designed to explain artificial intelligence concepts in a clear and engaging way, featuring a clean interface, responsive layout, and optimized performance.",
    image: "/Mini-Textbook.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/AI-Mini-Textbook",
    previewUrl: "https://ai-mini-textbook.vercel.app/",
    techStack: ["HTML", "CSS", "JavaScript", "AI", "Vercel"],
  },
  {
    id: 15,
    title: "Portfolio V2",
    description: "A modern AI Developer portfolio showcasing projects, skills, achievements, and contact information with responsive design, smooth animations, and optimized user experience.",
    image: "/FN-V2-image.png",
    tag: ["Web"],
    gitUrl: "https://github.com/Fatimahnoman/FN-Portfolio-V2",
    previewUrl: "https://fn-portfolio-v2.vercel.app/",
    techStack: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
];

export const isTerminalPreview = (previewUrl: string) =>
  previewUrl === "terminal-mockup" || previewUrl === "wellness-terminal";

export const getProjectById = (id: number) =>
  projectsData.find((p) => p.id === id);
