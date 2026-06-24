"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTopGameScores } from "@/lib/supabase";
import { Trophy } from "lucide-react";

type ScoreEntry = { display_name: string; score: number };

const GM_NAMES = new Set(["JACKPHICH", "Elon Musk"]);

const GAMES = [
  {
    href: "/game/wordle",
    label: "Word Guess",
    icon: "W",
    desc: "Guess the 5-letter word",
    key: "wordle",
    rules: [
      "เดาคำศัพท์ภาษาอังกฤษ 5 ตัวอักษร",
      "มีโอกาสเดา 6 ครั้ง",
      " สีเขียว = ตัวอักษรถูกต้องและอยู่ถูกตำแหน่ง",
      " สีเหลือง = ตัวอักษรมีในคำ แต่อยู่ผิดตำแหน่ง",
      " สีเทา = ตัวอักษรไม่มีในคำ",
    ],
  },
  {
    href: "/game/2048",
    label: "2048",
    icon: "2048",
    desc: "Merge tiles to win",
    key: "2048",
    rules: [
      "เลื่อน Tile ด้วยลูกศร (คอม) หรือ Swipe (มือถือ)",
      "Tile ที่มีตัวเลขเหมือนกันจะรวมกันเป็น 2 เท่า",
      "เป้าหมายคือได้ Tile เลข 2048",
      "ถ้าไม่มีช่องว่างและรวมไม่ได้ = Game Over",
    ],
  },
];

const MEDALS = ["", "", ""];

export default function GamePage() {
  const [scores, setScores] = useState<Record<string, ScoreEntry[]>>({});

  useEffect(() => {
    GAMES.forEach((g) => {
      getTopGameScores(g.key, 10).then((data) =>
        setScores((prev) => ({ ...prev, [g.key]: data }))
      );
    });
  }, []);

  return (
    <>
      <main className="flex flex-col items-center pt-24 pb-12 px-4" style={{ minHeight: "100vh" }}>
        <h1 className="text-3xl font-black mb-2 tracking-widest" style={{ color: "var(--text)" }}>
          Games
        </h1>
        <p className="text-sm mb-10" style={{ color: "var(--text-muted)" }}>
          Choose a game to play
        </p>

        <div className="grid grid-cols-1 gap-6 w-full max-w-2xl sm:grid-cols-2">
          {GAMES.map((g) => (
            <div key={g.href} className="flex flex-col rounded-2xl overflow-hidden" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
              <Link
                href={g.href}
                className="flex flex-col items-center justify-center p-8 transition-all hover:opacity-80"
                style={{ textDecoration: "none", borderBottom: "1px solid var(--border)" }}
              >
                <span className="text-4xl font-black mb-3" style={{ color: "var(--primary)" }}>{g.icon}</span>
                <span className="text-lg font-bold" style={{ color: "var(--text)" }}>{g.label}</span>
                <span className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{g.desc}</span>
                <span className="mt-4 text-xs font-bold px-4 py-1.5 rounded-full" style={{ background: "var(--primary)", color: "#fff" }}>
                  เล่นเลย →
                </span>
              </Link>

              {/* Rules */}
              <div className="p-5" style={{ borderBottom: "1px solid var(--border)" }}>
                <p className="text-xs font-bold mb-3 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>วิธีเล่น</p>
                <ul className="flex flex-col gap-2">
                  {g.rules.map((r, i) => (
                    <li key={i} className="flex gap-2 text-xs" style={{ color: "var(--text-muted)", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--primary)", fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Top 10 */}
              <div className="p-5">
                <p className="text-xs font-bold mb-3 flex items-center gap-1.5 uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  <Trophy size={12} style={{ color: "var(--accent)" }} /> Top 10
                </p>
                {(scores[g.key] ?? []).length === 0 ? (
                  <p className="text-xs" style={{ color: "var(--text-muted)" }}>ยังไม่มีสถิติ — เป็นคนแรกได้เลย!</p>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    {(scores[g.key] ?? []).map((entry, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ background: i === 0 ? "rgba(245,158,11,0.08)" : "var(--surface-2)", border: "1px solid var(--border)" }}>
                        <span style={{ fontSize: 13, width: 20, textAlign: "center", flexShrink: 0 }}>
                          {MEDALS[i] ?? <span style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>{i + 1}.</span>}
                        </span>
                        <span className="flex-1 text-xs font-semibold truncate" style={{ color: "var(--text)" }}>
                          {entry.display_name}
                          {GM_NAMES.has(entry.display_name) && <span style={{ marginLeft: 6, fontSize: 10, fontWeight: 800, color: "#ef4444", textShadow: "0 0 8px #ef4444, 0 0 16px #fca5a5" }}>[GM]</span>}
                        </span>
                        <span className="text-xs font-bold" style={{ color: "var(--accent)" }}>{entry.score.toLocaleString()} pts</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
