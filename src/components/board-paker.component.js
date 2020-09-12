import React, { Component } from "react";
import PakerPanelTab from "./paker/paker-panel_tabs";
import { Link } from "react-router-dom";
import authService from "../services/auth.service";
import Home from "./home.component";

export default class BoardPaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: authService.getCurrentUser(),
      canSeeIt: false,
      content: "",
    };
  }
  componentDidMount() {
    var can = this.state.current.roles.includes("ROLE_PAKER");
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
          <h2>Panel Pracownika</h2>
        </header>
        <PakerPanelTab />
      </div>
        ) : (
          <Link to ="/" component={Home} />
        )}
      </>
    );
  }
}
