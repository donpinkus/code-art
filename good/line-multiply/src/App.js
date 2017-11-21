import React, { Component } from "react";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>Multiple Two Numbers</h1>
          <div className="NumberInputs">
            <input
              className="NumberInputs-Input NumberInputs-Input--Left"
              type="number"
              value="123"
            />
            <span>x</span>
            <input
              className="NumberInputs-Input NumberInputs-Input--Right"
              type="number"
              value="234"
            />
            <span>=</span>
            <span>28,782</span>
          </div>
        </div>

        <div>
          <p>Count the intersections in each column.</p>
          <div className="Columns">
            <div className="Columns-Column">
              <p className="Columns-Count">2</p>
              <p className="Columns-Multiplier">x10,000</p>
            </div>
            <div className="Columns-Column">
              <p className="Columns-Count">7</p>
              <p className="Columns-Multiplier">x1,000</p>
            </div>
            <div className="Columns-Column">
              <p className="Columns-Count">16</p>
              <p className="Columns-Multiplier">x100</p>
            </div>
            <div className="Columns-Column">
              <p className="Columns-Count">17</p>
              <p className="Columns-Multiplier">x10</p>
            </div>
            <div className="Columns-Column">
              <p className="Columns-Count">12</p>
              <p className="Columns-Multiplier">x1</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
