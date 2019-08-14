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
  const [buffer, setBuffer] = useState(0);
  const [lastOperator, setLastOperator] = useState(null);
  const [formula, setFormula] = useState([]);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    document.title = `${projectName} | jmarcm`;
  });

  function getLastTerm() {
    return formula.slice(-1)[0];
  }

  function handleNumber(value) {
    console.log("buffer in number: ", buffer);
    console.log("formula: ", formula);
    console.log("last operator: ", lastOperator);

    let localBuffer = buffer;

    if (lastOperator === "=") {
      localBuffer = 0;
      console.log(buffer);
    }

    // deals with decimal
    if (value === "." && localBuffer === 0) {
      value = "0.";
    }
    //const regex = /^(?:0*)(\d+)|(\d+)|(0)$/gm;
    const regex = /^(?:0*)(-?\d+\.?\d*)/gm;
    let str = localBuffer + value;
    let m = regex.exec(str);
    console.log("m1: ", m[1]);
    //setDisplay(m[1]);
    setBuffer(m[1]);
    setDisplay(m[1]);

    setLastOperator(null);

    console.log("buffer: ", buffer);
  }

  function handleClearAll() {
    setDisplay(0);
    setBuffer(0);
    setLastOperator(null);
    setFormula([]);
    console.clear();
  }

  function handleClearLast() {
    return;
  }

  function handleOperator(value) {
    if (value !== "=") {
      console.log("handleOperator");

      //formula.push(buffer);
      console.log("formula start operator: ", formula);

      if (!lastOperator || lastOperator === "=") {
        formula.push(buffer);
      } else {
        setFormula(formula.pop());
      }

      setLastOperator(value);

      formula.push(value);
      setFormula(formula);
      setBuffer(0);
      setDisplay("");

      console.log("formula operator: ", formula);
    }
  }

  function handleSubtract(value) {
    if (buffer !== 0) {
      formula.push(buffer);
    }
    console.log("formula start: ", formula);
    console.log("buffer start: ", buffer);

    const operators = ["x", "÷"];
    const lastTerm = getLastTerm();
    console.log("lastTerm: ", lastTerm);
    console.log(operators.includes(lastTerm));
    if (operators.includes(lastTerm) || formula.length === 0) {
      setBuffer("-");
      console.log("buffer subtract: ", buffer);
      console.log(formula);
      setDisplay("-");
    } else {
      formula.push(value);
      setFormula(formula);
      setBuffer(0);
      setDisplay("");
    }
  }

  function handleEquals(value) {
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

    setLastOperator(value);
    setFormula([]);
    setBuffer(result);

    console.log("value: ", value);
    console.log("last operator in equals: ", lastOperator);
    console.log("result: ", result);
  }

  return (
    <div className="App">
      <h1>{projectName}</h1>
      <div className="Calculator">
        <div className="formula">{formula}</div>
        <div id="display">{display}</div>>
        <div className="formula">
          buffer {buffer} || {lastOperator}
        </div>
        <div className="buttons">
          {buttons.map((button, index) => (
            <Button
              key={index}
              button={button}
              number={handleNumber}
              operator={handleOperator}
              subtract={handleSubtract}
              equals={handleEquals}
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
