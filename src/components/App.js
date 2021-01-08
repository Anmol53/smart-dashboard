import React, { useState, useEffect } from "react";
import publicIp from "public-ip";
import "./App.css";
import Calculator from "./Calculator";
import Clock from "./Clock";
import GroupTabs from "./GroupTabs";
import NewsFeed from "./NewsFeed";
import Notes from "./Notes";
import Search from "./Search";
import Settings from "./Settings";
import SocialFeed from "./SocialFeed";
import Todo from "./Todo";
import Weather from "./Weather";
import WorldClock from "./WorldClock";

function App() {
  const [city, setCity] = useState("Bhopal");
  const [userName, setUserName] = useState("Anmol");
  const [country, setCountry] = useState({
    name: "India",
    alpha2Code: "in",
  });
  const [ip, setIp] = useState("");
  const currentCity = () => {
    if (!city || city.length < 1) {
      fetch(
        // TODO: CORS policy and remove default city Bhopal
        `http://api.ipstack.com/${ip}?access_key=f8f338188b7745fe9031839a224e2209`
      )
        .then((r) => r.json())
        .then((r) => {
          console.log(r);
          setCity(r.city);
        });
    }
  };

  useEffect(() => {
    const getClientIp = async () =>
      await publicIp.v4({
        fallbackUrls: ["https://ifconfig.co/ip"],
      });
    getClientIp().then((res) => {
      setIp(res);
      currentCity();
    });
    return () => {};
  }, []);
  return (
    <div className="app">
      <div className="app-head">
        <div className="app-nav-1">
          <Settings
            city={city}
            country={country}
            userName={userName}
            setCity={setCity}
            setCountry={setCountry}
            setUserName={setUserName}
          />
          <GroupTabs />
        </div>
        <Clock className="app-clock" date={new Date()} />
        <div className="app-nav-2">
          <Calculator triggerStyle="app-nav-btn" />
          <WorldClock triggerStyle="app-nav-btn" />
        </div>
        <Weather className="app-weather" city={city} setCity={setCity} />
      </div>
      <div className="app-main">
        <span />
        <div className="app-center">
          <h1>{`Hey ${userName}!`}</h1>
          <Search className="app-search" />
        </div>
        <span />
        <div className="app-todo">
          <Todo />
        </div>
        <div className="app-feed">
          <NewsFeed countryCode={country.alpha2Code} />
          <SocialFeed />
        </div>
        <div className="app-todo">
          <Notes />
        </div>
      </div>
    </div>
  );
}

export default App;
