import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
import { createClient } from "@/utils/supabase/client";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  reset: () => Promise<void>;
}

type ThemeMode = "light" | "dark" | "system";

interface WebThemeStore {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
}

const supabase = createClient();

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: {
          id: "",
          email: "",
          role: "",
        },
        setUser: (newUser: User | null) => set({ user: newUser }),
        // 로그아웃 ( 상태 + supabase 제거)
        reset: async () => {
          await supabase.auth.signOut();
          set({ user: null }); // zustand 상태 초기화
          localStorage.removeItem("auth-storage");
        },
      }),
      {
        name: "auth-storage",
        partialize: (state) => ({ user: state.user }), // user만 저장
      }
    )
  )
);

const webThemeStore = create<WebThemeStore>()(
  persist(
    (set) => ({
      theme: "dark",
      setTheme: (theme: ThemeMode) => set({ theme }),
    }),
    {
      name: "vite-ui-theme",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);

export { useAuthStore, webThemeStore };
