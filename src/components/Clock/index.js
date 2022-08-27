import moment from "moment";
import React, { useEffect, useState } from "react";
import "./styles.css";
export default function Clock(props) {
  const [value, setValue] = useState(props.date);

  useEffect(() => {
    setValue(moment(props.date));
  }, [props]);

  useEffect(() => {
    const interval = setInterval(() => {
      value.add(1, "s");
      setValue(moment(value));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [value]);

  return (props.type && props.type === "detailed") ? (
    <div className={`clock-main clock-detailed ${props.className}`}>
      {props.additionalDetail && <span  className="clock-additional-detail">{props.additionalDetail}</span>}
      <span className="clock-time">{value.format("hh:mm A")}</span>
      <span className="clock-day">{value.format("dddd, MMMM DD, YYYY")}</span>
      <span className="clock-zone">Zone Offset: {value.format("Z")}</span>
    </div>
  ) : (
    <div className={`clock-main ${props.className}`}>
      <span className="clock-time">{value.format("hh:mm A")}</span>
      <span className="clock-day">{value.format("dddd, MMMM DD, YYYY")}</span>
    </div>
  );
}
