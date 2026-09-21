"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PaperAirplaneIcon, AcademicCapIcon } from "@heroicons/react/24/solid";

type Message = {
  id: number;
  role: "user" | "agent";
  content: string;
};

type StudyChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const WELCOME_MESSAGE =
  "Salam! 👋 I'm StudiesHelper Agent — connected to StudentReminderAgent & MotivationAgent. Ask me anything about your studies: exam prep, study techniques, time management, motivation, or a tricky concept. I'm here to help you learn better!";

let messageId = 0;
const nextId = () => messageId++;

const StudyChatModal = ({ isOpen, onClose }: StudyChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Reset chat state when opened
  useEffect(() => {
    if (isOpen) {
      setMessages([{ id: nextId(), role: "agent", content: WELCOME_MESSAGE }]);
      setInput("");
      setIsThinking(false);
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
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

    const userMsg: Message = { id: nextId(), role: "user", content: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsThinking(true);

    const systemPrompt = `You are StudiesHelper Agent, a friendly and knowledgeable AI study assistant inside Fatimah Noman's portfolio. You are connected to specialized sub-agents: StudentReminderAgent (deadlines, reminders and study schedules) and MotivationAgent (encouragement and focus). Help the student with their query with clear, practical, concise study guidance (2-5 sentences). Topics you excel at: exam prep, study techniques, time management, motivation, productivity, and explaining study concepts simply. IMPORTANT: Answer in the SAME language the user writes in. If the user writes in Roman Urdu (Urdu written in English letters like "exam ki tayari kaise karein?"), reply in Roman Urdu. If they write in English, reply in English. If in Urdu script, reply in Urdu script. Never switch to Hindi/Devanagari unless the user wrote in Hindi. User query: ${query}`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [{ role: "user", content: systemPrompt }],
        }),
      });

      const data = await response.json();
      const aiResponse = data.choices?.[0]?.message?.content;
      if (!aiResponse) throw new Error("Empty response");
      setMessages((prev) => [
        ...prev,
        { id: nextId(), role: "agent", content: aiResponse.trim() },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: nextId(),
          role: "agent",
          content: "Hmm, I couldn't reach my AI brain right now 😅 Please try again in a moment!",
        },
      ]);
    } finally {
      setIsThinking(false);
    }
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
            </div>

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
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about study tips, deadlines, motivation..."
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
              Powered by AI · Real-time study answers · No page redirect
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default StudyChatModal;