"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

type TerminalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectType: "calculator" | "studies-helper" | "wellness-agent";
};

const TerminalModal = ({ isOpen, onClose, projectType }: TerminalModalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (projectType === "calculator") {
        setHistory([
          "OOP_CALC_SUITE.exe",
          "System initialized. Module: OOP_CALC_SUITE.exe loaded.",
          "Awaiting mathematical expression...",
        ]);
      } else if (projectType === "wellness-agent") {
        setHistory([
          "WellnessOracle_Agent.exe",
          "Initializing agent environment...",
          "System connected to NutritionExpertAgent, InjurySupportAgent & EscalationAgent.",
          "Safety guardrails active. Medical disclaimer: For general guidance only.",
          "How can I help with your health & wellness today?",
        ]);
      } else {
        setHistory([
          "StudiesHelper_Agent.exe",
          "Initializing agent environment...",
          "System connected to StudentReminderAgent and MotivationAgent.",
          "How can I help you with your studies today?",
        ]);
      }
    }
  }, [isOpen, projectType]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    setHistory(newHistory);
    const userInput = input;
    setInput("");
    
    if (projectType === "calculator") {
        try {
          const result = new Function(`return ${userInput}`)();
          setHistory(prev => [...prev, `Result: ${result}`]);
        } catch {
          setHistory(prev => [...prev, "Error: Invalid mathematical expression."]);
        }
    } else {
        // Real API call for Study Agent or Wellness Agent
        setHistory(prev => [...prev, "Agent: Thinking..."]);
        const systemPrompt = projectType === "wellness-agent"
          ? `You are WellnessOracle, a knowledgeable and empathetic Health & Wellness AI assistant. Provide helpful, safe, evidence-based health and wellness guidance. Include tips on nutrition, fitness, mental health, and lifestyle. Always remind users to consult healthcare professionals for serious concerns. Keep responses concise (2-4 sentences). User query: ${userInput}`
          : `You are a helpful study assistant. Answer the following student query concisely: ${userInput}`;
        try {
          const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "openai/gpt-oss-20b:free",
              messages: [{ role: "user", content: systemPrompt }],
            }),
          });

          const data = await response.json();
          const aiResponse = data.choices[0].message.content;
          const agentLabel = projectType === "wellness-agent" ? "WellnessOracle" : "Agent";
          
          setHistory(prev => [...prev.filter(line => line !== "Agent: Thinking..."), `${agentLabel}: ${aiResponse}`]);
        } catch {
          setHistory(prev => [...prev.filter(line => line !== "Agent: Thinking..."), "Agent: Error connecting to AI. Please try again later."]);
        }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-xl overflow-hidden shadow-2xl"
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs font-mono text-gray-400">
                    {projectType === "calculator" ? "OOP_CALC_SUITE.exe" : projectType === "wellness-agent" ? "WellnessOracle_Agent.exe" : "StudiesHelper_Agent.exe"}
                </span>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Terminal Body */}
            <div 
              ref={scrollRef}
              className="h-80 sm:h-96 p-4 font-mono text-sm sm:text-base overflow-y-auto custom-scrollbar"
            >
              {history.map((line, i) => (
                <div key={i} className={line.startsWith(">") ? "text-rose-400" : line.startsWith("Result") ? "text-green-400" : line.startsWith("Error") ? "text-red-400" : "text-gray-300"}>
                  {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex mt-2">
                <span className="text-rose-400 mr-2">&gt;</span>
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0"
                  placeholder={projectType === "calculator" ? "Enter expression (e.g. 5+5*2)" : projectType === "wellness-agent" ? "Ask a health & wellness question..." : "Enter study query..."}
                />
              </form>
            </div>
            
            <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] text-gray-500 font-mono">
              {projectType === "calculator" ? "Type expression and press ENTER." : projectType === "wellness-agent" ? "Ask about nutrition, fitness, mental health & more. Press ENTER." : "Type study query and press ENTER."}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
