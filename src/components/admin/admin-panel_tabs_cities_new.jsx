import React, { Component } from "react";
import { Card } from "react-bootstrap";
import cityService from "../../services/city-service";

export default class CityNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      province: "",
      zipCode: "",
      message: "",
    };
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

  AddNewCity=(event)=>{
    event.preventDefault()
    cityService.addNewCity(this.state.name, this.state.province, this.state.zipCode).then(
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

  render() {
    return (
      <Card>
        <Card.Title>Nowe Miasto</Card.Title>
        <Card.Body>
          <form>
            <div className="form-group">
              <label>Nazwa miasta</label>
              <input
                className="form-control"
                name="name"
                onChange={this.OnChangeHandler}
              ></input>
            </div>
            <div className="form-group">
            <label>Województwo</label>
              <select
                className="form-control"
                name="province"
                onChange={this.OnChangeHandler}
              >
                <option key="0" value="PROV_DOLNOSLASKIE">--Wybierz województwo--</option>
                <option key="1" value="PROV_DOLNOSLASKIE">dolnośląskie</option>
                <option key="2" value="PROV_KUJAWSKOPOMORSKIE">kujawsko-pomorskie</option>
                <option key="3" value="PROV_LUBELSKIE">lubelskie</option>
                <option key="4" value="PROV_LUBUSKIE">lubuskie</option>
                <option key="5" value="PROV_LODZKIE">łódzkie</option>
                <option key="6" value="PROV_MALOPOLSKIE">małopolskie</option>
                <option key="7" value="PROV_MAZOWIECKIE">mazowieckie</option>
                <option key="8" value="PROV_OPOLSKIE">opolskie</option>
                <option key="9" value="PROV_PODKARPACKIE">podkarpackie</option>
                <option key="10" value="PROV_PODLASKIE">podlaskie</option>
                <option key="11" value="PROV_POMORSKIE">pomorskie</option>
                <option key="12" value="PROV_SLASKIE">śląskie</option>
                <option key="13" value="PROV_SWIETOKRZYSKIE">świętokrzyskie</option>
                <option key="14" value="PROV_WARMINSKOMAZURSKIE">warmińsko-mazurskie</option>
                <option key="15" value="PROV_WIELKOPOLSKIE">wielkopolskie</option>
                <option key="16" value="PROV_ZACHODNIOPOMORSKIE">zachodniopomorskie</option>
              </select>
            </div>
            <div className="form-group">
            <label>Kod pocztowy</label>
              <input
                className="form-control"
                name="zipCode"
                onChange={this.OnChangeHandler}
                maxLength="6"
              ></input>
            </div>
            <button
              style={{ marginTop: 30 }}
              onClick={this.AddNewCity}
              className="btn btn-primary btn-lg"
            >
              Zapisz miasto
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
