import React, { Component } from "react";
import {  Card } from "react-bootstrap";
import cityService from "../../services/city-service";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      name: props.row.name,
      province: props.row.province,
      zipCode: props.row.zipCode,
      neighbours: [],
      names: [],
    };
  }

  componentDidMount(){
      this.getNeighbours()
  }

  getNeighbours = () =>{
      cityService.getCityNeighbours(this.state.id).then(
        (response) => {
            this.setState({
              neighbours: response.data.neighbours,
              names: response.data.names,
            });
          },
          (error) => {
            this.setState({
              content:
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString(),
            });
          }
      )
  }

  render() {
    const { id, name, province, zipCode } = this.state;
    return (
      <Card>
        <Card.Title>
          Miasto <strong>{name}</strong>
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

              <label>Nazwa:</label>
              <input
                name="userName"
                type="text"
                defaultValue={name}
                className="form-control"
                readOnly
              />

              <label>Wojewodztwo:</label>
              <input
                name="name"
                type="text"
                defaultValue={province}
                className="form-control"
                readOnly
              />

              <label>Kod pocztowy:</label>
              <input
                name="surname"
                type="text"
                defaultValue={zipCode}
                className="form-control"
                readOnly
              />
              <label>Kod pocztowy:</label>
              <input
                name="surname"
                type="text"
                defaultValue={zipCode}
                className="form-control"
                readOnly
              />
            </div>
          </form>
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
