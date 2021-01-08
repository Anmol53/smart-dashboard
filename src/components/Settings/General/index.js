import React, { useState, useEffect } from "react";
import "./styles.css";
import cities from "../../Data/current-city-name.js";
import countries from "../../Data/country-name.js";

export default function General(props) {
  const [editableName, setEditableName] = useState(false);
  const [editableCity, setEditableCity] = useState(false);
  const [editableCountry, setEditableCountry] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
    setEditableName(false);
    setEditableCity(false);
    setEditableCountry(false);
  }, []);
  const countryEmoji = (code) => {
    return code
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(char.charCodeAt(0) + 127397)
      );
  };
  return (
    <div className="setting-general">
      <div className="general-labels">
        <label>What will we call you?</label>
        <label>City</label>
        <label>Country</label>
      </div>
      <div className="general-label-values">
        {editableName ? (
          <div className="general-particular-value">
            <input
              type="text"
              id="user-name-inp"
              className="general-input"
              autoFocus
              placeholder={props.userName}
            />
            <i
              className="fas fa-check general-confirm-button"
              onClick={() => {
                const newName = document.getElementById("user-name-inp").value;
                if (newName && newName.length > 0) {
                  if (newName.length <= 20) {
                    props.setUserName(newName);
                  } else {
                    setErrorMsg("Name can be of Maximum 20 Characters");
                  }
                }
                setEditableName(false);
              }}
            ></i>
          </div>
        ) : (
          <span
            className="general-particular-value"
            onClick={() => {
              setErrorMsg("");
              setEditableName(true);
            }}
          >
            {props.userName}
            <i className="far fa-edit"></i>
          </span>
        )}
        {editableCity ? (
          <div className="general-particular-value">
            <input
              type="text"
              list="city"
              id="city-inp"
              className="general-input"
              autoFocus
              placeholder={props.city}
            />
            <datalist id="city" className="">
              {cities.cities.map((cityName) => {
                return <option>{cityName}</option>;
              })}
            </datalist>
            <i
              className="fas fa-check general-confirm-button"
              onClick={() => {
                const newCity = document.getElementById("city-inp").value;
                if (newCity && newCity.length > 0) {
                  props.setCity(newCity);
                }
                setEditableCity(false);
              }}
            ></i>
          </div>
        ) : (
          <span
            className="general-particular-value"
            onClick={() => {
              setEditableCity(true);
            }}
          >
            {props.city}
            <i className="far fa-edit"></i>
          </span>
        )}
        {editableCountry ? (
          <div className="general-particular-value">
            <input
              type="text"
              list="country"
              id="country-inp"
              className="general-input"
              autoFocus
              placeholder={props.country.name}
            />
            <datalist id="country" className="">
              {countries.countries.map((country, id) => {
                return (
                  <option>
                    {`${country.name} ${countryEmoji(country.alpha2Code)}`}{" "}
                  </option>
                );
              })}
            </datalist>
            <i
              className="fas fa-check general-confirm-button"
              onClick={() => {
                let newCountry = document.getElementById("country-inp").value;
                if (newCountry && newCountry.length > 0) {
                  newCountry = newCountry.substr(0, newCountry.length - 5);
                  const cObj = countries.countries.filter(
                    (c) => c.name.toLowerCase() === newCountry.toLowerCase()
                  );
                  if (cObj.length > 0) {
                    props.setCountry(cObj[0]);
                  }
                }
                setEditableCountry(false);
              }}
            ></i>
          </div>
        ) : (
          <span
            className="general-particular-value"
            onClick={() => {
              setEditableCountry(true);
            }}
          >
            {`${props.country.name} ${countryEmoji(props.country.alpha2Code)}`}
            <i className="far fa-edit"></i>
          </span>
        )}
      </div>
      {errorMsg.length > 0 && (
        <span className="error-msg general-error">{errorMsg}</span>
      )}
    </div>
  );
}
