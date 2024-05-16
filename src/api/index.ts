const FORECAST_API = "https://api.open-meteo.com/v1/forecast";
const GEO_API = "https://geocoding-api.open-meteo.com/v1/search";
const AIR_API = "https://air-quality-api.open-meteo.com/v1/air-quality";
const REVERSE_GEO_API = "https://nominatim.openstreetmap.org/reverse";
const ELEVATION_API = "https://api.open-meteo.com/v1/elevation"

async function request<T = any>(url: URL, config?: RequestInit) {
  const response = await fetch(url, config);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json() as Promise<T>;
}

export function fetchLocations<T = any>(options: {
  name: string;
  signal: AbortSignal;
}) {
  const { name, signal } = options;
  const newName = name.replace(/\s+/g, " ");

  const url = `${GEO_API}?name=${newName}&count=50&language=en&format=json`;

  return request<T>(new URL(url), { signal });
}

export function fetchForecast<T = any>(options: { lat: number; lon: number }) {
  const { lat, lon } = options;

  const url = `${FORECAST_API}?latitude=${lat}&longitude=${lon}&timezone=auto&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,visibility,precipitation_probability,dew_point_2m,weather_code&daily=weather_code,temperature_2m_max,sunrise,sunset,temperature_2m_min,uv_index_max,precipitation_probability_max&forecast_hours=24&forecast_days=8`;

  return request<T>(new URL(url));
}

export function fetchReverseGeo<T = any>(options: {
  lat: number;
  lon: number;
}) {
  const { lat, lon } = options;

  const url = `${REVERSE_GEO_API}?lat=${lat}&lon=${lon}&format=geocodejson`;
  return request<T>(new URL(url));
}

export function fetchCurrentAqi<T = any>(options: {
  lat: number;
  lon: number;
}) {
  const { lat, lon } = options;

  const url = `${AIR_API}?latitude=${lat}&longitude=${lon}&current=pm10,pm2_5,us_aqi`;
  return request<T>(new URL(url));
}

export function fetchCurrentElevation<T = any>(options: {
  lat: number;
  lon: number;
}) {
  const {lat, lon} = options;

  const url = `${ELEVATION_API}?latitude=${lat}&longitude=${lon}`;
  return request<T>(new URL(url));
}
