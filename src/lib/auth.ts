import type { User } from "@supabase/supabase-js";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createClient } from "@/lib/supabase/server";

export function getUserDisplayName(user: User) {
  return (
    user.user_metadata?.full_name ??
    user.user_metadata?.name ??
    user.email?.split("@")[0] ??
    "Student"
  );
}

export async function getAuthenticatedUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function syncUserProfile(user: User) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  const name = getUserDisplayName(user);

  await supabase.from("users").upsert(
    {
      id: user.id,
      email: user.email,
      name,
      avatar_url: user.user_metadata?.avatar_url ?? user.user_metadata?.picture ?? null,
      role: "student",
    },
    { onConflict: "id" }
  );
}
