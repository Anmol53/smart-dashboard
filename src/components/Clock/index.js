import React, { useEffect, useState } from "react";
import "./styles.css";
export default function Clock(props) {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
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
