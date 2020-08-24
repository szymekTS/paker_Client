import React, { Component } from "react";
import { Card } from "react-bootstrap";
import carService from "../../services/car-service";

export default class CustomerNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  AddNewCar = (event) =>{
    event.preventDefault()

    this.props.clickBack()
  }

  OnChangeHandler = (event) => {
    const { name, value, type, checked } = event.target;
    type === "checkbox"
      ? this.setState({ [name]: checked })
      : this.setState({ [name]: value });
  };

  OnNumberHandler = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ number: event.target.value });
    }
  };

  render() {
    return (
      <Card>
        <Card.Title>Nowe Auto</Card.Title>
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
