import React, { useState, useEffect } from "react";
import publicIp from "public-ip";
import { createApi } from "unsplash-js";
import "./App.css";
import Calculator from "./Calculator";
import Clock from "./Clock";
import GroupTabs from "./GroupTabs";
import NewsFeed from "./NewsFeed";
import Search from "./Search";
import Settings from "./Settings";
import SocialFeed from "./SocialFeed";
import Todo from "./Todo";
import Notes from "./Notes";
import Weather from "./Weather";
import WorldClock from "./WorldClock";

const unsplash = createApi({
  accessKey: "hZEsU_wMKAFATL4tabmb97_pZAMFI3CI8zAS412-A3g",
});

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
  const [todoVissible, setTodoVissible] = useState(false);
  const [noteVissible, setNoteVissible] = useState(false);
  const [newsVissible, setNewsVissible] = useState(true);

  const [bgURL, setBgURL] = useState(null);
  useEffect(() => {
    console.log("useEffect of bg");
    unsplash.photos
      .getRandom({
        orientation: "landscape",
        count: 1,
        query: "nature",
        collections: "827743, 1457745",
      })
      .then((res) => setBgURL(res.response[0].urls.regular))
      .catch((e) => console.log("something went wrong!"));
  }, []);

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
    <div
      className="bg-wrapper"
      style={{
        backgroundImage: `url(${bgURL})`,
      }}
    >
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
          <div className="app-bottom">
            {todoVissible && <Todo />}
            <span
              className="left-bottom-link"
              onClick={() => setTodoVissible(!todoVissible)}
            >
              Todo
            </span>
          </div>
          <div className="app-feed">
            <div className="app-bottom">
              {newsVissible && <NewsFeed countryCode={country.alpha2Code} />}
              <span
                className="center-bottom-link"
                onClick={() => setNewsVissible(!newsVissible)}
              >
                NEWS
              </span>
            </div>
          </div>
          <div className="app-bottom">
            {noteVissible && <Notes />}
            <span
              className="right-bottom-link"
              onClick={() => setNoteVissible(!noteVissible)}
            >
              Notes
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
