import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เทคนิคโกงเวลา — สูตรลับจากทฤษฎีสัมพัทธภาพ — AbcdeGo",
  description:
    "เวลาไม่ได้เท่ากันทุกคน ไอน์สไตน์พิสูจน์แล้ว รวมเทคนิคบริหารเวลาที่ปรับใช้จากทฤษฎีสัมพัทธภาพ ให้คุณ \"โกง\" เวลาได้จริงในชีวิตประจำวันและการเตรียมสอบ",
  openGraph: {
    title: "เทคนิคโกงเวลา — สูตรลับจากทฤษฎีสัมพัทธภาพ",
    description: "เวลาไม่ได้เท่ากันทุกคน ปรับใช้แนวคิดฟิสิกส์มาบริหารชีวิตจริง",
  },
};

const sections = [
  {
    icon: "⚡",
    title: "เวลาไม่ได้เท่ากันทุกคน — ไอน์สไตน์บอกแล้ว",
    content: [
      {
        heading: "ทฤษฎีสัมพัทธภาพ (Theory of Relativity) คืออะไร?",
        body: "ไอน์สไตน์ค้นพบว่าเวลาไม่ใช่สิ่งสัมบูรณ์ — มันยืดและหดได้ขึ้นอยู่กับสภาวะแวดล้อม ยิ่งอยู่ใกล้แรงโน้มถ่วงสูง หรือเคลื่อนที่เร็ว เวลายิ่งเดินช้าลง นี่คือ \"Time Dilation\" ซึ่งได้รับการพิสูจน์จริงในทางฟิสิกส์",
      },
      {
        heading: "\"1 ชั่วโมงกับคนรัก vs. 1 ชั่วโมงบนเตาร้อน\"",
        body: "ไอน์สไตน์อธิบายสัมพัทธภาพด้วยประโยคนี้ เวลาที่เราสัมผัสขึ้นอยู่กับ \"สภาวะภายใน\" ไม่ใช่แค่นาฬิกา ทำให้เราสามารถออกแบบสภาวะของตัวเองเพื่อ \"ยืดหรือย่น\" เวลาเชิงจิตวิทยาได้",
      },
    ],
  },
  {
    icon: "🔭",
    title: "Flow State — เมื่อเวลาหยุดนิ่ง",
    content: [
      {
        heading: "โซนแห่งความลื่นไหล (Flow State)",
        body: "เมื่อสมาธิจดจ่อกับงานอย่างสมบูรณ์ สมองจะเข้าสู่ Flow State — ประสบการณ์ที่เวลาผ่านไปโดยไม่รู้สึก นักฟิสิกส์เรียกมันว่า \"subjective time dilation\" เวลา 3 ชั่วโมงอาจรู้สึกเหมือน 30 นาที",
      },
      {
        heading: "วิธีเข้าสู่ Flow ก่อนอ่านหนังสือสอบ",
        body: "1) กำหนดงานที่ชัดเจน 1 อย่าง (เช่น ทำโจทย์อนุกรม 20 ข้อ)\n2) ปิดโทรศัพท์ + เสียงรบกวน\n3) เริ่มด้วยงานที่ยากพอประมาณ ไม่ง่ายเกินจนเบื่อ ไม่ยากเกินจนถอดใจ\n4) ตั้ง timer 25 นาที (Pomodoro) — สมองรับรู้ \"ขอบเขต\" และจดจ่อง่ายขึ้น",
      },
    ],
  },
  {
    icon: "🌀",
    title: "Gravitational Time Dilation — ใช้แรงดึงดูดให้เป็นประโยชน์",
    content: [
      {
        heading: "แรงโน้มถ่วงของเป้าหมาย",
        body: "ไอน์สไตน์พบว่าแรงโน้มถ่วงทำให้เวลาช้าลง ในเชิงจิตวิทยา เป้าหมายที่ชัดเจนและสำคัญทำหน้าที่เหมือนแรงโน้มถ่วง — ดึงสมาธิและพลังงานให้รวมศูนย์ ทำให้ชั่วโมงเดียวมีผลผลิตมากกว่า 4 ชั่วโมงที่ไร้ทิศทาง",
      },
      {
        heading: "เทคนิค: กำหนด \"เป้าหมายแม่เหล็ก\" ก่อนนั่งอ่านหนังสือ",
        body: "เขียนประโยคสั้น ๆ ว่าวันนี้จะทำอะไรให้สำเร็จ เช่น \"วันนี้จะเข้าใจโจทย์ร้อยละ 10 ข้อ\" แรงโน้มถ่วงของเป้าหมายจะช่วยให้สมองกรองสิ่งรบกวนออกโดยอัตโนมัติ",
      },
    ],
  },
  {
    icon: "🪄",
    title: "Time Dilation จริง — ปรับนาฬิกาชีวภาพ",
    content: [
      {
        heading: "ช่วงเวลา Peak Brain (ทอง) ของคุณ",
        body: "ทฤษฎีสัมพัทธภาพบอกว่าเวลาสัมพัทธ์กับผู้สังเกต สมองแต่ละคนมี \"ช่วงเวลาทอง\" ที่ทำงานได้เร็วและคมที่สุด — สำหรับคนส่วนใหญ่คือ 2-4 ชั่วโมงหลังตื่นนอน ใช้ช่วงนี้กับงานที่ยากที่สุด เวลา 1 ชั่วโมงนี้ = 2-3 ชั่วโมงในช่วงอื่น",
      },
      {
        heading: "นอนหลับ = ชาร์จนาฬิกาชีวภาพ",
        body: "ระหว่างนอนหลับ สมองจัดระเบียบความทรงจำและตัดทอนข้อมูลที่ไม่จำเป็น นักเรียนที่นอนพอก่อนสอบจำเนื้อหาได้ดีกว่าคนที่อดนอนอ่านหนังสือทั้งคืนถึง 40% ตามการศึกษาของ Harvard Medical School",
      },
    ],
  },
  {
    icon: "🎯",
    title: "โกงเวลาในห้องสอบ — ปรับใช้ได้จริง",
    content: [
      {
        heading: "ข้ามข้อที่ติดขัด — อย่าให้เวลาจม",
        body: "สัมพัทธภาพบอกว่าเวลาสัมพัทธ์กับสภาวะ เมื่อสมองติดกับโจทย์ยาก เวลาจะ \"หนัก\" และเดินช้าในความรู้สึก ข้ามไปก่อน กลับมาทีหลัง — สมองจะประมวลผลในพื้นหลังระหว่างนั้น",
      },
      {
        heading: "ตอบตามลำดับความมั่นใจ ไม่ใช่ลำดับข้อ",
        body: "เริ่มจากข้อที่มั่นใจ 100% → ผ่านไปข้อที่พอทำได้ → ค่อยสู้ข้อยาก วิธีนี้ช่วยให้สร้าง momentum และใช้เวลาส่วนใหญ่กับข้อที่ \"ทำได้\" ก่อน",
      },
      {
        heading: "หายใจลึก 3 ครั้งก่อนเริ่ม",
        body: "ออกซิเจนเพิ่มประสิทธิภาพสมองทันที ลดคอร์ติซอล (ฮอร์โมนความเครียด) ที่ทำให้ความทรงจำระยะสั้นล้มเหลว นี่คือ \"reset นาฬิกา\" ที่เร็วที่สุดก่อนเข้าห้องสอบ",
      },
    ],
  },
  {
    icon: "🌟",
    title: "สรุป: สูตรโกงเวลาฉบับ Einstein",
    content: [
      {
        heading: "เวลาคุณภาพ > เวลาปริมาณ",
        body: "ไอน์สไตน์ใช้ชีวิตอย่างมีสมาธิ ไม่ได้ทำงาน 16 ชั่วโมงต่อวัน แต่ปกป้องช่วงเวลาที่สมองคมที่สุดอย่างเคร่งครัด ปริมาณชั่วโมงที่นั่งอ่านหนังสือไม่ได้บอกว่าจะสอบผ่าน — คุณภาพของชั่วโมงนั้นต่างหากที่สำคัญ",
      },
      {
        heading: "สูตรง่าย ๆ ที่ใช้ได้ทุกวัน",
        body: "✦ ปกป้อง 2 ชั่วโมงแรกหลังตื่นจากโทรศัพท์\n✦ กำหนดเป้าหมาย 1 อย่างที่ชัดเจนก่อนเริ่ม\n✦ ทำงานเป็นช่วง 25 นาที แล้วพัก 5 นาที\n✦ นอนหลับให้ครบ 7-8 ชั่วโมงก่อนวันสอบ\n✦ ในห้องสอบ: ข้ามข้อยาก กลับมาทีหลัง",
      },
    ],
  },
];

