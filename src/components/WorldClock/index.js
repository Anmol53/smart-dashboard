import React, { useState, useEffect } from "react";
import Modal from ".././Modal";
import Clock from ".././Clock";
import "./styles.css";
import moment from "moment";
import momentTZ from "moment-timezone";
import timezones from "../../Data/timezone.js";

export default function WorldClock(props) {
  const [location, setLocation] = useState("Etc/UTC");
  const [blink, setBlink] = useState("");
  const [value, setValue] = useState(moment(new Date()));
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    setLocations(timezones);
  }, []);
  useEffect(() => {
    const momentDate = momentTZ(new Date());
    setValue(moment(momentDate.tz(location)));
  }, [location]);
  return (
    <Modal
      // isTriggered={triggerHandler}
      trigger="World Clock"
      className="worldclock-main"
      triggerStyle={props.triggerStyle}
    >
      <h1 className="worldclock-heading">
        <span style={{ fontSize: "3.5rem", color: "#bd6d12" }}>W</span>
        orld Clock
      </h1>
      <div className="worldclock-content">
        <input
          type="text"
          list="location"
          id="location-inp"
          className="worldclock-input"
          autoFocus
          placeholder={"Choose Location"}
        />
        <datalist id="location">
          {locations.map((opt, idx) => {
            return (
              <option
                value={opt.zone}
                key={`location_option_${idx}_${idx * Math.random()}`}
              >
                {opt.utc_offset}
              </option>
            );
          })}
        </datalist>
        <i
          className={`fas fa-check worldclock-confirm-button ${blink}`}
          onClick={() => {
            const newLocation = document.getElementById("location-inp").value;
            if (newLocation && newLocation.length > 0) {
              setLocation(newLocation);
              setBlink("blink");
              setTimeout(() => {
                setBlink("");
              }, 100);
            }
          }}
        ></i>
        <Clock className="worldclock-result" date={value} />
      </div>
    </Modal>
  );
}
