import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "เทคนิคทำข้อสอบ ก.พ. ครบทุกวิชา — AbcdeGo",
  description:
    "รวมเทคนิคทำข้อสอบ ก.พ. ทุกวิชา อนุกรมตัวเลข คณิตศาสตร์ ภาษาไทย ภาษาอังกฤษ กฎหมายข้าราชการ พร้อมวิธีบริหารเวลา 180 นาที ฉบับมือใหม่เข้าใจง่าย",
  openGraph: {
    title: "เทคนิคทำข้อสอบ ก.พ. ครบทุกวิชา",
    description: "เทคนิคและวิธีทำข้อสอบ ก.พ. ทุกหมวด พร้อมตัวอย่างและเคล็ดลับที่ใช้ได้จริง",
  },
};

const tips = [
  {
    icon: "🔢",
    title: "อนุกรมตัวเลข (Number Series)",
    keywords: "เทคนิคอนุกรม ก.พ.",
    content: [
      {
        heading: "มองหาผลต่างชั้นที่ 1 ก่อน",
        body: "ลบตัวเลขติดกันทุกคู่ ถ้าผลต่างเท่ากันหมด = อนุกรมสม่ำเสมอ (Arithmetic) เช่น 3, 7, 11, 15 → ผลต่าง +4 ตลอด",
      },
      {
        heading: "ถ้าผลต่างไม่เท่า — ลองผลต่างชั้น 2",
        body: "นำผลต่างชั้น 1 มาลบกันอีกครั้ง ถ้าเท่ากันหมด = อนุกรมกำลังสอง เช่น 2, 5, 10, 17, 26 → ผลต่าง 3,5,7,9 → ผลต่างชั้น 2 = 2 ตลอด",
      },
      {
        heading: "ถ้าตัวเลขใหญ่ขึ้นเร็วมาก — ลองหาร",
        body: "หารตัวเลขติดกัน ถ้าได้อัตราส่วนเท่ากัน = อนุกรมเรขาคณิต (Geometric) เช่น 3, 6, 12, 24 → ×2 ทุกครั้ง",
      },
      {
        heading: "เทคนิค Elimination",
        body: "ดูตัวเลือกก่อน ถ้า 3 ใน 4 ตัวเลือกใกล้เคียงกันมาก ตัวเลือกที่ห่างออกไปมักผิด ช่วยกำหนดขอบเขตการคำนวณ",
      },
    ],
  },
  {
    icon: "📐",
    title: "คณิตศาสตร์ทั่วไป",
    keywords: "เทคนิคคณิตศาสตร์สอบ ก.พ.",
    content: [
      {
        heading: "โจทย์เปอร์เซ็นต์และอัตราส่วน",
        body: "แปลงเป็นเศษส่วนก่อนเสมอ 20% = 1/5, 25% = 1/4, 33.33% ≈ 1/3 ทำให้คำนวณในหัวได้เร็วกว่ากด calculator",
      },
      {
        heading: "โจทย์ตาราง/กราฟ",
        body: "อ่านหัวแกน X และ Y ให้ชัดก่อนเริ่มตอบ ข้อสอบมักถามค่าสูงสุด ต่ำสุด และผลรวม ทำเครื่องหมายในโจทย์ได้",
      },
      {
        heading: "โจทย์คำพูด (Word Problem)",
        body: "ขีดเส้นใต้ตัวเลขและคำกริยาสำคัญ เช่น 'มากกว่า' 'น้อยกว่า' 'รวมกัน' แล้วเปลี่ยนเป็นสมการก่อนคำนวณ",
      },
      {
        heading: "ข้ามข้อที่ติดนานเกิน 2 นาที",
        body: "คณิตศาสตร์ข้อยากอาจกินเวลามาก ให้ทำเครื่องหมาย แล้วกลับมาทีหลัง อย่าให้ข้อเดียวทำลายคะแนนหลายข้อที่ทำได้",
      },
    ],
  },
  {
    icon: "🇹🇭",
    title: "ภาษาไทย",
    keywords: "เทคนิคภาษาไทย ก.พ.",
    content: [
      {
        heading: "อุปมาอุปไมย — หาความสัมพันธ์ก่อน",
        body: "ระบุความสัมพันธ์ของคู่แรกให้ได้ก่อน เช่น 'ส่วน-ของ', 'สาเหตุ-ผล', 'คำพ้องความ' แล้วหาคู่ที่มีความสัมพันธ์เดียวกัน",
      },
      {
        heading: "เรียงประโยค — หาประโยคเปิดและปิด",
        body: "ประโยคแรกมักเป็น 'นำเสนอหัวข้อ' โดยไม่มีคำเชื่อมอ้างอิง ประโยคสุดท้ายมักเป็น 'สรุป' หรือ 'ผลลัพธ์' จัดกรอบก่อนแล้วเรียงกลาง",
      },
      {
        heading: "เลือกใช้คำ — ระวังคำที่มีความหมายใกล้เคียง",
        body: "อ่านประโยคทั้งหมดก่อน แล้วลองแทนคำตัวเลือกทีละคำ คำที่ถูกต้องต้องสื่อความหมายถูก ระดับภาษาถูก และไม่ซ้ำซ้อนกับคำอื่นในประโยค",
      },
      {
        heading: "เงื่อนไขภาษา — วาดแผนภาพ",
        body: "อ่านเงื่อนไขทีละข้อแล้ววาดตาราง/แผนภูมิ เช่น ใครนั่งที่ไหน ใครเป็นใคร อย่าพยายามจำทุกอย่างในหัว",
      },
    ],
  },
  {
    icon: "🔣",
    title: "เงื่อนไขสัญลักษณ์ (อสมการ)",
    keywords: "เทคนิคเงื่อนไขสัญลักษณ์ ก.พ.",
    content: [
      {
        heading: "แทนค่าสัญลักษณ์ทันที",
        body: "เมื่ออ่านกติกาแล้ว เขียนสัญลักษณ์ลงในกระดาษทด เช่น △ = > หรือ ○ = < อย่าพยายามจำในหัว",
      },
      {
        heading: "แปลงเป็นตัวเลขง่ายๆ",
        body: "ถ้าโจทย์กำหนด a △ b ให้ลองแทนตัวเลขง่าย เช่น a=5, b=3 เพื่อตรวจสอบว่าสัญลักษณ์หมายถึงอะไรก่อนตอบข้ออื่น",
      },
      {
        heading: "ข้อสรุป 2 ข้อ — พิสูจน์ทีละข้อ",
        body: "แต่ละข้อต้องพิสูจน์ว่า 'จริงแน่นอน', 'เท็จแน่นอน' หรือ 'ไม่แน่นอน' อย่าตัดสินรวมกันโดยไม่แยกพิจารณา",
      },
      {
        heading: "ระวัง 'ไม่แน่นอน'",
        body: "ถ้าหาตัวอย่างที่ทำให้สรุปจริงได้ AND หาตัวอย่างที่ทำให้สรุปเท็จได้ → คำตอบคือ 'ไม่แน่นอน' ไม่ใช่ 'จริง'",
      },
    ],
  },
  {
    icon: "🇬🇧",
    title: "ภาษาอังกฤษ",
    keywords: "เทคนิคภาษาอังกฤษ ก.พ.",
    content: [
      {
        heading: "Vocabulary — ดู Root Word",
        body: "คำศัพท์ระดับทางการมักมาจาก Latin/Greek ถ้าจำ root ได้ เช่น 'trans-' = ข้าม/ผ่าน, 'integrity' มาจาก 'integer' = เต็ม จะเดาความหมายได้แม้ไม่เคยเจอ",
      },
      {
        heading: "Grammar — จำ 5 โครงสร้างที่ออกบ่อย",
        body: "1) Subject-Verb Agreement 2) Tense (Past Perfect, Present Perfect) 3) Passive Voice 4) Conditional (If…would) 5) Relative Clause (who/which/that) ครบ 5 นี้ได้คะแนน Grammar แน่นอน",
      },
      {
        heading: "Reading — อ่านโจทย์ก่อนอ่าน Passage",
        body: "อ่านคำถามทุกข้อก่อน แล้วค่อยอ่าน Passage โดยมองหาคำตอบไปพร้อมกัน ประหยัดเวลาได้มาก เพราะไม่ต้องอ่าน Passage ซ้ำ",
      },
      {
        heading: "Conversation — ดูบริบทและความสุภาพ",
        body: "คำตอบที่ถูกมักเป็น 'สุภาพที่สุด' และ 'มีข้อมูลเพียงพอ' ระวังตัวเลือกที่สั้นเกินไป (เช่น 'Yes I can') มักไม่ใช่คำตอบในบริบททางการ",
      },
    ],
  },
  {
    icon: "⚖️",
    title: "ความรู้และลักษณะการเป็นข้าราชการที่ดี",
    keywords: "เทคนิคกฎหมายข้าราชการ ก.พ.",
    content: [
      {
        heading: "จำโครงสร้างกฎหมาย ไม่ใช่จำมาตรา",
        body: "ข้อสอบไม่ถามเลขมาตราโดยตรง แต่ถามหลักการ จำหัวข้อใหญ่: พ.ร.บ.ระเบียบบริหารราชการแผ่นดิน / พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี / วิธีปฏิบัติราชการทางปกครอง",
      },
      {
        heading: "โจทย์จริยธรรม — เลือกที่ 'ถูกต้องที่สุด'",
        body: "ตัวเลือกอาจถูกทุกข้อในความเป็นจริง แต่ต้องเลือก 'ถูกต้องที่สุดตามระเบียบ' ให้นึกถึงหลัก 'ซื่อสัตย์ มีความรับผิดชอบ มุ่งผลสัมฤทธิ์'",
      },
      {
        heading: "โจทย์สถานการณ์ — ดูว่าใครมีอำนาจ",
        body: "ถ้าโจทย์ถามว่า 'ควรทำอย่างไร' ให้นึกว่าข้าราชการต้องปฏิบัติตามกฎและสายการบังคับบัญชา ไม่ตัดสินใจเองโดยพลการ",
      },
      {
        heading: "จำ 5 กฎหมายหลักให้ขึ้นใจ",
        body: "1) พ.ร.บ.บริหารราชการ 2534 2) พ.ร.ฎ.บริหารกิจการบ้านเมืองที่ดี 2546 3) พ.ร.บ.วิธีปฏิบัติราชการทางปกครอง 2539 4) ประมวลจริยธรรม 2552 5) ความผิดต่อตำแหน่งหน้าที่ราชการ (ประมวลกฎหมายอาญา)",
      },
    ],
  },
  {
    icon: "⏱️",
    title: "บริหารเวลา 180 นาที",
    keywords: "บริหารเวลาสอบ ก.พ. 180 นาที",
    content: [
      {
        heading: "แบ่งเวลาตามสัดส่วนข้อ",
        body: "วิชาที่ 1 (50 ข้อ) = 90 นาที · วิชาที่ 2 (25 ข้อ) = 45 นาที · วิชาที่ 3 (25 ข้อ) = 45 นาที ตั้งนาฬิกาแบ่งช่วงให้ชัด",
      },
      {
        heading: "ทำข้อที่มั่นใจก่อนเสมอ",
        body: "รอบแรก: ทำข้อที่รู้แน่ใจ ข้ามข้อที่สงสัย รอบสอง: ย้อนกลับมาทำข้อที่ข้าม รอบสาม (ถ้ามีเวลา): ตรวจทานและเดาข้อที่เหลือ",
      },
      {
        heading: "ไม่มีคะแนนหัก — เดาได้ทุกข้อ",
        body: "ข้อสอบ ก.พ. ไม่หักคะแนนข้อที่ตอบผิด ดังนั้น ถ้าหมดเวลาและยังมีข้อที่ไม่ได้ตอบ ให้ระบายตัวเลือกเดียวกันทั้งหมด (เช่น ข. ทุกข้อ) ดีกว่าปล่อยว่าง",
      },
      {
        heading: "ฝึก Mock Exam ก่อนสอบจริง",
        body: "การทำข้อสอบเต็มชุดจับเวลาอย่างน้อย 2-3 ครั้งก่อนสอบจริง ช่วยให้รู้จุดอ่อน บริหารเวลาเป็น และลดความตื่นเต้นวันสอบจริง",
      },
    ],
  },
];

