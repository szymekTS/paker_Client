import React, { Component } from "react";
import ModPanelTab from "./mod/mod-panel_tabs";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h2>Panel Moderatora</h2>
        </header>
        <ModPanelTab />
      </div>
      
    );
  }
}
