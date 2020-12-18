import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Weather(props) {
  const BaseURL = "https://api.openweathermap.org/data/2.5/";
  const APIKey = "7c62e1459cbf463cc4b2e0a5cff45254";
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState("");
  const [city, setCity] = useState("bhopal");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [aqi, setAqi] = useState(0);
  useEffect(() => {
    fetch(`${BaseURL}/weather?q=${city}&appid=${APIKey}&units=metric`)
      .then((r) => r.json())
      .then((r) => {
        setCity(r.name);
        setTemperature(parseInt(r.main.temp));
        setIcon(getWeatherIcon(r.weather[0].id));
        setLat(r.coord.lat);
        setLon(r.coord.lon);
      })
      .then(() => {
        fetch(`${BaseURL}/air_pollution?lat=${lat}&lon=${lon}&appid=${APIKey}`)
          .then((r) => r.json())
          .then((r) => {
            setAqi(r.list[0].components.pm2_5);
          });
      });
  }, [city, lat, lon]);

  const getWeatherIcon = (condition) => {
    if (condition < 300) {
      return "🌩";
    } else if (condition < 400) {
      return "🌧";
    } else if (condition < 600) {
      return "☔️";
    } else if (condition < 700) {
      return "☃️";
    } else if (condition < 800) {
      return "🌫";
    } else if (condition === 800) {
      return "☀️";
    } else if (condition <= 804) {
      return "☁️";
    } else {
      return "🤷‍";
    }
  };

  return (
    <div className={`weather-main ${props.className}`}>
      <span className="weather-icon">{icon}</span>
      <span className="weather-temp">{`${temperature}°`}</span>
      <span className="weather-city">{city}</span>
      <span className="weather-aqi">{`Air Quality Index: ${aqi}`}</span>
    </div>
  );
}
