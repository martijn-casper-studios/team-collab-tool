"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, Suspense } from "react";
import { Navigation } from "@/components/Navigation";
import { TeamMember } from "@/data/team";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatContent() {
  const { isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const aboutParam = searchParams.get("about");

  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => setAllMembers(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (aboutParam && allMembers.length > 0) {
      const member = allMembers.find((m) => m.id === aboutParam);
      if (member) {
        setInput(`How can I work better with ${member.name}?`);
      }
    }
  }, [aboutParam, allMembers]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again."
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestedQuestions = [
    "What is Leo's communication style?",
    "How should I give feedback to Elizabeth?",
    "How can Paolo and Basti work better together?",
    "What motivates Emerson?",
    "How does Jelvin handle stress?",
    "What's the best way to collaborate with Martijn?",
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-8 flex flex-col">
        <div className="mb-6">
          <h1 className="font-serif text-3xl font-light tracking-tight text-[var(--fg)]">Ask AI Assistant</h1>
          <p className="text-sm text-[var(--muted)] mt-1">Questions about team members, communication styles, and collaboration</p>
        </div>

        {/* Chat messages */}
        <div className="flex-1 bg-white border border-[var(--border)] p-6 mb-4 overflow-y-auto min-h-[400px] max-h-[calc(100vh-320px)]">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-[var(--accent-light)] flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="font-serif text-lg text-[var(--fg)] mb-2">Start a conversation</h2>
              <p className="text-sm text-[var(--muted)] mb-6 max-w-md">
                Ask me anything about your teammates&apos; personalities, communication preferences, or collaboration.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {suggestedQuestions.map((question, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(question)}
                    className="px-3 py-1.5 border border-[var(--border)] text-[var(--muted)] text-xs font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] transition-editorial"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={`chat-message flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 ${
                      message.role === "user"
                        ? "bg-[var(--accent)] text-white"
                        : "bg-[var(--bg)] border border-[var(--border)] text-[var(--fg)]"
                    }`}
                  >
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-message flex justify-start">
                  <div className="bg-[var(--bg)] border border-[var(--border)] px-4 py-3">
                    <div className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                      <span className="w-1.5 h-1.5 bg-[var(--muted)] rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border border-[var(--border)] p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a team member..."
              className="flex-1 px-4 py-3 border border-[var(--border)] bg-[var(--bg)] focus:border-[var(--accent)] focus:outline-none transition-editorial text-sm text-[var(--fg)]"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              className="px-5 py-3 bg-[var(--accent)] text-white font-mono text-xs uppercase tracking-[0.15em] hover:bg-[var(--accent-hover)] transition-editorial disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {allMembers.slice(0, 4).map((member) => (
              <button
                key={member.id}
                onClick={() => setInput(`How can I work better with ${member.name}?`)}
                className="px-2.5 py-1 border border-[var(--border)] text-[var(--muted)] text-xs font-mono hover:border-[var(--accent)] hover:text-[var(--accent)] transition-editorial"
              >
                {member.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ChatPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[var(--accent)]"></div>
      </div>
    }>
      <ChatContent />
    </Suspense>
  );
}
