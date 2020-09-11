import React, { Component } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import orderService from "../../services/order-service";
import authService from "../../services/auth.service";
import cityService from "../../services/city-service";
import carService from "../../services/car-service";
import userService from "../../services/user.service";

export default class DriverOrderDetails extends Component {
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
      destinyCity: {},
      carDetails: {},

      statusData: [],
      routeData: {},
      route: [],

      localization: "",
      status: "",
      comments: "",
      isValid: false,
      selected: "",
      distance: 0,

      openStatuses: false,
      openRoute: false,
    };
  }
  checkValid = () => {
    const a = this.props.row.lastStatus.includes("STATUS_PACKING");
    const b = this.props.row.lastStatus.includes("STATUS_TRANSPORTING");

    this.setState({
      isValid:a||b
    })
  };
  DeleteOrder = () => {
    orderService
      .addNewStatus(
        this.state.id,
        this.state.currUser.id,
        "STATUS_DELETED",
        "zamówienie usunięte"
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
  componentDidMount() {
    this.checkValid();
    this.GetRoute();
    this.GetCityDetails();
    this.GetCarDetails();
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

  GetRoute = () => {
    orderService.getRoute(this.state.id).then(
      (response) => {
        this.setState({
          routeData: response.data,
          route: response.data.route,
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

  GetCarDetails = () => {
    carService.findByPlate(this.state.car).then(
      (response) => {
        this.setState({
          carDetails: response.data,
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

  GetCityDetails = () => {
    cityService.getCityDataName(this.state.destiny).then(
      (response) => {
        this.setState({
          destinyCity: response.data,
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

    userService
      .changeLocation(this.state.currUser.id, this.state.localization)
      .then((response) => {
        this.setState({ message: response.data.message });
      });
    carService
      .updateCar(this.state.carDetails[0].id, this.state.localization, this.state.carDetails[0].isRepair,  this.state.carDetails[0].isFree)
      .then((response) => {
        this.setState({ message: response.data.message });
      });

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

  OnLoc = (event) => {
    const { value } = event.target;
    this.setState({
      localization: value,
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
      openStatuses,
      openRoute,
      destinyCity,
      route,
      routeData,
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
            <label>Historia statusów:</label>
            <Button
              onClick={() => {
                this.setState((prevState) => {
                  return {
                    openStatuses: !prevState.openStatuses,
                  };
                });
              }}
              aria-controls="change-localization-form"
              aria-expanded={openStatuses}
              style={{ marginTop: 30 }}
            >
              Pokaż poprzednie statusy
            </Button>
            <br />
            <Collapse in={openStatuses}>
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
            </Collapse>
            <Button
              onClick={() => {
                this.setState((prevState) => {
                  return {
                    openRoute: !prevState.openRoute,
                  };
                });
              }}
              aria-controls="change-localization-form"
              aria-expanded={openRoute}
              style={{ marginTop: 30 }}
            >
              Pokaż trasę
            </Button>
            <br />
            <Collapse in={openRoute}>
              <ul className="list-group">
                <li className="list-group-item" key={destiny}>
                  <b>
                    Trasa {origin} - {destiny}, odległość: {routeData.distance}{" "}
                    km
                  </b>
                </li>
                {route.map((city) => {
                  return (
                    <li className="list-group-item" key={city.id}>
                      {city.name} - {city.zipCode}
                    </li>
                  );
                })}
                <li className="list-group-item" key={destinyCity.id}>
                  {destinyCity.name} - {destinyCity.zipCode}
                </li>
              </ul>
            </Collapse>
          </div>
          {isValid ? (
            <>
              <form>
                <div className="form-group">
                  <label>Dodaj nowy status:</label>
                  <label>Lokalizacja:</label>
                  <select
                    name="localization"
                    onChange={this.OnLoc}
                    value={this.state.localization}
                    className="form-control"
                  >
                    <option>---</option>
                    {route.map((city) => {
                      return (
                        <option key={city.id} value={city.id}>
                          {city.name}, {city.zipCode}
                        </option>
                      );
                    })}
                    <option key={destinyCity.id} value={destinyCity.id}>
                      {destinyCity.name}, {destinyCity.zipCode}
                    </option>
                  </select>
                  <label>Status:</label>
                  <select
                    name="status"
                    onChange={this.OnSelect}
                    value={this.state.status}
                    className="form-control"
                  >
                    <option>---</option>
                    <option value="STATUS_TRANSPORTING">Transport</option>
                    <option value="STATUS_DELIVERED">Dostarczono</option>
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
