import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import ChatBot from "@/components/ChatBot";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/next";

const prompt = Prompt({ subsets: ["latin", "thai"], weight: ["300", "400", "500", "600", "700", "800", "900"] });

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
      <body className={`${prompt.className} min-h-full flex flex-col`}>
<Navbar />
        <div className="relative z-10 flex flex-col flex-1">
          {children}
        </div>
        <footer style={{ textAlign: "center", padding: "24px 16px", borderTop: "1px solid var(--border)", marginTop: "auto" }}>
          <p style={{ fontSize: 13, color: "var(--text-subtle)" }}>
            © {new Date().getFullYear()} AbcdeGo ·{" "}
            <a href="/privacy" style={{ color: "var(--text-muted)", textDecoration: "none" }}>Privacy Policy</a>
          </p>
        </footer>
        <ChatBot />
        <Analytics />
      </body>
    </html>
  );
}
