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
  const [operatorList, setOperatorList] = useState([]);
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

    setLastOperator(null);

    console.log("buffer: ", buffer);
  }

  function handleClearAll() {
    setDisplay(0);
    setBuffer(0);
    setOperatorList([]);
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
      const operators = ["X", "÷", "+", "-"];
      if (operators.includes(operatorList.slice(-1)[0])) {
      }

      const newOperatorList = [...operatorList, value];
      setOperatorList(newOperatorList);

      console.log("operatorList: ", operatorList);

      //formula.push(buffer);
      console.log("formula start operator: ", formula);
      if (lastOperator !== null) {
        setFormula(formula.pop());
      } else {
        formula.push(buffer);
      }

      setLastOperator(value);

      formula.push(value);
      setFormula(formula);
      setBuffer(0);
      setDisplay("");

      console.log("formula operator: ", formula);
    } else {
      // dealr with equals
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
    if (buffer !== 0) {
      formula.push(buffer);
    }
    console.log("formula start: ", formula);
    console.log("buffer start: ", buffer);

    const operators = ["X", "÷"];
    const lastTerm = getLastTerm();
    console.log("lastTerm: ", lastTerm);
    console.log(operators.includes(lastTerm));
    if (operators.includes(lastTerm) || formula.length === 0) {
      setBuffer("-");
      console.log("buffer subtract: ", buffer);
      console.log(formula);
      setDisplay("-");
    } else {
      //handleOperator(value);

      formula.push(value);
      setFormula(formula);
      setBuffer(0);
      setDisplay("");
    }
  }

  return (
    <div className="App">
      <h1>{projectName}</h1>
      <div className="Calculator">
        <div id="display">{display}</div>>
        <div className="formula">
          buffer: {buffer} || operatorList: {operatorList} || lastOperator:{" "}
          {lastOperator}
        </div>
        <div className="formula">{formula}</div>
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
