import { unstable_cache } from "next/cache";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eaxskmgekbdrmmczptmq.supabase.co";

// Hits the Supabase auth admin API on every homepage request otherwise —
// cached since this is just a vanity stat, not something that needs to be live.
export const getRegisteredUserCount = unstable_cache(
  async (): Promise<number> => {
    const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
    if (!SERVICE_KEY) return 0;
    try {
      const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
        auth: { autoRefreshToken: false, persistSession: false },
      });
      const { data, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1 });
      if (error) return 0;
      return data.total ?? 0;
    } catch {
      return 0;
    }
  },
  ["registered-user-count"],
  { revalidate: 900, tags: ["registered-user-count"] }
);
