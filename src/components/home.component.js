import React, { Component } from "react";

export default class Home extends Component {
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
          <h2>System wspomagający zarządzanie flotą pojazdów w firmie transportowej</h2>
        </header>
      </div>
    );
  }
}
