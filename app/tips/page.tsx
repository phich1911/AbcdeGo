import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เทคนิคและบทความเตรียมสอบ — AbcdeGo",
  description:
    "รวมบทความเทคนิคเตรียมสอบ ก.พ. TOEIC ภาษาอังกฤษ คณิตศาสตร์ และอื่นๆ สำหรับผู้เตรียมสอบราชการและสอบวัดระดับ",
  openGraph: {
    title: "เทคนิคและบทความเตรียมสอบ — AbcdeGo",
    description: "รวมบทความเทคนิคเตรียมสอบ ก.พ. TOEIC และอื่นๆ",
  },
};

const articles = [
  {
    href: "/tips/kp",
    icon: "",
    tag: "ก.พ.",
    title: "เทคนิคทำข้อสอบ ก.พ. ครบทุกวิชา",
    desc: "อนุกรม · คณิตศาสตร์ · ภาษาไทย · เงื่อนไขสัญลักษณ์ · ภาษาอังกฤษ · กฎหมายข้าราชการ · บริหารเวลา 180 นาที",
    mins: "10 นาที",
  },
  {
    href: "/tips/toeic",
    icon: "",
    tag: "TOEIC",
    title: "TOEIC คืออะไร? ครบทุกอย่างในหน้าเดียว",
    desc: "โครงสร้างข้อสอบ · คะแนนมาตรฐาน · เทคนิค Listening & Reading · วิธีเตรียมตัว",
    mins: "8 นาที",
  },
];

export default function TipsIndexPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px 60px" }}>
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          บทความ
        </span>
        <h1 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "var(--text)" }}>
          คลังความรู้
        </h1>
      </div>

      {/* Article Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {articles.map((a) => (
          <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: "24px 28px", display: "flex", gap: 20, alignItems: "flex-start", cursor: "pointer", transition: "all 0.15s" }}>
              <span style={{ fontSize: 36, lineHeight: 1, flexShrink: 0 }}>{a.icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 980,
                    background: "var(--primary)", color: "#fff", letterSpacing: "0.05em",
                  }}>{a.tag}</span>
                  <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>อ่าน {a.mins}</span>
                </div>
                <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 17, color: "var(--text)", lineHeight: 1.4 }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>{a.desc}</p>
              </div>
              <span style={{ fontSize: 18, color: "var(--text-subtle)", flexShrink: 0, alignSelf: "center" }}>→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="card" style={{ marginTop: 48, padding: "24px", textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "var(--text)" }}>ฝึกทำข้อสอบจริงด้วย e-Exam</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>สะสม XP ครบ 1,000 ปลดล็อคข้อสอบจำลอง ก.พ. 100 ข้อ ฟรี</p>
        <Link href="/e-exam" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
          ดู e-Exam →
        </Link>
      </div>
    </main>
  );
}
