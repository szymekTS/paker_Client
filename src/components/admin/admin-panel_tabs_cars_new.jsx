import React, { Component } from "react";
import { Card } from "react-bootstrap";
import carService from "../../services/car-service";
import cityService from "../../services/city-service";

export default class CarNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cityData:[],
      message: "",
      brand: "",
      model: "",
      licensePlate: "",
      localization: "",
      carType: "",
      canSave: false,
    };
  }

  componentDidMount(){
    this.getCitiesList()
  }

  componentDidUpdate(){
    if(!this.state.canSave){
      if(this.state.brand!=="" && this.state.model!=="" &&this.state.licensePlate!=="" &&this.state.localization!=="" &&this.state.carType!=="" ){
        this.setState({
          canSave:true,
        }
        )
      }
    }
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

  AddNewCar = (event) =>{
    event.preventDefault()
    carService.addNewCar(this.state.brand, this.state.model, this.state.licensePlate, this.state.localization, this.state.carType).then(
      (response) => {
        console.log(response)
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
          <form>
            <div className="form-group">
              <label>Marka</label>
              <input
                className="form-control"
                name="brand"
                onChange={this.OnChangeHandler}
              ></input>
            </div>
            <div className="form-group">
              <label>Model</label>
              <input
                className="form-control"
                name="model"
                onChange={this.OnChangeHandler}
              ></input>
            </div>
            <div className="form-group">
              <label>Numer rejestracyjny</label>
              <input
                className="form-control"
                name="licensePlate"
                onChange={this.OnChangeHandler}
                maxLength="8"
              ></input>
            </div>
            <div className="form-group">
              <label>Typ auta</label>
              <select
                className="form-control"
                name="carType"
                onChange={this.OnChangeHandler}
              >
                <option key="0" value="">
                --Wybierz typ auto--
                </option>
                <option key="1" value="TYPE_SMALL">
                  Małe auto dostawcze
                </option>
                <option key="2" value="TYPE_MID">
                  Auto dostawcze
                </option>
                <option key="3" value="TYPE_BIG">
                  Duże auto dostawcze
                </option>
                <option key="4" value="TYPE_SPECIAL">
                  TIR
                </option>
              </select>
            </div>
            <div className="form-group">
              <label>Lokalizacja</label>
              <select
                className="form-control"
                name="localization"
                onChange={this.OnChangeHandler}
              >
                <option>---</option>
                {this.state.cityData.map((city) => {
                return (
                  <option key={city.id} value={city.id}>
                    {city.name},{city.zipCode}
                  </option>
                );
              })}
              </select>
            </div>
            <button
              style={{ marginTop: 30 }}
              onClick={this.AddNewCar}
              className="btn btn-primary btn-lg"
              disabled={!this.state.canSave}
            >
              Zapisz auto
            </button>
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
