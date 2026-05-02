import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    '❌ Variables manquantes : VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY doivent être définies dans .env.local'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnon);
