import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useThemeStore = create<ThemeStoreType & ThemeStoreAction>()(
  immer(
    persist(
      (set) => ({
        theme: "system",
        setTheme: (value) => {
          set((state) => {
            state.theme = value;
          });
        },
      }),
      {
        name: "soleil_theme",
      }
    )
  )
);
