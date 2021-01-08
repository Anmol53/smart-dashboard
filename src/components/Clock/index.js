import React, { useEffect, useState } from "react";
import "./styles.css";
export default function Clock(props) {
  const [value, setValue] = useState(props.date);
  useEffect(() => {
    const interval = setInterval(() => {
      value.setSeconds(value.getSeconds() + 1);
      setValue(new Date(value));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [value]);
  return (
    <div className={`clock-main ${props.className}`}>
      <span className="clock-time">
        {value.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })}
      </span>
      <span className="clock-day">
        {value.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          year: "numeric",
          day: "numeric",
        })}
      </span>
    </div>
  );
}
