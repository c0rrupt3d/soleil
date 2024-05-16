interface IconLoaderProps {
  code: string;
  type: "flag" | "meteo-static" | "meteo-lottie";
}

interface UnitOptionProps {
  key: string;
  label: string;
}

interface WeatherConditionProps {
  id: number;
  description: string;
  icon: string;
  icon2?: string;
}

interface DropdownSettingsProps {
  options: UnitOptionProps[];
  selected: string;
  onChange: (newSelected: string) => void;
  sr: string;
}

interface ToggleableSettingsProps {
  heading: string;
  settings: {
    name: string;
    options: UnitOptionProps[];
    selected: string;
    setSelected: (value: any) => void;
    sr: string;
  }[];
}

interface ReverseGeoProps {
  type: string;
  geocoding: {
    version: string;
    attribution: string;
    licence: string;
    query: string;
  };
  features: {
    type: string;
    properties: {
      geocoding: {
        place_id: number;
        osm_type: string;
        osm_id: number;
        osm_key: string;
        osm_value: string;
        type: string;
        accuracy: number;
        label: string;
        name?: string;
        city?: string;
        county?: string;
        country_code: string;
        country: string;
        state: string;
        admin?: {
          level16?: string;
          level15?: string;
          level14?: string;
        };
      };
    };
    geometry: {
      type: string; // "Point"
      coordinates: [number, number];
    };
  }[];
}

interface WeatherUnits {
  time: string;
  interval?: string;
  temperature_2m: string;
  relative_humidity_2m?: string;
  apparent_temperature?: string;
  precipitation?: string;
  weather_code: string;
  wind_speed_10m?: string;
  wind_direction_10m?: string;
  surface_pressure: string;
  visibility: string;
  dew_point_2m: string;
  sunrise: string;
  sunset: string;
}

interface CurrentWeather {
  time: number;
  interval: number;
  temperature_2m: number;
  relative_humidity_2m: number;
  apparent_temperature: number;
  precipitation: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  is_day: 1 | 0;
}

interface HourlyWeather {
  time: string[];
  temperature_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  visibility: number[];
  dew_point_2m: number[];
}

interface DailyWeather {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  uv_index_max: number[];
  precipitation_probability_max: number[];
  sunrise: string[];
  sunset: string[];
}

interface WeatherData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: WeatherUnits;
  current: CurrentWeather;
  hourly_units: WeatherUnits;
  hourly: HourlyWeather;
  daily_units: WeatherUnits;
  daily: DailyWeather;
}

interface GeocodeSearch {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation: number;
  feature_code: string;
  country_code: string;
  admin1_id?: number;
  admin2_id?: number;
  admin3_id?: number;
  timezone: string;
  population?: number;
  country_id: number;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
}
[];

interface AqiData {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string;
    interval: string;
    pm10: string;
    pm2_5: string;
    us_aqi: string;
  };
  current: {
    time: string;
    interval: number;
    pm10: number;
    pm2_5: number;
    us_aqi: number;
  };
}

interface ElevationData {
  elevation: number[]
}

type ThemeStoreType = {
  theme: "light" | "dark" | "system";
};

type ThemeStoreAction = {
  setTheme: (value: ThemeStoreType["theme"]) => void;
};

type SettingsStoreType = {
  tempUnit: "cel" | "fah";
  windUnit: "kmh" | "ms" | "mph" | "kn";
  precipUnit: "mm" | "in";
  time12: "1" | "0";
  elevationUnit: "m" | "ft";
};

type SettingsStoreAction = {
  setTempUnit: (value: SettingsStoreType["tempUnit"]) => void;
  setWindUnit: (value: SettingsStoreType["windUnit"]) => void;
  setPrecipUnit: (value: SettingsStoreType["precipUnit"]) => void;
  setTime12: (value: SettingsStoreType["time12"]) => void;
  setElevationUnit: (value: SettingsStoreType["elevationUnit"]) => void;
};

type WeatherStoreType = {
  weatherLoading: boolean;
  weatherData?: WeatherData;
  weatherCoords: {
    lat: number;
    lon: number;
  };
  weatherLoc: {
    name: string;
    country_code: string;
  };
  weatherAqi?: AqiData;
  weatherElevation?: ElevationData;
};

type WeatherStoreAction = {
  setWeatherLoading: (value: WeatherStoreType["weatherLoading"]) => void;
  setWeatherData: (value: WeatherStoreType["weatherData"]) => void;
  setWeatherCoords: (value: WeatherStoreType["weatherCoords"]) => void;
  setWeatherLoc: (value: WeatherStoreType["weatherLoc"]) => void;
  setWeatherAqi: (value: WeatherStoreType["weatherAqi"]) => void;
  setWeatherElevation: (value: WeatherStoreType['weatherElevation']) => void;
  handleTempChange: (
    value: number,
    unit: SettingsStoreType["tempUnit"]
  ) => string;
  handleElevationChange: (
    value: number,
    unit: SettingsStoreType["elevationUnit"]
  ) => string;
  handleWindChange: (
    value: number,
    unit: SettingsStoreType["windUnit"]
  ) => string;
};
