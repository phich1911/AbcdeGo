import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, key);

export async function trackVisit() {
  if (typeof window === "undefined") return;
  const key = "abcdego_visited";
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, "1");
  await supabase.from("visitors").insert({});
}

export async function getVisitorCount(): Promise<number> {
  const { count } = await supabase.from("visitors").select("*", { count: "exact", head: true });
  return count ?? 0;
}

export async function getLeaderboard(limit = 10) {
  const { data } = await supabase
    .from("leaderboard")
    .select("name, xp")
    .order("xp", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function submitScore(name: string, xp: number) {
  const { error } = await supabase.from("leaderboard").insert({ name, xp });
  return !error;
}
