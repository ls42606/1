import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  verifyPassword, 
  setupMasterPassword, 
  isFirstTimeSetup,
  createSession,
  checkSession,
  clearSession,
  updatePassword
} from '../services/auth';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  isFirstTime: boolean | null;
  error: string | null;
  login: (password: string, remember?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  initialize: () => Promise<void>;
  setupPassword: (password: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      isLoading: true,
      isFirstTime: null,
      error: null,

      initialize: async () => {
        try {
          const firstTime = await isFirstTimeSetup();
          const hasValidSession = await checkSession();
          
          set({
            isFirstTime: firstTime,
            isAuthenticated: hasValidSession,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: 'Failed to initialize authentication'
          });
        }
      },

      login: async (password: string, remember = false) => {
        try {
          const isValid = await verifyPassword(password);
          if (!isValid) {
            set({ error: 'Invalid password' });
            return;
          }

          if (remember) {
            await createSession();
          }

          set({ isAuthenticated: true, error: null });
        } catch (error) {
          set({ error: 'Login failed. Please try again.' });
        }
      },

      logout: async () => {
        try {
          await clearSession();
          set({ isAuthenticated: false, error: null });
        } catch (error) {
          set({ error: 'Logout failed' });
        }
      },

      checkAuth: async () => {
        const hasValidSession = await checkSession();
        set({ isAuthenticated: hasValidSession });
      },

      setupPassword: async (password: string) => {
        try {
          const result = await setupMasterPassword(password);
          if (!result.success) {
            set({ error: result.error });
            return;
          }

          await createSession();
          set({ 
            isAuthenticated: true, 
            isFirstTime: false,
            error: null 
          });
        } catch (error) {
          set({ error: 'Failed to set up password' });
        }
      },

      changePassword: async (currentPassword: string, newPassword: string) => {
        const result = await updatePassword(currentPassword, newPassword);
        if (!result.success) {
          set({ error: result.error });
        }
        return result;
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ isAuthenticated: state.isAuthenticated }),
    }
  )
);