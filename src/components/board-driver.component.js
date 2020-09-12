import React, { Component } from "react";
import DriverPanelTab from "./driver/driver-panel_tabs";
import authService from "../services/auth.service";
import { Link } from "react-router-dom";
import Home from "./home.component";

export default class BoardDriver extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: authService.getCurrentUser(),
      canSeeIt: false,
      content: "",
    };
  }
  componentDidMount() {
    var can = this.state.current.roles.includes("ROLE_DRIVER");
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
              <h2>Panel kierowcy</h2>
            </header>
            <DriverPanelTab />
          </div>
        ) : (
          <Link to="/" component={Home} />
        )}
      </>
    );
  }
}
