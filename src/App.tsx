import React, { FC, useEffect, useState } from 'react';
import Descriptions from "./Components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";
import "./App.css"
const hotBg: string = require("./assets/hot.jpg");
const coldBg: string = require("./assets/cold.jpg");


interface WeatherData {
  name: string;
  country: string;
  iconURL: string;
  description: string;
  temp: number;
}

const App: FC = () => {
  const [city, setCity] = useState<string>("Paris");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [units, setUnits] = useState<string>("metric");
  const [bg, setBg] = useState<string>(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data: WeatherData = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      const threshold: number = units === "metric" ? 20 : 60;
      if (data.temp <= threshold) setBg(coldBg);
      else setBg(hotBg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = e.currentTarget;
    const currentUnit: string = button.innerText.slice(1);

    const isCelsius: boolean = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input
                onKeyDown={enterKeyPressed}
                type="text"
                name="city"
                placeholder="Enter City..."
              />
              <button onClick={(e) => handleUnitsClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weatherIcon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </div>

            {/* bottom description */}
            <Descriptions weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;