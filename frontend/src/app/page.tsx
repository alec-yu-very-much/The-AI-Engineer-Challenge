"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import MessageBubble from "@/components/MessageBubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const STORAGE_KEY = "mental-coach-conversations";

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveConversations(convos: Conversation[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convos));
}

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load conversations from localStorage on mount
  useEffect(() => {
    const loaded = loadConversations();
    setConversations(loaded);
    if (loaded.length > 0) {
      setActiveId(loaded[0].id);
    }
  }, []);

  // Persist conversations whenever they change
  useEffect(() => {
    if (conversations.length > 0) {
      saveConversations(conversations);
    }
  }, [conversations]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversations, activeId]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta) {
      ta.style.height = "auto";
      ta.style.height = Math.min(ta.scrollHeight, 160) + "px";
    }
  }, [input]);

  const activeConvo = conversations.find((c) => c.id === activeId) || null;

  const startNewChat = useCallback(() => {
    const newConvo: Conversation = {
      id: generateId(),
      title: "New conversation",
      messages: [],
      createdAt: Date.now(),
    };
    setConversations((prev) => [newConvo, ...prev]);
    setActiveId(newConvo.id);
    setInput("");
  }, []);

  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        saveConversations(updated);
        return updated;
      });
      if (activeId === id) {
        setActiveId(null);
      }
    },
    [activeId]
  );

  async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    // If no active conversation, create one
    let currentId = activeId;
    if (!currentId) {
      const newConvo: Conversation = {
        id: generateId(),
        title: trimmed.slice(0, 40) + (trimmed.length > 40 ? "..." : ""),
        messages: [],
        createdAt: Date.now(),
      };
      setConversations((prev) => [newConvo, ...prev]);
      currentId = newConvo.id;
      setActiveId(currentId);
    }

    const userMsg: Message = { role: "user", content: trimmed };

    // Update conversation with user message + set title from first message
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== currentId) return c;
        const isFirstMessage = c.messages.length === 0;
        return {
          ...c,
          title: isFirstMessage
            ? trimmed.slice(0, 40) + (trimmed.length > 40 ? "..." : "")
            : c.title,
          messages: [...c.messages, userMsg],
        };
      })
    );

    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: "Request failed" }));
        throw new Error(err.detail || "Request failed");
      }

      const data = await res.json();
      const assistantMsg: Message = { role: "assistant", content: data.reply };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentId
            ? { ...c, messages: [...c.messages, assistantMsg] }
            : c
        )
      );
    } catch (err) {
      const errorMsg: Message = {
        role: "assistant",
        content: `Something went wrong: ${err instanceof Error ? err.message : "Unknown error"}`,
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === currentId
            ? { ...c, messages: [...c.messages, errorMsg] }
            : c
        )
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } flex-shrink-0 bg-sidebar-bg border-r border-border flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {/* Sidebar header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-lg bg-primary/20 border border-border-glow flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.2)]">
              <span className="text-primary font-bold text-sm">MC</span>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-foreground">
                Mental Coach AI
              </h1>
              <p className="text-xs text-muted">Your wellness companion</p>
            </div>
          </div>
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-primary/10 border border-border-glow text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Chat
          </button>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto p-2">
          {conversations.length === 0 && (
            <p className="text-xs text-muted text-center mt-8 px-4">
              No conversations yet. Start a new chat!
            </p>
          )}
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg mb-1 cursor-pointer transition-colors ${
                convo.id === activeId
                  ? "bg-primary/10 border border-border-glow"
                  : "hover:bg-surface-hover border border-transparent"
              }`}
              onClick={() => setActiveId(convo.id)}
            >
              <svg
                className="w-4 h-4 text-muted flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="text-sm text-foreground truncate flex-1">
                {convo.title}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(convo.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-muted hover:text-red-400 transition-opacity p-0.5"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </aside>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-surface/50 backdrop-blur-sm">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-surface-alt transition-colors text-muted"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="flex-1">
            <h2 className="text-sm font-medium text-foreground">
              {activeConvo?.title || "Mental Coach AI"}
            </h2>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.5)]" />
            <span className="text-xs text-muted">Online</span>
          </div>
        </header>

        {/* Messages */}
        <main className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {(!activeConvo || activeConvo.messages.length === 0) && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-border-glow flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(99,102,241,0.15)]">
                  <span className="text-4xl">🧠</span>
                </div>
                <h2 className="text-2xl font-semibold text-foreground mb-2">
                  Welcome
                </h2>
                <p className="text-muted max-w-md mb-8">
                  I&apos;m your supportive mental coach. Share what&apos;s on
                  your mind — I&apos;m here to help you think through it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md w-full">
                  {[
                    "I'm feeling overwhelmed at work",
                    "Help me set achievable goals",
                    "I need motivation today",
                    "How do I manage stress better?",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        textareaRef.current?.focus();
                      }}
                      className="text-left text-sm px-4 py-3 rounded-xl bg-surface border border-border hover:border-border-glow hover:bg-surface-alt transition-colors text-muted hover:text-foreground"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeConvo?.messages.map((msg, i) => (
              <MessageBubble key={i} role={msg.role} content={msg.content} />
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-border-glow flex items-center justify-center mr-3 flex-shrink-0">
                  <span className="text-primary text-sm font-bold">AI</span>
                </div>
                <div className="bg-ai-bubble rounded-2xl rounded-bl-md px-4 py-3 border border-border-glow shadow-[0_0_15px_rgba(99,102,241,0.08)]">
                  <div className="flex gap-1.5 items-center h-5">
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0ms]" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:150ms]" />
                    <span className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input area */}
        <footer className="border-t border-border bg-surface/50 backdrop-blur-sm px-4 py-3">
          <form
            onSubmit={sendMessage}
            className="max-w-3xl mx-auto flex items-end gap-3"
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = e.currentTarget.closest("form");
                  if (form) form.requestSubmit();
                }
              }}
              placeholder="Type your message..."
              rows={1}
              className="flex-1 resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 transition-shadow"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="h-11 w-11 flex-shrink-0 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-[0_0_12px_rgba(99,102,241,0.3)] hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
          <p className="text-center text-xs text-muted mt-2 max-w-3xl mx-auto">
            Press Enter to send, Shift+Enter for a new line
          </p>
        </footer>
      </div>
    </div>
  );
}
