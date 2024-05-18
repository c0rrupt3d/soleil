import { fetchCurrentAqi, fetchCurrentElevation } from "@/api";
import { useSettingsStore } from "@/store/settingsStore";
import { useWeatherStore } from "@/store/weatherStore";
import {
  getAQICondition,
  getUvCondition,
  getVisibilityPercentage,
  windDirections,
} from "@/utils/weatherConditions";
import {
  AirVent,
  AreaChart,
  CircleGauge,
  Droplets,
  Eye,
  MousePointer2,
  Sun,
  Thermometer,
  Wind,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Skeleton } from "../ui/skeleton";
import WeatherGlance from "./weatherGlance";
import { motion } from "framer-motion";
import WidgetTitle from "../ui/widget-title";

function TodayWeather() {
  const [loading, setLoading] = useState<boolean>(false);

  const anim = {
    initial: { opacity: 0, scale: 1 },
    animate: {
      opacity: 1,
      scale: 1,
    },
  };

  const {
    weatherLoading,
    weatherData,
    handleTempChange,
    handleWindChange,
    weatherCoords,
    weatherAqi,
    weatherElevation,
    setWeatherAqi,
    setWeatherElevation,
    handleElevationChange,
  } = useWeatherStore(
    useShallow((state) => ({
      weatherLoading: state.weatherLoading,
      weatherData: state.weatherData,
      setWeatherLoading: state.setWeatherLoading,
      handleTempChange: state.handleTempChange,
      handleWindChange: state.handleWindChange,
      weatherCoords: state.weatherCoords,
      weatherAqi: state.weatherAqi,
      weatherElevation: state.weatherElevation,
      setWeatherAqi: state.setWeatherAqi,
      setWeatherElevation: state.setWeatherElevation,
      handleElevationChange: state.handleElevationChange,
    }))
  );

  const { tempUnit, windUnit, elevationUnit } = useSettingsStore(
    useShallow((state) => ({
      tempUnit: state.tempUnit,
      windUnit: state.windUnit,
      elevationUnit: state.elevationUnit,
    }))
  );

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const aqi = await fetchCurrentAqi(weatherCoords);
      const elevation = await fetchCurrentElevation(weatherCoords);
      setWeatherAqi(aqi);
      setWeatherElevation(elevation);
      setLoading(false);
    };
    fetch();
  }, [weatherCoords]);

  const getWindSymbol = (degrees: number) => {
    const index = Math.round(degrees / 22.5);
    return windDirections[index % 16];
  };

  return (
    <>
      {!weatherLoading && !loading ? (
        <motion.div
          className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 w-full items-center justify-start h-full gap-4 text-lg lg:text-2xl"
          variants={anim}
          initial="initial"
          animate="animate"
        >
          <WeatherGlance>
            <WidgetTitle left="Wind">
              <Wind className="h-4" />
            </WidgetTitle>
            <div className="flex items-center justify-center">
              <div className="flex overflow-hidden items-center justify-center">
                <MousePointer2
                  style={{
                    rotate: `${
                      weatherData && weatherData.current.wind_direction_10m
                    }deg`,
                  }}
                  className={`h-4 rotate-45`}
                />
              </div>
              {weatherData &&
                getWindSymbol(weatherData.current.wind_direction_10m)}
            </div>
            <div className="flex">
              {weatherData &&
                handleWindChange(weatherData.current.wind_speed_10m, windUnit)}
            </div>
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="AQI">
              <AirVent className="h-4" />
            </WidgetTitle>
            <div>{weatherAqi && weatherAqi.current.us_aqi}</div>
            <div className="text-base lg:text-lg">
              {"("}
              {weatherAqi && getAQICondition(weatherAqi.current.us_aqi)}
              {")"}
            </div>
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="UV Index">
              <Sun className="h-4" />
            </WidgetTitle>
            <div>
              {weatherData && Math.ceil(weatherData.daily.uv_index_max[0])}
            </div>
            <div className="text-base lg:text-lg">
              {weatherData && getUvCondition(weatherData.daily.uv_index_max[0])}
            </div>
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="Elevation">
              <AreaChart className="h-4" />
            </WidgetTitle>
            {weatherElevation &&
              handleElevationChange(
                weatherElevation.elevation[0],
                elevationUnit
              )}
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="Humidity">
              <Droplets className="h-4" />
            </WidgetTitle>
            {weatherData && weatherData.current.relative_humidity_2m}%
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="Visibility">
              <Eye className="h-4" />
            </WidgetTitle>
            {weatherData &&
              getVisibilityPercentage(weatherData.hourly.visibility[0])}
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="Dew Point">
              <Thermometer className="h-4" />
            </WidgetTitle>
            {weatherData &&
              handleTempChange(weatherData.hourly.dew_point_2m[0], tempUnit)}
          </WeatherGlance>
          <WeatherGlance>
            <WidgetTitle left="Pressure">
              <CircleGauge className="h-4" />
            </WidgetTitle>
            <span>
              {weatherData && Math.round(weatherData.current.surface_pressure)}{" "}
              mBar
            </span>
          </WeatherGlance>
        </motion.div>
      ) : (
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 w-full items-center justify-start h-full gap-4">
          {Array.from({ length: 8 }).map((_: any, index: number) => (
            <Skeleton className="aspect-square w-full" key={index} />
          ))}
        </div>
      )}
    </>
  );
}

export default TodayWeather;
