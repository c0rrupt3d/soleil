import CurrentWeather from "./weather/currentWeather";
import FutureWeather from "./weather/futureWeather";
import TodayWeather from "./weather/todayWeather";
import HourlyWeather from "./weather/hourlyWeather";
import { useEffect } from "react";
import { fetchForecast, fetchReverseGeo } from "@/api";
import { useWeatherStore } from "@/store/weatherStore";
import { useShallow } from "zustand/react/shallow";

function Layout() {
  const {
    setWeatherLoading,
    weatherLoc,
    setWeatherLoc,
    weatherCoords,
    setWeatherData,
  } = useWeatherStore(
    useShallow((state) => ({
      weatherLoading: state.weatherLoading,
      weatherData: state.weatherData,
      weatherCoords: state.weatherCoords,
      setWeatherCoords: state.setWeatherCoords,
      weatherLoc: state.weatherLoc,
      setWeatherLoc: state.setWeatherLoc,
      setWeatherData: state.setWeatherData,
      setWeatherLoading: state.setWeatherLoading,
    }))
  );

  useEffect(() => {
    const fetch = async () => {
      setWeatherLoading(true);

      if (weatherLoc.name === "") {
        const loc: ReverseGeoProps = await fetchReverseGeo(weatherCoords);
        setWeatherLoc({
          name: loc.features[0].properties.geocoding.label.split(",")[0].trim(),
          country_code: loc.features[0].properties.geocoding.country_code,
        });
      }

      const data = await fetchForecast(weatherCoords);
      setWeatherData(data);
      setWeatherLoading(false);
    };
    fetch();
  }, [weatherCoords]);

  return (
    <div className="h-full py-12 w-full flex ">
      <div className="container px-4 md:px-8 justify-between grid grid-cols-12 gap-4 h-full relative max-w-screen-xl w-full items-start">
        <div className="mt-10 mb-10 bg-transparent dark:bg-transparent shadow-none border-none col-span-12 min-h-[24rem] ">
          <CurrentWeather />
        </div>
        <div className="flex flex-col-reverse md:flex-col col-span-12 md:col-span-6 lg:col-span-7 gap-4">
          <TodayWeather />
          <div>
            <HourlyWeather />
          </div>
        </div>
        <div className="col-span-12 md:col-span-6 lg:col-span-5 h-fit">
          <FutureWeather />
        </div>
      </div>
    </div>
  );
}

export default Layout;
