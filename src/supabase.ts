import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  (import.meta.env.VITE_SUPABASE_URL =
    "https://rmeseoskttlvomuqpoec.supabase.co"),
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_zUimQnjF8uOSVxkkiqHrlA_muT19-2y"),
);
