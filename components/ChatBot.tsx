"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useJarnGoChat } from "@/lib/useJarnGoChat";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const { messages, input, setInput, loading, send, bottomRef } = useJarnGoChat();
  const POPUP_VISIBLE = 8;
  const visibleMessages = messages.slice(-POPUP_VISIBLE);
  const hiddenCount = messages.length - visibleMessages.length;

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (chatRef.current && !chatRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, bottomRef]);

  return (
    <div ref={chatRef}>
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
            <div className="flex items-center gap-3">
              <Link href="/chat" title="ขยายเต็มจอ" style={{ color: "var(--text-muted)" }} className="hover:opacity-70">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M6 2H2v4M10 14h4v-4M2 2l5 5M14 14l-5-5" />
                </svg>
              </Link>
              <button onClick={() => setOpen(false)} style={{ color: "var(--text-muted)", fontSize: 16 }} className="hover:opacity-70">✕</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2.5" style={{ scrollbarWidth: "thin" }}>
            {hiddenCount > 0 && (
              <Link
                href="/chat"
                className="text-center hover:opacity-70"
                style={{ fontSize: 11, color: "var(--text-muted)", textDecoration: "none" }}
              >
                ดูข้อความก่อนหน้า ({hiddenCount}) ในหน้าเต็ม →
              </Link>
            )}
            {visibleMessages.map((msg, i) => (
              <div key={hiddenCount + i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="text-sm px-3 py-2 max-w-[85%] whitespace-pre-line leading-relaxed"
                  style={
                    msg.from === "user"
                      ? { background: "var(--primary)", color: "#fff", borderRadius: "8px 8px 2px 8px", fontSize: 13 }
                      : { background: "var(--surface-2)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "8px 8px 8px 2px", fontSize: 13 }
                  }
                >
                  {msg.text || (loading && i === visibleMessages.length - 1 ? (
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
    </div>
  );
}
