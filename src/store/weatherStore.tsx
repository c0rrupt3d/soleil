import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useWeatherStore = create<WeatherStoreType & WeatherStoreAction>()(
  immer(
    persist(
      (set) => ({
        weatherLoading: false,
        weatherData: undefined,
        weatherAqi: undefined,
        weatherElevation: undefined,
        weatherLoc: {
          name: "New Delhi",
          country_code: "IN",
        },
        weatherCoords: {
          lat: 28.5275544,
          lon: 77.0441755,
        },
        setWeatherLoading: (value) => {
          set((state) => {
            state.weatherLoading = value;
          });
        },
        setWeatherData: (value) => {
          set((state) => {
            state.weatherData = value;
          });
        },
        setWeatherLoc: (value) => {
          set((state) => {
            state.weatherLoc = {
              name: value.name,
              country_code: value.country_code,
            };
          });
        },
        setWeatherCoords: (value) => {
          set((state) => {
            state.weatherCoords = value;
          });
        },
        setWeatherAqi: (value) => {
          set((state) => {
            state.weatherAqi = value;
          });
        },
        setWeatherElevation: (value) => {
          set((state) => {
            state.weatherElevation = value;
          });
        },
        handleTempChange: (value, unit) => {
          if (unit === "fah") {
            const fah = value * (9 / 5) + 32;
            return Math.round(fah) + "°F";
          } else {
            return Math.round(value) + "°C";
          }
        },
        handleElevationChange: (value, unit) => {
          if (unit === "ft") {
            const ft = value * 3.28084;
            const round = Math.round(ft);
            if (round === 1) {
              return round + " foot";
            } else {
              return round + " feet";
            }
          } else {
            const round = Math.round(value);
            if (round === 1) {
              return round + " meter";
            } else {
              return round + " meters";
            }
          }
        },
        handleWindChange: (value, unit) => {
          if (unit === "ms") {
            return (value * 0.277778).toFixed(1) + " m/s";
          } else if (unit === "mph") {
            return (value * 0.621371).toFixed(1) + " mph";
          } else if (unit === "kn") {
            return (value * 0.539957).toFixed(1) + " knots";
          } else {
            return value.toFixed(1) + " km/h";
          }
        },
      }),
      {
        name: "soleil_weather",
        partialize: (state) => ({
          weatherCoords: state.weatherCoords,
          weatherLoc: state.weatherLoc,
        }),
      }
    )
  )
);
