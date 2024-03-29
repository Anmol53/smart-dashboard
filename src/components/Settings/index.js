import React, { useState } from "react";
import Modal from ".././Modal";
import General from "./General";
import GroupTabs from "./GroupTabs";
import WorldClock from "./WorldClock";
import "./styles.css";

export default function Settings(props) {
  const [active, setActive] = useState("general");
  console.log(active);
  const renderChoosenSetting = () => {
    switch (active) {
      case "general":
        return (
          <General
            city={props.city}
            country={props.country}
            userName={props.userName}
            setCity={props.setCity}
            setCountry={props.setCountry}
            setUserName={props.setUserName}
          />
        );
      case "group_tab":
        return <GroupTabs />;
      case "world_clock":
        return <WorldClock />;
      default:
        <></>;
    }
  };
  return (
    <Modal
      trigger="fas fa-cog"
      className="setting-modal"
      triggerStyle="app-nav-btn"
      icon
    >
      <div className="setting-left-pane">
        <nav
          className={
            active === "general"
              ? "setting-nav setting-nav-active"
              : "setting-nav"
          }
          onClick={() => {
            setActive("general");
          }}
        >
          General
        </nav>
        <nav
          className={
            active === "group_tab"
              ? "setting-nav setting-nav-active"
              : "setting-nav"
          }
          onClick={() => {
            setActive("group_tab");
          }}
        >
          Group Tabs
        </nav>
        <nav
          className={
            active === "world_clock"
              ? "setting-nav setting-nav-active"
              : "setting-nav"
          }
          onClick={() => {
            setActive("world_clock");
          }}
        >
          World Clock
        </nav>
      </div>
      {renderChoosenSetting()}
    </Modal>
  );
}
