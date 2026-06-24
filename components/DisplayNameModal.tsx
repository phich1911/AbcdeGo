"use client";

import { useState } from "react";
import { setDisplayName, syncLeaderboard } from "@/lib/supabase";
import { getProgress as getLocalProgress } from "@/lib/progress";
import { AVATARS, getAvatar, saveAvatar } from "@/lib/avatar";
import { containsProfanity } from "@/lib/profanity";

interface Props {
  current?: string;
  onDone: (name: string) => void;
  onClose?: () => void;
}

export default function DisplayNameModal({ current, onDone, onClose }: Props) {
  const [name, setName] = useState(current ?? "");
  const [selectedAvatar, setSelectedAvatar] = useState(() => getAvatar().id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isEdit = !!current;

  const avatar = AVATARS.find((a) => a.id === selectedAvatar) ?? AVATARS[0];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    if (containsProfanity(name.trim())) {
      setError("ชื่อนี้ไม่เหมาะสม กรุณาเลือกชื่ออื่น");
      return;
    }
    setLoading(true);
    const err = await setDisplayName(name.trim());
    if (err) { setError(err); setLoading(false); return; }
    saveAvatar(selectedAvatar);
    const xp = getLocalProgress().xp;
    if (xp > 0) await syncLeaderboard(xp, current || undefined);
    onDone(name.trim());
  }

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}
    >
      <div
        className="w-full max-w-sm rounded-lg relative"
        style={{ background: "var(--surface)", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <h2 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {isEdit ? "Edit Profile" : "Set Display Name"}
          </h2>
          {onClose && (
            <button onClick={onClose} className="hover:opacity-70" style={{ color: "var(--text-muted)", fontSize: 14 }}>✕</button>
          )}
        </div>

        <div className="px-5 py-5 flex flex-col gap-5">
          {/* Avatar preview */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex items-center justify-center rounded-full"
              style={{ width: 64, height: 64, background: avatar.bg, fontSize: 11, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}
            >
              {avatar.label}
            </div>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>Choose your avatar</p>
          </div>

          {/* Avatar grid */}
          <div className="grid grid-cols-6 gap-2">
            {AVATARS.map((a) => (
              <button
                key={a.id}
                onClick={() => setSelectedAvatar(a.id)}
                className="flex items-center justify-center rounded-lg transition-all"
                style={{
                  width: "100%",
                  aspectRatio: "1",
                  background: a.bg,
                  fontSize: 8,
                  fontWeight: 800,
                  color: "#fff",
                  letterSpacing: "0.03em",
                  outline: selectedAvatar === a.id ? "2px solid var(--primary)" : "2px solid transparent",
                  outlineOffset: 2,
                  opacity: selectedAvatar === a.id ? 1 : 0.65,
                }}
                title={a.id}
              >
                {a.label}
              </button>
            ))}
          </div>

          {/* Name input */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium mb-1.5 block" style={{ color: "var(--text-muted)" }}>Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nickname / alias"
                maxLength={20}
                autoFocus
                required
                className="w-full px-3 py-2 rounded-md text-sm outline-none transition-all"
                style={{ background: "var(--surface-2)", border: "1px solid var(--border)", color: "var(--text)" }}
                onFocus={(e) => { e.target.style.borderColor = "var(--primary)"; e.target.style.boxShadow = "0 0 0 3px rgba(31,111,235,0.15)"; }}
                onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
              />
              <p className="text-xs mt-1" style={{ color: "var(--text-subtle)" }}>{name.length}/20</p>
            </div>

            {error && (
              <p className="text-xs text-center px-3 py-2 rounded-md" style={{ background: "rgba(239,68,68,0.1)", color: "var(--accent-red)", border: "1px solid rgba(239,68,68,0.2)" }}>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !name.trim() || (name.trim() === current && selectedAvatar === getAvatar().id)}
              className="btn-primary w-full justify-center py-2 disabled:opacity-40"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Confirm →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
