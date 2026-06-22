"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { COURSES, getLessonsForCourse } from "@/lib/data";
import { getProgress, getCourseProgress, syncProgressFromCloud } from "@/lib/progress";
import { getSession, syncLeaderboard } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";
import { Star, Zap, BookOpen, Flame, Trophy } from "lucide-react";

function useCountUp(target: number, duration = 900) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  useEffect(() => {
    if (target === 0) { setValue(0); return; }
    const start = performance.now();
    const animate = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [target, duration]);
  return value;
}

export default function DashboardPage() {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(1);
  const [completedCount, setCompletedCount] = useState(0);
  const [courseProgresses, setCourseProgresses] = useState<number[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [syncDone, setSyncDone] = useState(false);
  const [syncDebug, setSyncDebug] = useState<string | null>(null);

  useEffect(() => {
    const p = getProgress();
    setXp(p.xp);
    setStreak(p.streak);
    setCompletedCount(p.completedLessons.length);
    setCourseProgresses(COURSES.map((c) => getCourseProgress(c.id, c.totalLessons)));
    (async () => {
      const session = await getSession();
      const u = session?.user ?? null;
      setUser(u);
      if (!u) { setSyncDebug("no user session"); return; }
      await syncProgressFromCloud();
      const p2 = getProgress();
      setXp(p2.xp);
      setStreak(p2.streak);
      setCompletedCount(p2.completedLessons.length);
      setCourseProgresses(COURSES.map((c) => getCourseProgress(c.id, c.totalLessons)));
      if (p2.xp > 0) {
        const res = await syncLeaderboard(p2.xp);
        setSyncDebug(JSON.stringify(res));
        if (res?.ok) setSyncDone(true);
      } else {
        setSyncDebug("xp=0, skip");
      }
    })();
  }, []);

  const totalLessons = COURSES.reduce((sum, c) => sum + c.totalLessons, 0);
  const level = Math.floor(xp / 100) + 1;
  const levelXp = xp % 100;

  const animLevel = useCountUp(level);
  const animXp = useCountUp(xp);
  const animCompleted = useCountUp(completedCount);
  const animStreak = useCountUp(streak);
  const animLevelXp = useCountUp(levelXp);

  return (
    <>
      <main className="max-w-4xl mx-auto px-6 pt-28 pb-12">
        {syncDebug && <div style={{ background: "#1e293b", color: "#f1f5f9", fontSize: 12, padding: "8px 12px", borderRadius: 8, marginBottom: 12, wordBreak: "break-all" }}>🔧 sync: {syncDebug}</div>}
        <h1 className="text-2xl md:text-4xl font-black mb-2">ความก้าวหน้าของคุณ</h1>
        <p style={{ color: "var(--text-muted)" }} className="mb-10">
          ทุกบทเรียนที่เรียนจะบันทึกไว้ที่นี่
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: "เลเวล", value: animLevel, icon: <Star size={22} fill="currentColor" />, color: "#a855f7" },
            { label: "XP รวม", value: animXp, icon: <Zap size={22} fill="currentColor" />, color: "#f59e0b" },
            { label: "บทเรียนสำเร็จ", value: `${animCompleted}/${totalLessons}`, icon: <BookOpen size={22} />, color: "#10b981" },
            { label: "Streak", value: `${animStreak} วัน`, icon: <Flame size={22} fill="currentColor" />, color: "#ef4444" },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <div className="mb-2 flex justify-center" style={{ color: s.color }}>{s.icon}</div>
              <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Level progress */}
        <div className="glass rounded-2xl p-6 mb-8">
          <div className="flex justify-between mb-3">
            <span className="font-bold">Lv.{animLevel}</span>
            <span style={{ color: "var(--text-muted)" }} className="text-sm">{animLevelXp}/100 XP สู่ Lv.{animLevel + 1}</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${animLevelXp}%` }} />
          </div>
        </div>

        {/* Course progress */}
        <h2 className="text-xl font-black mb-4">ความก้าวหน้าแต่ละวิชา</h2>
        <div className="flex flex-col gap-4">
          {COURSES.map((course, i) => {
            const pct = courseProgresses[i] ?? 0;
            if (pct === 0) return null;
            return (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="glass rounded-2xl p-5 flex items-center gap-5 transition-all hover:scale-[1.01]"
              >
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
            <h2 className="text-lg font-black mb-1 flex items-center gap-2"><Trophy size={18} style={{ color: "var(--accent)" }} /> Leaderboard</h2>
            <p className="text-sm" style={{ color: syncDone ? "var(--accent-green)" : "var(--text-muted)" }}>
              {syncDone ? "✓ อัพเดท Ranking อัตโนมัติแล้ว" : `กำลังอัพเดท Ranking — XP ของคุณ ${xp.toLocaleString()} XP`}
            </p>
          </div>
        )}
      </main>
    </>
  );
}
