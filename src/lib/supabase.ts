import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(url, anon);

export type Programare = {
  id?: number;
  nume: string;
  telefon: string;
  email: string;
  categorie: string;
  mesaj?: string;
  created_at?: string;
};
