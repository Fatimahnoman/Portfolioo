"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, AcademicCapIcon } from "@heroicons/react/24/solid";
import {
  detectLanguage,
  replyTo,
  STUDY_AGENT_WELCOME,
  type AgentLanguage,
  type LanguagePreference,
} from "@/lib/agentBrain";

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
};

type StudyChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const LANGUAGES: { value: LanguagePreference; label: string }[] = [
  { value: "auto", label: "Auto" },
  { value: "english", label: "EN" },
  { value: "roman-urdu", label: "Roman Urdu" },
];

const welcomeFor = (preference: LanguagePreference): string =>
  STUDY_AGENT_WELCOME[
    preference === "auto" ? "english" : (preference as AgentLanguage)
  ];

let messageId = 0;
const nextId = () => messageId++;

const StudyChatModal = ({ isOpen, onClose }: StudyChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [language, setLanguage] = useState<LanguagePreference>("auto");
  const [detected, setDetected] = useState<AgentLanguage | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat state when opened
  useEffect(() => {
    if (isOpen) {
      setMessages([
        { id: nextId(), role: "agent", content: welcomeFor(language) },
      ]);
      setInput("");
      setIsThinking(false);
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
    // `language` is intentionally excluded: changing it must not wipe the
    // conversation, it only affects the next reply.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (!query || isThinking) return;

    setMessages((prev) => [...prev, { id: nextId(), role: "user", content: query }]);
    setInput("");
    setIsThinking(true);

    // Replies are generated locally and always come back in the language the
    // visitor wrote in (or the language they picked). Short pause so the
    // typing indicator reads as natural chat pacing.
    await new Promise((resolve) => setTimeout(resolve, 380));
    const { text } = replyTo({
      agent: "studies-helper",
      query,
      preference: language,
    });

    setMessages((prev) => [...prev, { id: nextId(), role: "agent", content: text }]);
    setIsThinking(false);
  };

  // Which language the last question was read as, so Auto mode is never a
  // black box.
  const previewLanguage = (value: string) => {
    if (language !== "auto" || !value.trim()) return;
    setDetected(detectLanguage(value));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* ── Header ── */}
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-violet-600/20 to-fuchsia-500/15 border-b border-white/10">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/30 shrink-0">
                <AcademicCapIcon className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0c0c0c]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-white leading-tight">StudiesHelper Agent</h3>
                <p className="text-[11px] text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  AI Study Assistant · Online
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close StudiesHelper Agent chat"
                className="ml-auto text-gray-400 hover:text-white transition-colors p-1"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
              {/* Language override — Auto mirrors the visitor, EN / Roman Urdu force it. */}
              <div
                role="group"
                aria-label="Reply language"
                className="ml-1 flex items-center gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10"
              >
                {LANGUAGES.map((option) => {
                  const active = language === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLanguage(option.value)}
                      aria-pressed={active}
                      aria-label={`Reply in ${option.label}`}
                      className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                        active
                          ? "bg-violet-500/30 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {language === "auto" && detected && (
              <p className="px-5 py-1.5 text-[10px] text-gray-500 bg-white/[0.02] border-b border-white/[0.06]">
                Answering in{" "}
                <span className="text-gray-300">
                  {detected === "roman-urdu" ? "Roman Urdu" : "English"}
                </span>{" "}
                — change it above.
              </p>
            )}

            {/* ── Chat Body ── */}
            <div
              ref={scrollRef}
              className="h-80 sm:h-96 p-4 sm:p-5 overflow-y-auto custom-scrollbar flex flex-col gap-3"
            >
              {messages.map((m) =>
                m.role === "user" ? (
                  <div key={m.id} className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white text-sm leading-relaxed shadow-lg shadow-violet-500/15">
                      {m.content}
                    </div>
                  </div>
                ) : (
                  <div key={m.id} className="flex justify-start items-end gap-2">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shrink-0 mb-1">
                      <AcademicCapIcon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 text-gray-200 text-sm leading-relaxed">
                      <p className="whitespace-pre-wrap break-words">{m.content}</p>
                    </div>
                  </div>
                )
              )}

              {/* Typing indicator */}
              {isThinking && (
                <div className="flex justify-start items-end gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 flex items-center justify-center shrink-0 mb-1">
                    <AcademicCapIcon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white/[0.06] border border-white/10 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            {/* ── Input ── */}
            <form onSubmit={handleSend} className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-white/[0.02]">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  previewLanguage(e.target.value);
                }}
                placeholder={
                  language === "roman-urdu"
                    ? "Exam ki tayari, focus, ya motivation ke baare mein poochein..."
                    : "Ask about study tips, deadlines, motivation..."
                }
                aria-label="Message StudiesHelper Agent"
                className="flex-1 min-w-0 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
              />
              <button
                type="submit"
                disabled={isThinking || !input.trim()}
                aria-label="Send message"
                className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 flex items-center justify-center text-white hover:from-fuchsia-500 hover:to-violet-600 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <PaperAirplaneIcon className="w-4 h-4" />
              </button>
            </form>

            {/* ── Footer note ── */}
            <div className="px-4 py-2 bg-white/[0.02] border-t border-white/[0.06] text-[10px] text-gray-500">
              Replies in English or Roman Urdu, matching how you write · Demo of the
              real OpenAI Agents SDK system
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudyChatModal;