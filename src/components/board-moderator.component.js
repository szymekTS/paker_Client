import React, { Component } from "react";
import ModPanelTab from "./mod/mod-panel_tabs";
import { Route, Link } from "react-router-dom";
import Home from "./home.component";
import authService from "../services/auth.service";

export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: authService.getCurrentUser(),
      canSeeIt: false,
      content: "",
    };
  }
  componentDidMount() {
    var can = this.state.current.roles.includes("ROLE_MODERATOR");
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
              <h2>Panel Moderatora</h2>
            </header>
            <ModPanelTab />
          </div>
        ) : (
          <Link to ="/" component={Home} />
        )}
      </>
    );
  }
}
