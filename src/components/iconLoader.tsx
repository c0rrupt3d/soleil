import React, { useEffect, useState } from "react";

// {
//   "clear-day": [0],
//   "clear-night": [1],
//   "cloudy-2-day": [2],
//   "cloudy-2-night": [],
//   "cloudy": [3],
//   "fog": [45, 48],
//   "rainy-1": [51, 53, 55],
//   "rainy-2": [61, 63, 80],
//   "rainy-3": [65, 66, 67, 81, 82, 56, 57],
//   "snowy-1": [71, 77],
//   "snowy-2": [73, 85],
//   "snowy-3": [75, 86],
//   "thunderstorms": [95, 96, 99]
// }

// {
//   "0": "clear-day",
//   "1": "clear-night",
//   "2": "cloudy-1-day",
//   "3": "cloudy",
//   "45": "fog",
//   "48": "fog",
//   "51": "rainy-1",
//   "53": "rainy-1",
//   "55": "rainy-1",
//   "56": "rainy-3",
//   "57": "rainy-3",
//   "61": "rainy-2",
//   "63": "rainy-2",
//   "65": "rainy-3",
//   "66": "rainy-3",
//   "67": "rainy-3",
//   "71": "snowy-1",
//   "73": "snowy-2",
//   "75": "snowy-3",
//   "77": "snowy-1",
//   "80": "rainy-2",
//   "81": "rainy-3",
//   "82": "rainy-3",
//   "85": "snowy-2",
//   "86": "snowy-3",
//   "95": "thunderstorms",
//   "96": "thunderstorms",
//   "99": "thunderstorms"
// }



const fetchIconComponent = async ({
  code,
  type,
}: IconLoaderProps): Promise<string | null> => {
  try {
    let iconModule;
    if (type === "flag") {
      iconModule = await import(`@/assets/flags/${code}.svg`);
    } else if (type === "meteo-lottie") {
      iconModule = await import(`@/assets/meteocons/lottie/${code}.svg`);
    } else if (type === "meteo-static") {
      iconModule = await import(`@/assets/meteocons/static/${code}.svg`);
    } else {
      throw new Error("Unknown type");
    }
    return iconModule.default;
  } catch (error) {
    console.error(`Error loading image`, error);
    return null;
  }
};

// Component to load and render the SVG as an image
const IconLoader: React.FC<IconLoaderProps> = ({ code, type }) => {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadFlag = async () => {
      const result = await fetchIconComponent({ code, type });
      setSrc(result);
    };

    loadFlag();
  }, [code]);

  if (src === null) {
    return null;
  }

  return <img loading="lazy" height={"100%"} width={"100%"} src={src} />;
};

export default IconLoader;
