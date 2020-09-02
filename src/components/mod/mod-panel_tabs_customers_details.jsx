import React, { Component } from "react";
import { Card } from "react-bootstrap";

export default class CustomerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      name: props.row.name,
      surname: props.row.surname,
      email: props.row.email,

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
    const { id, name, surname, email } = this.state;
    return (
      <Card>
        <Card.Title>
          Klient <strong>{name}, {surname}</strong>
        </Card.Title>
        <Card.Body>
          <div className="form-group">
            <label>Id:</label>
            <input
              name="id"
              type="text"
              defaultValue={id}
              className="form-control"
              readOnly
            />

            <label>Imię:</label>
            <input
              onChange={this.OnChangeHandler}
              name="name"
              type="text"
              defaultValue={name}
              className="form-control"
              readOnly
            />

            <label>Nazwisko:</label>
            <input
              onChange={this.OnChangeHandler}
              name="surname"
              type="text"
              defaultValue={surname}
              className="form-control"
              readOnly
            />

            <label>Address email:</label>
            <input
              onChange={this.OnChangeHandler}
              name="email"
              type="email"
              defaultValue={email}
              className="form-control"
              readOnly
            />
          </div>
          <button
              style={{ marginTop: 30 }}
              className="btn btn-danger btn-lg"
              onClick={this.props.deleteOne}
            >
              Usuń klienta
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
