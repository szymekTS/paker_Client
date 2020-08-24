import React, { Component } from "react";
import { Card } from "react-bootstrap";
import cityService from "../../services/city-service";

export default class CarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      brand: props.row.brand,
      model: props.row.model,
      licensePlate: props.row.licensePlate,
      carType: props.row.carType,

      selected: "",
      distance: 0,
    };
  }

  componentDidMount() {}

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
    const { id, brand, model, carType, licensePlate } = this.state;
    return (
      <Card>
        <Card.Title>
          Auto <strong>{licensePlate}</strong>
        </Card.Title>
        <Card.Body>
          <form>
            <div className="form-group">
              <label>Id:</label>
              <input
                name="id"
                type="text"
                defaultValue={id}
                className="form-control"
                readOnly
              />

              <label>Marka:</label>
              <input
                name="brand"
                type="text"
                defaultValue={brand}
                className="form-control"
                readOnly
              />

              <label>Model:</label>
              <input
                name="model"
                type="text"
                defaultValue={model}
                className="form-control"
                readOnly
              />

              <label>Numer rejestracyjny:</label>
              <input
                name="licensePlate"
                type="text"
                defaultValue={licensePlate}
                className="form-control"
                readOnly
              />
              <label>Typ:</label>
              <input
                name="carType"
                type="text"
                defaultValue={carType}
                className="form-control"
                readOnly
              />
            </div>
          </form>
          <button
            style={{ marginTop: 30 }}
            className="btn btn-danger btn-lg"
            onClick={this.props.deleteOne}
          >
            Usuń auto
          </button>
          <br />
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
