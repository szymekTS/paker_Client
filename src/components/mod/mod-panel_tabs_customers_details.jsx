import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {


      selected: "",
      distance: 0,
    };
  }

  OnSelect = (event) => {
    const { value } = event.target;
    this.setState({
      selected: value,
    });
  };
  OnDistance = (event) => {
    const { value } = event.target;
    this.setState({
      distance: value,
    });
  };

  render() {
    const {  } = this.state;
    return (
      <Card>
        <Card.Title>
          Klient <strong>none</strong>
        </Card.Title>
        <Card.Body>
          
          <button
            style={{ marginTop: 30 }}
            className="btn btn-secondary btn-lg"
            onClick={this.props.clickBack}
          >
            Powrót
          </button>
        </Card.Body>
      </Card>
    );
  }
}
