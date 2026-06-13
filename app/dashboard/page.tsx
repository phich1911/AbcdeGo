"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { COURSES, getLessonsForCourse } from "@/lib/data";
import { getProgress, getCourseProgress } from "@/lib/progress";
import { submitScore, getUser, syncLeaderboard } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [completedCount, setCompletedCount] = useState(0);
  const [courseProgresses, setCourseProgresses] = useState<number[]>([]);
  const [submitName, setSubmitName] = useState("");
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const p = getProgress();
    setXp(p.xp);
    setStreak(p.streak);
    setCompletedCount(p.completedLessons.length);
    setCourseProgresses(COURSES.map((c) => getCourseProgress(c.id, c.totalLessons)));
    getUser().then(async (u) => {
      setUser(u);
      if (u) {
        const xp = getProgress().xp;
        console.log("[dashboard] user:", u.email, "xp:", xp);
        if (xp > 0) {
          const res = await syncLeaderboard(xp);
          console.log("[dashboard] sync result:", res);
        }
      }
    });
  }, []);

  const totalLessons = COURSES.reduce((sum, c) => sum + c.totalLessons, 0);
  const level = Math.floor(xp / 100) + 1;
  const levelXp = xp % 100;

  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-12">
        <h1 className="text-4xl font-black mb-2">ความก้าวหน้าของคุณ</h1>
        <p style={{ color: "var(--text-muted)" }} className="mb-10">
          ทุกบทเรียนที่เรียนจะบันทึกไว้ที่นี่
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "เลเวล", value: level, icon: "⭐", color: "#a855f7" },
            { label: "XP รวม", value: xp, icon: "⚡", color: "#f59e0b" },
            { label: "บทเรียนสำเร็จ", value: `${completedCount}/${totalLessons}`, icon: "📚", color: "#10b981" },
            { label: "Streak", value: `${streak} วัน`, icon: "🔥", color: "#ef4444" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex justify-between mb-3">
            <span className="font-bold">Lv.{level}</span>
            <span style={{ color: "var(--text-muted)" }} className="text-sm">{levelXp}/100 XP สู่ Lv.{level + 1}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${levelXp}%` }} />
          </div>
        </div>

        {/* Course progress */}
        <h2 className="text-xl font-black mb-4">ความก้าวหน้าแต่ละวิชา</h2>
        <div className="flex flex-col gap-4">
          {COURSES.map((course, i) => {
            const pct = courseProgresses[i] ?? 0;
            return (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="glass rounded-2xl p-5 flex items-center gap-5 transition-all hover:scale-[1.01]"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: `${course.color}22` }}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <h3 className="font-bold">{course.title}</h3>
                    <span className="font-bold text-sm" style={{ color: pct === 100 ? "var(--accent-green)" : "var(--primary-light)" }}>
                      {pct}%
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${pct}%`,
                        background: pct === 100
                          ? "linear-gradient(90deg, #10b981, #34d399)"
                          : undefined,
                      }}
                    />
                  </div>
                  <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
                    {course.totalLessons} บทเรียน · ⚡ {course.xpReward} XP
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {completedCount === 0 && (
          <div className="mt-10 text-center">
            <p style={{ color: "var(--text-muted)" }} className="mb-4">ยังไม่ได้เริ่มเรียนเลย — ไปเริ่มเลย!</p>
            <Link
              href="/courses"
              className="inline-block px-8 py-3 rounded-full font-bold text-white glow"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
            >
              ดูคอร์สทั้งหมด →
            </Link>
          </div>
        )}

        {/* Leaderboard */}
        {xp > 0 && (
          <div className="glass rounded-2xl p-6 mt-8">
            {user ? (
              <>
                <h2 className="text-lg font-black mb-1">🏆 Leaderboard</h2>
                <p className="text-sm" style={{ color: "var(--accent-green)" }}>
                  ✓ คะแนนของคุณ ({xp.toLocaleString()} XP) อัปเดตขึ้น Leaderboard อัตโนมัติแล้ว
                </p>
              </>
            ) : (
              <>
                <h2 className="text-lg font-black mb-1">🏆 ส่งคะแนนขึ้น Leaderboard</h2>
                <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>ใส่ชื่อเพื่อโชว์บนหน้าแรก — XP ของคุณ {xp.toLocaleString()} XP</p>
                {submitState === "done" ? (
                  <p className="text-sm font-bold" style={{ color: "var(--accent-green)" }}>✓ ส่งคะแนนสำเร็จแล้ว!</p>
                ) : (
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={submitName}
                      onChange={(e) => setSubmitName(e.target.value)}
                      placeholder="ชื่อของคุณ"
                      maxLength={20}
                      className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                    />
                    <button
                      disabled={!submitName.trim() || submitState === "loading"}
                      onClick={async () => {
                        if (!submitName.trim()) return;
                        setSubmitState("loading");
                        const ok = await submitScore(submitName.trim(), xp);
                        setSubmitState(ok ? "done" : "error");
                      }}
                      className="px-5 py-2.5 rounded-xl font-bold text-sm text-white transition-all hover:opacity-90 disabled:opacity-40"
                      style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-light))" }}
                    >
                      {submitState === "loading" ? "..." : "ส่งคะแนน"}
                    </button>
                  </div>
                )}
                {submitState === "error" && <p className="text-xs mt-2" style={{ color: "#f87171" }}>เกิดข้อผิดพลาด ลองใหม่อีกครั้ง</p>}
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}
