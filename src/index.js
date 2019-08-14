import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import buttons from "./buttons";

const projectName = "JavaScript Calculator";

function Button(props) {
  const button = props.button;

  function handleClick(e) {
    props[button.type](e.target.value);
  }

  return (
    <button
      id={button.id}
      className={button.className}
      value={button.display}
      onClick={handleClick}
    >
      {props.button.display}
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState(0);
  const [buffer, setBuffer] = useState(0);
  const [formula, setFormula] = useState([]);

  useEffect(() => {
    document.title = `${projectName} | jmarcm`;
  });

  function getLastTerm() {
    return formula.slice(-1)[0];
  }

  function handleNumber(value) {
    console.log("buffer in number: ", buffer);
    if (value === "." && buffer === 0) {
      value = "0.";
    }
    //const regex = /^(?:0*)(\d+)|(\d+)|(0)$/gm;
    const regex = /^(?:0*)(-?\d+\.?\d*)/gm;
    let str = buffer + value;
    let m = regex.exec(str);
    console.log("m1: ", m[1]);
    //setDisplay(m[1]);
    setBuffer(m[1]);
    setDisplay(m[1]);

    console.log("buffer: ", buffer);
  }

  function handleClearAll() {
    setDisplay(0);
    setBuffer(0);
    setFormula([]);
    console.clear();
  }

  function handleClearLast() {
    return;
  }

  function handleOperator(value) {
    if (value !== "=") {
      formula.push(buffer);
      formula.push(value);
      setFormula(formula);
      setBuffer(0);
      setDisplay("");
    } else {
      formula.push(buffer);
      setFormula(formula);

      // clean formula
      console.log("formula: ", formula);

      let calculs = formula.join("");
      calculs = calculs.replace(/X/gi, "*");
      calculs = calculs.replace(/÷/gi, "/");
      console.log(calculs);

      // calculate
      let result = Math.round(10000 * eval(calculs)) / 10000;
      setDisplay(result);

      // reset
      setFormula([]);
      setBuffer(0);

      console.log("result: ", result);
    }
  }

  function handleSubtract(value) {
    console.log("formula start: ", formula);

    const operators = ["X", "÷"];
    const lastTerm = getLastTerm();
    console.log("lastTerm: ", lastTerm);
    console.log(operators.includes(lastTerm));
    if (operators.includes(lastTerm)) {
      setBuffer("-");
      console.log("buffer subtract: ", buffer);
      console.log(formula);
      setDisplay("-");
    } else {
      handleOperator(value);
    }
  }

  return (
    <div className="App">
      <h1>{projectName}</h1>
      <div className="Calculator">
        <div id="display">{display}</div>>
        <div className="formula">
          buffer: {buffer} || {formula}
        </div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <Button
              key={index}
              button={button}
              number={handleNumber}
              operator={handleOperator}
              subtract={handleSubtract}
              clearAll={handleClearAll}
              clearLast={handleClearLast}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
