"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/supabase";
import { AVATARS } from "@/lib/avatar";
import { Trophy, Zap, Users } from "lucide-react";

type Entry = { name: string; xp: number; avatar: string | null };

const GM_NAMES = new Set(["JACKPHICH", "Elon Musk"]);

const MEDALS = [
  <span key="1" style={{ fontWeight: 900, color: "#f59e0b", fontSize: 16 }}>🥇</span>,
  <span key="2" style={{ fontWeight: 900, color: "#94a3b8", fontSize: 16 }}>🥈</span>,
  <span key="3" style={{ fontWeight: 900, color: "#cd7c2f", fontSize: 16 }}>🥉</span>,
];

export default function SiteStats() {
  const [board, setBoard] = useState<Entry[]>([]);
  const [totalLearners, setTotalLearners] = useState<number>(0);

  useEffect(() => {
    const load = () => {
      getLeaderboard(10).then(setBoard).catch(() => setBoard([]));
      fetch("/api/learner-count").then(r => r.json()).then(d => setTotalLearners(d.count ?? 0)).catch(() => {});
    };
    load();
    const t = setTimeout(load, 3000);
    window.addEventListener("leaderboard-updated", load);
    return () => { clearTimeout(t); window.removeEventListener("leaderboard-updated", load); };
  }, []);

  return (
    <section className="px-6 py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Total learners */}
        {totalLearners > 0 && (
          <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-2xl" style={{ background: "rgba(0,122,255,0.06)", border: "1px solid rgba(0,122,255,0.15)" }}>
            <Users size={18} style={{ color: "var(--primary)", flexShrink: 0 }} />
            <span style={{ fontSize: 14, color: "var(--text-muted)" }}>
              มีผู้เรียนทั้งหมด <strong style={{ color: "var(--primary)", fontSize: 16 }}>{totalLearners.toLocaleString()}</strong> คนแล้ว
            </span>
          </div>
        )}

        {/* Leaderboard */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2">
            <Trophy size={18} style={{ color: "var(--accent)" }} /> <span>ผู้นำตาราง XP</span>
            <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 500, color: "var(--text-muted)" }}>Top 10</span>
          </h3>
          {board.length === 0 ? (
            <p className="text-sm text-center py-6" style={{ color: "var(--text-muted)" }}>ยังไม่มีข้อมูล — เป็นคนแรกได้เลย!</p>
          ) : (
            <div className="flex flex-col gap-2">
              {board.map((entry, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: i === 0 ? "rgba(240,136,62,0.08)" : "var(--surface-2)", border: "1px solid var(--border)" }}>
                  <span className="w-7 text-center flex items-center justify-center">{MEDALS[i] ?? <span style={{ fontWeight: 700, fontSize: 12, color: "var(--text-muted)" }}>{i + 1}.</span>}</span>
                  {entry.avatar && (
                    <span style={{ fontSize: 16 }}>{AVATARS.find((a) => a.id === entry.avatar)?.emoji}</span>
                  )}
                  <span className="flex-1 font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{entry.name}{GM_NAMES.has(entry.name) && <span style={{ marginLeft: 6, fontSize: 11, fontWeight: 800, color: "#ef4444", textShadow: "0 0 8px #ef4444, 0 0 16px #fca5a5" }}>[GM]</span>}</span>
                  <span className="badge mr-1" style={{ color: "var(--accent-purple)", borderColor: "rgba(165,160,248,0.3)", background: "rgba(165,160,248,0.08)", fontSize: 11 }}>Lv.{Math.floor(entry.xp / 100) + 1}</span>
                  <span className="text-sm font-semibold flex items-center gap-1" style={{ color: "var(--accent)" }}><Zap size={12} fill="currentColor" /> {entry.xp.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
