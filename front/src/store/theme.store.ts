import { create } from "zustand";

import { LOCAL_STORAGE_KEYS } from "../common/constants/local-storage-keys.constant";
import { THEMES } from "../common/constants/themes";

interface IThemeState {
  theme: THEMES;
  toggleTheme: () => void;
  setTheme: (theme: THEMES) => void;
}

export const useTheme = create<IThemeState>((set) => {
  return {
    theme:
      (localStorage.getItem(LOCAL_STORAGE_KEYS.THEME) as THEMES | undefined) ??
      THEMES.LIGHT,
    toggleTheme: () => {
      set((state) => {
        const newTheme =
          state.theme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, newTheme);
        return {
          theme: newTheme,
        };
      });
    },
    setTheme: (theme: THEMES) => {
      set(() => {
        return {
          theme: theme,
        };
      });
      localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, theme);
    },
  };
});
