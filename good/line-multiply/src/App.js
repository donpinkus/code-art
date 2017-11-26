import React, { Component } from "react";
// import PropTypes from "prop-types";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Header">
          <h1>Multiply Two Numbers</h1>
          <div className="NumberInputs">
            <input
              className="NumberInputs-Input NumberInputs-Input--Left"
              type="number"
              defaultValue="333"
            />
            <span>x</span>
            <input
              className="NumberInputs-Input NumberInputs-Input--Right"
              type="number"
              defaultValue="33"
            />
            <span>=</span>
            <span>28,782</span>
          </div>
        </div>

        <br />
        <br />

        <div>
          <SquareViz num1={123} num2={123} outerDim={800} margin={100} />
        </div>
      </div>
    );
  }
}

class SquareViz extends Component {
  render() {
    return (
      <svg width={this.props.outerDim} height={this.props.outerDim}>
        <g
          transform={`translate(${this.props.margin} ${this.props.margin})`}
          strokeWidth="2px"
          strokeLinecap="round"
        >
          {/* <rect width="600" height="600" fill="gray" /> */}
          <NumberLines pink={true} dim={600} number={this.props.num1} />
          <NumberLines pink={false} dim={600} number={this.props.num2} />
        </g>
      </svg>
    );
  }
}

class NumberLines extends Component {
  render() {
    const dim = 600;

    const transform = this.props.pink ? "" : "translate(0 600) rotate(-90)";
    const stroke = this.props.pink ? "#FFA8D3" : "#74b9ee";

    const digits = this.props.number.toString().length;

    let digitGroups = [];
    for (let i = 1; i <= digits; i++) {
      digitGroups.push(
        <DigitGroup
          dim={this.props.dim}
          place={i}
          number={this.props.number}
          key={i}
        />
      );
    }

    return (
      <g className="pinks" stroke={stroke} transform={transform}>
        {digitGroups}
      </g>
    );
  }
}

class DigitGroup extends Component {
  render() {
    const numberLength = this.props.number.toString().length;
    const digit = +this.props.number.toString()[this.props.place - 1];

    let transY = this.props.dim / (numberLength - 1) * (this.props.place - 1);
    transY -= 10 * ((digit - 1) / 2);

    let lines = [];
    for (let i = 0; i < digit; i++) {
      lines.push(<line x1="-50" y1={10 * i} x2="650" y2={10 * i} key={i} />);
    }

    return <g transform={`translate(0 ${transY})`}>{lines}</g>;
  }
}

class Columns extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