export default function TipsPage() {
  return (
    <main style={{ maxWidth: 800, margin: "0 auto", padding: "80px 20px 60px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          เตรียมสอบ ก.พ.
        </span>
        <h1 style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 800, margin: "8px 0 12px", letterSpacing: "-0.02em", color: "var(--text)" }}>
          เทคนิคทำข้อสอบ ก.พ. ครบทุกวิชา
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", margin: 0, lineHeight: 1.7, maxWidth: 560, marginInline: "auto" }}>
          รวมเคล็ดลับและวิธีทำข้อสอบ ก.พ. ทุกหมวดวิชา ทั้งอนุกรม คณิตศาสตร์ ภาษาไทย ภาษาอังกฤษ และกฎหมายข้าราชการ
          ฉบับปฏิบัติได้จริง ไม่ต้องท่องจำ
        </p>
      </div>

      {/* Quick Nav */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 48, justifyContent: "center" }}>
        {tips.map((t) => (
          <a key={t.title} href={`#${t.title}`} style={{
            padding: "6px 14px", borderRadius: 980, fontSize: 13, fontWeight: 500,
            background: "var(--surface)", border: "1px solid var(--border)",
            color: "var(--text-muted)", textDecoration: "none", transition: "all 0.15s",
          }}>
            {t.icon} {t.title.split(" (")[0]}
          </a>
        ))}
      </div>

      {/* Tips Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
        {tips.map((section) => (
          <section key={section.title} id={section.title}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: 32 }}>{section.icon}</span>
              <div>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "var(--text)" }}>
                  {section.title}
                </h2>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {section.content.map((tip, i) => (
                <div key={i} className="card" style={{ padding: "18px 22px" }}>
                  <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 15, color: "var(--text)" }}>
                    {tip.heading}
                  </p>
                  <p style={{ margin: 0, fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>
                    {tip.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Related Articles */}
      <div style={{ marginTop: 56 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "var(--text-subtle)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
          บทความที่เกี่ยวข้อง
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { href: "#อนุกรมตัวเลข (Number Series)", icon: "🔢", title: "อนุกรมตัวเลข", desc: "ผลต่างชั้น 1-2 และอนุกรมเรขาคณิต" },
            { href: "#คณิตศาสตร์ทั่วไป", icon: "📐", title: "คณิตศาสตร์ทั่วไป", desc: "เปอร์เซ็นต์ ตาราง โจทย์คำพูด" },
            { href: "#ภาษาไทย", icon: "🇹🇭", title: "ภาษาไทย", desc: "อุปมา เรียงประโยค เงื่อนไขภาษา" },
            { href: "#เงื่อนไขสัญลักษณ์ (อสมการ)", icon: "🔣", title: "เงื่อนไขสัญลักษณ์", desc: "แทนค่า พิสูจน์ข้อสรุป" },
            { href: "#ภาษาอังกฤษ", icon: "🇬🇧", title: "ภาษาอังกฤษ ก.พ.", desc: "Vocabulary Grammar Reading" },
            { href: "#ความรู้และลักษณะการเป็นข้าราชการที่ดี", icon: "⚖️", title: "กฎหมายข้าราชการ", desc: "จริยธรรม โครงสร้างกฎหมายหลัก" },
            { href: "#บริหารเวลา 180 นาที", icon: "⏱️", title: "บริหารเวลา 180 นาที", desc: "แบ่งเวลาและกลยุทธ์ตอบข้อสอบ" },
            { href: "/tips/toeic", icon: "📝", title: "TOEIC คืออะไร?", desc: "โครงสร้าง คะแนน เทคนิค Listening & Reading" },
          ].map((a) => (
            <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
              <div className="card" style={{ padding: "18px 20px", transition: "all 0.15s", cursor: "pointer" }}>
                <p style={{ margin: "0 0 6px", fontSize: 20 }}>{a.icon}</p>
                <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{a.title}</p>
                <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)", lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="card" style={{ marginTop: 56, padding: "32px 28px", textAlign: "center", background: "var(--surface)" }}>
        <p style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px", color: "var(--text)" }}>
          ฝึกทำข้อสอบจริงเลย
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", margin: "0 0 20px", lineHeight: 1.7 }}>
          สะสม XP ครบ 1,000 คะแนนจากคอร์สเรียน แล้วปลดล็อคข้อสอบจำลอง ก.พ. เต็มชุด 100 ข้อ จับเวลา 180 นาที ฟรี
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/e-exam" className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }}>
            ดู e-Exam →
          </Link>
          <Link href="/courses" style={{
            padding: "10px 24px", fontSize: 14, borderRadius: 980, fontWeight: 600,
            border: "1px solid var(--border)", background: "var(--surface-2)",
            color: "var(--text-muted)", textDecoration: "none",
          }}>
            เริ่มเรียนสะสม XP
          </Link>
        </div>
      </div>
    </main>
  );
}
