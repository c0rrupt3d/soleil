import { useWeatherStore } from "@/store/weatherStore";
import IconLoader from "../iconLoader";
import { useShallow } from "zustand/react/shallow";
import { useCallback, useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { fetchIcon, weatherConditions } from "@/utils/weatherConditions";
import { mainAnim } from "@/utils/anim";

function CurrentWeather() {
  const [time, setTime] = useState<string>("");

  const { weatherLoading, weatherLoc, weatherData, handleTempChange } =
    useWeatherStore(
      useShallow((state) => ({
        weatherLoading: state.weatherLoading,
        weatherLoc: state.weatherLoc,
        weatherData: state.weatherData,
        setWeatherLoading: state.setWeatherLoading,
        handleTempChange: state.handleTempChange,
      }))
    );

  const { time12, tempUnit } = useSettingsStore(
    useShallow((state) => ({
      time12: state.time12,
      tempUnit: state.tempUnit,
    }))
  );

  const formatter = useCallback(
    (zone: string) => {
      const now = new Date();
      return new Intl.DateTimeFormat("en-GB", {
        timeZone: zone,
        month: "short", // "Jun"
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: time12 === "1", // 12-hour format if "1", 24-hour otherwise
      }).format(now);
    },
    [time12] // Update memoization when `time12` changes
  );

  useEffect(() => {
    if (weatherData) {
      setTime(formatter(weatherData.timezone));
    }
  }, [weatherData, time12]);

  return (
    <>
      <div className=" rounded-xl flex flex-col items-center justify-center h-full w-full">
        <div className="text-4xl space-y-1 flex-col text-center font-light proportional-nums flex">
          <div className="flex space-x-2 items-end justify-center">
            {!weatherLoading ? (
              <>
                <motion.div
                  variants={mainAnim}
                  initial="initial"
                  animate="animate"
                >
                  {weatherLoc.name}
                </motion.div>
                <motion.div
                  variants={mainAnim}
                  initial="initial"
                  animate="animate"
                  className="text-lg"
                >
                  {weatherLoc.country_code.toLocaleUpperCase()}
                </motion.div>
              </>
            ) : (
              <Skeleton className="h-10 w-64" />
            )}
          </div>
          {!weatherLoading ? (
            <motion.div
              variants={mainAnim}
              initial="initial"
              animate="animate"
              className="text-base font-normal text-primary"
            >
              {time}{" "}
              <span className="text-xs">
                {weatherData?.timezone_abbreviation}
              </span>
            </motion.div>
          ) : (
            <Skeleton className="self-center h-6 w-28" />
          )}
        </div>
        <div className="w-44 aspect-square flex items-center justify-center rounded-lg">
          {!weatherLoading ? (
            <motion.div
              variants={mainAnim}
              initial="initial"
              animate="animate"
              className="flex w-full"
            >
              <IconLoader
                type="meteo-lottie"
                code={
                  weatherData
                    ? fetchIcon(
                        weatherData.current.weather_code,
                        weatherData.current.is_day
                      )
                    : ""
                }
              />
            </motion.div>
          ) : (
            <Skeleton className="h-32 w-32 mt-4" />
          )}
        </div>
        <div className="col-span-1 row-span-1 items-center py-2 flex flex-col space-y-1 justify-center">
          <div className="flex flex-col w-full items-center justify-center">
            {!weatherLoading && weatherData ? (
              <motion.div
                variants={mainAnim}
                initial="initial"
                animate="animate"
                className="text-6xl font-light proportional flex"
              >
                {handleTempChange(weatherData.current.temperature_2m, tempUnit)}
              </motion.div>
            ) : (
              <Skeleton className=" h-16 w-36" />
            )}
          </div>
          <div className="flex flex-col items-center font-light w-full text-center mt-2">
            {!weatherLoading && weatherData ? (
              <motion.div
                variants={mainAnim}
                initial="initial"
                animate="animate"
                className="text-xl font-light "
              >
                Feels like{" "}
                {handleTempChange(
                  weatherData.current.apparent_temperature,
                  tempUnit
                )}
                ,
                <span className="text-primary font-normal">
                  {" "}
                  {
                    weatherConditions.find(
                      (code: WeatherConditionProps) =>
                        code.id === weatherData?.current.weather_code
                    )?.description
                  }
                </span>
              </motion.div>
            ) : (
              <Skeleton className="h-8 w-44" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather;
