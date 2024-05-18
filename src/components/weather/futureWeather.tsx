import { useCallback, useEffect, useState } from "react";
import IconLoader from "../iconLoader";
import { useSettingsStore } from "@/store/settingsStore";
import { useWeatherStore } from "@/store/weatherStore";
import { useShallow } from "zustand/react/shallow";
import WeatherCard from "./weatherCard";
import WidgetTitle from "../ui/widget-title";
import { Calendar, Droplet } from "lucide-react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { delayAnim, mainAnim } from "@/utils/anim";
import { motion } from "framer-motion";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { fetchIcon, weatherConditions } from "@/utils/weatherConditions";

function FutureWeather() {
  const [futureData, setFutureData] = useState<DailyWeather | null>(null);

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
        month: "short", // "Jun"
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: time12 === "1", // 12-hour format if "1", 24-hour otherwise
      });
    },
    [time12] // Update memoization when `time12` changes
  );

  useEffect(() => {
    if (weatherData) {
      setFutureData(weatherData.daily);
    }
  }, [weatherData]);
  return (
    <>
      {!weatherLoading && futureData ? (
        <motion.div
          variants={mainAnim}
          initial="initial"
          animate="animate"
          className="h-full"
        >
          <WeatherCard className="col-span-5">
            <WidgetTitle left="7-Day Forecast">
              <Calendar className="h-4" />
            </WidgetTitle>
            <ScrollArea className="h-full pb-2 overflow-y-hidden rounded-xl flex w-full justify-between">
              <motion.div
                variants={delayAnim}
                initial="initial"
                animate="animate"
                className="flex flex-col overflow-x-hidden w-full"
              >
                {!weatherLoading && futureData
                  ? futureData.time.map((_: string, index: number) => {
                      return (
                        <>
                          {index === 0 ? null : <Separator />}
                          <motion.div
                            variants={mainAnim}
                            key={index}
                            className="flex justify-between h-24 w-full px-1.5 items-center"
                          >
                            <div className="flex flex-col gap-1 text-lg items-start">
                              <span className="text-start">
                                {index === 0
                                  ? "Today"
                                  : formatter(futureData.time[index])}
                              </span>
                              <span className="font-light text-base">
                                {" "}
                                {
                                  weatherConditions.find(
                                    (code: WeatherConditionProps) =>
                                      code.id === futureData.weather_code[index]
                                  )?.description
                                }
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <div className="flex gap-1">
                                <div className="flex justify-center items-center dark:text-blue-400 text-blue-600 text-lg">
                                  <Droplet className="h-4" />
                                  <span>
                                    {
                                      futureData.precipitation_probability_max[
                                        index
                                      ]
                                    }
                                    {"%"}
                                  </span>
                                </div>
                                <div className=" h-12 aspect-square flex">
                                  <IconLoader
                                    type="meteo-static"
                                    code={fetchIcon(
                                      futureData.weather_code[index],
                                      1
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="flex flex-col text-lg items-end justify-between">
                                <span className="text-primary">
                                  {handleTempChange(
                                    futureData.temperature_2m_max[index],
                                    tempUnit
                                  )}
                                </span>
                                <span className="text-base">
                                  {handleTempChange(
                                    futureData.temperature_2m_min[index],
                                    tempUnit
                                  )}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      );
                    })
                  : null}
              </motion.div>
              <ScrollBar />
            </ScrollArea>
          </WeatherCard>
        </motion.div>
      ) : (
        <Skeleton className="h-[45rem] w-full" />
      )}
    </>
  );
}
export default FutureWeather;
