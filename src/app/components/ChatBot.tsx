"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  id: number;
  text: string;
  sender: "bot" | "user";
  timestamp: Date;
};

const greetings = [
  "Hey there! I'm Fatimah's AI assistant. I can tell you all about her skills, projects, and what she's great at. What would you like to know?",
  "Hi! Welcome to Fatimah's portfolio. I'm here to help — ask me anything about her work, experience, or skills!",
  "Hello! Curious about Fatimah? I'm her virtual assistant and I'd love to share what makes her awesome. Fire away!",
];

const knowledge: { keywords: string[]; responses: string[] }[] = [
  // ELIGIBILITY / INTERNSHIP / HIRING
  {
    keywords: ["eligible", "eligibl", "qualify", "qualification", "intern", "internship", "hiring", "hire", "position", "role", "apply", "recruit"],
    responses: [
      "Absolutely! Fatimah is highly eligible for AI and automation-related internships and roles. She has hands-on experience with OpenAI's Agents SDK, multi-agent systems, Python (advanced OOP), and full-stack development with Next.js and React. She's also participated in 3+ hackathons and has 50+ GitHub repos showcasing her work. Any company looking for someone who can build real AI systems — not just theoretical knowledge — would benefit from having her.",
      "Yes, definitely! Fatimah has the skills and drive that any automation or AI team would value. She's built autonomous AI agents, full-stack web apps, and has strong Python fundamentals. She's pursuing her BBA while simultaneously building production-level projects — that's the kind of dedication employers look for. She's open to internships, freelance work, and full-time opportunities!",
      "Fatimah would be an excellent fit for automation and AI roles. Her project portfolio includes StudiesHelper (an autonomous AI agent), WellnessOracle, Blushhaven Shop, and many more. She understands the full pipeline — from designing AI logic to deploying on Vercel. She's a fast learner, self-motivated, and always building. Definitely worth considering!",
    ],
  },
  // AUTOMATION SPECIFIC
  {
    keywords: ["automation", "automate", "automated", "workflow", "rpa", "bot", "chatbot", "agent"],
    responses: [
      "Fatimah is passionate about automation! She's built autonomous AI agents that can reason, use tools, and make decisions. Her StudiesHelper agent automates the study process, and her WellnessOracle automates health guidance. She also understands chatbot development, workflow automation, and how to design intelligent systems that save time and solve real problems.",
      "Automation is right in Fatimah's wheelhouse! She builds AI agents that automate complex tasks — from student assistance to health management. She works with OpenAI's Agents SDK for tool design, guardrails, and multi-agent orchestration. If you need someone who can build systems that work autonomously and intelligently, Fatimah is your person!",
    ],
  },
  // WHAT SHE CAN DO / CAPABILITIES
  {
    keywords: ["what can she", "what does she", "capable", "ability", "able to", "strength", "good at", "best at", "expertise", "specialize"],
    responses: [
      "Fatimah's biggest strengths are Agentic AI systems, full-stack web development, and Python engineering. She can build autonomous AI agents, design complete web applications, write clean OOP code, and deploy everything to production. What makes her special is that she combines all of this with business thinking from her BBA — she doesn't just code, she understands WHY she's building something.",
      "Fatimah excels at building intelligent, end-to-end solutions. She can architect and deploy multi-agent AI systems, create responsive full-stack web apps with Next.js and React, write production-quality Python, and handle DevOps with Docker and Vercel. She's also great at rapidly learning new technologies and applying them to real projects.",
    ],
  },
  // WHY HIRE / SELLING POINTS
  {
    keywords: ["why should", "why hire", "reason to", "sell me", "convince", "advantage", "benefit", "value"],
    responses: [
      "Here's why Fatimah stands out: She's not just another developer — she builds AI systems that work. She has 100+ projects, 50+ GitHub repos, 3+ hackathon wins, and production-level deployment experience. Plus, she's pursuing a BBA which gives her business insight that most developers lack. She's self-driven, always learning, and genuinely passionate about building things that matter.",
      "Fatimah brings a rare combination of AI expertise, full-stack development skills, and business acumen. She's built autonomous agents, e-commerce platforms, and educational tools — all deployed in production. She's the type of person who sees a problem and builds a solution, no hand-holding needed. That kind of initiative is invaluable for any team.",
    ],
  },
  // SKILLS
  {
    keywords: ["skill", "technolog", "tech stack", "what do you know", "tool", "language", "framework", "know"],
    responses: [
      "Fatimah's toolkit is pretty stacked! She works with Python (advanced OOP, async patterns), TypeScript, React, Next.js, Node.js, and Tailwind CSS. On the AI side, she's proficient with OpenAI SDK, multi-agent systems, RAG pipelines, and tool design. For deployment, she uses Docker, Vercel, and CI/CD pipelines. She's always learning something new!",
      "Let me break it down — her core skills include Python with advanced OOP patterns, Agentic AI systems using OpenAI's Agents SDK, full-stack development with Next.js and React, and deployment with Docker and Vercel. She also knows databases like PostgreSQL and has experience with Streamlit for rapid prototyping.",
    ],
  },
  // PROJECTS
  {
    keywords: ["project", "portfolio", "work", "built", "created", "application", "showcase", "demo"],
    responses: [
      "Fatimah has built some really cool projects! She created StudiesHelper — an autonomous AI agent that helps students study smarter, and WellnessOracle — a health-focused AI agent. She also built Blushhaven Shop (a full e-commerce platform), an AI Mini Textbook for educational content, and this very portfolio you're looking at! She's also participated in hackathons and has 50+ GitHub repos.",
      "Her project portfolio is diverse! From multi-agent AI systems like StudiesHelper and WellnessOracle to full-stack web apps like Blushhaven Shop and PlanThealthCare. She's also built a snake game, whack-a-mole game, and various AI-powered tools. Each project showcases her ability to handle everything from architecture to deployment.",
    ],
  },
  // AI
  {
    keywords: ["ai", "artificial intelligence", "machine learning", "agent", "agentic", "openai", "llm", "gpt"],
    responses: [
      "This is where Fatimah really shines! She's built multi-agent systems using OpenAI's Agents SDK — autonomous agents that can reason, use tools, and collaborate. She understands RAG pipelines, vector search, tool design, guardrails, and streaming. Her AI projects aren't just demos — they solve real problems like helping students study and managing wellness.",
      "Fatimah is deep into Agentic AI! She builds autonomous agents that don't just follow instructions — they think, adapt, and solve problems. She's proficient with OpenAI's Agents SDK, multi-agent orchestration, tool design, and guardrails. She's built projects like StudiesHelper and WellnessOracle that showcase real-world AI applications.",
    ],
  },
  // WEB / FULL STACK
  {
    keywords: ["web", "full stack", "fullstack", "frontend", "backend", "next", "react", "website", "node", "typescript", "tailwind"],
    responses: [
      "Fatimah is a capable full-stack developer! She builds modern web apps using Next.js, React, TypeScript, and Tailwind CSS. She handles everything from responsive UI design to API integration and deployment. Her portfolio, Blushhaven Shop, and several other projects all showcase her full-stack abilities. She deploys everything on Vercel with Docker for containerization.",
      "On the web side, Fatimah works with the Next.js ecosystem — React for components, TypeScript for type safety, Tailwind for styling, and Node.js for backend logic. She's deployed multiple production apps on Vercel and has experience with Docker for scalable architectures.",
    ],
  },
  // EDUCATION
  {
    keywords: ["education", "study", "degree", "university", "college", "bba", "qualification", "academic", "school"],
    responses: [
      "Fatimah is pursuing a Bachelor of Business Administration (BBA) because she believes the best technology needs understanding the people and businesses it serves. She completed her Intermediate in Commerce from St. Patrick's College, Karachi, and her Matriculation from St. Patrick's Girls High School. Her business education combined with her tech skills makes her uniquely valuable!",
      "She's currently doing her BBA — smart move because it gives her business acumen alongside her technical skills. She did her intermediate from St. Patrick's College in Karachi and has always been strong in analytical thinking.",
    ],
  },
  // AVAILABILITY / OPPORTUNITIES
  {
    keywords: ["available", "opportunity", "job", "work", "freelance", "employ", "join", "team", "company", "offer", "remote", "onsite"],
    responses: [
      "Fatimah is absolutely open to opportunities! Whether it's freelance work, full-time positions, or exciting collaborations — she's interested. You can reach her directly through the contact form on this portfolio or email her at fatimahnoman452@gmail.com. She's quick to respond!",
      "Yes, she's available and looking for opportunities! She's open to freelance projects, full-time roles, and collaborations. The best way to reach her is through the contact section below or by emailing fatimahnoman452@gmail.com.",
    ],
  },
  // CONTACT
  {
    keywords: ["contact", "email", "reach", "connect", "phone", "location", "where", "address", "social"],
    responses: [
      "You can reach Fatimah at fatimahnoman452@gmail.com. She's based in Karachi, Pakistan but works remotely with clients worldwide. You can also find her on GitHub (github.com/Fatimahnoman), X/Twitter (@FatimahBuildsAI), Instagram (@fatimah_builds_ai), and Facebook. Or just scroll down to the contact form!",
      "The easiest way is to email her at fatimahnoman452@gmail.com — she's very responsive! She's based in Karachi, Pakistan. You can also find her on social media or use the contact form right on this portfolio.",
    ],
  },
  // HACKATHON
  {
    keywords: ["hackathon", "competition", "event", "hack", "challenge", "win"],
    responses: [
      "Fatimah has participated in 3+ hackathons! She loves the fast-paced environment of building something meaningful in limited time. Her hackathon projects showcase her ability to think on her feet and deliver working solutions under pressure. It's where her AI and full-stack skills really come together!",
    ],
  },
  // PYTHON
  {
    keywords: ["python", "coding", "programming", "code", "oop", "object oriented"],
    responses: [
      "Python is Fatimah's first love in programming! She's mastered advanced OOP patterns, data structures, async programming, type hints, and testing. She started with Python and that obsession naturally led her to AI development. She writes clean, scalable code and loves architecting complex systems.",
    ],
  },
  // DOCKER / DEPLOY
  {
    keywords: ["docker", "deploy", "vercel", "devops", "ci", "cloud", "hosting", "server"],
    responses: [
      "Fatimah knows her way around deployment! She uses Docker for containerization, Vercel for hosting, and has experience with CI/CD pipelines. She deploys her Next.js apps on Vercel with optimized builds. She understands cloud-native architectures and scalable deployment patterns.",
    ],
  },
  // DESIGN
  {
    keywords: ["design", "ui", "ux", "figma", "css", "style", "beautiful", "responsive"],
    responses: [
      "Fatimah has a good eye for design! She works with Tailwind CSS for rapid styling and has experience building responsive, modern UIs. Her portfolio itself showcases her design sensibility — clean layouts, smooth animations with Framer Motion, and attention to detail. She believes great UX is just as important as great code.",
    ],
  },
  // DATABASE
  {
    keywords: ["database", "sql", "postgresql", "mongo", "data", "storage"],
    responses: [
      "Fatimah has experience with databases including PostgreSQL. She also works with Pandas for data manipulation in Python. She understands data modeling and how to integrate databases with full-stack applications.",
    ],
  },
  // SALARY / COMPENSATION
  {
    keywords: ["salary", "compensation", "pay", "stipend", "package", "rate", "cost", "budget", "price"],
    responses: [
      "That's something you'd need to discuss directly with Fatimah! She's flexible and open to negotiating fair compensation based on the role, scope, and value she brings. You can reach her at fatimahnoman452@gmail.com to discuss the details.",
    ],
  },
  // EXPERIENCE LEVEL
  {
    keywords: ["experience level", "fresher", "junior", "senior", "experience year", "year of exp", "how much experience"],
    responses: [
      "Fatimah is an early-career developer, but don't let that fool you — she's built 100+ projects, has 50+ GitHub repos, and has hands-on experience with AI agents, full-stack development, and deployment. She's the kind of person who learns by building, and her portfolio speaks louder than years on a resume.",
      "While Fatimah is at the beginning of her career, she's already accumulated impressive hands-on experience. She's built autonomous AI agents, full-stack web apps, participated in hackathons, and deployed production applications. She's a fast learner who turns passion into output.",
    ],
  },
  // GREETINGS
  {
    keywords: ["hello", "hi", "hey", "greetings", "sup", "how are you", "what's up"],
    responses: [
      "Hey! I'm doing great, thanks for asking! I'm Fatimah's AI assistant. Want to know about her skills, projects, or experience? I'm here to help!",
      "Hi there! I'm Fatimah's virtual assistant. I can tell you everything about her work and expertise. What interests you?",
      "Hello! Nice to meet you. I'm here to help you learn about Fatimah. Feel free to ask about anything — her skills, projects, or how to get in touch!",
    ],
  },
  // THANKS
  {
    keywords: ["thanks", "thank you", "thx", "appreciate", "helpful"],
    responses: [
      "You're welcome! If you have any more questions about Fatimah, I'm always here. And don't forget — you can reach out to her directly through the contact form!",
      "Happy to help! Let me know if there's anything else you'd like to know about Fatimah's work.",
      "Anytime! Hope I could help. Feel free to come back if more questions pop up!",
    ],
  },
  // NAME / IDENTITY
  {
    keywords: ["your name", "who are you", "what are you", "your bot", "assistant name"],
    responses: [
      "I'm Fatimah's AI portfolio assistant! Think of me as her virtual representative who can answer questions about her work, skills, and experience. Nice to meet you!",
      "I'm the AI assistant for Fatimah Noman's portfolio. I'm here to help recruiters and visitors learn about her. Ask me anything!",
    ],
  },
  // GENERAL FATIMAH
  {
    keywords: ["who", "about", "tell me about", "introduce", "profile", "describe"],
    responses: [
      "Fatimah Noman is an AI Developer and Full-Stack Engineer based in Karachi, Pakistan. She specializes in building intelligent AI systems, autonomous agents, and beautiful web applications. She's pursuing a BBA while pushing the boundaries of what AI can do — pretty impressive, right?",
      "So Fatimah is someone who lives at the intersection of code and intelligence. She started with Python, fell in love with building things, and now she's deep into Agentic AI and full-stack development. Oh, and she's also studying business — because great tech needs great strategy!",
      "Fatimah is an AI engineer and full-stack developer who's passionate about building systems that actually make a difference. She combines technical skills with business thinking, which is honestly a rare combo. Based in Karachi, always open to new challenges!",
    ],
  },
];

