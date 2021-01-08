import React, { useState, useEffect } from "react";
import "./styles.css";

export default function GroupTabs(props) {
  const [tabs, setTabs] = useState([]);
  const [count, setCount] = useState(0);
  const [insertMode, setInsertMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const addLink = (link, tab_idx) => {
    console.log("in addLink tabs : ", tabs);
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs[tab_idx].links.push(link);
    setTabs(tempTabs);
  };
  const removeLink = (link_idx, tab_idx) => {
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs[tab_idx].links.splice(link_idx, 1);
    setTabs(tempTabs);
  };
  const updateLink = (link, link_idx, tab_idx) => {
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs[tab_idx].links[link_idx] = link;
    setTabs(tempTabs);
  };
  const renameTab = (name, tab_idx) => {
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs[tab_idx].name = name;
    setTabs(tempTabs);
  };
  const createTab = (name) => {
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs.push({ name: name, links: [] });
    setTabs(tempTabs);
  };
  const removeTab = (tab_idx) => {
    const tempTabs = JSON.parse(JSON.stringify(tabs));
    tempTabs.splice(tab_idx, 1);
    setTabs(tempTabs);
  };
  return (
    <div className="setting-grouptabs">
      {tabs.map((tab, idx) => {
        return (
          <div>
            <span>{tab.name}</span>
            <i
              className="far fa-edit"
              onClick={() => {
                renameTab("First");
              }}
            ></i>
            <i
              className="fas fa-trash"
              onClick={() => {
                removeTab(idx);
              }}
            ></i>
            <ul>
              {tab.links.map((link) => {
                return <li>{link}</li>;
              })}
            </ul>
          </div>
        );
      })}
      {count <= 3 &&
        (insertMode ? (
          <>
            <input
              type="text"
              id="grouptabs-name-inp"
              className="grouptabs-input"
              autoFocus
            />
            <i
              className="fas fa-check general-confirm-button"
              onClick={() => {
                const tabName = document.getElementById("grouptabs-name-inp")
                  .value;
                if (tabName && tabName.length > 0) {
                  if (tabName.length <= 12) {
                    createTab(tabName);
                  } else {
                    setErrorMsg(
                      "Group Tab name can be of Maximum 12 Characters"
                    );
                  }
                }
                setInsertMode(false);
              }}
            ></i>
          </>
        ) : (
          <button
            className="grouptabs-btn grouptabs-add"
            onClick={() => setInsertMode(true)}
          >
            <i className="fas fa-plus"></i>
          </button>
        ))}
      {errorMsg.length > 0 && <span className="error-msg">{errorMsg}</span>}
    </div>
  );
}
