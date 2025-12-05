import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Server-side client with service role key
export const supabaseServer = createClient(supabaseUrl, supabaseServiceRoleKey);

export interface Person {
  id: string;
  name: string;
  food: string | null;
  drink: string | null;
  dessert: string | null;
  created_at: string;
  updated_at: string;
}

export type PersonUpdate = Partial<
  Omit<Person, "id" | "name" | "created_at" | "updated_at">
>;
export type PersonCreate = { name: string };
