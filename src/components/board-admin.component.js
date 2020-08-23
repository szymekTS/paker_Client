import React, { Component } from "react";

import AdminPanelTab from "./admin/admin-panel_tabs";

export default class BoardAdmin extends Component {
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h2>Panel Administratora</h2>
        </header>
        <AdminPanelTab />
      </div>
    );
  }
}
