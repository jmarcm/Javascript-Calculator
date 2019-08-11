import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import buttons from "./buttons";

const projectName = "JavaScript Calculator";

function Button(props) {
  return (
    <button
      id={props.button.id}
      className={props.button.className}
      value={props.button.display}
      onClick={e => props.onClick(e.target.value)}
    >
      {props.button.display}
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState(0);

  function displayKeyPressed(value) {
    const regex = /^(?:0*)(\d+)|(\d+)|(0)$/gm;
    let str = display + value;
    let m = regex.exec(str);
    setDisplay(m[1]);
  }

  useEffect(() => {
    document.title = `${projectName} | jmarcm`;
  });
  return (
    <div className="App">
      <h1>{projectName}</h1>
      <div className="Calculator">
        <div id="display">{display}</div>>
        <div className="buttons">
          {buttons.map((button, index) => (
            <Button key={index} button={button} onClick={displayKeyPressed} />
          ))}
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
