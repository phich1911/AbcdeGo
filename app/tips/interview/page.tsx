import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เทคนิคการสอบสัมภาษณ์ — AbcdeGo",
  description:
    "รวมเทคนิคสอบสัมภาษณ์งานราชการและเอกชน การแต่งกาย การตอบคำถาม ภาษากาย และการเตรียมตัวก่อนวันสัมภาษณ์",
  openGraph: {
    title: "เทคนิคการสอบสัมภาษณ์",
    description: "เตรียมตัวสัมภาษณ์งานอย่างมั่นใจ ตั้งแต่การแต่งกายไปจนถึงการตอบคำถามยาก",
  },
};

const sections = [
  {
    icon: "👔",
    title: "การแต่งกายและภาพลักษณ์",
    content: [
      {
        heading: "แต่งกายสุภาพ สะอาด เรียบร้อย",
        body: "ราชการ: ชุดสุภาพ สีไม่ฉูดฉาด (ขาว ครีม ฟ้าอ่อน เทา ดำ) ผู้ชาย: เสื้อเชิ้ต กางเกงสแล็กส์ รองเท้าหุ้มส้น ผู้หญิง: เสื้อสุภาพ กระโปรงหรือกางเกงทรงสุภาพ ความยาวเหมาะสม",
      },
      {
        heading: "เตรียมชุดก่อนวันสัมภาษณ์อย่างน้อย 1 วัน",
        body: "อย่าปล่อยให้รีดผ้าหรือหาชุดในเช้าวันนั้น ความเครียดเล็กน้อยก่อนสัมภาษณ์จะกลายเป็นปัญหาใหญ่ได้ เตรียมชุดสำรองไว้ด้วยหากสถานที่ไกล",
      },
      {
        heading: "ทรงผมและการดูแลตัวเอง",
        body: "ผมต้องเรียบร้อย ไม่บังหน้า ตัดผมหรือจัดทรงให้เรียบร้อยก่อนวันสัมภาษณ์ 2-3 วัน เล็บสะอาด น้ำหอมไม่ฉุน สร้างความประทับใจแรกที่ดีภายใน 7 วินาทีแรก",
      },
    ],
  },
  {
    icon: "🧠",
    title: "เตรียมตัวก่อนวันสัมภาษณ์",
    content: [
      {
        heading: "ศึกษาองค์กรให้ครบ 3 ด้าน",
        body: "1) ประวัติและพันธกิจขององค์กร\n2) ภารกิจและขอบเขตงานของตำแหน่งที่สมัคร\n3) ข่าวสารล่าสุดที่เกี่ยวข้องกับหน่วยงาน\nกรรมการชอบถามว่า \"รู้จักองค์กรเราอย่างไร?\" ถ้าตอบได้ละเอียดจะโดดเด่นมาก",
      },
      {
        heading: "ฝึกตอบคำถามที่พบบ่อย",
        body: "ฝึกพูดออกเสียงจริง ๆ ไม่ใช่แค่คิดในหัว ถ่ายวิดีโอตัวเองแล้วดูย้อนหลัง — จะเห็นข้อผิดพลาดที่ไม่รู้ตัว เช่น พูดเร็วเกิน พูดอือ/อ่า บ่อย หรือสายตาหนีกล้อง",
      },
      {
        heading: "เตรียมเอกสารให้ครบในโฟลเดอร์",
        body: "สำเนาบัตรประชาชน ปริญญาบัตร ใบรับรองการศึกษา เอกสารสมัครงาน รูปถ่าย และใบผ่านงาน (ถ้ามี) จัดเรียงตามลำดับในโฟลเดอร์ใสสะอาด",
      },
      {
        heading: "ลองเส้นทางก่อน 1 วัน",
        body: "หากสถานที่ไม่คุ้นเคย ให้ลองเดินทางไปดูก่อน 1 วัน หรือดูจาก Maps อย่างละเอียด วางแผนออกจากบ้านให้ถึงก่อนเวลานัดอย่างน้อย 20-30 นาที",
      },
    ],
  },
  {
    icon: "💬",
    title: "การตอบคำถามที่พบบ่อย",
    content: [
      {
        heading: "\"แนะนำตัวเองให้ฟังหน่อย\"",
        body: "ตอบใน 2-3 นาที ครอบคลุม: ชื่อ การศึกษา ประสบการณ์ที่เกี่ยวข้อง และเหตุผลที่สนใจตำแหน่งนี้ ห้ามอ่านจากกระดาษ ฝึกจนพูดได้คล่องและเป็นธรรมชาติ",
      },
      {
        heading: "\"ทำไมถึงอยากทำงานที่นี่?\"",
        body: "ตอบให้เชื่อมโยงระหว่าง 3 สิ่ง: ความสามารถของคุณ + พันธกิจขององค์กร + เป้าหมายอาชีพของคุณ หลีกเลี่ยงการพูดว่า \"อยากมีงานทำ\" หรือ \"ค่าตอบแทนดี\" เป็นคำตอบหลัก",
      },
      {
        heading: "\"จุดอ่อนของคุณคืออะไร?\"",
        body: "เลือกจุดอ่อนที่จริง แต่ไม่ใช่จุดอ่อนหลักของงาน และต้องบอกด้วยว่ากำลังพัฒนาอย่างไร เช่น \"บางครั้งติดในรายละเอียดมากเกินไป แต่ตอนนี้ฝึกวางแผนงานเป็นลำดับความสำคัญมากขึ้น\"",
      },
      {
        heading: "\"มีคำถามอะไรอยากถามเราบ้าง?\"",
        body: "ห้ามตอบว่า \"ไม่มีครับ/ค่ะ\" — แสดงว่าไม่สนใจ เตรียมคำถาม 2-3 ข้อ เช่น \"งานในตำแหน่งนี้มีโอกาสพัฒนาทักษะด้านใดบ้าง?\" หรือ \"ทีมงานมีลักษณะการทำงานอย่างไร?\"",
      },
    ],
  },
  {
    icon: "🎭",
    title: "ภาษากายและการสื่อสาร",
    content: [
      {
        heading: "สายตาและการสบตา",
        body: "สบตากรรมการในขณะตอบคำถาม ถ้ามีหลายคนให้สายตากวาดไปหาทุกคน ไม่จ้องคนเดียวตลอด หลีกเลี่ยงสายตาหนีพื้นหรือเพดาน ซึ่งแสดงถึงความไม่มั่นใจ",
      },
      {
        heading: "ท่าทางและการนั่ง",
        body: "นั่งตัวตรง หลังพิงพนักเก้าอี้เล็กน้อย วางมือบนตักหรือบนโต๊ะอย่างเป็นธรรมชาติ ไม่กอดอก ไม่เล่นมือ ไม่โยกขา — ท่าทางเหล่านั้นสื่อถึงความวิตกกังวลและขาดความมั่นใจ",
      },
      {
        heading: "น้ำเสียงและจังหวะการพูด",
        body: "พูดด้วยน้ำเสียงชัดเจน ไม่เร็วเกินไป ถ้าคำถามยากให้หยุดคิดสักครู่ก่อนตอบ — กรรมการชื่นชมคนที่คิดก่อนพูด ไม่ใช่คนที่รีบตอบแบบสะเปะสะปะ",
      },
      {
        heading: "รอยยิ้มและความเป็นธรรมชาติ",
        body: "ยิ้มและทักทายกรรมการอย่างจริงใจตั้งแต่ก้าวเข้าห้อง ความประทับใจแรกสร้างได้ก่อนที่จะพูดคำแรกด้วยซ้ำ ความเป็นธรรมชาติสำคัญกว่าความสมบูรณ์แบบ",
      },
    ],
  },
  {
    icon: "⚠️",
    title: "ข้อผิดพลาดที่ต้องหลีกเลี่ยง",
    content: [
      {
        heading: "พูดถึงอดีตนายจ้างในแง่ลบ",
        body: "ถึงแม้จะออกจากงานเดิมด้วยเหตุผลที่ไม่ดี อย่าพูดในแง่ลบต่อหน้ากรรมการ ปรับเป็นภาษาที่เป็นกลาง เช่น \"อยากมองหาโอกาสที่ตรงกับทิศทางอาชีพที่วางแผนไว้\"",
      },
      {
        heading: "ตอบคำถามโดยไม่มีตัวอย่างประกอบ",
        body: "ใช้โครงสร้าง STAR: Situation (สถานการณ์) → Task (หน้าที่) → Action (สิ่งที่ทำ) → Result (ผลลัพธ์) ทุกครั้งที่ตอบเกี่ยวกับประสบการณ์ ตัวอย่างที่จับต้องได้น่าเชื่อถือกว่าคำพูดทั่วไป",
      },
      {
        heading: "ไม่รู้ข้อมูลองค์กรที่สมัคร",
        body: "ข้อผิดพลาดที่พบบ่อยที่สุด กรรมการมักถามว่า \"รู้จักเราอย่างไร\" หรือ \"มีความเห็นอย่างไรกับนโยบายของเรา\" ถ้าตอบไม่ได้ คะแนนตกทันที",
      },
      {
        heading: "มาสาย",
        body: "มาสายแม้แต่นาทีเดียวคือภาพลักษณ์ที่เสียหายไม่ได้ กำหนดให้ตัวเองถึงสถานที่ก่อนเวลาอย่างน้อย 15-20 นาที ใช้เวลานั้นเก็บสมาธิและทบทวนสิ่งที่เตรียมไว้",
      },
    ],
  },
  {
    icon: "🌟",
    title: "สรุป: Checklist ก่อนวันสัมภาษณ์",
    content: [
      {
        heading: "คืนก่อนสัมภาษณ์",
        body: "✦ เตรียมชุดและรีดผ้าเรียบร้อย\n✦ จัดเอกสารในโฟลเดอร์ครบถ้วน\n✦ ทบทวนข้อมูลองค์กรและตำแหน่ง\n✦ ฝึกตอบคำถามออกเสียง 3-5 ข้อ\n✦ นอนหลับพักผ่อนให้เพียงพอ",
      },
      {
        heading: "เช้าวันสัมภาษณ์",
        body: "✦ กินข้าวให้อิ่ม ไม่ท้องว่าง\n✦ ออกจากบ้านก่อนเวลาอย่างน้อย 30 นาที\n✦ ถึงสถานที่ก่อนเวลา 15-20 นาที\n✦ หายใจลึก ๆ ก่อนเข้าห้อง\n✦ ยิ้มและทักทายทุกคนที่พบตั้งแต่ประตูทางเข้า",
      },
    ],
  },
];

export default function InterviewTipsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px 60px" }}>
      {/* Breadcrumb */}
      <p style={{ fontSize: 13, color: "var(--text-subtle)", marginBottom: 24 }}>
        <Link href="/tips" style={{ color: "var(--primary)", textDecoration: "none" }}>ความรู้</Link>
        {" → "}สัมภาษณ์งาน
      </p>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          สัมภาษณ์งาน
        </span>
        <h1 style={{ fontSize: "clamp(28px,5vw,42px)", fontWeight: 800, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "var(--text)" }}>
          เทคนิคการสอบสัมภาษณ์
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, lineHeight: 1.7, maxWidth: 560, marginInline: "auto" }}>
          เตรียมตัวให้พร้อมตั้งแต่การแต่งกาย ภาษากาย ไปจนถึงการตอบคำถามที่ยากที่สุด
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
            {s.icon} {s.title}
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
            { href: "/tips/time", icon: "⏱️", title: "สูตรโกงเวลา", desc: "Flow State นาฬิกาชีวภาพ ทฤษฎีสัมพัทธภาพ" },
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
