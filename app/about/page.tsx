"use client";


export default function AboutPage() {
  return (
    <>
      <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>About Us</h1>
        <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.7 }}>
          รู้จัก AbcdeGo และทีมงานของเรา
        </p>

        <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>เราคือใคร</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
            AbcdeGo คือแพลตฟอร์มเรียนรู้ที่ใช้ AI และ Gamification เปลี่ยนการพัฒนาตัวเองให้กลายเป็นเกมที่สนุกและไม่มีที่สิ้นสุด
            ทุกความรู้ที่ได้รับคือ XP ทุกทักษะคือ Level ที่เพิ่มขึ้น และ AI คือเพื่อนร่วมทางที่ช่วยให้คุณเติบโตได้เร็วขึ้นทุกวัน
          </p>
        </div>

        <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>วิสัยทัศน์</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
            โลกที่มนุษย์ทุกคนพัฒนาตัวเองได้อย่างไม่มีที่สิ้นสุด โดยมี AI เป็นเพื่อนร่วมทางตลอดการเดินทาง
          </p>
        </div>

        <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>พันธกิจของเรา</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
            AbcdeGo เชื่อว่ามนุษย์ทุกคนมีศักยภาพที่ไม่มีขีดจำกัด เราจึงสร้างพื้นที่ที่การพัฒนาตัวเองไม่ใช่เรื่องน่าเบื่ออีกต่อไป
            ด้วยการผสมความรู้ ความสนุก และ AI เข้าด้วยกัน เพื่อให้ทุกคนได้ เรียน เล่น และเก่งขึ้น ไปพร้อมกันอย่างไม่มีที่สิ้นสุด
          </p>
        </div>

        <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>ค่านิยม</h2>
          <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
            เติบโตได้ไม่มีที่สิ้นสุด โดยเชื่อว่าทุกคนพัฒนาได้เสมอ ไม่มีคำว่าเก่งพอแล้ว
          </p>
        </div>

        <div className="card-lg" style={{ padding: 32 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 16 }}>สิ่งที่เราให้</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { title: "คอร์สเรียนครบถ้วน", desc: "รวมวิชาสอบราชการทุกสาขา" },
              { title: "ระบบ Gamification", desc: "สะสม XP เลื่อนเลเวล ติดตาม Progress" },
              { title: "เล่นได้ทุกที่", desc: "รองรับทั้งมือถือและคอมพิวเตอร์" },
              { title: "AI ช่วยสอน", desc: "JarnGo พร้อมตอบทุกคำถาม 24 ชั่วโมง" },
            ].map((item) => (
              <div key={item.title} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary)", marginTop: 7, flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
