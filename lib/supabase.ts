import { createClient, SupabaseClient, User } from "@supabase/supabase-js";
import { GM_EMAIL, GM_AVATAR } from "@/lib/avatar";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      // No-op lock: bypass navigator.locks which can deadlock getSession()/queries
      // when multiple components read the session concurrently.
      lock: async (_name, _acquireTimeout, fn) => fn(),
    },
  });
  return _client;
}

// Project ref (subdomain of the Supabase URL) → used to find the auth-token storage key
const PROJECT_REF = SUPABASE_URL.replace("https://", "").split(".")[0];

// Read the persisted session straight from localStorage — synchronous, never hangs,
// unlike supabase-js getSession() which can deadlock on navigator.locks.
function getStoredSession(): { access_token?: string; user?: User } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`sb-${PROJECT_REF}-auth-token`);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}


export async function getLeaderboard(limit = 10) {
  // Direct REST fetch — supabase-js client queries can hang on auth locks
  let data: { name: string; xp: number; avatar: string | null }[] = [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=name,xp,avatar&order=xp.desc&limit=200`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (res.ok) data = await res.json();
  } catch {
    return [];
  }
  if (!data || data.length === 0) return [];
  const seen = new Map<string, { xp: number; avatar: string | null }>();
  for (const row of data) {
    if (!seen.has(row.name) || row.xp > seen.get(row.name)!.xp) {
      seen.set(row.name, { xp: row.xp, avatar: row.avatar ?? null });
    }
  }
  return Array.from(seen.entries())
    .sort((a, b) => b[1].xp - a[1].xp)
    .slice(0, limit)
    .map(([name, { xp, avatar }]) => ({ name, xp, avatar }));
}

export async function submitScore(name: string, xp: number) {
  const { error } = await getClient().from("leaderboard").insert({ name, xp });
  return !error;
}

export async function syncLeaderboard(xp: number, oldName?: string) {
  if (xp <= 0) return { error: "xp=0" };
  const session = getStoredSession();
  const user = session?.user;
  if (!user?.id) return { error: "no session" };
  const name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  const avatar = user.email === GM_EMAIL
    ? GM_AVATAR.id
    : typeof window !== "undefined" ? (localStorage.getItem("user_avatar") ?? null) : null;
  try {
    const res = await fetch("/api/sync-leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
      body: JSON.stringify({ name, xp, avatar, user_id: user.id }),
    });
    if (!res.ok) return { error: `HTTP ${res.status}: ${await res.text()}` };
    return { ok: true };
  } catch (e) {
    return { error: String(e) };
  }
}

export async function setDisplayName(displayName: string): Promise<string | null> {
  const { error } = await getClient().auth.updateUser({
    data: { display_name: displayName },
  });
  return error?.message ?? null;
}

export async function getDisplayName(): Promise<string | null> {
  const { data } = await getClient().auth.getUser();
  return data.user?.user_metadata?.display_name ?? null;
}

// Auth
export async function signUp(email: string, password: string) {
  const { data, error } = await getClient().auth.signUp({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await getClient().auth.signInWithPassword({ email, password });
  return { user: data.user, error: error?.message ?? null };
}

export async function signOut() {
  await getClient().auth.signOut();
}

export async function getUser(): Promise<User | null> {
  const { data } = await getClient().auth.getUser();
  return data.user;
}

export async function getSession() {
  // Read from localStorage instead of getClient().auth.getSession(), which can hang on auth locks
  return getStoredSession();
}

export function onAuthChange(cb: (user: User | null) => void) {
  const { data } = getClient().auth.onAuthStateChange((_event, session) => cb(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}

export async function signInWithGoogle(): Promise<string | null> {
  const { error } = await getClient().auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${window.location.origin}/` },
  });
  return error?.message ?? null;
}

// ── Cloud Progress ──────────────────────────────────────────────

export type CloudProgress = {
  completed_lessons: string[];
  xp: number;
  streak: number;
  last_active: string;
};

export async function getCloudProgress(): Promise<CloudProgress | null> {
  const session = getStoredSession();
  const user = session?.user;
  if (!user || !session?.access_token) return null;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/user_progress?select=completed_lessons,xp,streak,last_active&user_id=eq.${user.id}`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${session.access_token}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function saveCloudProgress(p: CloudProgress): Promise<void> {
  const session = getStoredSession();
  const user = session?.user;
  if (!user || !session?.access_token) return;
  try {
    await fetch(`${SUPABASE_URL}/rest/v1/user_progress?on_conflict=user_id`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        user_id: user.id,
        completed_lessons: p.completed_lessons,
        xp: p.xp,
        streak: p.streak,
        last_active: p.last_active,
      }),
    });
  } catch {
    // ignore — progress also persists locally
  }
}

export async function signInWithFacebook(): Promise<string | null> {
  const { error } = await getClient().auth.signInWithOAuth({
    provider: "facebook",
    options: { redirectTo: `${window.location.origin}/` },
  });
  return error?.message ?? null;
}

// ── Game Scores ──────────────────────────────────────────────────

export async function saveGameScore(game: string, score: number): Promise<boolean> {
  const session = getStoredSession();
  const user = session?.user;
  if (!user?.id) return false;
  const display_name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  try {
    const res = await fetch("/api/save-game-score", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
      body: JSON.stringify({ game, score, user_id: user.id, display_name }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function getTopGameScores(game: string, limit = 10): Promise<{ display_name: string; score: number }[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?select=display_name,score&game=eq.${encodeURIComponent(game)}&order=score.desc&limit=${limit}`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return [];
    return (await res.json()) ?? [];
  } catch {
    return [];
  }
}

export async function getTopGameScore(game: string): Promise<{ display_name: string; score: number } | null> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?select=display_name,score&game=eq.${encodeURIComponent(game)}&order=score.desc&limit=1`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

// ── Exam Scores ────────────────────────────────────────────────────

export async function saveExamScore(examId: string, score: number, total: number): Promise<boolean> {
  const session = getStoredSession();
  const user = session?.user;
  if (!user?.id) return false;
  const display_name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  try {
    const res = await fetch("/api/save-exam-score", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${session?.access_token ?? ""}` },
      body: JSON.stringify({ exam_id: examId, score, total, display_name }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Whether the current user already has a locked score for this exam —
// used to gate section practice mode (with instant answer reveal) behind
// having taken the full exam blind at least once.
export async function hasExamScore(examId: string): Promise<boolean> {
  const session = getStoredSession();
  const userId = session?.user?.id;
  if (!userId) return false;
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/exam_scores?select=score&user_id=eq.${encodeURIComponent(userId)}&exam_id=eq.${encodeURIComponent(examId)}&limit=1`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return false;
    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch {
    return false;
  }
}

export async function getExamLeaderboard(examId: string, limit = 5): Promise<{ display_name: string; score: number; total: number }[]> {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/exam_scores?select=display_name,score,total&exam_id=eq.${encodeURIComponent(examId)}&order=score.desc&limit=${limit}`,
      { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
    );
    if (!res.ok) return [];
    return (await res.json()) ?? [];
  } catch {
    return [];
  }
}
