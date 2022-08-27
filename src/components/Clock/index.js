import moment from "moment";
import React, { useEffect, useState } from "react";
import "./styles.css";
export default function Clock(props) {
  const [value, setValue] = useState(props.date);

  useEffect(() => {
    const interval = setInterval(() => {
      value.add(1, "s");
      setValue(moment(value));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [value]);
  return (
    <div className={`clock-main ${props.className}`}>
      <span className="clock-time">{value.format("hh:mm A")}</span>
      <span className="clock-day">{value.format("dddd, MMMM DD, YYYY")}</span>
    </div>
  );
}
