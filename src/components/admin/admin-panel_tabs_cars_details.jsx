import React, { Component } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import cityService from "../../services/city-service";
import carService from "../../services/car-service";
import maintenenceService from "../../services/maintenence-service";

export default class CarDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      brand: props.row.brand,
      model: props.row.model,
      licensePlate: props.row.licensePlate,
      carType: props.row.carType,
      localization: props.row.localization,
      inRepair: props.row.inRepair,
      isFree: props.row.free,

      cityData: [],
      carRepairs: [],

      openRepairHistory:false,
      changed: true,
      distance: 0,
    };
  }

  componentDidMount() {
    this.getCitiesList()
    this.getRepairList()
  }

  getRepairList=()=>{
    maintenenceService.getCarMaintenece(this.state.licensePlate).then(
      (response) => {
        this.setState({
          carRepairs: response.data,
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

  getCitiesList = () => {
    cityService.getAllCities().then(
      (response) => {
        this.setState({
          cityData: response.data,
          loaded: true,
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

  UpdateCar = () => {
    console.log(
      this.state.id,
      this.state.localization,
      this.state.inRepair,
      this.state.isFree
    );
    carService
      .updateCar(
        this.state.id,
        this.state.localization,
        this.state.inRepair,
        this.state.isFree
      )
      .then((error) => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      });
    this.props.clickBack();
  };

  OnSelect = (event) => {
    const { value } = event.target;
    this.setState({
      localization: value,
      changed: false,
    });
  };

  OnCheckbox = (event) => {
    const { checked } = event.target;
    this.setState({
      inRepair: checked,
      changed: false,
    });
  };
  OnCheckboxFree = (event) => {
    const { checked } = event.target;
    this.setState({
      isFree: checked,
      changed: false,
    });
  };

  render() {
    const {
      id,
      brand,
      model,
      carType,
      licensePlate,
      cityData,
      localization,
      inRepair,
      changed,
      isFree,
      openRepairHistory,
      carRepairs
    } = this.state;
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
              <label>Lokalizacja:</label>
              <select
                name="localization"
                value={localization}
                onChange={this.OnSelect}
                className="form-control"
              >
                <option>----</option>
                {cityData.map((city) => {
                  return (
                    <option key={city.id} value={city.id}>
                      {city.name}, {city.zipCode}
                    </option>
                  );
                })}
              </select>
              <div className="form-check">
                <input
                  onChange={this.OnCheckbox}
                  className="form-check-input"
                  type="checkbox"
                  checked={inRepair}
                  name="inRepair"
                />
                <label className="form-check-label">W naprawie</label>
              </div>
              <div className="form-check">
                <input
                  onChange={this.OnCheckboxFree}
                  className="form-check-input"
                  type="checkbox"
                  checked={isFree}
                  name="isFree"
                />
                <label className="form-check-label">Dostępny</label>
              </div>
            </div>

            <Button
                onClick={() => {
                  this.setState((prevState) => {
                    return {
                      openRepairHistory: !prevState.openRepairHistory,
                    };
                  });
                }}
                aria-expanded={openRepairHistory}
                style={{ marginTop: 30 }}
              >
                Pokaż wszystkie naprawy tego auta
              </Button>
              <br></br>
              <Collapse in={openRepairHistory}>
                <ul className="list-group">
                  {carRepairs.map((repair) => {
                    return (
                      <il className="list-group-item" key={repair.id}>
                        <b>ID:</b> {repair.id} <b>Auto:</b> {repair.carId}
                        <br></br>
                        <b>Status:</b> {repair.status}
                        <br></br>
                        <b>Opis:</b> {repair.description}
                        <br></br>
                        <b>Start:</b> {new Date(repair.startTime).toUTCString()}
                        <br></br>
                        {repair.status === "DONE" && (
                          <>
                            <b>Koniec:</b>{" "}
                            {new Date(repair.doneTime).toUTCString()}
                          </>
                        )}
                      </il>
                    );
                  })}
                </ul>
              </Collapse>

            <button
              style={{ marginTop: 30 }}
              className="btn btn-primary btn-lg"
              onClick={this.UpdateCar}
              disabled={changed}
            >
              Zapisz zmiany
            </button>
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
