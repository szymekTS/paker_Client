import React, { Component } from "react";
import { Card } from "react-bootstrap";
import authService from "../../services/auth.service";
import carService from "../../services/car-service";
import userService from "../../services/user.service";
import maintenenceService from "../../services/maintenence-service";

export default class RepairDriver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: authService.getCurrentUser(),

      carData: [],
      car: "",
      localization: "",

      isCar: false,
      isDescription: false,
      message: "",
    };
  }

  componentDidMount() {
    userService.findById(this.state.curr.id).then(
      (response) => {
        this.setState({
          localization: response.data.localization,
        });
        this.getCarInLoc();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCarInLoc = () => {
    carService.getCarLoc(this.state.localization).then(
      (response) => {
        this.setState({
          carData: response.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  handleNewRepair = (e) => {
      e.preventDefault()
    maintenenceService.addNewRepair(this.state.car, this.state.comment).then(
        (response) => {
            this.setState({
              message: response.data.message,
              successful: true,
            });
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              successful: false,
              message: resMessage,
            });
          }
    );
    this.setState({
      isCar: false,
      isDescription: false,
      car: "",
      localization: "",
    })
  };

  OnCarSelect = (e) => {
    const { value } = e.target;
    this.setState({
      car: value,
      isCar: true,
    });
  };

  OnDescription = (e) => {
    const { value } = e.target;
    this.setState({
      comment: value,
      isDescription: true,
    });
  };

  render() {
    const { car, comment, isCar, isDescription, carData, message } = this.state;
    return (
      <Card>
        <Card.Title>Zgłoś awarie</Card.Title>
        <Card.Body>
          <form>
            <div className="form-group">
              <label>Auto:</label>
              <select
                name="car"
                type="text"
                value={car}
                className="form-control"
                onChange={this.OnCarSelect}
              >
                <option>---</option>
                {carData.map((car) => {
                  return (
                    <option key={car.id} value={car.id}>
                      {car.licensePlate}, {car.brand} {car.model}
                    </option>
                  );
                })}
              </select>

              <label>Opis Problemu:</label>
              <input
                name="comment"
                type="text"
                value={comment}
                className="form-control"
                onChange={this.OnDescription}
              />
            </div>
            {message}<br></br>
            <button
              className="btn btn-primary btn-lg"
              onClick={this.handleNewRepair}
              disabled={!isCar || !isDescription}
            >
              Zapisz status
            </button>
          </form>
        </Card.Body>
      </Card>
    );
  }
}
