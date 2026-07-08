"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getProgress, syncProgressFromCloud, pushProgressToCloud } from "@/lib/progress";
import { COURSES } from "@/lib/data";
import { onAuthChange, signOut, getSession, syncLeaderboardIfChanged } from "@/lib/supabase";
import { getAvatar, GM_EMAIL, GM_AVATAR } from "@/lib/avatar";
import AuthModal from "@/components/AuthModal";
import DisplayNameModal from "@/components/DisplayNameModal";
import Fuse from "fuse.js";

type SearchItem = { title: string; description: string; tag: string; href: string; kind: "course" | "article" | "game" | "page" };

const ALL_ITEMS: SearchItem[] = [
  ...COURSES.map((c) => ({ title: c.title, description: c.description, tag: c.tag, href: `/course/${c.id}`, kind: "course" as const })),
  { title: "ความรู้ทำข้อสอบ ก.พ. ครบทุกวิชา", description: "อนุกรม คณิตศาสตร์ ภาษาไทย เงื่อนไขสัญลักษณ์ ภาษาอังกฤษ กฎหมายข้าราชการ บริหารเวลา", tag: "บทความ", href: "/tips/kp", kind: "article" },
  { title: "TOEIC คืออะไร? ครบทุกอย่างในหน้าเดียว", description: "โครงสร้างข้อสอบ คะแนนมาตรฐาน ความรู้ Listening Reading วิธีเตรียมตัว", tag: "บทความ", href: "/tips/toeic", kind: "article" },
  { title: "สูตรโกงเวลา", description: "Flow State นาฬิกาชีวภาพ ทฤษฎีสัมพัทธภาพ ปรับใช้จริงในชีวิตและการสอบ", tag: "บทความ", href: "/tips/time", kind: "article" },
  { title: "เทคนิคการสอบสัมภาษณ์", description: "การแต่งกาย ภาษากาย ตอบคำถามยาก และ Checklist ก่อนวันสัมภาษณ์", tag: "บทความ", href: "/tips/interview", kind: "article" },
  { title: "E-Exam ข้อสอบจำลอง ก.พ.", description: "ข้อสอบจำลองจับเวลาเสมือนจริง 100 ข้อ ปลดล็อคด้วย XP", tag: "E-Exam", href: "/e-exam", kind: "page" },
  { title: "เกม 2048", description: "เกม 2048 เลื่อนตัวเลขรวมกันให้ได้ 2048", tag: "เกม", href: "/game/2048", kind: "game" },
  { title: "เกม Wordle ภาษาไทย", description: "ทายคำภาษาไทย 5 ตัวอักษรใน 6 ครั้ง", tag: "เกม", href: "/game/wordle", kind: "game" },
  { title: "ดูดวง", description: "ดูดวงความรัก การงาน การเงิน แบบ interactive", tag: "ดูดวง", href: "/tarot", kind: "page" },
  { title: "Leaderboard อันดับ XP", description: "อันดับผู้เรียนทั่วประเทศ แข่ง XP ขึ้น Level", tag: "อันดับ", href: "/leaderboard", kind: "page" },
  { title: "ร้านค้า แลก XP", description: "แลก XP เป็นส่วนลดสินค้าหรือของรางวัล", tag: "ร้านค้า", href: "/shop", kind: "page" },
  { title: "ความคืบหน้าการเรียน", description: "ดูสถิติ XP และความก้าวหน้าของคุณ", tag: "โปรไฟล์", href: "/dashboard", kind: "page" },
];

