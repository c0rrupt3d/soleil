import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useSettingsStore = create<SettingsStoreType & SettingsStoreAction>()(
  immer(
    persist(
      (set) => ({
        tempUnit: "cel",
        windUnit: "kmh",
        precipUnit: "mm",
        elevationUnit: "ft",
        time12: "0",
        setTempUnit: (value) => {
          set((state) => {
            state.tempUnit = value;
          });
        },
        setWindUnit: (value) => {
          set((state) => {
            state.windUnit = value;
          });
        },
        setPrecipUnit: (value) => {
          set((state) => {
            state.precipUnit = value;
          });
        },
        setTime12: (value) => {
          set((state) => {
            state.time12 = value
          })
        },
        setElevationUnit: (value) => {
          set((state) => {
            state.elevationUnit = value
          })
        }
      }),
      {
        name: "soleil_settings",
      }
    )
  )
);
