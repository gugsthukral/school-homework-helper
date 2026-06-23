import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  if (!supabaseAdmin) {
    supabaseAdmin = createClient(url, key);
  }

  return supabaseAdmin;
}

export async function logAIRequest(params: {
  toolName: string;
  prompt: string;
  response: string;
  userId?: string | null;
  userEmail?: string | null;
  userName?: string | null;
}) {
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return { logged: false };
  }

  const { error } = await supabase.from("ai_requests").insert({
    tool_name: params.toolName,
    prompt: params.prompt,
    response: params.response,
    user_id: params.userId ?? null,
    user_email: params.userEmail ?? null,
    user_name: params.userName ?? null,
  });

  if (error) {
    console.error("Failed to log AI request:", error.message);
    return { logged: false, error: error.message };
  }

  return { logged: true };
}
