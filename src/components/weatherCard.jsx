import React, { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { BiWind } from "react-icons/bi";
import { LuWaves } from "react-icons/lu";
import { HiSun } from "react-icons/hi";
import { PiCloudSunFill } from "react-icons/pi";

const API = "8840d1e8cfa1a535de3bcda96850af5e";
const weatherCard = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [city, setCity] = useState("");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [weatherData, setWeatherData] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [search, setSearch] = useState(false);

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
      );
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setSearch(true);
    } catch (error) {
      console.log("Error fetching weather data", error);
      setWeatherData(null);
      setSearch(true);
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (city && search) {
      fetchWeatherData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, search]);

  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 mt-10 p-2 w-[400px] h-[320px] pt-4">
      <div className="flex flex-row justify-between items-center bg-white rounded-2x1 pl-2 pr-2">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="rounded-2x1 outline-none p-2"
          placeholder="Enter City Name"
        />
        <button onClick={fetchWeatherData}>
          <FaSearchLocation className="" />
        </button>
      </div>

      {search && (
        <div>
          {weatherData ? (
            <div className="text-white">
              <div className="flex flex-col items-center text-5xl mt-5">
                {(weatherData?.main?.temp - 273.15)?.toFixed(2)}°C
              </div>
              <div className="flex flex-col items-center mt-4">
                {weatherData?.name}
              </div>

              <div className="flex flex-row justify-between mt-10 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <BiWind />
                  <p>{(weatherData?.wind?.speed * 3.6)?.toFixed(2)} kmph</p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <LuWaves />
                  <p>{weatherData?.main?.humidity?.toFixed(2)} kmph</p>
                </div>
              </div>

              <div className="flex flex-row justify-between mt-4 text-xl">
                <div className="flex flex-row items-center gap-x-3">
                  <HiSun />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunrise * 1000
                    )?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <div className="flex flex-row items-center gap-x-3">
                  <PiCloudSunFill />
                  <p>
                    {new Date(
                      weatherData?.sys?.sunset * 1000
                    )?.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>Weather Data Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default weatherCard;
