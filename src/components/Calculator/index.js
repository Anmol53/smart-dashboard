import React, { useState, useEffect } from "react";
import "./styles.css";
import Modal from ".././Modal";
export default function Calculator(props) {
  let paraCount = 0;
  let resultFlag = true;
  let result = 0;
  function inp(c) {
    const currDis = document.getElementById("iODisplay");
    const mainDis = document.getElementById("display");
    if (resultFlag) {
      mainDis.innerText = "";
      currDis.value = result;
      resultFlag = false;
    }
    if (c === "(") {
      paraCount++;
      if (isClosingPara()) {
        mainDis.innerText = mainDis.innerText + "×";
      }
      if (currDis.value === "0") {
        mainDis.innerText = mainDis.innerText + c;
      } else if (isNaN(currDis.value)) {
        mainDis.innerText = mainDis.innerText + currDis.value + c;
      } else {
        mainDis.innerText = mainDis.innerText + currDis.value + "×" + c;
      }
      currDis.value = "0";
    } else if (c === ")") {
      if (paraCount <= 0) {
        return;
      }
      if (!isNaN(currDis.value)) {
        if (isClosingPara()) {
          mainDis.innerText = mainDis.innerText + "×" + currDis.value + c;
        } else {
          mainDis.innerText = mainDis.innerText + currDis.value + c;
        }
        paraCount--;
      }
      currDis.value = "0";
    } else if (isOperator(c)) {
      if (!isNaN(currDis.value)) {
        if (isClosingPara()) {
          mainDis.innerText = mainDis.innerText + "×" + currDis.value;
        } else {
          mainDis.innerText = mainDis.innerText + currDis.value;
        }
      }
      currDis.value = c;
    } else {
      if (isNaN(currDis.value)) {
        mainDis.innerText = mainDis.innerText + currDis.value;
        currDis.value = "0";
      }
      addCharacterToDisplay(c);
    }
  }

  function isClosingPara() {
    const mainDis = document.getElementById("display");
    return mainDis.innerText.charAt(mainDis.innerText.length - 1) === ")"
      ? true
      : false;
  }

  function addCharacterToDisplay(c) {
    const disp = document.getElementById("iODisplay");
    disp.value = disp.value === "0" ? c : disp.value + c;
  }

  function clearIODisplay() {
    result = 0;
    document.getElementById("iODisplay").value = "0";
  }

  function clearMainDisplay() {
    paraCount = 0;
    result = 0;
    clearIODisplay();
    document.getElementById("display").innerText = "";
  }

  function backspace() {
    const currDis = document.getElementById("iODisplay");
    currDis.value = currDis.value.substring(0, currDis.value.length - 1);
    if (currDis.value.length === 0) {
      currDis.value = "0";
    }
  }

  function calc() {
    const currDis = document.getElementById("iODisplay");
    const mainDis = document.getElementById("display");
    if (!isNaN(currDis.value) && currDis.value !== "0") {
      if (isClosingPara()) {
        mainDis.innerText = mainDis.innerText + "×" + currDis.value;
      } else {
        mainDis.innerText = mainDis.innerText + currDis.value;
      }
      currDis.value = "0";
    }
    while (paraCount-- > 0) {
      mainDis.innerText = mainDis.innerText + ")";
    }
    const eq = mainDis.innerText;
    result = evaluateEquation(eq);
    currDis.value = "= " + result;
    resultFlag = true;
  }

  const isOperator = (c) => {
    if (c === "÷" || c === "×" || c === "+" || c === "-") {
      return true;
    }
    return false;
  };

  const evaluateEquation = (eq) => {
    let newEq = "";
    for (let i = 0; i < eq.length; i++) {
      if (eq.charAt(i) === "×") {
        newEq += "*";
      } else if (eq.charAt(i) === "÷") {
        newEq += "/";
      } else {
        newEq += eq.charAt(i);
      }
    }
    return eval(newEq);
  };

  const keyPressed = (event) => {
    let c = event.key;
    if (c === "Backspace") {
      backspace();
    } else if (c === "Enter") {
      calc();
    } else if (c >= "0" && c <= "9") {
      inp(c);
    } else if (c === "(" || c === ")" || c === "." || c === "+" || c === "-") {
      inp(c);
    } else if (c === "/") {
      inp("÷");
    } else if (c === "*") {
      inp("×");
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyPressed);
    return () => {
      document.removeEventListener("keydown", keyPressed);
    };
  }, []);

  return (
    <Modal
      trigger="Calculator"
      className="calculator-main"
      triggerStyle={props.triggerStyle}
    >
      <h1 className="calculator-heading">
        <span style={{ fontSize: "3.5rem", color: "#bd6d12" }}>C</span>
        alculator
      </h1>
      <div className="grid">
        <div id="display" className="input"></div>
        <input
          id="iODisplay"
          className="iODisplay"
          type="text"
          value="0"
          readonly="readonly"
        />
        <button type="button" className="btn btn-sym" onClick={() => inp("(")}>
          (
        </button>
        <button type="button" className="btn btn-sym" onClick={() => inp(")")}>
          )
        </button>
        <button type="button" className="btn btn-sym" onClick={clearIODisplay}>
          CE
        </button>
        <button
          type="button"
          className="btn btn-sym"
          onClick={clearMainDisplay}
        >
          AC
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("7")}>
          7
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("8")}>
          8
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("9")}>
          9
        </button>
        <button type="button" className="btn btn-sym" onClick={() => inp("÷")}>
          &divide;
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("4")}>
          4
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("5")}>
          5
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("6")}>
          6
        </button>
        <button type="button" className="btn btn-sym" onClick={() => inp("×")}>
          &times;
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("1")}>
          1
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("2")}>
          2
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("3")}>
          3
        </button>
        <button type="button" className="btn btn-sym" onClick={() => inp("-")}>
          -
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp(".")}>
          .
        </button>
        <button type="button" className="btn btn-num" onClick={() => inp("0")}>
          0
        </button>
        <button type="button" className="btn btn-sym" onClick={backspace}>
          <i className="fas fa-backspace" style={{ fontSize: "1.3rem" }}></i>
        </button>
        <button type="button" className="btn btn-sym" onClick={() => inp("+")}>
          +
        </button>
        <button type="button" className="btn btn-equals" onClick={calc}>
          =
        </button>
      </div>
    </Modal>
  );
}