export default function TimeTipsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px 60px" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: 13, color: "var(--text-subtle)", marginBottom: 24 }}>
        <Link href="/tips" style={{ color: "var(--primary)", textDecoration: "none" }}>ความรู้</Link>
        {" → "}บริหารเวลา
      </p>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          บริหารเวลา
        </span>
        <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "var(--text)" }}>
          เทคนิคโกงเวลา
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, lineHeight: 1.7, maxWidth: 560, marginInline: "auto" }}>
          ปรับใช้ทฤษฎีสัมพัทธภาพของไอน์สไตน์ — เวลาไม่ได้เท่ากันทุกคน คุณออกแบบมันได้
        </p>
      </div>

      {/* Quick Nav */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
        {sections.map((s) => (
          <a key={s.title} href={`#${s.title}`} style={{
            padding: "6px 14px", borderRadius: 980, fontSize: 13, fontWeight: 500,
            background: "var(--surface)", border: "1px solid var(--border)",
            color: "var(--text-muted)", textDecoration: "none",
          }}>
            {s.icon} {s.title.split(" —")[0]}
          </a>
        ))}
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {sections.map((section) => (
          <section key={section.title} id={section.title}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>{section.icon}</span>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                {section.title}
              </h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {section.content.map((tip, i) => (
                <div key={i} className="card" style={{ padding: "18px 22px" }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>
                    {tip.heading}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Related */}
      <div style={{ marginTop: 56 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
          บทความที่เกี่ยวข้อง
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { href: "/tips/kp", icon: "📝", title: "เทคนิคทำข้อสอบ ก.พ.", desc: "อนุกรม คณิต ภาษาไทย ภาษาอังกฤษ กฎหมาย" },
            { href: "/tips/toeic", icon: "🎧", title: "TOEIC คืออะไร?", desc: "โครงสร้าง คะแนน เทคนิค Listening & Reading" },
          ].map((a) => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: "18px 20px", cursor: "pointer" }}>
                <p style={{ margin: "0 0 6px", fontSize: 20 }}>{a.icon}</p>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card" style={{ marginTop: 56, padding: "32px 28px", textAlign: "center" }}>
        <p style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", color: "var(--text)" }}>ฝึกทำข้อสอบจริงด้วย e-Exam</p>
        <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "0 0 16px" }}>สะสม XP ครบ 1,000 ปลดล็อคข้อสอบจำลอง ก.พ. 100 ข้อ ฟรี</p>
        <Link href="/e-exam" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
          ดู e-Exam →
        </Link>
      </div>
    </main>
  );
}
