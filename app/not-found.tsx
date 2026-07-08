import Link from "next/link";

export const metadata = {
  title: "ไม่พบหน้านี้",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex items-center justify-center px-6" style={{ paddingTop: 60, minHeight: "60vh" }}>
      <div style={{ textAlign: "center", maxWidth: 420 }}>
        <p style={{ fontSize: 15, fontWeight: 700, color: "var(--primary)", letterSpacing: "0.08em" }}>404</p>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "var(--text)", margin: "8px 0 12px", letterSpacing: "-0.02em" }}>
          ไม่พบหน้านี้
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 28, lineHeight: 1.7 }}>
          หน้าที่คุณกำลังหาอาจถูกย้ายหรือไม่มีอยู่จริง ลองกลับไปหน้าแรกหรือดูคอร์สเรียนของเราแทน
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
            กลับหน้าแรก
          </Link>
          <Link href="/courses" className="btn-secondary" style={{ padding: "10px 22px", fontSize: 14 }}>
            ดูคอร์สเรียน
          </Link>
        </div>
      </div>
    </main>
  );
}
