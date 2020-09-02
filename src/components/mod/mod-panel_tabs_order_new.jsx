import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import customerService from "../../services/customer-service";
import cityService from "../../services/city-service";
import userService from "../../services/user.service";
import orderService from "../../services/order-service";
import cargoService from "../../services/cargo-service";
import carService from "../../services/car-service";
import authService from "../../services/auth.service";

export default class OrderNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
      
      customerData: [],
      cityData: [],
      driverData: [],
      carData: [],

      successful: false,
      message: "",


      customer: "",
      origin: "",
      destiny: "",
      driver: "",
      cargo: [{ name: "", width: 0, height: 0, depth: 0, weight: 0, value: 0 }],
      car: "",

      isDestiny: false,
      isCustomer: false,
      isOrigin: false,
      isDriver: false,
      isCar: false,
      carType: "",
      canDriver: false,
      canCar: false,
      checkTypeButton: false,
    };
  }

  componentDidMount() {
    this.getCustomerList();
  }

  getCustomerList = () => {
    customerService.getAllCustomers().then(
      (response) => {
        this.setState({
          customerData: response.data,
          loaded: true,
        });
        this.getCitiesList();
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

  getCarInLocation = () => {};

  getFreeDriverInLocation = (loc) => {
    userService.findFreeDriverInLoc(loc).then(
      (response) => {
        this.setState({
          driverData: response.data,
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

  getCarTypeForCargo = (e) => {
    e.preventDefault();
    cargoService.checkType(this.state.cargo).then(
      (response) => {
        this.setState({
          carType: response.data,
        });
        this.getCarForCargo()
        if (this.state.carType.length > 2)
          this.setState({
            canCar: true,
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

  getCarForCargo = () => {
    carService.getCarLocType(this.state.origin ,this.state.carType).then(
      (response) => {
        this.setState({
          carData: response.data,
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


  saveOrder = () =>{
    orderService.addNewOrder(this.state.currentUser.id, this.state.car, this.state.cargo, this.state.customer, this.state.driver, this.state.origin, this.state.destiny).then(
      (response) => {
        this.setState({
          message: response.data.message,
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

  componentDidUpdate() {
    if (this.state.isCustomer && this.state.isDestiny && this.state.isOrigin) {
      if (!this.state.canDriver) {
        this.setState({
          canDriver: true,
        });
      }
    }
    if(this.state.cargo.length===0){
      if(this.state.checkTypeButton)
      this.setState({
        checkTypeButton: false
      })
    }
  }

  addCargoItem = (e) => {
    e.preventDefault();
    this.setState((prevState) => ({
      cargo: [
        ...prevState.cargo,
        { name: "", width: 0, height: 0, depth: 0, weight: 0, value: 0 },
      ],
    }));
  };
  delCargoItem = (e) => {
    e.preventDefault();
    let newCargo = this.state.cargo;
    newCargo.pop();
    this.setState({
      cargo: newCargo,
    });
  };

  OnSelectCustomer = (event) => {
    const { value } = event.target;
    this.setState({
      customer: value,
      isCustomer: true,
    });
  };

  OnSelectOrigin = (event) => {
    const { value } = event.target;
    this.setState({
      origin: value,
      isOrigin: true,
    });
    this.getFreeDriverInLocation(value);
  };

  OnSelectDestiny = (event) => {
    const { value } = event.target;
    this.setState({
      destiny: value,
      isDestiny: true,
    });
  };

  OnSelectDriver = (event) => {
    const { value } = event.target;
    this.setState({
      driver: value,
      isDriver: true,
    });
  };

  OnSelectCar= (event) => {
    const { value } = event.target;
    this.setState({
      car: value,
      isCar: true,
    });
  };

  OnItemChange = (e) => {
    this.setState({
      isCar: false,
      canCar: false,
      carType: "",
    });
    if (
      ["name", "width", "height", "depth", "weight", "value"].includes(
        e.target.className
      )
    ) {
      let cargo = [...this.state.cargo];
      cargo[e.target.dataset.id][e.target.className] = e.target.value;
      this.setState({ cargo }, () => console.log(this.state.cargo));
    } else {
      this.setState({ [e.target.name]: e.target.value.toUpperCase() });
    }
  };

  render() {
    const {
      customerData,
      cityData,
      canDriver,
      driverData,
      cargo,
      isDriver,
      canCar,
      carData,
      isCar,
    } = this.state;
    return (
      <ReactBootStrap.Card>
        <ReactBootStrap.Card.Title>Nowe zamówienie</ReactBootStrap.Card.Title>
        <ReactBootStrap.Card.Body>
          {this.state.message}
          <form>
            <label>Klient:</label>
            <select
              name="customer"
              onChange={this.OnSelectCustomer}
              className="form-control"
            >
              <option>----</option>
              {customerData.map((customer) => {
                return (
                  <option key={customer.id} value={customer.id}>
                    {customer.surname}, {customer.email}
                  </option>
                );
              })}
            </select>
            <label>Początek:</label>
            <select
              name="origin"
              onChange={this.OnSelectOrigin}
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
            <label>Koniec:</label>
            <select
              name="destiny"
              onChange={this.OnSelectDestiny}
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
            {canDriver ? (
              <>
                <label>Kierowca:</label>
                <select
                  name="driver"
                  onChange={this.OnSelectDriver}
                  className="form-control"
                >
                  <option>----</option>
                  {driverData.map((driver) => {
                    return (
                      <option key={driver.id} value={driver.id}>
                        {driver.name} {driver.surname} - {driver.userName}
                      </option>
                    );
                  })}
                </select>
                {isDriver ? (
                  <>
                    <label>Ładunek:</label>
                    {cargo.map((val, idx) => {
                      const itemName = `name-${idx}`,
                        itemWidth = `width-${idx}`,
                        itemHeight = `height-${idx}`,
                        itemDepth = `depth-${idx}`,
                        itemWeight = `weight-${idx}`,
                        itemValue = `value-${idx}`;
                      return (
                        <div key={idx} className="card">
                          <label>{`Element #${idx + 1}`}</label>
                          <label htmlFor={itemName}>Opis</label>
                          <input
                            type="text"
                            name={itemName}
                            data-id={idx}
                            id={itemName}
                            value={cargo[idx].name}
                            className="name"
                            onChange={this.OnItemChange}
                          />
                          <label htmlFor={itemWidth}>Szerokość (cm)</label>
                          <input
                            type="number"
                            name={itemWidth}
                            data-id={idx}
                            id={itemWidth}
                            value={cargo[idx].width}
                            className="width"
                            onChange={this.OnItemChange}
                          />
                          <label htmlFor={itemHeight}>Wysokość (cm)</label>
                          <input
                            type="number"
                            name={itemHeight}
                            data-id={idx}
                            id={itemHeight}
                            value={cargo[idx].height}
                            className="height"
                            onChange={this.OnItemChange}
                          />
                          <label htmlFor={itemDepth}>Głębokość (cm)</label>
                          <input
                            type="number"
                            name={itemDepth}
                            data-id={idx}
                            id={itemDepth}
                            value={cargo[idx].depth}
                            className="depth"
                            onChange={this.OnItemChange}
                          />
                          <label htmlFor={itemWeight}>Waga (kg)</label>
                          <input
                            type="number"
                            name={itemWeight}
                            data-id={idx}
                            id={itemWeight}
                            value={cargo[idx].weight}
                            className="weight"
                            onChange={this.OnItemChange}
                          />
                          <label htmlFor={itemValue}>Wartość (PLN)</label>
                          <input
                            type="number"
                            name={itemValue}
                            data-id={idx}
                            id={itemValue}
                            value={cargo[idx].value}
                            className="value"
                            onChange={this.OnItemChange}
                          />
                        </div>
                      );
                    })}
                    <button
                      className="btn btn-success btn-lg"
                      onClick={this.addCargoItem}
                    >
                      Dodaj element
                    </button>
                    <button
                      className="btn btn-danger btn-lg"
                      onClick={this.delCargoItem}
                    >
                      Usuń element
                    </button>
                    <button
                      className="btn btn-warning btn-lg"
                      onClick={this.getCarTypeForCargo}
                    >
                      Znajdź pasujące auto
                    </button>
                    <br></br>
                    {canCar ? (
                      <>
                        <label>Auto:</label>
                        <select
                          name="driver"
                          onChange={this.OnSelectCar}
                          className="form-control"
                        >
                          <option>----</option>
                          {carData.map((car) => {
                            return (
                              <option key={car.id} value={car.id}>
                                {car.brand} {car.model} -{" "}
                                {car.licensePlate}
                              </option>
                            );
                          })}
                        </select>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            <button
              style={{ marginTop: 30 }}
              className="btn btn-primary btn-lg"
              type="submit"
              disabled = {!isCar}
              onClick={this.saveOrder}
            >
              Zapisz zamówienie
            </button>
          </form>
        </ReactBootStrap.Card.Body>
      </ReactBootStrap.Card>
    );
  }
}
