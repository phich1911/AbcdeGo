import { createClient, SupabaseClient, User } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eaxskmgekbdrmmczptmq.supabase.co";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_bVnYGDvGfIiB1s26IUYo9A_vefPQl8R";

let _client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(SUPABASE_URL, SUPABASE_KEY);
  return _client;
}

export async function trackVisit() {
  if (typeof window === "undefined") return;
  const visited = "abcdego_visited";
  if (sessionStorage.getItem(visited)) return;
  sessionStorage.setItem(visited, "1");
  await getClient().from("visitors").insert({});
}

export async function getVisitorCount(): Promise<number> {
  const { count } = await getClient().from("visitors").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getLeaderboard(limit = 10) {
  const { data } = await getClient()
    .from("leaderboard")
    .select("name, xp")
    .order("xp", { ascending: false })
    .limit(200);
  if (!data) return [];
  // deduplicate: keep highest xp per name
  const seen = new Map<string, number>();
  for (const row of data) {
    if (!seen.has(row.name) || row.xp > seen.get(row.name)!) {
      seen.set(row.name, row.xp);
    }
  }
  return Array.from(seen.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, xp]) => ({ name, xp }));
}

export async function submitScore(name: string, xp: number) {
  const { error } = await getClient().from("leaderboard").insert({ name, xp });
  return !error;
}

export async function syncLeaderboard(xp: number, oldName?: string) {
  if (xp <= 0) return { error: "xp=0" };
  const { data: { session } } = await getClient().auth.getSession();
  if (!session) return { error: "no session" };
  const user = session.user;
  const name =
    user.user_metadata?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "ผู้ใช้";
  try {
    const res = await fetch("/api/sync-leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({ name, xp, oldName }),
    });
    const json = await res.json();
    return json;
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

export async function signInWithFacebook(): Promise<string | null> {
  const { error } = await getClient().auth.signInWithOAuth({
    provider: "facebook",
    options: { redirectTo: `${window.location.origin}/` },
  });
  return error?.message ?? null;
}
