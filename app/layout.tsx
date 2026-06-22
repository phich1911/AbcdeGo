import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import { PostHogProvider } from "@/components/PostHogProvider";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AbcdeGo — Learn. Play. Level Up.",
  description: "แพลตฟอร์มการเรียนรู้แบบ gamified สำหรับนักศึกษาและผู้ใหญ่",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full">
      <head>
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'){document.documentElement.classList.remove('light')}else{document.documentElement.classList.add('light')}})()` }} />
      </head>
      <body className={`${notoSansThai.className} min-h-full flex flex-col`}>
        <PostHogProvider>
<Navbar />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
        <footer style={{ textAlign: "center", padding: "24px 16px", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 16px", marginBottom: 8 }}>
            {[
              { href: "/courses?cat=kp", label: "สอบ ก.พ." },
              { href: "/courses?cat=eng-m", label: "ภาษาอังกฤษ ม.ปลาย" },
              { href: "/courses?cat=math-m", label: "คณิตศาสตร์ ม.ปลาย" },
              { href: "/courses?cat=thai-m", label: "ภาษาไทย ม.ปลาย" },
            ].map((l) => (
              <a key={l.href} href={l.href} style={{ fontSize: 12, color: "var(--text-muted)", textDecoration: "none" }}>{l.label}</a>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()} AbcdeGo
            {" · "}<a href="/about" style={{ color: "var(--text-muted)", textDecoration: "none" }}>เกี่ยวกับเรา</a>
            {" · "}<a href="/contact" style={{ color: "var(--text-muted)", textDecoration: "none" }}>ติดต่อ</a>
            {" · "}<a href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>นโยบายความเป็นส่วนตัว</a>
            {" · "}<a href="/terms" style={{ color: "var(--text-muted)", textDecoration: "none" }}>ข้อกำหนดการใช้งาน</a>
          </p>
        </footer>
<ChatBot />
        <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
