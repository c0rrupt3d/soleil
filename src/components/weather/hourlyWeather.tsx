import { useWeatherStore } from "@/store/weatherStore";
import IconLoader from "../iconLoader";
import { useShallow } from "zustand/react/shallow";
import { useCallback, useEffect, useState } from "react";
import { useSettingsStore } from "@/store/settingsStore";
import { fetchIcon } from "@/utils/weatherConditions";
import { Clock, Droplet } from "lucide-react";
import { motion } from "framer-motion";
import { delayAnim, mainAnim } from "@/utils/anim";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Skeleton } from "../ui/skeleton";
import WeatherCard from "./weatherCard";
import WidgetTitle from "../ui/widget-title";

function HourlyWeather() {
  const [hourlyData, setHourlyData] = useState<HourlyWeather | null>(null);

  const { weatherLoading, weatherData, handleTempChange } = useWeatherStore(
    useShallow((state) => ({
      weatherLoading: state.weatherLoading,
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
    (timeString: string) => {
      const date = new Date(timeString);
      return date.toLocaleString("en-GB", {
        hour: "numeric",
        minute: "numeric",
        hour12: time12 === "1",
      });
    },
    [time12]
  );

  const getDayStatus = (currentTime: string) => {
    if (weatherData && currentTime) {
      const sunrise = new Date(weatherData.daily.sunrise[0]);
      const sunset = new Date(weatherData.daily.sunset[0]);
      const time = new Date(currentTime);
      if (time >= sunrise && time <= sunset) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return 1;
    }
  };

  useEffect(() => {
    if (weatherData) {
      setHourlyData(weatherData.hourly);
    }
  }, [weatherData]);

  return (
    <>
      {!weatherLoading && hourlyData ? (
        <motion.div variants={mainAnim} initial="initial" animate="animate">
          <WeatherCard className="">
            <WidgetTitle left="Upcoming Hours">
              <Clock className="h-4" />
            </WidgetTitle>
            <ScrollArea
              type="auto"
              className="pb-3 overflow-y-hidden flex w-full"
            >
              <motion.div
                variants={delayAnim}
                initial="initial"
                animate="animate"
                className="flex overflow-y-hidden w-full"
              >
                {!weatherLoading && hourlyData
                  ? hourlyData.time.map((_: string, index: number) => {
                      if (index === 0) {
                        return null;
                      } else {
                        return (
                          <motion.div
                            variants={mainAnim}
                            key={index}
                            className="flex flex-col h-32 max-h-32 py-0.5 lg:py-1 px-2 sm:px-3 lg:px-0 items-center justify-center text-center"
                          >
                            <div className="font-medium min-h-5 h-5 text-sm">
                              {formatter(hourlyData.time[index])}
                            </div>
                            <div className="h-1/2 lg:h-full aspect-square flex">
                              <IconLoader
                                type="meteo-static"
                                code={fetchIcon(
                                  hourlyData.weather_code[index],
                                  getDayStatus(hourlyData.time[index])
                                )}
                              />
                            </div>
                            <div className="flex flex-col min-h-10 h-10 justify-center items-center">
                              <div className="text-base flex items-center">
                                <div className="flex">
                                  {handleTempChange(
                                    hourlyData.temperature_2m[index],
                                    tempUnit
                                  )}
                                </div>
                              </div>
                              <div className="text-sm justify-center items-center flex dark:text-blue-400 text-blue-600 ">
                                <Droplet className="h-4" />
                                <span>
                                  {hourlyData.precipitation_probability[index]}
                                  {"%"}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      }
                    })
                  : null}
                <ScrollBar orientation="horizontal" />
              </motion.div>
            </ScrollArea>
          </WeatherCard>
        </motion.div>
      ) : (
        <Skeleton className="min-h-40 h-40 w-full" />
      )}
    </>
  );
}

export default HourlyWeather;
