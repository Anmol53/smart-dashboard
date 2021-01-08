import React, { useState } from "react";
import Modal from ".././Modal";
import "./styles.css";
export default function Clock(props) {
  return (
    <>
      <Modal trigger="Group Tab 1" className="" triggerStyle="app-nav-btn" />
      <Modal trigger="Group Tab 2" className="" triggerStyle="app-nav-btn" />
      <Modal trigger="Group Tab 3" className="" triggerStyle="app-nav-btn" />
    </>
  );
}
