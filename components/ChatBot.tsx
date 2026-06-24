"use client";

import { useEffect, useRef, useState } from "react";
import { getSession } from "@/lib/supabase";
import { getProgress } from "@/lib/progress";

type Message = { from: "user" | "bot"; text: string };

const LIMIT_LOGGED_IN = 20;
const LIMIT_GUEST = 3;
const CHAT_HISTORY_KEY = "jarnego_chat_history";
const MAX_STORED = 40; // max messages to store

function quotaKey() {
  return `chatairrok_count_${new Date().toISOString().slice(0, 10)}`;
}
function getUsed() {
  if (typeof window === "undefined") return 0;
  return parseInt(localStorage.getItem(quotaKey()) || "0", 10);
}
function bumpUsed() {
  if (typeof window === "undefined") return;
  localStorage.setItem(quotaKey(), String(getUsed() + 1));
}

const WELCOME: Message = { from: "bot", text: "สงสัยอะไรถามได้เลยครับ อาจารย์โกพร้อมช่วยตลอด 24 ชม." };

function loadHistory(): Message[] {
  if (typeof window === "undefined") return [WELCOME];
  try {
    const raw = localStorage.getItem(CHAT_HISTORY_KEY);
    if (!raw) return [WELCOME];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME];
  } catch {
    return [WELCOME];
  }
}

function saveHistory(msgs: Message[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(msgs.slice(-MAX_STORED)));
  } catch {}
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load history on mount
  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  // Save history whenever messages change
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    // Who is asking?
    const session = await getSession();
    const user = session?.user;
    const loggedIn = !!user;
    const limit = loggedIn ? LIMIT_LOGGED_IN : LIMIT_GUEST;

    // Daily question limit
    if (getUsed() >= limit) {
      setInput("");
      const msg = loggedIn
        ? "โอ้โห ถามมาเยอะมากเลยนะ สมองไม่เมื่อยบ้างเหรอ  พักก่อนแล้วพรุ่งนี้ค่อยมาใหม่นะครับ"
        : "ถามมาเยอะเลยนะ อาจารย์โกไม่ได้ขี้เหนียวหรอก แต่ login ก่อนนะครับ แล้วจะได้คุยกันอีกเพียบเลย ";
      setMessages((prev) => [...prev, { from: "user", text }, { from: "bot", text: msg }]);
      return;
    }

    setInput("");

    // Personalization (Level 1: name + XP + Level) — only when logged in
    let userCtx: { name: string; xp: number; level: number } | null = null;
    if (loggedIn) {
      const name =
        user.user_metadata?.display_name ||
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "ผู้ใช้";
      const xp = getProgress().xp;
      userCtx = { name, xp, level: Math.floor(xp / 100) + 1 };
    }

    const history = messages.map((m) => ({
      role: m.from === "user" ? "user" : "assistant",
      content: m.text,
    }));

    setMessages((prev) => [...prev, { from: "user", text }, { from: "bot", text: "" }]);
    setLoading(true);
    bumpUsed();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...history, { role: "user", content: text }], user: userCtx }),
      });

      // Both AI providers exhausted → polite resting message
      if (!res.ok) {
        let msg = "ขอโทษครับ เกิดข้อผิดพลาด ลองใหม่อีกครั้ง";
        try {
          const data = await res.json();
          if (data?.message) msg = data.message;
        } catch {}
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { from: "bot", text: msg };
          return next;
        });
        return;
      }

      if (!res.body) throw new Error("no body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let botText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        for (const line of chunk.split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6).trim();
          if (data === "[DONE]") break;
          try {
            const delta = JSON.parse(data).choices?.[0]?.delta?.content;
            if (delta) {
              botText += delta;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1] = { from: "bot", text: botText };
                return next;
              });
            }
          } catch {}
        }
      }
    } catch {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { from: "bot", text: "ขอโทษครับ เกิดข้อผิดพลาด ลองใหม่อีกครั้ง" };
        return next;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-20 right-5 z-[200] flex flex-col rounded-lg overflow-hidden"
          style={{
            width: 320,
            height: 420,
            background: "var(--surface)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
                JarnGo
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", display: "inline-block", flexShrink: 0 }} />
              </p>
              <p style={{ fontSize: 11, color: "var(--text-muted)" }}>Powered by Groq · Llama 3.3</p>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "var(--text-muted)", fontSize: 16 }} className="hover:opacity-70">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5" style={{ scrollbarWidth: "thin" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="text-sm px-3 py-2 max-w-[85%] whitespace-pre-line leading-relaxed"
                  style={
                    msg.from === "user"
                      ? { background: "var(--primary)", color: "#fff", borderRadius: "8px 8px 2px 8px", fontSize: 13 }
                      : { background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px 8px 8px 2px", fontSize: 13 }
                  }
                >
                  {msg.text || (loading && i === messages.length - 1 ? (
                    <span style={{ opacity: 0.5 }}>กำลังพิมพ์...</span>
                  ) : "")}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick suggestions */}
          <div className="px-3 pb-2 flex gap-1.5 flex-wrap">
            {["คอร์สมีอะไรบ้าง", "XP คืออะไร", "เรียนฟรีไหม"].map((q) => (
              <button
                key={q}
                onClick={() => { setInput(q); }}
                className="transition-colors hover:opacity-80"
                style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3">
            <div className="flex items-center gap-2 rounded-md px-3 py-2" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="พิมพ์คำถาม..."
                disabled={loading}
                className="flex-1 bg-transparent outline-none disabled:opacity-50"
                style={{ fontSize: 13, color: "var(--text)", caretColor: "var(--primary)" }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="disabled:opacity-30 transition-opacity"
                style={{ color: "var(--primary)" }}
              >
                {loading ? (
                  <span className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin block" />
                ) : (
                  <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M2 8l12-6-5 6 5 6z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble button */}
      <div className="fixed bottom-5 right-5 z-[200]" style={{ position: "fixed" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-center gap-1.5 transition-opacity hover:opacity-80"
        style={{
          height: 36,
          padding: "0 14px",
          borderRadius: 980,
          background: open ? "var(--surface-2)" : "var(--primary)",
          border: "1px solid var(--border)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
          color: "#fff",
        }}
      >
        {open ? "✕" : (
          <>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", flexShrink: 0, display: "inline-block" }} />
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.01em", lineHeight: 1 }}>JarnGo</span>
          </>
        )}
      </button>
      </div>
    </>
  );
}
