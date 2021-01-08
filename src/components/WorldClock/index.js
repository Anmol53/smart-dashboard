import React, { useState, useEffect } from "react";
import Modal from ".././Modal";
import Clock from ".././Clock";
import "./styles.css";
export default function WorldClock(props) {
  const [location, setLocation] = useState("");
  const [blink, setBlink] = useState("");
  const [value, setValue] = useState(new Date());
  const [locations, setLocations] = useState([]);
  // TODO: CORS policy ¯\_(ツ)_/¯
  useEffect(() => {
    fetch("http://worldtimeapi.org/api/timezone/")
      .then((r) => r.json())
      .then((r) => setLocations(r));
  });
  useEffect(() => {
    fetch(`http://worldtimeapi.org/api/timezone/${location}`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        setValue(new Date(r.datetime));
      });
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
          placeholder="Choose Location"
        />
        <datalist id="location">
          {locations.map((opt) => {
            return <option>{opt}</option>;
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
        <Clock className="worldclock-result" date={new Date(value)} />
      </div>
    </Modal>
  );
}
