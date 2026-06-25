import { NEWS } from "@/lib/news";

export const metadata = {
  title: "ข่าวสาร — AbcdeGo",
  description: "ข่าวประชาสัมพันธ์ ก.พ. การรับสมัครราชการ และอัปเดตสำคัญ",
};

const TAG_COLOR: Record<string, string> = {
  "ก.พ.": "#3b82f6",
  "ราชการ": "#7c3aed",
  "ทั่วไป": "#6b7280",
};

function formatDate(d: string) {
  const date = new Date(d);
  return date.toLocaleDateString("th-TH", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewsPage() {
  const pinned = NEWS.filter((n) => n.pinned);
  const rest = NEWS.filter((n) => !n.pinned).sort((a, b) => b.date.localeCompare(a.date));
  const sorted = [...pinned, ...rest];

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "80px 16px 48px" }}>
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          ประชาสัมพันธ์
        </p>
        <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: "-0.02em" }}>
          ข่าวสาร
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
          อัปเดตข่าว ก.พ. การรับสมัครราชการ และประกาศสำคัญ
        </p>
      </div>

      {sorted.length === 0 ? (
        <div className="card" style={{ padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>ยังไม่มีข่าวในขณะนี้</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {sorted.map((item) => (
            <div key={item.id} className="card-lg" style={{ padding: "22px 24px", borderLeft: item.pinned ? "3px solid var(--primary)" : undefined }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                {item.pinned && (
                  <span style={{ fontSize: 11, fontWeight: 700, color: "var(--primary)", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 4, padding: "2px 7px" }}>
                    📌 ปักหมุด
                  </span>
                )}
                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: TAG_COLOR[item.tag] ?? "#6b7280", borderRadius: 4, padding: "2px 7px" }}>
                  {item.tag}
                </span>
                <span style={{ fontSize: 12, color: "var(--text-subtle)" }}>{formatDate(item.date)}</span>
              </div>

              <h2 style={{ fontSize: 16, fontWeight: 700, color: "var(--text)", margin: "0 0 8px", lineHeight: 1.4 }}>
                {item.title}
              </h2>
              <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7, margin: 0 }}>
                {item.body}
              </p>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-block", marginTop: 14, fontSize: 13, color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}
                >
                  {item.linkLabel ?? item.link} →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
