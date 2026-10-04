"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { replyTo, type LanguagePreference } from "@/lib/agentBrain";

const LANG_LABEL: Record<LanguagePreference, string> = {
  auto: "Auto (mirrors your message)",
  english: "English",
  "roman-urdu": "Roman Urdu",
};

type TerminalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  projectType: "studies-helper" | "wellness-agent";
};

const TerminalModal = ({ isOpen, onClose, projectType }: TerminalModalProps) => {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [language, setLanguage] = useState<LanguagePreference>("auto");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (projectType === "wellness-agent") {
        setHistory([
          "WellnessOracle_Agent.exe",
          "Initializing agent environment...",
          "System connected to NutritionExpertAgent, InjurySupportAgent & EscalationAgent.",
          "Safety guardrails active. Medical disclaimer: For general guidance only.",
          "Reply language: Auto (mirrors your message) — change with: lang auto | lang en | lang ur",
          "How can I help with your health & wellness today?",
        ]);
      } else {
        setHistory([
          "StudiesHelper_Agent.exe",
          "Initializing agent environment...",
          "System connected to StudentReminderAgent and MotivationAgent.",
          "Reply language: Auto (mirrors your message) — change with: lang auto | lang en | lang ur",
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

  // Escape closes the overlay, matching the chat modal. Without this the
  // terminal could only be dismissed by its X button, which reads as a bug
  // to anyone who tries Escape first.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newHistory = [...history, `> ${input}`];
    setHistory(newHistory);
    const userInput = input;
    setInput("");

    // Language override, on-theme for a terminal.
    const [command = "", ...rest] = userInput.trim().split(/\s+/);
    if (command.toLowerCase() === "lang") {
      const arg = (rest[0] ?? "").toLowerCase();
      const next: LanguagePreference | null =
        arg === "en" || arg === "english"
          ? "english"
          : arg === "ur" || arg === "urdu" || arg === "roman" || arg === "roman-urdu"
            ? "roman-urdu"
            : arg === "auto"
              ? "auto"
              : null;

      if (next) {
        setLanguage(next);
        setHistory(prev => [...prev, `Reply language set to: ${LANG_LABEL[next]}`]);
      } else {
        setHistory(prev => [
          ...prev,
          `Usage: lang auto | lang en | lang ur    (currently: ${LANG_LABEL[language]})`,
        ]);
      }
      return;
    }

    setHistory(prev => [...prev, "Agent: Thinking..."]);

    const reply = replyTo({
      agent:
        projectType === "wellness-agent" ? "wellness-oracle" : "studies-helper",
      query: userInput,
      preference: language,
    });
    const agentLabel =
      projectType === "wellness-agent" ? "WellnessOracle" : "StudiesHelper";

    setHistory(prev => [
      ...prev.filter((line) => line !== "Agent: Thinking..."),
      `${agentLabel} [${reply.language === "roman-urdu" ? "Roman Urdu" : "EN"}]: ${reply.text}`,
    ]);
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
                <div className="w-3 h-3 rounded-full bg-fuchsia-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                <span className="ml-2 text-xs font-mono text-gray-400">
                    {projectType === "wellness-agent" ? "WellnessOracle_Agent.exe" : "StudiesHelper_Agent.exe"}
                </span>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close terminal"
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
                <div key={i} className={line.startsWith(">") ? "text-violet-400" : "text-gray-300"}>
                  {line}
                </div>
              ))}
              
              <form onSubmit={handleCommand} className="flex mt-2">
                <span className="text-violet-400 mr-2">&gt;</span>
                <input
                  autoFocus
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-white border-none p-0 focus:ring-0"
                  placeholder={projectType === "wellness-agent" ? "Ask a health & wellness question..." : "Enter study query..."}
                />
              </form>
            </div>
            
            <div className="px-4 py-2 bg-white/5 border-t border-white/10 text-[10px] text-gray-500 font-mono">
              {projectType === "wellness-agent" ? "Ask about nutrition, fitness, mental health & more. Press ENTER." : "Type study query and press ENTER."}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TerminalModal;
