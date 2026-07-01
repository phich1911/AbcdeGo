import type { Metadata, Viewport } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import FeedbackButton from "@/components/FeedbackButton";
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
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginBottom: 10 }}>
            <a href="https://www.facebook.com/AbcdeGoOfficial/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.025 1.791-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              Facebook
            </a>
            <a href="https://www.youtube.com/@AbcdeGoOfficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube" style={{ color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              YouTube
            </a>
            <a href="https://line.me/ti/p/@aqp7051t" target="_blank" rel="noopener noreferrer" aria-label="LINE" style={{ color: "var(--text-muted)", textDecoration: "none", display: "flex", alignItems: "center", gap: 4, fontSize: 12 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
              LINE
            </a>
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
<FeedbackButton />
        <Analytics />
        </PostHogProvider>
      </body>
    </html>
  );
}
