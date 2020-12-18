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
  const getTime = () => {
    const currTime = value;
    let hours = currTime.getHours();
    const minutes = currTime.getMinutes();
    // const seconds = currTime.getSeconds();
    const amOrPm = hours >= 12 ? "PM" : "AM";
    hours = hours > 12 ? hours - 12 : hours;
    const hoursString = padToTwoDigits(hours);
    const minutesString = padToTwoDigits(minutes);
    // const secondsString = padToTwoDigits(seconds);
    return `${hoursString}:${minutesString} ${amOrPm}`;
  };
  const getDay = () => {
    const currTime = value;
    const day = currTime.getDate();
    const month = monthInWord(currTime.getMonth());
    const year = currTime.getFullYear();
    const weekDay = weekDayInWord(currTime.getDay());
    return `${weekDay}, ${month} ${day}, ${year}`;
  };

  const padToTwoDigits = (num) => {
    return `${num < 10 ? "0" : ""}${num}`;
  };

  const weekDayInWord = (d) => {
    switch (d) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
    }
  };

  const monthInWord = (d) => {
    switch (d) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
    }
  };
  return (
    <div className={`clock-main ${props.className}`}>
      <span className="clock-time">{getTime()}</span>
      <span className="clock-day">{getDay()}</span>
    </div>
  );
}
