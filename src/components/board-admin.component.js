import React, { Component } from "react";

import AdminPanelTab from "./admin/admin-panel_tabs";
import { Link } from "react-router-dom";
import Home from "./home.component";
import authService from "../services/auth.service";

export default class BoardAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: authService.getCurrentUser(),
      canSeeIt: false,
      content: "",
    };
  }
  componentDidMount() {
    var can = this.state.current.roles.includes("ROLE_ADMIN");
    this.setState({
      canSeeIt: can,
    });
  }
  render() {
    const { canSeeIt } = this.state;
    return (
      <>
        {canSeeIt ? (
          <div className="container">
            <header className="jumbotron">
              <h2>Panel Administratora</h2>
            </header>
            <AdminPanelTab />
          </div>
        ) : (
          <Link to="/" component={Home} />
        )}
      </>
    );
  }
}
