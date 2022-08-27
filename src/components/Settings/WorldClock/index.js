import React, { useState, useEffect } from "react";
import "./styles.css";
import timezones from "../../../Data/timezone.js";

const getLocalItmes = () => {
  const worldClockLocations = localStorage.getItem("worldClockLocations");

  if (worldClockLocations) {
      return JSON.parse(worldClockLocations);
  }
  return [];
};

export default function WorldClock(props) {
  const [availableLocations, setAvailableLocations] = useState([]);
  const [locations, setLocations] = useState(getLocalItmes());
  const [count, setCount] = useState(0);
  const [insertMode, setInsertMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setAvailableLocations(timezones);
  }, []);

  useEffect(() => {
    setCount(locations.length);
    localStorage.setItem("worldClockLocations", JSON.stringify(locations));
  }, [locations]);

  
  const addLocation = (location) => {
    if (availableLocations.filter((loc) => loc.zone === location).length > 0) {
      setLocations([...locations, location]);
    } else {
      setErrorMsg("Invalid Location Selection");
    }
  };

  const removeLocation = (location_idx) => {
    const tempLocations = JSON.parse(JSON.stringify(locations));
    tempLocations.splice(location_idx, 1);
    setLocations(tempLocations);
  };

  return (
    <div className="setting-worldclock">
      <div className="setting-worldclock-head">
        <h1>World Clock Locations</h1>
        <p>You can add upto 3 world locations.</p>
      </div>
      <div className="setting-worldclock-values">
        {locations.length > 0 && <div>Locations:-</div>}
        {locations.map((location, idx) => {
          return (
            <div
              key={`setting_worldclock_location_${idx}_${idx * Math.random()}`}
            >
              <span>{location}</span>
              <i
                className="fas fa-trash"
                onClick={() => {
                  removeLocation(idx);
                }}
              ></i>
            </div>
          );
        })}
      </div>
      <div>
        {count < 3 &&
          (insertMode ? (
            <>
              <input
                type="text"
                list="location"
                id="setting-worldclock-name-inp"
                className="setting-worldclock-input"
                autoFocus
                placeholder={"Choose Location"}
              />
              <datalist id="location">
                {availableLocations.map((opt, idx) => {
                  return (
                    <option
                      value={opt.zone}
                      key={`setting_location_option_${idx}_${
                        idx * Math.random()
                      }`}
                    >
                      {opt.utc_offset}
                    </option>
                  );
                })}
              </datalist>
              <i
                className="fas fa-check general-confirm-button"
                onClick={() => {
                  const locationName =
                    document.getElementById("setting-worldclock-name-inp").value;
                  addLocation(locationName);
                  setInsertMode(false);
                }}
              ></i>
            </>
          ) : (
            <button
              className="setting-worldclock-add-btn"
              onClick={() => {
                setInsertMode(true);
                setErrorMsg("");
              }}
            >
              Add Location <i className="fas fa-plus"></i>
            </button>
          ))}
      </div>
      {errorMsg.length > 0 ? (
        <div className="error-msg">{errorMsg}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
