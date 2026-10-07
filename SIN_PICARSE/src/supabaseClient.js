import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://paylvmkjerdbtjasuszb.supabase.co';
const supabaseAnonKey = 'sb_publishable_jaVl8se3Bbr1zpPSb1TRZQ_rnHcrB0T';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);