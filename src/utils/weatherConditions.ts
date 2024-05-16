export const weatherConditions: WeatherConditionProps[] = [
  { id: 0, description: "Clear", icon: "clear-day", icon2: "clear-night" },
  {
    id: 1,
    description: "Mostly Clear",
    icon: "clear-day",
    icon2: "clear-night",
  },
  {
    id: 2,
    description: "Partly Cloudy",
    icon: "cloudy-2-day",
    icon2: "cloudy-2-night",
  },
  { id: 3, description: "Cloudy", icon: "cloudy" },
  { id: 45, description: "Fog", icon: "fog" },
  { id: 48, description: "Freezing Fog", icon: "fog" },
  { id: 51, description: "Light Drizzle", icon: "rainy-1" },
  { id: 53, description: "Drizzle", icon: "rainy-1" },
  { id: 55, description: "Heavy Drizzle", icon: "rainy-1" },
  { id: 56, description: "Light Freezing Drizzle", icon: "rainy-3" },
  { id: 57, description: "Freezing Drizzle", icon: "rainy-3" },
  { id: 61, description: "Light Rain", icon: "rainy-2" },
  { id: 63, description: "Rain", icon: "rainy-2" },
  { id: 65, description: "Heavy Rain", icon: "rainy-3" },
  { id: 66, description: "Light Freezing Rain", icon: "rainy-3" },
  { id: 67, description: "Freezing Rain", icon: "rainy-3" },
  { id: 71, description: "Light Snow", icon: "snowy-1" },
  { id: 73, description: "Snow", icon: "snowy-2" },
  { id: 75, description: "Heavy Snow", icon: "snowy-3" },
  { id: 77, description: "Snow Grains", icon: "snowy-1" },
  { id: 80, description: "Light Rain Shower", icon: "rainy-2" },
  { id: 81, description: "Rain Shower", icon: "rainy-3" },
  { id: 82, description: "Heavy Rain Shower", icon: "rainy-3" },
  { id: 85, description: "Snow Shower", icon: "snowy-2" },
  { id: 86, description: "Heavy Snow Shower", icon: "snowy-3" },
  { id: 95, description: "Thunderstorm", icon: "thunderstorms" },
  { id: 96, description: "Hailstorm", icon: "thunderstorms" },
  { id: 99, description: "Heavy Hailstorm", icon: "thunderstorms" },
];

export const windDirections = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
  "N",
];

export const getAQICondition = (aqi: number) => {
  if (aqi >= 0 && aqi <= 19) {
      return "Excellent";
  } else if (aqi >= 20 && aqi <= 49) {
      return "Fair";
  } else if (aqi >= 50 && aqi <= 99) {
      return "Poor";
  } else if (aqi >= 100 && aqi <= 149) {
      return "Unhealthy";
  } else if (aqi >= 150 && aqi <= 249) {
      return "Severe";
  } else {
      return "Dangerous";
  }
}

export const getVisibilityPercentage = (visibility: number) => {
  const maxVisibility = 24140;
  const percentage = (visibility / maxVisibility) * 100;
  return Math.round(percentage) + "%";
}

export const getUvCondition = (uv: number) => {
  const uvIndexExtremeness = [
    { index: 0, level: 'Low', description: 'Minimal sun protection required.' },
    { index: 1, level: 'Low', description: 'Minimal sun protection required.' },
    { index: 2, level: 'Low', description: 'Minimal sun protection required.' },
    { index: 3, level: 'Moderate', description: 'Wear sunscreen, protective clothing, and sunglasses.' },
    { index: 4, level: 'Moderate', description: 'Wear sunscreen, protective clothing, and sunglasses.' },
    { index: 5, level: 'Moderate', description: 'Wear sunscreen, protective clothing, and sunglasses.' },
    { index: 6, level: 'High', description: 'Take extra precautions. Protect your skin and eyes.' },
    { index: 7, level: 'High', description: 'Take extra precautions. Protect your skin and eyes.' },
    { index: 8, level: 'Very High', description: 'Avoid being outside during midday hours. Apply sunscreen generously.' },
    { index: 9, level: 'Very High', description: 'Avoid being outside during midday hours. Apply sunscreen generously.' },
    { index: 10, level: 'Very High', description: 'Avoid being outside during midday hours. Apply sunscreen generously.' },
    { index: 11, level: 'Extreme', description: 'Take all precautions. Avoid being outside during midday hours.' },
  ];
  const index = Math.ceil(uv)
  const uvLevel = uvIndexExtremeness.find(item => item.index === index);
  return uvLevel ? `(${uvLevel.level})` : null;

}

export const fetchIcon = (id: number, isDay: 1 | 0): string => {
  const condition = weatherConditions.find(
    (code: WeatherConditionProps) => code.id === id
  );
  if (condition) {
    if (isDay === 0) {
      return condition.icon2 ? condition.icon2 : condition.icon;
    } else {
      return condition.icon;
    }
  } else {
    return "clear-day";
  }
};
