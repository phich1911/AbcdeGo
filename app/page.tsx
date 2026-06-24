import Link from "next/link";
import SiteStatsWrapper from "@/components/SiteStatsWrapper";
import { COURSES } from "@/lib/data";
import { getPopularCourseIds } from "@/lib/popular-courses";
import { getLearnerCount } from "@/lib/supabase";

const totalLessons = COURSES.reduce((s, c) => s + c.totalLessons, 0);

export const dynamic = "force-dynamic";

export const metadata = {
  title: "AbcdeGo — เรียนฟรี ได้ XP แลกของได้จริง",
  description: "แพลตฟอร์มเรียนออนไลน์ฟรี ม.ปลาย + สอบราชการ ก.พ. ภาค ข. สะสม XP แข่งอันดับทั่วประเทศ แลกส่วนลดสินค้า ปลดล็อคข้อสอบจำลองจับเวลาเสมือนจริง",
};

const FEATURES = [
  {
    title: "เรียนฟรี ไม่มีค่าใช้จ่าย",
    desc: "คอร์ส ม.ปลาย และเตรียมสอบราชการ ก.พ. / ภาค ข. ครบจบที่เดียว ไม่ต้องจ่ายแม้บาทเดียว",
    stat: `${COURSES.length} วิชา · ${totalLessons} บทเรียน`,
  },
  {
    title: "สะสม XP แลกของได้จริง",
    desc: "ทุกบทเรียนที่เรียนจบได้ XP — เอาไปแลกส่วนลดสินค้าหรือของรางวัลในร้านค้าได้เลย",
    stat: "ร้านค้า XP",
  },
  {
    title: "แข่งอันดับทั่วประเทศ",
    desc: "Leaderboard แบบ real-time ยิ่งเรียนเยอะ ยิ่ง rank สูง ขึ้น Level แข่งกับคนทั่วประเทศ",
    stat: "Leaderboard Live",
  },
  {
    title: "ข้อสอบจำลองเสมือนจริง",
    desc: "ปลดล็อคด้วย XP แล้วสอบแบบจับเวลา เสมือนนั่งสอบจริง ครบทุกวิชา ก.พ. 100 ข้อ",
    stat: "E-Exam จับเวลา",
  },
];

const WHO_FOR = [
  { label: "นักเรียน ม.4–6", desc: "ฟิสิกส์ · คณิตศาสตร์ · ภาษาอังกฤษ · ภาษาไทย" },
  { label: "เตรียมสอบ ก.พ.", desc: "ภาค ก. ครบทุกวิชา พร้อมข้อสอบจำลอง" },
  { label: "สอบราชการ ภาค ข.", desc: "ความรู้ทั่วไปเกี่ยวกับราชการและกฎหมาย" },
];

export default async function Home() {
  const [popularIds, learnerCount] = await Promise.all([
    getPopularCourseIds(),
    getLearnerCount(),
  ]);

  return (
    <main className="flex-1" style={{ paddingTop: 60 }}>

      {/* Hero */}
      <section style={{ borderBottom: "1px solid var(--border)", padding: "72px 24px 56px" }}>
        <div className="max-w-4xl mx-auto">
          <span className="badge" style={{ color: "var(--accent-green)", borderColor: "rgba(63,185,80,0.4)", background: "rgba(63,185,80,0.08)", marginBottom: 20, display: "inline-block" }}>
            ✦ เรียนฟรี · ไม่ต้องสมัครสมาชิกก็เริ่มได้
          </span>

          <h1 style={{ fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 800, color: "var(--text)", lineHeight: 1.15, marginBottom: 20, letterSpacing: "-0.03em" }}>
            เรียนฟรี ได้ XP{" "}
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              แลกของได้จริง
            </span>
            <br />
            <span style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              แข่งอันดับ
            </span>
            {" "}ทั่วประเทศ
          </h1>

          <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 560, marginBottom: 32, lineHeight: 1.7 }}>
            แพลตฟอร์มเรียนออนไลน์สำหรับนักเรียน ม.ปลาย และคนเตรียมสอบราชการ
            — เรียนแล้วได้ XP จริง แลกสินค้าได้ แข่ง Leaderboard ได้
            และยังมีข้อสอบจำลองจับเวลาเสมือนสอบจริง
          </p>

          <div className="flex gap-3 flex-wrap" style={{ marginBottom: 40 }}>
            <Link href="/courses" className="btn-primary" style={{ padding: "11px 24px", fontSize: 15 }}>
              เริ่มเรียนเลย →
            </Link>
            <Link href="/e-exam" className="btn-secondary" style={{ padding: "11px 24px", fontSize: 15 }}>
              ดูข้อสอบจำลอง
            </Link>
          </div>

          {/* Stats */}
          <div className="flex gap-8 flex-wrap">
            {[
              { num: "2,400+", label: "ผู้เข้าใช้งาน" },
              { num: String(COURSES.length), label: "วิชา" },
              { num: String(totalLessons), label: "บทเรียน" },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 26, fontWeight: 800, color: "var(--text)", lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who is this for */}
      <section style={{ padding: "48px 24px", borderBottom: "1px solid var(--border)", background: "var(--surface-2)" }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>
            เหมาะสำหรับ
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            {WHO_FOR.map((w) => (
              <div key={w.label} className="card-lg" style={{ padding: "20px 22px" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text)", marginBottom: 6 }}>{w.label}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6 }}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "56px 24px", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
            ทำไมต้อง AbcdeGo
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--text)", marginBottom: 32, letterSpacing: "-0.02em" }}>
            ไม่ใช่แค่เรียน — แต่ได้อะไรกลับมาจริงๆ
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {FEATURES.map((f, i) => (
              <div key={i} className="card-lg" style={{ padding: "24px 26px" }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
                  {f.stat}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>{f.title}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard */}
      <SiteStatsWrapper />

      {/* Popular courses */}
      <section style={{ padding: "48px 24px", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)" }}>คอร์สยอดนิยม</h2>
            <Link href="/courses" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none" }}>ดูทั้งหมด →</Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{course.title}</h3>
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

      {/* CTA Bottom */}
      <section style={{ padding: "64px 24px" }}>
        <div className="max-w-4xl mx-auto" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 800, color: "var(--text)", marginBottom: 12, letterSpacing: "-0.02em" }}>
            เริ่มเรียน เริ่มสะสม XP วันนี้
          </h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.7 }}>
            ฟรีทุกอย่าง ไม่มีค่าใช้จ่ายแอบแฝง — แค่เรียนแล้วได้ XP แลกของจริง
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/courses" className="btn-primary" style={{ padding: "12px 28px", fontSize: 15 }}>
              เริ่มเรียนเลย →
            </Link>
            <Link href="/leaderboard" className="btn-secondary" style={{ padding: "12px 28px", fontSize: 15 }}>
              ดู Leaderboard
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
