import React, { Component } from "react";
import { Card } from "react-bootstrap";
import orderService from "../../services/order-service";
import authService from "../../services/auth.service";

export default class PakerOrderDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: authService.getCurrentUser(),
      id: props.row.id,
      customer: props.row.customer,
      driver: props.row.driver,
      car: props.row.car,
      lastStatus: props.row.lastStatus,
      origin: props.row.origin,
      destiny: props.row.destiny,

      statusData: [],
      cargo: {},
      cargoList:[],

      status: "",
      comments: "",
      isValid: props.row.lastStatus.includes("STATUS_ACCEPTED"),
      selected: "",
      distance: 0,
    };
  }

  componentDidMount() {
    this.GetCargo();
    orderService.getStatusList(this.state.id).then(
      (response) => {
        this.setState({
          statusData: response.data.list,
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
    );
  }

  GetCargo = () => {
    orderService.getCargo(this.state.id).then(
      (response) => {
        this.setState({
          cargo: response.data,
          cargoList: response.data.register,
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
    );
  };

  AddStatus = (e) => {
    e.preventDefault();
    orderService
      .addNewStatus(
        this.state.id,
        this.state.currUser.id,
        this.state.status,
        this.state.comments
      )
      .then(
        (response) => {},
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
      );
    this.props.clickBack();
  };

  OnSelect = (event) => {
    const { value } = event.target;
    this.setState({
      status: value,
    });
  };
  OnComments = (event) => {
    const { value } = event.target;
    this.setState({
      comments: value,
    });
  };

  render() {
    const {
      id,
      customer,
      car,
      driver,
      origin,
      destiny,
      lastStatus,
      statusData,
      isValid,
      cargo,
      cargoList
    } = this.state;
    return (
      <Card>
        <Card.Title>
          Zamówienie <strong>{id}</strong>
        </Card.Title>
        <Card.Body>
          <div className="form-group">
            <label>Id:</label>
            <input
              type="text"
              defaultValue={id}
              className="form-control"
              readOnly
            />

            <label>Klient:</label>
            <input
              type="text"
              defaultValue={customer}
              className="form-control"
              readOnly
            />

            <label>Auto:</label>
            <input
              type="text"
              defaultValue={car}
              className="form-control"
              readOnly
            />

            <label>Kierowca:</label>
            <input
              type="text"
              defaultValue={driver}
              className="form-control"
              readOnly
            />
            <label>Początek:</label>
            <input
              type="text"
              defaultValue={origin}
              className="form-control"
              readOnly
            />

            <label>Koniec:</label>
            <input
              type="text"
              defaultValue={destiny}
              className="form-control"
              readOnly
            />
            <label>Status:</label>
            <input
              type="text"
              defaultValue={lastStatus}
              className="form-control"
              readOnly
            />

            <label>Ładunek:</label>
            <ul className="list-group">
              <li className="list-group-item" key="title">
                Wartość: {cargo.value} PLN, Waga: {cargo.weight} kg
              </li>
              {cargoList.map((item) => {
                return (
                  <li className="list-group-item" key={item.name}>
                    <b>Opis:</b> {item.name}
                    <br></br>
                    <b>Wymiary(cm):</b><br></br>
                    szerokość: {item.width}, głębokość: {item.depth}, wysokość: {item.height}, 
                    <br></br>
                    <b>Waga:</b> {item.weight} kg
                    <br></br>
                    <b>Wartość:</b> {item.value} PLN
                  </li>
                );
              })}
            </ul>

            <label>Historia statusów:</label>
            <ul className="list-group">
              {statusData.map((status) => {
                return (
                  <li className="list-group-item" key={status.id}>
                    Kod: {status.statusCode}
                    <br></br>
                    Opis: {status.comments}
                    <br></br>
                    Data: {new Date(status.date).toLocaleDateString()} {new Date(status.date).toLocaleTimeString()}
                  </li>
                );
              })}
            </ul>
          </div>

          {isValid ? (
            <>
              <form>
                <div className="form-group">
                  <label>Dodaj nowy status:</label>
                  <label>Status:</label>
                  <select
                    name="status"
                    onChange={this.OnSelect}
                    value={this.state.status}
                    className="form-control"
                  >
                    <option>---</option>
                    <option value="STATUS_PACKING">Zapakowane</option>
                  </select>
                  <label>Opis:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={this.state.comments}
                    onChange={this.OnComments}
                  ></input>
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.AddStatus}
                >
                  Zapisz status
                </button>
              </form>
            </>
          ) : (
            <></>
          )}

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
