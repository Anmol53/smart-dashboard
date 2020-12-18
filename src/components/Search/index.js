import React, { useState, useEffect } from "react";
import "./styles.css";

export default function Search(props) {
  const [search, setSearch] = useState("");
  const changeText = (e) => {
    setSearch(e.target.value);
  };
  const keyPressed = (event) => {
    if (event.keyCode === 13) {
      window.open(`https://www.google.com/search?q=${search}`, "_self");
      setSearch("");
    }
  };
  useEffect(() => {
    const textEle = document.querySelector(".search-text");
    textEle.addEventListener("keydown", keyPressed);
    return () => {
      textEle.removeEventListener("keydown", keyPressed);
    };
  });
  return (
    <div className={`search-main ${props.className}`}>
      <i className="fas fa-search search-icon-1"></i>
      <input
        className="search-text"
        type="text"
        autoComplete="off"
        placeholder="Search Google"
        onChange={changeText}
        value={search}
      />
      <i className="fab fa-google search-icon-2"></i>
    </div>
  );
}