const fuse = new Fuse(ALL_ITEMS, {
  keys: ["title", "description", "tag"],
  threshold: 0.4,
});

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [xp, setXp] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [avatar, setAvatar] = useState(() => typeof window !== "undefined" ? getAvatar() : null);
  const shownAvatar = userEmail === GM_EMAIL ? GM_AVATAR : avatar;
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [funMenuOpen, setFunMenuOpen] = useState(false);
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funMenuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark";
    if (!saved) localStorage.setItem("theme", "light");
    setIsDark(dark);
    document.documentElement.classList.toggle("light", !dark);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("light", !next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  useEffect(() => { setXp(getProgress().xp); }, [pathname]);

  useEffect(() => {
    let active = true;

    // Read session from localStorage immediately (no network request)
    getSession().then((session) => {
      if (!active) return;
      const user = session?.user ?? null;
      if (user) {
        setUserEmail(user.email ?? null);
        setDisplayName(user.user_metadata?.display_name ?? null);
        const currentXp = getProgress().xp;
        setXp(currentXp);
        // Only hits the network when XP has changed since the last sync
        syncLeaderboardIfChanged(currentXp).then((r) => { if (r?.ok) window.dispatchEvent(new Event("leaderboard-updated")); });
      }
    });

    const unsub = onAuthChange(async (user) => {
      if (!active) return;
      // Only update from null→user or on real sign-in/sign-out events
      setUserEmail(user?.email ?? null);
      setDisplayName(user?.user_metadata?.display_name ?? null);
      if (user) {
        await syncProgressFromCloud();
        await pushProgressToCloud();
        const currentXp = getProgress().xp;
        setXp(currentXp);
        syncLeaderboardIfChanged(currentXp).then((r) => { if (r?.ok) window.dispatchEvent(new Event("leaderboard-updated")); });
        if (!user.user_metadata?.display_name) {
          const provider = user.app_metadata?.provider;
          if (provider === "google" || provider === "facebook") {
            setNameModalOpen(true);
          }
        }
      }
    });

    return () => { active = false; unsub(); };
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); openSearch(); }
      if (e.key === "Escape") closeSearch();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  function openSearch() {
    setSearchOpen(true);
    setSearchQuery("");
    setTimeout(() => searchInputRef.current?.focus(), 50);
  }

  function closeSearch() {
    setSearchOpen(false);
    setSearchQuery("");
  }

  const searchResults = searchQuery.trim()
    ? fuse.search(searchQuery).slice(0, 8).map((r) => r.item)
    : [];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
          height: 60,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center gap-4">
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
            <img src="/abcdego_navbar_light.png" alt="AbcdeGo" className="navbar-logo-light" style={{ height: 26, width: "auto", objectFit: "contain" }} />
            <img src="/abcdego_navbar_dark.png" alt="AbcdeGo" className="navbar-logo-dark" style={{ height: 26, width: "auto", objectFit: "contain" }} />
          </Link>

          <div style={{ width: 1, height: 20, background: "var(--border)", margin: "0 4px", flexShrink: 0 }} />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1 navbar-links">

            {/* HOME */}
            {/* COURSES link */}
            <Link href="/courses"
              className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: pathname.startsWith("/course") ? "#fff" : "var(--text-muted)", background: pathname.startsWith("/course") ? "var(--primary)" : "transparent", fontSize: 15, fontWeight: pathname.startsWith("/course") ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}
            >
              คอร์สเรียน
            </Link>

            <div className="relative"
              onMouseEnter={() => { if (funMenuCloseTimer.current) clearTimeout(funMenuCloseTimer.current); setFunMenuOpen(true); }}
              onMouseLeave={() => { funMenuCloseTimer.current = setTimeout(() => setFunMenuOpen(false), 150); }}>
              <button
                className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
                style={{ color: (pathname === "/tarot" || pathname === "/game") ? "#fff" : "var(--text-muted)", background: (pathname === "/tarot" || pathname === "/game") ? "var(--primary)" : "transparent", fontSize: 14, fontWeight: (pathname === "/tarot" || pathname === "/game") ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                ความบันเทิง
              </button>
              {funMenuOpen && (
                <div className="absolute top-full left-0 mt-1 rounded-lg overflow-hidden min-w-[140px]"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                  onMouseEnter={() => { if (funMenuCloseTimer.current) clearTimeout(funMenuCloseTimer.current); }}
                  onMouseLeave={() => { funMenuCloseTimer.current = setTimeout(() => setFunMenuOpen(false), 150); }}>
                  <Link href="/tarot" onClick={() => setFunMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm"
                    style={{ color: pathname === "/tarot" ? "var(--primary)" : "var(--text-muted)", fontWeight: pathname === "/tarot" ? 600 : 400, transition: "background 0.1s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                    ดูดวง
                  </Link>
                  <Link href="/game" onClick={() => setFunMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-sm"
                    style={{ color: pathname === "/game" ? "var(--primary)" : "var(--text-muted)", fontWeight: pathname === "/game" ? 600 : 400, transition: "background 0.1s" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                    เกม
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/news"
              className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: pathname === "/news" ? "#fff" : "var(--text-muted)", background: pathname === "/news" ? "var(--primary)" : "transparent", fontSize: 14, fontWeight: pathname === "/news" ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              ข่าวสาร
            </Link>

            <Link
              href="/tips"
              className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: pathname === "/tips" ? "#fff" : "var(--text-muted)", background: pathname === "/tips" ? "var(--primary)" : "transparent", fontSize: 14, fontWeight: pathname === "/tips" ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              ความรู้
            </Link>

            <Link
              href="/e-exam"
              className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: pathname === "/e-exam" ? "#fff" : "var(--text-muted)", background: pathname === "/e-exam" ? "var(--primary)" : "transparent", fontSize: 14, fontWeight: pathname === "/e-exam" ? 600 : 400, letterSpacing: "0.05em" }}
            >
              e-Exam
            </Link>

            <Link
              href="/shop"
              className="px-3 py-1.5 rounded-full transition-colors hover:bg-white/5"
              style={{ color: pathname === "/shop" ? "#fff" : "var(--text-muted)", background: pathname === "/shop" ? "var(--primary)" : "transparent", fontSize: 14, fontWeight: pathname === "/shop" ? 600 : 400, textTransform: "uppercase", letterSpacing: "0.05em" }}
            >
              ร้านค้า
            </Link>

            {/* Search button */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 ml-2 px-3 py-1.5 rounded-md transition-colors hover:bg-white/5"
              style={{ color: "var(--text-muted)", fontSize: 13 }}
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span>ค้นหา</span>
              <span style={{ fontSize: 11, padding: "1px 5px", borderRadius: 4, background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text-subtle)" }}>⌘K</span>
            </button>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-2">
              {/* XP badge */}
              <span className="badge" style={{ color: "var(--accent)", borderColor: "rgba(240,136,62,0.3)", background: "rgba(240,136,62,0.08)", fontSize: 12 }}>
                ⚡ {xp} XP
              </span>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-7 h-7 rounded-md transition-colors hover:bg-white/5"
                style={{ color: "var(--text-muted)", fontSize: 14, border: "1px solid var(--border)" }}
                title={isDark ? "Light mode" : "Dark mode"}
              >
                {isDark ? "☀" : "☾"}
              </button>

              {/* Auth */}
              {userEmail ? (
                <div ref={userMenuRef} className="relative"
                  onMouseEnter={() => { if (userMenuCloseTimer.current) clearTimeout(userMenuCloseTimer.current); setUserMenuOpen(true); }}
                  onMouseLeave={() => { userMenuCloseTimer.current = setTimeout(() => setUserMenuOpen(false), 150); }}>
                  <button
                    className="w-7 h-7 rounded-md flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ background: shownAvatar?.bg ?? "var(--primary)", color: shownAvatar?.color, fontSize: shownAvatar === GM_AVATAR ? 11 : 16 }}
                    title={userEmail}
                  >
                    {shownAvatar ? shownAvatar.emoji : (displayName || userEmail!)[0].toUpperCase()}
                  </button>
                  {userMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 rounded-lg overflow-hidden min-w-[200px]"
                      style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}
                      onMouseEnter={() => { if (userMenuCloseTimer.current) clearTimeout(userMenuCloseTimer.current); }}
                      onMouseLeave={() => { userMenuCloseTimer.current = setTimeout(() => setUserMenuOpen(false), 150); }}>
                      <div className="px-3 py-3 flex items-center gap-3" style={{ borderBottom: "1px solid var(--border)" }}>
                        <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 36, height: 36, background: shownAvatar?.bg ?? "var(--primary)", color: shownAvatar?.color, fontSize: shownAvatar === GM_AVATAR ? 14 : 20 }}>
                          {shownAvatar ? shownAvatar.emoji : (displayName || userEmail!)[0].toUpperCase()}
                        </div>
                        <div className="min-w-0">
                        {displayName && <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{displayName}{userEmail === GM_EMAIL && <span style={{ color: "#ef4444", marginLeft: 4 }}>[GM]</span>}</p>}
                        <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{userEmail}</p>
                        <div className="flex flex-col gap-1 mt-2">
                          <span className="badge" style={{ color: "var(--accent)", borderColor: "rgba(240,136,62,0.3)", background: "rgba(240,136,62,0.08)", width: "fit-content" }}>⚡ {xp} XP</span>
                          <span className="badge" style={{ color: "var(--accent-purple)", borderColor: "rgba(165,160,248,0.3)", background: "rgba(165,160,248,0.08)", width: "fit-content" }}>Lv.{Math.floor(xp / 100) + 1}</span>
                        </div>
                        </div>
                      </div>
                      <Link href="/dashboard" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                        style={{ color: "var(--text-muted)", transition: "background 0.1s, transform 0.1s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.transform = "translateX(3px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                        ความคืบหน้า
                      </Link>
                      <button
                        onClick={() => { setUserMenuOpen(false); setEditProfileOpen(true); }}
                        className="w-full text-left flex items-center gap-2 px-3 py-2 text-sm cursor-pointer"
                        style={{ color: "var(--text-muted)", transition: "background 0.1s, transform 0.1s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLElement).style.transform = "translateX(3px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                        แก้ไขโปรไฟล์
                      </button>
                      <div style={{ height: 1, background: "var(--border)" }} />
                      <button
                        onClick={async () => { await signOut(); window.location.href = "/"; }}
                        className="w-full text-left px-3 py-2 text-sm cursor-pointer"
                        style={{ color: "var(--accent-red)", transition: "background 0.1s, transform 0.1s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,123,114,0.08)"; (e.currentTarget as HTMLElement).style.transform = "translateX(3px)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; (e.currentTarget as HTMLElement).style.transform = ""; }}>
                        ออกจากระบบ
                      </button>
                      <button
                        onClick={() => { setUserMenuOpen(false); setDeleteConfirmOpen(true); }}
                        className="w-full text-left px-3 py-2 text-xs cursor-pointer"
                        style={{ color: "var(--text-subtle)", transition: "background 0.1s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,123,114,0.06)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                        ลบบัญชี
                      </button>
                      <div style={{ height: 1, background: "var(--border)" }} />
                      <Link href="/privacy" onClick={() => setUserMenuOpen(false)}
                        className="flex items-center px-3 py-2 text-xs cursor-pointer"
                        style={{ color: "var(--text-subtle)", transition: "background 0.1s" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ""; }}>
                        นโยบายความเป็นส่วนตัว
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setAuthOpen(true)}
                  className="btn-primary"
                  style={{ padding: "4px 12px", fontSize: 13 }}
                >
                  เข้าสู่ระบบ
                </button>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button onClick={openSearch} className="p-1.5" style={{ color: "var(--text-muted)" }}>
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="flex flex-col gap-1 p-1.5" onClick={() => setMenuOpen(!menuOpen)}>
              {[0, 1, 2].map((i) => (
                <span key={i} className="block w-5 h-px transition-all duration-200"
                  style={{ background: "var(--text-muted)", transform: menuOpen && i === 0 ? "rotate(45deg) translateY(5px)" : menuOpen && i === 2 ? "rotate(-45deg) translateY(-5px)" : "none", opacity: menuOpen && i === 1 ? 0 : 1 }} />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-4 py-3 flex flex-col gap-0.5"
            style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
            <Link href="/courses" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname.startsWith("/course") ? "var(--text)" : "var(--text-muted)", fontWeight: pathname.startsWith("/course") ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>คอร์สเรียน</Link>
            <Link href="/dashboard" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/dashboard" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/dashboard" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>ความคืบหน้า</Link>
            <Link href="/news" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/news" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/news" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>ข่าวสาร</Link>
            <Link href="/tips" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/tips" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/tips" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>ความรู้</Link>
            <Link href="/tarot" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/tarot" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/tarot" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>ดูดวง</Link>
            <Link href="/game" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/game" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/game" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>เกม</Link>
            <Link href="/e-exam" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/e-exam" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/e-exam" ? 600 : 400, fontSize: 15, letterSpacing: "0.05em", textDecoration: "none" }}>e-Exam</Link>
            <Link href="/shop" onClick={() => setMenuOpen(false)} className="px-2 py-2.5 rounded hover:bg-white/5" style={{ color: pathname === "/shop" ? "var(--text)" : "var(--text-muted)", fontWeight: pathname === "/shop" ? 600 : 400, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.05em", textDecoration: "none" }}>ร้านค้า</Link>
            <div style={{ height: 1, background: "var(--border)", margin: "6px 0" }} />
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                {isDark ? "โหมดมืด" : "โหมดสว่าง"}
              </span>
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-7 h-7 rounded-md"
                style={{ color: "var(--text-muted)", fontSize: 14, border: "1px solid var(--border)" }}
              >
                {isDark ? "☀" : "☾"}
              </button>
            </div>
            <div style={{ height: 1, background: "var(--border)", margin: "6px 0" }} />
            {userEmail ? (
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2 px-2 py-1.5">
                  <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, background: shownAvatar?.bg ?? "var(--primary)", color: shownAvatar?.color, fontSize: shownAvatar === GM_AVATAR ? 11 : 16 }}>
                    {shownAvatar ? shownAvatar.emoji : (displayName || userEmail)[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold truncate" style={{ color: "var(--text)" }}>{displayName || userEmail}</p>
                    <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>⚡ {xp} XP · Lv.{Math.floor(xp / 100) + 1}</p>
                  </div>
                </div>
                <button onClick={() => { setMenuOpen(false); setEditProfileOpen(true); }} className="px-2 py-2 text-sm text-left hover:bg-white/5 rounded" style={{ color: "var(--text-muted)" }}>แก้ไขโปรไฟล์</button>
                <button onClick={async () => { await signOut(); setMenuOpen(false); }} className="px-2 py-2 text-sm text-left hover:bg-white/5 rounded" style={{ color: "var(--accent-red)" }}>ออกจากระบบ</button>
                <button onClick={() => { setMenuOpen(false); setDeleteConfirmOpen(true); }} className="px-2 py-2 text-xs text-left hover:bg-white/5 rounded" style={{ color: "var(--text-subtle)" }}>ลบบัญชี</button>
              </div>
            ) : (
              <button onClick={() => { setMenuOpen(false); setAuthOpen(true); }}
                className="px-2 py-2.5 text-sm font-medium text-left" style={{ color: "var(--primary)" }}>
                เข้าสู่ระบบ / สมัครสมาชิก →
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center pt-20 px-4"
          style={{ background: "rgba(1,4,9,0.8)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
        >
          <div className="w-full max-w-xl">
            <div className="flex items-center gap-3 rounded-lg px-3 py-2.5"
              style={{ background: "var(--surface)", border: "1px solid var(--primary)", boxShadow: "0 0 0 3px rgba(31,111,235,0.15)" }}>
              <svg width="15" height="15" viewBox="0 0 13 13" fill="none" style={{ color: "var(--text-muted)", flexShrink: 0 }}>
                <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8.5 8.5L11.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ค้นหาคอร์ส บทความ เกม ดูดวง..."
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "var(--text)", caretColor: "var(--primary)" }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchResults.length > 0) {
                    router.push(searchResults[0].href);
                    closeSearch();
                  }
                }}
              />
              <button onClick={closeSearch} className="text-xs px-1.5 py-0.5 rounded transition-opacity hover:opacity-70" style={{ color: "var(--text-muted)", border: "1px solid var(--border)" }}>ESC</button>
            </div>

            <div className="mt-1.5 rounded-lg overflow-hidden"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 8px 24px rgba(0,0,0,0.5)" }}>
              {searchResults.length === 0 ? (
                <p className="px-4 py-5 text-sm text-center" style={{ color: "var(--text-muted)" }}>ไม่พบผลลัพธ์ที่ตรงกัน</p>
              ) : (
                searchResults.map((item, i) => (
                  <Link key={item.href} href={item.href} onClick={closeSearch}
                    className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-white/5"
                    style={{ borderTop: i > 0 ? "1px solid var(--border)" : undefined }}>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "var(--text)" }}>{item.title}</p>
                      <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{item.description}</p>
                    </div>
                    <span className="badge" style={{ fontSize: 11, flexShrink: 0 }}>{item.tag}</span>
                  </Link>
                ))
              )}
              <div className="px-4 py-2 flex gap-4 text-xs" style={{ borderTop: "1px solid var(--border)", color: "var(--text-subtle)" }}>
                <span>↵ เปิดคอร์สแรก</span>
                <span>ESC ปิด</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {authOpen && (
        <AuthModal onClose={() => setAuthOpen(false)} onSuccess={(email) => setUserEmail(email)} />
      )}

      {nameModalOpen && (
        <DisplayNameModal onDone={(name) => { setDisplayName(name); setAvatar(getAvatar()); setNameModalOpen(false); }} />
      )}

      {editProfileOpen && (
        <DisplayNameModal
          current={displayName ?? ""}
          onDone={(name) => { setDisplayName(name); setAvatar(getAvatar()); setEditProfileOpen(false); }}
          onClose={() => setEditProfileOpen(false)}
        />
      )}

      {deleteConfirmOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4"
          style={{ background: "rgba(1,4,9,0.8)", backdropFilter: "blur(4px)" }}>
          <div className="w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h2 className="text-lg font-black">ลบบัญชีผู้ใช้</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              การลบบัญชีจะลบข้อมูลทั้งหมดของคุณออกจากระบบ ได้แก่ XP ความก้าวหน้า และคะแนนเกม <strong style={{ color: "var(--accent-red)" }}>ไม่สามารถกู้คืนได้</strong>
            </p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                disabled={deleteLoading}
                className="flex-1 px-4 py-2.5 rounded-full font-bold text-sm"
                style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
              >
                ยกเลิก
              </button>
              <button
                disabled={deleteLoading}
                onClick={async () => {
                  setDeleteLoading(true);
                  try {
                    const session = await import("@/lib/supabase").then(m => m.getSession());
                    const user_id = session?.user?.id;
                    if (!user_id || !session?.access_token) return;
                    const res = await fetch("/api/delete-account", {
                      method: "POST",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` },
                      body: JSON.stringify({ user_id }),
                    });
                    if (res.ok) {
                      await signOut();
                      window.location.href = "/";
                    }
                  } finally {
                    setDeleteLoading(false);
                  }
                }}
                className="flex-1 px-4 py-2.5 rounded-full font-bold text-sm text-white"
                style={{ background: deleteLoading ? "var(--text-subtle)" : "var(--accent-red)" }}
              >
                {deleteLoading ? "กำลังลบ..." : "ลบบัญชี"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
