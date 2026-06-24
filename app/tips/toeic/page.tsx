import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "TOEIC คืออะไร? โครงสร้าง คะแนน เทคนิคสอบ ฉบับครบจบในหน้าเดียว — AbcdeGo",
  description:
    "TOEIC คืออะไร สอบอะไรบ้าง โครงสร้าง Listening + Reading 200 ข้อ คะแนนเท่าไหร่ถึงผ่าน เทคนิคทำข้อสอบ TOEIC และวิธีเตรียมตัวสอบสำหรับมือใหม่",
  openGraph: {
    title: "TOEIC คืออะไร? ครบทุกอย่างในหน้าเดียว",
    description: "โครงสร้างข้อสอบ TOEIC คะแนนมาตรฐาน และเทคนิคทำข้อสอบ Listening + Reading",
  },
};

const sections = [
  {
    id: "what",
    icon: "",
    title: "TOEIC คืออะไร?",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <p style={{ margin: 0, fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9 }}>
          <strong style={{ color: "var(--text)" }}>TOEIC</strong> (Test of English for International Communication)
          คือข้อสอบวัดระดับความสามารถการใช้ภาษาอังกฤษในบริบทการทำงานและชีวิตประจำวัน
          พัฒนาโดย ETS (Educational Testing Service) ซึ่งเป็นองค์กรเดียวกับที่ออกข้อสอบ TOEFL และ SAT
        </p>
        <p style={{ margin: 0, fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9 }}>
          ในไทย TOEIC เป็นมาตรฐานที่บริษัทและหน่วยงานราชการนิยมใช้ในการสมัครงาน
          โดยเฉพาะตำแหน่งที่ต้องใช้ภาษาอังกฤษในการสื่อสาร
        </p>
      </div>
    ),
  },
  {
    id: "structure",
    icon: "",
    title: "โครงสร้างข้อสอบ TOEIC",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div className="card" style={{ padding: 20 }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 16, color: "var(--text)" }}> Listening</p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "var(--text-muted)" }}>100 ข้อ · 45 นาที</p>
            <ul style={{ margin: "8px 0 0", padding: "0 0 0 18px", fontSize: 13, color: "var(--text-muted)", lineHeight: 2 }}>
              <li>Part 1: Photographs (6 ข้อ)</li>
              <li>Part 2: Question-Response (25 ข้อ)</li>
              <li>Part 3: Conversations (39 ข้อ)</li>
              <li>Part 4: Talks (30 ข้อ)</li>
            </ul>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <p style={{ margin: "0 0 8px", fontWeight: 700, fontSize: 16, color: "var(--text)" }}> Reading</p>
            <p style={{ margin: "0 0 4px", fontSize: 13, color: "var(--text-muted)" }}>100 ข้อ · 75 นาที</p>
            <ul style={{ margin: "8px 0 0", padding: "0 0 0 18px", fontSize: 13, color: "var(--text-muted)", lineHeight: 2 }}>
              <li>Part 5: Incomplete Sentences (30 ข้อ)</li>
              <li>Part 6: Text Completion (16 ข้อ)</li>
              <li>Part 7: Reading Comprehension (54 ข้อ)</li>
            </ul>
          </div>
        </div>
        <div className="card" style={{ padding: 16, background: "rgba(0,122,255,0.05)", border: "1px solid rgba(0,122,255,0.15)" }}>
          <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>
             <strong style={{ color: "var(--text)" }}>รวม 200 ข้อ · 2 ชั่วโมง</strong> · คะแนนเต็ม 990 คะแนน (Listening 495 + Reading 495) · ไม่มีหักคะแนนข้อที่ผิด
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "score",
    icon: "",
    title: "คะแนน TOEIC เท่าไหร่ถึงพอ?",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { range: "900–990", label: "ระดับ Expert", desc: "เหมาะกับสายงานที่ใช้ภาษาอังกฤษเป็นหลัก เช่น ล่าม นักวิเทศสัมพันธ์", color: "#22c55e" },
          { range: "750–895", label: "ระดับ Advanced", desc: "มาตรฐานบริษัทข้ามชาติและหน่วยงานรัฐชั้นนำ", color: "#3b82f6" },
          { range: "550–745", label: "ระดับ Intermediate", desc: "มาตรฐานทั่วไปสำหรับการสมัครงานส่วนใหญ่ในไทย", color: "#f59e0b" },
          { range: "10–545", label: "ระดับ Basic", desc: "ยังต้องพัฒนาเพิ่มเติมก่อนนำไปใช้สมัครงาน", color: "#ef4444" },
        ].map((s) => (
          <div key={s.range} className="card" style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: s.color, minWidth: 90 }}>{s.range}</span>
            <div>
              <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "var(--text)" }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)" }}>{s.desc}</p>
            </div>
          </div>
        ))}
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-subtle)", textAlign: "center" }}>
          ค่าสมัครสอบ: ประมาณ 1,800 บาท · ผลสอบมีอายุ 2 ปี
        </p>
      </div>
    ),
  },
  {
    id: "tips-listening",
    icon: "",
    title: "เทคนิคทำ Listening",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { h: "Part 1 รูปภาพ — ดูภาพก่อน ฟังทีหลัง", b: "ก่อนเสียงเล่น ใช้เวลาดูภาพ 5-8 วินาที ระบุ subject หลัก (คน/สิ่งของ/สถานที่) แล้วตั้งใจฟัง verb และ position เช่น 'is standing', 'is placed on'" },
          { h: "Part 2 คำถาม-คำตอบ — จับ Wh-word แรก", b: "ฟัง What/Where/When/Who/Why/How ให้ได้ก่อน แล้วตัดตัวเลือกที่ไม่ตอบตรงประเด็น ระวัง 'trap' ที่ใช้คำซ้ำจากคำถามแต่ตอบผิด" },
          { h: "Part 3-4 บทสนทนา — อ่านโจทย์ก่อนฟัง", b: "ใช้เวลาว่างระหว่างข้อ อ่านคำถาม 3 ข้อถัดไปก่อนเสียงเล่น วิธีนี้ทำให้รู้ว่าต้องฟังอะไร ไม่ต้องจำทุกอย่าง" },
          { h: "ไม่รู้ — เดาเลย ไม่หักคะแนน", b: "ถ้าพลาดข้อไป อย่าเสียเวลาคิด เลือกคำตอบแล้วเตรียมฟังข้อต่อไปทันที เพราะ TOEIC ไม่หักคะแนน" },
        ].map((t, i) => (
          <div key={i} className="card" style={{ padding: "16px 20px" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{t.h}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8 }}>{t.b}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "tips-reading",
    icon: "",
    title: "เทคนิคทำ Reading",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { h: "Part 5 ไวยากรณ์ — จำ 6 หมวดที่ออกบ่อย", b: "1) Verb Tense 2) Subject-Verb Agreement 3) Parts of Speech (noun/adj/adv/verb) 4) Preposition 5) Pronoun 6) Conjunction — ครบ 6 นี้ทำได้ 80%+ ของ Part 5" },
          { h: "Part 6 ช่องว่างใน Paragraph — อ่าน context รอบข้าง", b: "ช่องว่างใน Part 6 มักต้องการความเข้าใจ paragraph ทั้งหมด ไม่ใช่แค่ประโยคเดียว โดยเฉพาะข้อที่เลือก 'ประโยคที่เหมาะสม' ต้องอ่านก่อนและหลังช่องว่าง" },
          { h: "Part 7 Reading — อ่านโจทย์ก่อน แล้วค้นหา", b: "TOEIC Reading ไม่ต้องอ่านทุกคำ อ่านคำถามก่อน แล้ว scan หาคำสำคัญใน passage ตำแหน่งที่ถามมักอยู่ในส่วนแรกและส่วนท้าย" },
          { h: "บริหารเวลา 75 นาที", b: "Part 5: ~20 นาที (30 ข้อ) · Part 6: ~15 นาที (16 ข้อ) · Part 7: ~40 นาที (54 ข้อ) ถ้า Part 7 ใกล้หมดเวลา ให้เดาข้อที่เหลือและตรวจข้ออื่นแทน" },
        ].map((t, i) => (
          <div key={i} className="card" style={{ padding: "16px 20px" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{t.h}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8 }}>{t.b}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "prepare",
    icon: "",
    title: "วิธีเตรียมตัวสอบ TOEIC",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { h: "1-3 เดือนก่อนสอบ — สร้างพื้นฐาน", b: "เรียน Grammar พื้นฐานให้แน่น ฝึกฟังภาษาอังกฤษทุกวัน เช่น Podcast หรือ YouTube บทสนทนาธุรกิจ ท่องคำศัพท์ธุรกิจอย่างน้อย 10 คำ/วัน" },
          { h: "2-4 สัปดาห์ก่อนสอบ — ฝึก Mock Test", b: "ทำข้อสอบเต็มชุดจับเวลาอย่างน้อย 2 ครั้ง วิเคราะห์ข้อผิดพลาดและจดหัวข้อที่พลาดบ่อย แล้วทบทวนเฉพาะจุดนั้น" },
          { h: "วันก่อนสอบ — อย่าอัดเนื้อหา", b: "พักผ่อนให้เต็มที่ ทบทวน strategy สั้นๆ เตรียมบัตรประชาชน/หนังสือเดินทาง และปากกา 2B สำหรับฝนกระดาษคำตอบ" },
          { h: "วันสอบ — มาก่อนเวลาอย่างน้อย 30 นาที", b: "การเช็กชื่อและตรวจบัตรใช้เวลา ถ้ามาสาย อาจเข้าสอบไม่ได้ และค่าสมัครไม่คืน" },
        ].map((t, i) => (
          <div key={i} className="card" style={{ padding: "16px 20px" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{t.h}</p>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-muted)", lineHeight: 1.8 }}>{t.b}</p>
          </div>
        ))}
      </div>
    ),
  },
];

