import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AbcdeGo — เรียน เล่น เก่งขึ้น";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #1a2332 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "72px 80px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Background accent circles */}
        <div style={{
          position: "absolute", top: -100, right: -100,
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: -80, left: 200,
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        }} />

        {/* Badge */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(63,185,80,0.12)", border: "1px solid rgba(63,185,80,0.3)",
          borderRadius: 20, padding: "6px 16px", marginBottom: 32,
        }}>
          <span style={{ fontSize: 14, color: "#3fb950" }}>✦ เรียนฟรี ไม่ต้องเสียค่าสมัคร</span>
        </div>

        {/* Main heading */}
        <div style={{ display: "flex", gap: 20, marginBottom: 20, lineHeight: 1.1 }}>
          <span style={{ fontSize: 80, fontWeight: 800, color: "#e6edf3" }}>เรียน</span>
          <span style={{ fontSize: 80, fontWeight: 800, background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", backgroundClip: "text", color: "transparent" }}>เล่น</span>
          <span style={{ fontSize: 80, fontWeight: 800, background: "linear-gradient(135deg, #f59e0b, #ef4444)", backgroundClip: "text", color: "transparent" }}>เก่งขึ้น</span>
        </div>

        {/* Subtitle */}
        <p style={{ fontSize: 24, color: "#8b949e", marginBottom: 48, maxWidth: 700, lineHeight: 1.5 }}>
          รวมวิชาสอบราชการ ก.พ., DSI และวิชา ม.ปลาย — เรียนทีละขั้น รับ XP สะสมเลเวล
        </p>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 48, marginBottom: 48 }}>
          {[
            { num: "20+", label: "วิชา" },
            { num: "80+", label: "บทเรียน" },
            { num: "7,250+", label: "XP รวม" },
          ].map((s) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: "#e6edf3" }}>{s.num}</span>
              <span style={{ fontSize: 16, color: "#8b949e" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3fb950" }} />
          <span style={{ fontSize: 20, color: "#58a6ff", fontWeight: 500 }}>abcdego.com</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
