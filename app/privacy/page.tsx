export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px 60px" }}>
      <h1 style={{ fontSize: 36, fontWeight: 800, color: "var(--text)", marginBottom: 8 }}>Privacy Policy</h1>
      <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 40, lineHeight: 1.7 }}>
        อัปเดตล่าสุด: มิถุนายน 2569
      </p>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>1. ข้อมูลที่เราเก็บรวบรวม</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราเก็บข้อมูลเฉพาะที่จำเป็นต่อการให้บริการ ได้แก่ อีเมล ชื่อที่แสดง ความคืบหน้าการเรียน (XP, บทเรียนที่เสร็จแล้ว)
          และข้อมูล OAuth จาก Google หรือ Facebook หากคุณเลือกเข้าสู่ระบบผ่านช่องทางดังกล่าว
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>2. วัตถุประสงค์การใช้ข้อมูล</h2>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20 }}>
          <li>บันทึกและซิงค์ความคืบหน้าการเรียนของคุณข้ามอุปกรณ์</li>
          <li>แสดงผลบนตาราง Leaderboard (ใช้เฉพาะชื่อที่แสดงและ XP)</li>
          <li>ปรับปรุงประสบการณ์การใช้งานแพลตฟอร์ม</li>
          <li>ส่งการแจ้งเตือนที่เกี่ยวข้องกับบัญชีของคุณ (เช่น ยืนยันอีเมล)</li>
        </ul>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>3. การเก็บรักษาข้อมูล</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          ข้อมูลของคุณถูกจัดเก็บบน Supabase ซึ่งเป็นบริการฐานข้อมูลที่ได้มาตรฐานความปลอดภัยระดับสากล
          ข้อมูลความคืบหน้าบางส่วนถูกบันทึกไว้ใน localStorage ของเบราว์เซอร์เพื่อให้ใช้งานได้รวดเร็วโดยไม่ต้องเชื่อมต่ออินเทอร์เน็ต
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>4. การเปิดเผยข้อมูลต่อบุคคลที่สาม</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราไม่ขาย แลกเปลี่ยน หรือเปิดเผยข้อมูลส่วนตัวของคุณแก่บุคคลภายนอก ยกเว้นในกรณีที่จำเป็นตามกฎหมาย
          หรือเพื่อการให้บริการที่คุณร้องขอ (เช่น Google OAuth, Facebook OAuth)
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>5. คุกกี้และการวิเคราะห์</h2>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8 }}>
          เราใช้ Vercel Analytics เพื่อวิเคราะห์การใช้งานเว็บไซต์ในภาพรวม โดยไม่ระบุตัวตนผู้ใช้
          ข้อมูลนี้ช่วยให้เราพัฒนาแพลตฟอร์มให้ดียิ่งขึ้น
        </p>
      </div>

      <div className="card-lg" style={{ padding: 32, marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "var(--text)", marginBottom: 12 }}>6. สิทธิ์ของคุณ</h2>
        <ul style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 2, paddingLeft: 20 }}>
          <li>ขอดูข้อมูลส่วนตัวที่เราเก็บไว้</li>
          <li>ขอแก้ไขหรืออัปเดตข้อมูลของคุณ</li>
          <li>ขอลบบัญชีและข้อมูลทั้งหมด</li>
        </ul>
        <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginTop: 12 }}>
          ติดต่อเราได้ที่หน้า <a href="/contact" style={{ color: "var(--primary)" }}>Contact</a> เพื่อใช้สิทธิ์ดังกล่าว
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
          หากมีคำถามเกี่ยวกับ Privacy Policy สามารถติดต่อได้ที่หน้า{" "}
          <a href="/contact" style={{ color: "var(--primary)" }}>Contact</a> หรืออีเมล phich1911@gmail.com
        </p>
      </div>
    </main>
  );
}
