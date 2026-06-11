"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getProgress } from "@/lib/progress";

export default function Navbar() {
  const pathname = usePathname();
  const [xp, setXp] = useState(0);

  useEffect(() => {
    setXp(getProgress().xp);
  }, [pathname]);

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <span className="text-2xl font-black" style={{ color: "var(--primary-light)" }}>
          Abcde<span style={{ color: "var(--accent)" }}>Go</span>
        </span>
      </Link>

      <div className="flex items-center gap-4">
        <Link
          href="/courses"
          className="text-sm font-medium transition-colors"
          style={{ color: pathname === "/courses" ? "var(--primary-light)" : "var(--text-muted)" }}
        >
          คอร์ส
        </Link>
        <Link
          href="/dashboard"
          className="text-sm font-medium transition-colors"
          style={{ color: pathname === "/dashboard" ? "var(--primary-light)" : "var(--text-muted)" }}
        >
          ความก้าวหน้า
        </Link>
        <div
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold"
          style={{ background: "rgba(245,158,11,0.15)", color: "var(--accent)" }}
        >
          ⚡ {xp} XP
        </div>
      </div>
    </nav>
  );
}