export default function ToeicPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px 60px" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: 13, color: "var(--text-subtle)", marginBottom: 24 }}>
        <Link href="/tips" style={{ color: "var(--primary)", textDecoration: "none" }}>เทคนิค</Link>
        {" → "}TOEIC
      </p>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ภาษาอังกฤษ
        </span>
        <h1 style={{ fontSize: "clamp(26px,5vw,38px)", fontWeight: 800, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "var(--text)", lineHeight: 1.2 }}>
          TOEIC คืออะไร?<br />ครบทุกอย่างในหน้าเดียว
        </h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", margin: 0, lineHeight: 1.8 }}>
          โครงสร้างข้อสอบ · คะแนนมาตรฐาน · เทคนิค Listening & Reading · วิธีเตรียมตัว
        </p>
      </div>

      {/* Quick Nav */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48 }}>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} style={{
            padding: "6px 14px", borderRadius: 980, fontSize: 12, fontWeight: 500,
            background: "var(--surface)", border: "1px solid var(--border)",
            color: "var(--text-muted)", textDecoration: "none",
          }}>
            {s.icon} {s.title.split("?")[0]}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
        {sections.map((s) => (
          <section key={s.id} id={s.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <span style={{ fontSize: 28 }}>{s.icon}</span>
              <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "var(--text)" }}>{s.title}</h2>
            </div>
            {s.content}
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="card" style={{ marginTop: 56, padding: "28px 24px", textAlign: "center" }}>
        <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", color: "var(--text)" }}>
          ฝึกภาษาอังกฤษกับ AbcdeGo ได้เลย
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px", lineHeight: 1.7 }}>
          คอร์สภาษาอังกฤษฟรี ทำแบบทดสอบรับ XP สะสมเพื่อปลดล็อค e-Exam ข้อสอบจำลอง ก.พ.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/courses" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
            เริ่มเรียนฟรี →
          </Link>
          <Link href="/tips" style={{
            padding: "10px 24px", fontSize: 14, borderRadius: 980, fontWeight: 600,
            border: "1px solid var(--border)", background: "var(--surface-2)",
            color: "var(--text-muted)", textDecoration: "none",
          }}>
            ← กลับหน้าเทคนิค
          </Link>
        </div>
      </div>
    </main>
  );
}
