import React, { Component } from "react";

export class Heading1 extends Component {
  componentDidMount() {
    this.blinkText();
    this.intervalID = 0;
  }

  getRandomColor = () => {
    let redPart = Math.floor(Math.random() * 256);
    let bluePart = Math.floor(Math.random() * 256);
    let greenPart = Math.floor(Math.random() * 256);
    return `rgb(${redPart},${bluePart},${greenPart})`;
  };

  blinkText = () => {
    let heading1 = document.getElementById("heading-1");
    heading1.addEventListener("click", () => {
      if (this.intervalID === 0) {
        this.intervalID = setInterval(() => {
          heading1.style.color = this.getRandomColor();
        }, 500);
        document.getElementById("optional-content").innerHTML =
          "(Click again to stop it)";
      } else {
        clearInterval(this.intervalID);
        this.intervalID = 0;
        heading1.style.color = `#000000`;
        document.getElementById("optional-content").innerHTML =
          "(Click me to see how diwali should be celebrated)";
      }
    });
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-4 text-center" id="heading-1">
          Celebrate diwali with your friends by giving them a sweet message 🎊
          <br />
          <p style={{ fontSize: "20px" }} id="optional-content">
            (Click me to see how diwali should be celebrated)
          </p>
        </h1>
      </div>
    );
  }
}

export default Heading1;
