import React, { useEffect, useState } from "react";
import "./styles.css";

export default function Modal(props) {
  const [show, setShow] = useState(false);
  const [showClass, setShowClass] = useState("modal-container");

  useEffect(() => {
    if (props.setIsVisible) {
      props.setIsVisible(show);
    }
  }, [show]);

  return (
    <>
      {props.icon ? (
        <i
          onClick={(e) => {
            setShow(true);
            props.isTriggered && props.isTriggered(true);
            setShowClass("modal-container in");
          }}
          className={`modal-trigger ${props.trigger} ${props.triggerStyle}`}
        ></i>
      ) : (
        <button
          onClick={(e) => {
            setShow(true);
            props.isTriggered && props.isTriggered(true);
            setShowClass("modal-container in");
          }}
          className={`modal-trigger ${props.triggerStyle}`}
        >
          {props.trigger}
        </button>
      )}
      {show ? (
        <div className={`${showClass}`}>
          <div className="model-center">
            <div className={`modal-content ${props.className}`}>
              <i
                onClick={(e) => {
                  setShowClass("modal-container in out");
                  if (props.closeFunction) {
                    props.closeFunction();
                  }
                  props.isTriggered && props.isTriggered(false);
                  setTimeout(() => setShow(false), 300);
                }}
                className="fas fa-window-close model-close"
              ></i>
              {props.children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
