"use client";

import { useEffect, useState } from "react";
import { getLeaderboard } from "@/lib/supabase";
import { AVATARS } from "@/lib/avatar";
import { Trophy, Zap } from "lucide-react";

type Entry = { name: string; xp: number; avatar: string | null };

const MEDALS = [
  <span key="1" style={{ fontWeight: 900, color: "#f59e0b", fontSize: 13 }}>01</span>,
  <span key="2" style={{ fontWeight: 900, color: "#94a3b8", fontSize: 13 }}>02</span>,
  <span key="3" style={{ fontWeight: 900, color: "#cd7c2f", fontSize: 13 }}>03</span>,
];

export default function SiteStats() {
  const [board, setBoard] = useState<Entry[]>([]);

  useEffect(() => {
    const load = () => getLeaderboard(5).then(setBoard).catch(() => setBoard([]));
    load();
    // Re-fetch after the Navbar's leaderboard sync has had time to complete
    const t = setTimeout(load, 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="px-6 py-16" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="max-w-2xl mx-auto">
        {/* Leaderboard */}
        <div className="glass rounded-2xl p-6">
          <h3 className="font-black text-lg mb-4 flex items-center gap-2">
            <Trophy size={18} style={{ color: "var(--accent)" }} /> <span>ผู้นำตาราง XP</span>
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
                  <span className="flex-1 font-semibold text-sm truncate" style={{ color: "var(--text)" }}>{entry.name}{entry.name === "JACKPHICH" && <span style={{ color: "#ef4444", marginLeft: 4 }}>(GM)</span>}</span>
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
