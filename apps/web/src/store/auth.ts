import { AuthUser } from '@supabase/supabase-js';
import { StateCreator } from 'zustand';

export type AuthSlice = {
  accessToken: string | null;
  user: AuthUser | null;
  onAuthSuccess: ({
    accessToken,
    user,
  }: {
    accessToken: string;
    user: AuthUser;
  }) => void;
  onLogout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  accessToken: null,
  user: null,
  onAuthSuccess: (payload) => {
    set(() => ({ ...payload }));
  },
  onLogout: () => {
    set(() => ({
      accessToken: null,
      user: null,
    }));
  },
});
