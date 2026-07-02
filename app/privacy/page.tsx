export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.7 }}>
        อัปเดตล่าสุด: กรกฎาคม 2569
      </p>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราเก็บข้อมูลเฉพาะที่จำเป็นต่อการให้บริการ ได้แก่
        </p>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20, marginTop: 8 }}>
          <li>อีเมลและชื่อที่แสดง (จากการสมัครด้วยอีเมล หรือ Google OAuth)</li>
          <li>ความคืบหน้าการเรียน: XP, บทเรียนที่เสร็จแล้ว, streak, วันที่ใช้งานล่าสุด</li>
          <li>ประวัติการทำข้อสอบ e-Exam (ชุดที่ทำและวันที่)</li>
          <li>ข้อมูลบางส่วนถูกบันทึกใน localStorage ของเบราว์เซอร์เพื่อใช้งานได้โดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต</li>
        </ul>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>2. วัตถุประสงค์การใช้ข้อมูล</h2>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20 }}>
          <li>บันทึกและซิงค์ความคืบหน้าการเรียนข้ามอุปกรณ์</li>
          <li>แสดงผลบนตาราง Leaderboard (ใช้เฉพาะชื่อที่แสดงและ XP)</li>
          <li>ตรวจสอบสิทธิ์การเข้าสอบ e-Exam ที่ปลดล็อคด้วย XP</li>
          <li>ส่งการแจ้งเตือนที่เกี่ยวข้องกับบัญชี (เช่น ยืนยันอีเมล)</li>
          <li>ปรับปรุงประสบการณ์การใช้งานแพลตฟอร์ม</li>
        </ul>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>3. การเก็บรักษาข้อมูล</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          ข้อมูลของคุณถูกจัดเก็บบน Supabase (PostgreSQL) ซึ่งได้มาตรฐานความปลอดภัย SOC 2 Type II
          และมีการเข้ารหัสข้อมูลทั้งระหว่างการส่งและในฐานข้อมูล
          เราไม่มีกำหนดระยะเวลาลบข้อมูลอัตโนมัติ คุณสามารถขอลบบัญชีและข้อมูลทั้งหมดได้ตลอดเวลา
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>4. การเปิดเผยข้อมูลต่อบุคคลที่สาม</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราไม่ขาย แลกเปลี่ยน หรือเปิดเผยข้อมูลส่วนตัวของคุณแก่บุคคลภายนอก
          ยกเว้นผู้ให้บริการที่จำเป็นต่อการดำเนินงาน ได้แก่
        </p>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20, marginTop: 8 }}>
          <li><strong>Supabase</strong> — ฐานข้อมูลและระบบ Authentication</li>
          <li><strong>Google OAuth</strong> — หากคุณเลือกเข้าสู่ระบบด้วย Google</li>
          <li><strong>Vercel</strong> — การ Host เว็บไซต์และ Analytics</li>
          <li><strong>Google AdSense</strong> — เพื่อแสดงโฆษณาบนเว็บไซต์ (ดูรายละเอียดในหัวข้อที่ 5)</li>
        </ul>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>5. คุกกี้และการวิเคราะห์</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราใช้ Vercel Analytics เพื่อวิเคราะห์การใช้งานเว็บไซต์ในภาพรวม โดยไม่ระบุตัวตนผู้ใช้
          Session token ของ Supabase ถูกเก็บใน localStorage เพื่อรักษาสถานะการเข้าสู่ระบบ
        </p>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 12 }}>
          เว็บไซต์นี้แสดงโฆษณาผ่าน <strong>Google AdSense</strong> ซึ่งเป็นบุคคลที่สาม (third-party vendor)
          Google และพันธมิตรอาจใช้คุกกี้ (รวมถึง DoubleClick cookie) เพื่อแสดงโฆษณาให้ตรงกับความสนใจของคุณ
          โดยอ้างอิงจากประวัติการเข้าชมเว็บไซต์นี้และเว็บไซต์อื่นบนอินเทอร์เน็ต
        </p>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 12 }}>
          คุณสามารถปิดการใช้งานโฆษณาแบบปรับตามความสนใจ (personalized ads) ของ Google ได้ที่{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
            Google Ads Settings
          </a>{" "}
          หรือดูตัวเลือกเพิ่มเติมจากผู้ให้บริการโฆษณารายอื่นได้ที่{" "}
          <a href="https://www.aboutads.info/choices" target="_blank" rel="noopener noreferrer" style={{ color: "var(--primary)" }}>
            www.aboutads.info/choices
          </a>
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>6. สิทธิ์ของคุณ</h2>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20 }}>
          <li>ขอดูข้อมูลส่วนตัวที่เราเก็บไว้</li>
          <li>ขอแก้ไขหรืออัปเดตข้อมูลของคุณ</li>
          <li>ขอลบบัญชีและข้อมูลทั้งหมด (รวมถึงประวัติ XP และการปลดล็อค e-Exam)</li>
        </ul>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 12 }}>
          ติดต่อเราได้ที่อีเมล <a href="mailto:support@abcdego.com" style={{ color: "var(--primary)" }}>support@abcdego.com</a> เพื่อใช้สิทธิ์ดังกล่าว
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>7. การเปลี่ยนแปลงนโยบาย</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราอาจอัปเดต Privacy Policy นี้เป็นครั้งคราว การเปลี่ยนแปลงที่สำคัญจะแจ้งให้ทราบบนเว็บไซต์
          การใช้งานแพลตฟอร์มต่อไปหลังจากการเปลี่ยนแปลงถือว่าคุณยอมรับนโยบายฉบับใหม่
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>8. ติดต่อเรา</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          หากมีคำถามเกี่ยวกับ Privacy Policy ติดต่อได้ที่{" "}
          <a href="mailto:support@abcdego.com" style={{ color: "var(--primary)" }}>support@abcdego.com</a>
        </p>
      </div>
    </main>
  );
}
