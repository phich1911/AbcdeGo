"use client";

import { useEffect, useRef, useState } from "react";

type Message = { from: "user" | "bot"; text: string };

const FAQS: { keywords: string[]; answer: string }[] = [
  {
    keywords: ["สวัสดี", "หวัดดี", "hello", "hi", "ดีครับ", "ดีค่ะ"],
    answer: "สวัสดีครับ! มีอะไรให้ช่วยไหม? 😊 ลองถามเรื่องคอร์ส, XP, หรือวิธีใช้งานได้เลย",
  },
  {
    keywords: ["คอร์ส", "วิชา", "เรียน", "มีอะไร", "มีคอร์ส"],
    answer:
      "ตอนนี้มี 4 หมวดครับ:\n• 📝 สอบ ก.พ. — ความรู้ทั่วไป + ภาษาอังกฤษ\n• 🔎 DSI — กฎหมายคดีพิเศษ\n• 🏛️ ปลัดอำเภอ — ลักษณะปกครองท้องที่ + อส.\n• 📚 วิชาทั่วไป — คณิต, อังกฤษ, โค้ดดิ้ง",
  },
  {
    keywords: ["xp", "แต้ม", "คะแนน", "exp"],
    answer:
      "XP (Experience Points) คือแต้มที่ได้จากการเรียนจบแต่ละบทครับ ยิ่งเรียนมากยิ่งได้ XP เยอะ ดูสถิติ XP ได้ที่หน้า PROGRESS",
  },
  {
    keywords: ["บทเรียน", "บท", "กี่บท", "กี่บทเรียน"],
    answer:
      "แต่ละคอร์สมีบทเรียนต่างกันครับ:\n• ลักษณะปกครองท้องที่ — 20 บท\n• กองอาสารักษาดินแดน — 10 บท\n• วิชาทั่วไป — 5 บทต่อวิชา",
  },
  {
    keywords: ["ปลัดอำเภอ", "ปลัด"],
    answer:
      "หมวดปลัดอำเภอมี 2 วิชาครับ:\n• ⚖️ ลักษณะปกครองท้องที่ พ.ศ. 2457 (20 บท)\n• 🛡️ กองอาสารักษาดินแดน พ.ศ. 2497 (10 บท)",
  },
  {
    keywords: ["dsi", "คดีพิเศษ", "กรมสอบสวน"],
    answer:
      "หมวด DSI มี 2 วิชาครับ:\n• 🔎 การสอบสวนคดีพิเศษ\n• ⚖️ คดีพิเศษและกฎหมายที่เกี่ยวข้อง\nเนื้อหากำลังจัดทำอยู่นะครับ",
  },
  {
    keywords: ["ก.พ.", "กพ", "สอบกพ", "ก พ"],
    answer:
      "หมวด ก.พ. มี 2 วิชาครับ:\n• 📝 ความรู้ทั่วไป (ก.พ.) — วิชาความสามารถทั่วไป\n• 🌐 ภาษาอังกฤษ (ก.พ.) — ไวยากรณ์และการอ่าน\nเนื้อหากำลังจัดทำอยู่นะครับ",
  },
  {
    keywords: ["ฟรี", "เสียเงิน", "ค่าใช้จ่าย", "ราคา"],
    answer: "เรียนฟรีทุกคอร์สครับ ไม่มีค่าใช้จ่ายใดๆ 🎉",
  },
  {
    keywords: ["สมัคร", "ล็อกอิน", "สมาชิก", "บัญชี"],
    answer:
      "ไม่ต้องสมัครสมาชิกครับ! เข้ามาเรียนได้เลย ข้อมูล XP และความก้าวหน้าจะบันทึกไว้ในเครื่องของคุณ",
  },
  {
    keywords: ["progress", "ความก้าวหน้า", "ดูคะแนน", "สถิติ"],
    answer:
      "ดูความก้าวหน้าได้ที่เมนู PROGRESS ครับ จะเห็น XP สะสม, บทเรียนที่เรียนจบ และสตรีคการเรียน",
  },
  {
    keywords: ["streak", "สตรีค", "ติดต่อกัน"],
    answer:
      "Streak คือจำนวนวันที่เรียนต่อเนื่องครับ พยายามเรียนทุกวันเพื่อรักษา streak ไว้ 🔥",
  },
  {
    keywords: ["ค้นหา", "search", "หา"],
    answer:
      "ค้นหาคอร์สได้ 2 ที่ครับ:\n• กดปุ่ม SEARCH ในเมนูบน (หรือ Ctrl+K)\n• ช่องค้นหาในหน้า COURSES",
  },
];

function getBotReply(input: string): string {
  const lower = input.toLowerCase();
  for (const faq of FAQS) {
    if (faq.keywords.some((kw) => lower.includes(kw.toLowerCase()))) {
      return faq.answer;
    }
  }
  return "ขอโทษครับ ยังไม่มีข้อมูลในส่วนนี้ 😅 ลองถามเรื่อง คอร์ส, XP, ปลัดอำเภอ, DSI, ก.พ. หรือวิธีใช้งานได้เลยครับ";
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "สวัสดีครับ! 👋 มีคำถามเกี่ยวกับคอร์สหรือการใช้งาน ถามได้เลยนะครับ" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { from: "user", text };
    const botMsg: Message = { from: "bot", text: getBotReply(text) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      {/* Chat window */}
      {open && (
        <div
          className="fixed bottom-20 right-5 z-[200] flex flex-col rounded-2xl overflow-hidden"
          style={{
            width: 320,
            height: 420,
            background: "rgba(12,10,26,0.97)",
            border: "1px solid rgba(124,58,237,0.3)",
            boxShadow: "0 8px 48px rgba(0,0,0,0.7)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: "rgba(124,58,237,0.15)", borderBottom: "1px solid rgba(124,58,237,0.2)" }}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <p className="text-sm font-bold" style={{ color: "#fff" }}>AI ช่วยตอบ</p>
                <p className="text-xs" style={{ color: "rgba(167,139,250,0.7)" }}>ถามเรื่องคอร์สได้เลย</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.4)" }} className="hover:opacity-70 text-lg leading-none">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3" style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(124,58,237,0.3) transparent" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="text-sm px-3.5 py-2.5 rounded-2xl max-w-[85%] whitespace-pre-line leading-relaxed"
                  style={
                    msg.from === "user"
                      ? { background: "rgba(124,58,237,0.5)", color: "#fff", borderBottomRightRadius: 4 }
                      : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.85)", borderBottomLeftRadius: 4 }
                  }
                >
                  {msg.text}
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
                className="text-xs px-2.5 py-1 rounded-full transition-colors hover:opacity-80"
                style={{ background: "rgba(124,58,237,0.15)", color: "#a78bfa", border: "1px solid rgba(124,58,237,0.25)" }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="px-3 pb-3">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(124,58,237,0.25)" }}
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="พิมพ์คำถาม..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "#fff", caretColor: "#a78bfa" }}
              />
              <button
                onClick={send}
                disabled={!input.trim()}
                className="transition-opacity disabled:opacity-30"
                style={{ color: "#a78bfa" }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 8l12-6-5 6 5 6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-[200] w-13 h-13 rounded-full flex items-center justify-center text-xl transition-all hover:scale-110 active:scale-95"
        style={{
          width: 52,
          height: 52,
          background: open ? "rgba(124,58,237,0.9)" : "linear-gradient(135deg, #7c3aed, #a855f7)",
          boxShadow: "0 4px 24px rgba(124,58,237,0.5)",
        }}
      >
        {open ? "✕" : "💬"}
      </button>
    </>
  );
}
