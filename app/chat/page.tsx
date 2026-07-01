"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useJarnGoChat } from "@/lib/useJarnGoChat";

export default function ChatPage() {
  const { messages, input, setInput, loading, send, clearHistory, bottomRef } = useJarnGoChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, bottomRef]);

  return (
    <main className="flex flex-col" style={{ height: "100dvh", paddingTop: 64, maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
        <div className="flex items-center gap-3">
          <Link href="/" style={{ color: "var(--text-muted)" }} className="hover:opacity-70">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M10 13L5 8l5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", display: "flex", alignItems: "center", gap: 6 }}>
              JarnGo
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 5px #22c55e", display: "inline-block", flexShrink: 0 }} />
            </p>
            <p style={{ fontSize: 12, color: "var(--text-muted)" }}>Powered by Groq · Llama 3.3</p>
          </div>
        </div>
        <button
          onClick={() => { if (confirm("ล้างประวัติการแชททั้งหมด?")) clearHistory(); }}
          style={{ fontSize: 12, padding: "6px 14px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface-2)", color: "var(--text-muted)" }}
          className="hover:opacity-70"
        >
          ล้างแชท
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="text-sm px-4 py-2.5 max-w-[80%] whitespace-pre-line leading-relaxed"
              style={
                msg.from === "user"
                  ? { background: "var(--primary)", color: "#fff", borderRadius: "12px 12px 2px 12px", fontSize: 14 }
                  : { background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "12px 12px 12px 2px", fontSize: 14 }
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
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {["คอร์สมีอะไรบ้าง", "XP คืออะไร", "เรียนฟรีไหม"].map((q) => (
          <button
            key={q}
            onClick={() => setInput(q)}
            className="transition-colors hover:opacity-80"
            style={{ fontSize: 12, padding: "5px 12px", borderRadius: 6, background: "var(--surface-2)", color: "var(--text-muted)", border: "1px solid var(--border)" }}
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 rounded-lg px-4 py-2.5" style={{ background: "var(--surface-2)", border: "1px solid var(--border)" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="พิมพ์คำถาม..."
            disabled={loading}
            className="flex-1 bg-transparent outline-none disabled:opacity-50"
            style={{ fontSize: 14, color: "var(--text)", caretColor: "var(--primary)" }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || loading}
            className="disabled:opacity-30 transition-opacity"
            style={{ color: "var(--primary)" }}
          >
            {loading ? (
              <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin block" />
            ) : (
              <svg width="17" height="17" viewBox="0 0 16 16" fill="currentColor">
                <path d="M2 8l12-6-5 6 5 6z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
