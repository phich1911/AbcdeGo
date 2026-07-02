import { getLeaderboard } from "@/lib/supabase";
import { AVATARS, GM_AVATAR } from "@/lib/avatar";

export const metadata = {
  title: "Leaderboard — AbcdeGo",
  description: "อันดับผู้เรียนสะสม XP สูงสุดทั่วประเทศ",
};

export const dynamic = "force-dynamic";

const MEDAL = ["🥇", "🥈", "🥉"];

export default async function LeaderboardPage() {
  const entries = await getLeaderboard(100);

  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "80px 16px 48px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
          อันดับ XP
        </p>
        <h1 style={{ fontSize: "clamp(24px,5vw,36px)", fontWeight: 800, color: "var(--text)", margin: 0, letterSpacing: "-0.02em" }}>
          Leaderboard
        </h1>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginTop: 8 }}>
          อันดับผู้เรียนสะสม XP สูงสุด — อัปเดต real-time
        </p>
      </div>

      {entries.length === 0 ? (
        <div className="card" style={{ padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>ยังไม่มีข้อมูลในขณะนี้</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {entries.map((entry, i) => {
            const level = Math.floor(entry.xp / 100) + 1;
            const isTop3 = i < 3;
            return (
              <div
                key={entry.name + i}
                className="card-lg"
                style={{
                  padding: "14px 18px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  background: isTop3 ? "var(--surface)" : undefined,
                  borderColor: i === 0 ? "rgba(251,191,36,0.4)" : i === 1 ? "rgba(156,163,175,0.4)" : i === 2 ? "rgba(180,120,60,0.4)" : undefined,
                }}
              >
                {/* Rank */}
                <div style={{ width: 32, textAlign: "center", flexShrink: 0 }}>
                  {isTop3 ? (
                    <span style={{ fontSize: 22 }}>{MEDAL[i]}</span>
                  ) : (
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-muted)" }}>#{i + 1}</span>
                  )}
                </div>

                {/* Avatar */}
                {(() => {
                  const avatar = entry.avatar === GM_AVATAR.id ? GM_AVATAR : AVATARS.find((a) => a.id === entry.avatar);
                  return (
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                      background: avatar?.bg ?? "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: avatar ? 20 : 14, fontWeight: 700, color: "#fff",
                    }}>
                      {avatar?.emoji ?? entry.name[0]?.toUpperCase()}
                    </div>
                  );
                })()}

                {/* Name + Level */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 15, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {entry.name}
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "var(--text-muted)" }}>Level {level}</p>
                </div>

                {/* XP */}
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", flexShrink: 0 }}>
                  ⚡ {entry.xp.toLocaleString()} XP
                </span>
              </div>
            );
          })}
        </div>
      )}

      <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-subtle)", marginTop: 32 }}>
        แสดง {entries.length} อันดับ · เรียนบทเรียนเพิ่มเพื่อขึ้นอันดับ
      </p>
    </main>
  );
}
