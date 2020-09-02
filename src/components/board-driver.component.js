import React, { Component } from "react";
import DriverPanelTab from "./driver/driver-panel_tabs";

export default class BoardDriver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h2>Panel kierowcy</h2>
        </header>
        <DriverPanelTab />
      </div>
    );
  }
}
