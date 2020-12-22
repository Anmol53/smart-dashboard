import React, { useState, useEffect } from "react";
import "./styles.css";
import cities from "./current-city-name.js";

export default function Weather(props) {
  const BaseURL = "https://api.openweathermap.org/data/2.5/";
  const APIKey = "7c62e1459cbf463cc4b2e0a5cff45254";
  const [temperature, setTemperature] = useState(0);
  const [icon, setIcon] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [aqi, setAqi] = useState(0);
  const [editable, setEditable] = useState(false);
  useEffect(() => {
    fetch(`${BaseURL}/weather?q=${props.city}&appid=${APIKey}&units=metric`)
      .then((r) => r.json())
      .then((r) => {
        if (r.cod !== 200) {
          throw new Error("Invalid City");
        }
        props.setCity(r.name);
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
      })
      .catch(() => {
        setTemperature("NA");
        setIcon("");
        setAqi("NA");
      });
  }, [props, lat, lon]);

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
      <span className="weather-city">
        {editable ? (
          <>
            <input type="text" list="city" id="city-inp" />
            <datalist id="city" className="weather-city-list">
              {cities.cities.map((cityName) => {
                return <option>{cityName}</option>;
              })}
            </datalist>
            <i
              className="fas fa-check weather-city-check"
              onClick={() => {
                const newCity = document.getElementById("city-inp").value;
                if (newCity && newCity.length > 0) {
                  props.setCity(newCity);
                }
                setEditable(false);
              }}
            ></i>
          </>
        ) : (
          <>
            {props.city}
            <i
              className="far fa-edit weather-city-edit"
              onClick={() => {
                setEditable(true);
              }}
            ></i>
          </>
        )}
      </span>

      <span className="weather-aqi">{`Air Quality Index: ${aqi}`}</span>
    </div>
  );
}
