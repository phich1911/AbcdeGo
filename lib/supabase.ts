import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

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
  // Read session straight from localStorage — supabase-js getSession()/queries can hang on auth locks
  const session = getStoredSession();
  const user = session?.user;
  if (!user) return { error: "no session" };
  const name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  const avatar = typeof window !== "undefined" ? (localStorage.getItem("user_avatar") ?? null) : null;

  const headers: Record<string, string> = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${session?.access_token ?? SUPABASE_KEY}`,
    "Content-Type": "application/json",
  };

  try {
    // Remove this user's previous entries (current + any old display name), then insert the latest.
    const names = Array.from(new Set([name, oldName].filter(Boolean))) as string[];
    for (const n of names) {
      await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?name=eq.${encodeURIComponent(n)}`, {
        method: "DELETE",
        headers,
      });
    }
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ name, xp, avatar }),
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
  // Read session from localStorage + direct REST (supabase-js client can hang on auth locks)
  const session = getStoredSession();
  const user = session?.user;
  if (!user || !session?.access_token) return false;
  const display_name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  const headers = {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${session.access_token}`,
    "Content-Type": "application/json",
  };
  try {
    // Keep only ONE row per user per game = their personal best (prevents table bloat).
    // Look up the user's existing best for this game.
    const existRes = await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?select=score&user_id=eq.${user.id}&game=eq.${encodeURIComponent(game)}&order=score.desc&limit=1`,
      { headers }
    );
    const existing = existRes.ok ? await existRes.json() : [];
    const best = existing?.[0]?.score ?? -1;
    // New score is not higher → nothing to do
    if (score <= best) return true;

    // Replace: delete all previous rows for this user+game, then insert the new best
    await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?user_id=eq.${user.id}&game=eq.${encodeURIComponent(game)}`,
      { method: "DELETE", headers }
    );
    const res = await fetch(`${SUPABASE_URL}/rest/v1/game_scores`, {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ user_id: user.id, display_name, game, score }),
    });
    return res.ok;
  } catch {
    return false;
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
