import { ImageResponse } from "next/og";
import { getCourse } from "@/lib/data";

export const runtime = "edge";
export const alt = "AbcdeGo คอร์สเรียน";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage({ params }: { params: { id: string } }) {
  const course = getCourse(params.id);

  const title = course?.title ?? "คอร์สเรียน";
  const description = course?.description ?? "";
  const icon = course?.icon ?? "📚";
  const lessons = course?.totalLessons ?? 0;
  const xp = course?.xpReward ?? 0;
  const tag = course?.tag ?? "";
  const color = course?.color ?? "#3b82f6";

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 100%)",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          position: "relative",
          fontFamily: "sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Color accent top bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: color,
        }} />

        {/* Background glow */}
        <div style={{
          position: "absolute", top: -200, right: -200,
          width: 600, height: 600, borderRadius: "50%",
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
        }} />

        {/* Tag badge */}
        {tag && (
          <div style={{
            display: "flex", alignItems: "center",
            background: `${color}22`,
            border: `1px solid ${color}55`,
            borderRadius: 20, padding: "6px 18px",
            marginBottom: 32, width: "fit-content",
          }}>
            <span style={{ fontSize: 16, color, fontWeight: 600 }}>{tag}</span>
          </div>
        )}

        {/* Icon + Title */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 24, marginBottom: 24, flex: 1 }}>
          <span style={{ fontSize: 80, lineHeight: 1 }}>{icon}</span>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <span style={{
              fontSize: title.length > 40 ? 42 : 52,
              fontWeight: 800,
              color: "#f0f6fc",
              lineHeight: 1.2,
              maxWidth: 900,
            }}>
              {title}
            </span>
            {description && (
              <span style={{
                fontSize: 22,
                color: "#8b949e",
                lineHeight: 1.6,
                maxWidth: 850,
              }}>
                {description.split(" · ").slice(0, 4).join("  ·  ")}
              </span>
            )}
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: "auto" }}>
          <div style={{
            display: "flex", gap: 40,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16, padding: "20px 32px",
            flex: 1,
          }}>
            {[
              { label: "บทเรียน", value: `${lessons} บท` },
              { label: "XP รับได้", value: `${xp} XP` },
              { label: "เรียนฟรี", value: "✓ ไม่มีค่าใช้จ่าย" },
            ].map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span style={{ fontSize: 14, color: "#8b949e", fontWeight: 500 }}>{s.label}</span>
                <span style={{ fontSize: 26, fontWeight: 700, color: "#f0f6fc" }}>{s.value}</span>
              </div>
            ))}
          </div>

          {/* Domain */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, marginLeft: 40 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3fb950" }} />
            <span style={{ fontSize: 22, color: "#58a6ff", fontWeight: 700 }}>abcdego.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