const fallbackResponses = [
  "That's a great question! While I primarily know about Fatimah's skills and work, let me try to help. I can tell you about her AI expertise, web development skills, projects, education, or how to contact her directly. What interests you most?",
  "Hmm, I want to give you the best answer! I'm most knowledgeable about Fatimah's technical skills, projects, and background. Try asking about her Python skills, AI projects, full-stack development, or availability for opportunities!",
  "I'd love to help with that! My expertise is in Fatimah's work and capabilities. I can share details about her projects, skills, education, or connect you with her directly. What would you like to know?",
  "Good question! Let me suggest some things I can help with — Fatimah's technical skills, her AI and automation projects, her web development experience, her education background, or how to get in touch with her!",
];

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();

  for (const entry of knowledge) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }

  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([
        { id: Date.now(), text: greeting, sender: "bot", timestamp: new Date() },
      ]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const response = getResponse(userMsg.text);
      const botMsg: Message = {
        id: Date.now() + 1,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "Are you available for hire?",
  ];

  return (
    <>
      {/* Chat Bubble Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 shadow-xl shadow-amber-500/30 flex items-center justify-center hover:shadow-amber-500/50 transition-shadow duration-300"
          >
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
            {/* Notification dot */}
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[560px] max-h-[calc(100vh-3rem)] bg-[#0d0d12] border border-white/[0.08] rounded-2xl shadow-2xl shadow-black/50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border-b border-white/[0.06] px-5 py-4 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0d0d12]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">Fatimah&apos;s Assistant</h3>
                  <p className="text-gray-500 text-xs">AI Portfolio Bot</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 border border-white/[0.06] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 scrollbar-thin">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-white rounded-br-md"
                        : "bg-white/[0.05] border border-white/[0.08] text-gray-300 rounded-bl-md"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/[0.05] border border-white/[0.08] px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-yellow-400/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-amber-400/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2 flex-shrink-0">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInput(q);
                      setTimeout(() => {
                        const userMsg: Message = {
                          id: Date.now(),
                          text: q,
                          sender: "user",
                          timestamp: new Date(),
                        };
                        setMessages((prev) => [...prev, userMsg]);
                        setInput("");
                        setIsTyping(true);
                        setTimeout(() => {
                          const response = getResponse(q);
                          setMessages((prev) => [
                            ...prev,
                            { id: Date.now() + 1, text: response, sender: "bot", timestamp: new Date() },
                          ]);
                          setIsTyping(false);
                        }, 1000);
                      }, 100);
                    }}
                    className="px-3 py-1.5 rounded-full bg-white/[0.04] border border-amber-500/20 text-gray-400 text-xs hover:text-white hover:border-amber-500/40 hover:bg-amber-500/10 transition-all duration-300"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.06] flex-shrink-0">
              <div className="flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-2 focus-within:border-amber-500/40 transition-all duration-300">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about Fatimah..."
                  className="flex-1 bg-transparent text-white text-sm placeholder-gray-600 focus:outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:from-amber-400 hover:to-yellow-400 transition-all duration-300 flex-shrink-0"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
