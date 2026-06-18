import Link from "next/link";
import SiteStatsWrapper from "@/components/SiteStatsWrapper";
import { COURSES } from "@/lib/data";
import { getPopularCourseIds } from "@/lib/popular-courses";

const totalLessons = COURSES.reduce((s, c) => s + c.totalLessons, 0);
const totalXp = COURSES.reduce((s, c) => s + c.xpReward, 0);

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AbcdeGo — เรียน เล่น เก่งขึ้น",
  description: "แพลตฟอร์มติวสอบราชการ ก.พ. DSI ปลัดอำเภอ เรียนฟรี ทำแบบทดสอบ รับ XP สะสมเลเวล",
};

export default async function Home() {
  const popularIds = await getPopularCourseIds();
  return (
    <>
      <main className="flex-1" style={{ paddingTop: 48 }}>

        {/* Hero */}
        <section style={{ borderBottom: "1px solid var(--border)", padding: "64px 24px 48px" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-5">
              <span className="badge" style={{ color: "var(--accent-green)", borderColor: "rgba(63,185,80,0.4)", background: "rgba(63,185,80,0.08)" }}>
                ✦ เรียนฟรี ไม่ต้องเสียค่าสมัคร
              </span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 5.5vw, 56px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.2, marginBottom: 16, letterSpacing: "-0.03em" }}>
              <span>เรียน </span>
              <span style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>เล่น </span>
              <span style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>เก่งขึ้น</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 520, marginBottom: 28, lineHeight: 1.6 }}>
              AbcdeGo รวมวิชาสอบราชการไว้ครบ — ก.พ., DSI, ปลัดอำเภอ
              เรียนทีละขั้น ทำแบบทดสอบ รับ XP สะสมเลเวล
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/courses" className="btn-primary" style={{ padding: "8px 20px", fontSize: 14 }}>
                เริ่มเรียนเลย →
              </Link>
              <Link href="/dashboard" className="btn-secondary" style={{ padding: "8px 20px", fontSize: 14 }}>
                ดูความก้าวหน้า
              </Link>
            </div>

            {/* Stats row */}
            <div className="flex gap-6 mt-10 flex-wrap">
              {[
                { num: String(COURSES.length), label: "วิชา" },
                { num: String(totalLessons), label: "บทเรียน" },
                { num: `${totalXp.toLocaleString()}+`, label: "XP รวม" },
              ].map((s) => (
                <div key={s.label} style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ fontSize: 22, fontWeight: 700, color: "var(--text)" }}>{s.num}</span>
                  <span style={{ fontSize: 13, color: "var(--text-muted)" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Popular courses */}
        <section style={{ padding: "40px 24px", borderBottom: "1px solid var(--border)" }}>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "var(--text)" }}>คอร์สยอดนิยม</h2>
              <Link href="/courses" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>ดูทั้งหมด →</Link>
            </div>
            <div className="grid md:grid-cols-3 gap-3">
              {COURSES.filter((c) => popularIds.includes(c.id))
                .sort((a, b) => popularIds.indexOf(a.id) - popularIds.indexOf(b.id))
                .map((course) => (
                  <Link key={course.id} href={`/course/${course.id}`}
                    className="card-lg flex flex-col gap-3 p-4 transition-colors hover:border-[color:var(--text-subtle)]"
                    style={{ textDecoration: "none" }}>
                    <div className="flex items-center justify-end">
                      <span className="badge" style={{ fontSize: 11 }}>{course.tag}</span>
                    </div>
                    <div>
                      <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{course.category || "ประถมศึกษาตอนต้น"}</h3>
                      <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.5 }}>{course.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-3" style={{ borderTop: "1px solid var(--border)" }}>
                      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>{course.totalLessons} บทเรียน</span>
                      <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>⚡ {course.xpReward} XP</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* Leaderboard + CTA */}
        <SiteStatsWrapper />


      </main>
    </>
  );
}
