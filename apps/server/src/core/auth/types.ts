import { User } from '@supabase/supabase-js';

export interface AuthUser extends User {
  sub: string;
}
