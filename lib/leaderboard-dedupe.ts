export type LeaderboardRow = { name: string; xp: number; avatar: string | null };

// Keeps each player's single best (highest-XP) row and sorts/limits the result.
export function dedupeLeaderboard(data: LeaderboardRow[], limit: number): LeaderboardRow[] {
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
