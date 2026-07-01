"use client";

import { useEffect, useRef, useState } from "react";
import { getSession } from "@/lib/supabase";
import { getProgress } from "@/lib/progress";

export type ChatMessage = { from: "user" | "bot"; text: string };

const LIMIT_LOGGED_IN = 20;
const LIMIT_GUEST = 1;
const CHAT_HISTORY_KEY = "jarnego_chat_history";
const MAX_STORED = 40; // max messages kept for display
const MAX_CONTEXT = 12; // max messages sent to the API as context, to control token cost

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

export const WELCOME: ChatMessage = { from: "bot", text: "สงสัยอะไรถามได้เลยครับ อาจารย์โกพร้อมช่วยตลอด 24 ชม." };

function loadHistory(): ChatMessage[] {
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

function saveHistory(msgs: ChatMessage[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(msgs.slice(-MAX_STORED)));
  } catch {}
}

export function useJarnGoChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  function clearHistory() {
    setMessages([WELCOME]);
    saveHistory([WELCOME]);
  }

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const session = await getSession();
    const user = session?.user;
    const loggedIn = !!user;
    const limit = loggedIn ? LIMIT_LOGGED_IN : LIMIT_GUEST;

    if (getUsed() >= limit) {
      setInput("");
      const msg = loggedIn
        ? "โอ้โห ถามมาเยอะมากเลยนะ สมองไม่เมื่อยบ้างเหรอ  พักก่อนแล้วพรุ่งนี้ค่อยมาใหม่นะครับ"
        : "ถามมาเยอะเลยนะ อาจารย์โกไม่ได้ขี้เหนียวหรอก แต่ login ก่อนนะครับ แล้วจะได้คุยกันอีกเพียบเลย ";
      setMessages((prev) => [...prev, { from: "user", text }, { from: "bot", text: msg }]);
      return;
    }

    setInput("");

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

    // Only send the most recent messages as context to keep API token cost bounded
    const history = messages.slice(-MAX_CONTEXT).map((m) => ({
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

  return { messages, input, setInput, loading, send, clearHistory, bottomRef };
}
