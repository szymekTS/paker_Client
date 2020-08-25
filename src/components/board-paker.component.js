import React, { Component } from "react";
import PakerPanelTab from "./paker/paker-panel_tabs";

export default class BoardPaker extends Component {
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h2>Panel Pracownika</h2>
        </header>
        <PakerPanelTab />
      </div>
    );
  }
}
