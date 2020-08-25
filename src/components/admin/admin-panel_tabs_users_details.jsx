import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import cityService from "../../services/city-service";
import userService from "../../services/user.service";

export default class UsersDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      userName: props.row.userName,
      name: props.row.name,
      surname: props.row.surname,
      number: props.row.number,
      email: props.row.email,
      roles: props.row.roles,
      localization: "",
      isFree: props.row.isFree,

      role_admin: false,
      role_moderator: false,
      role_driver: false,
      role_paker: false,

      row: props.row,
      details: props.details,
      changed: false,
    };
  }

  componentDidMount() {
    this.getCityName();
    this.parseRoles();
  }

  parseRoles = () => {
    this.setState({
      role_admin: this.state.roles.includes("ROLE_ADMIN"),
      role_moderator: this.state.roles.includes("ROLE_MODERATOR"),
      role_driver: this.state.roles.includes("ROLE_DRIVER"),
      role_paker: this.state.roles.includes("ROLE_PAKER"),
    });
  };

  getCityName = () => {
    console.log("get city")
    this.setState({ loading: false });
    cityService.getCityData(this.state.row.localization).then(
      (response) => {
        this.setState({
          localization: response.data.name,
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

  UpdateUser = (event) =>{

    event.preventDefault()
    const rolesArray = this.GenerateRoleArray();

    userService.updateUser(this.state.userName, this.state.name, this.state.surname, this.state.number, this.state.email, rolesArray, this.state.row.localization).then(
      (response) => {
        this.setState({
          localization: response.data.name,
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
    this.props.clickBack()
  }

  GenerateRoleArray = ()=>{
      var array = []
      this.state.role_paker && array.push("ROLE_PAKER")
      this.state.role_driver && array.push("ROLE_DRIVER")
      this.state.role_moderator && array.push("ROLE_MODERATOR")
      this.state.role_admin && array.push("ROLE_ADMIN")
      return array
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
    const {
      id,
      userName,
      name,
      surname,
      number,
      email,
      localization,
    } = this.state;
    return (
      <>
        <ReactBootStrap.Card>
          <ReactBootStrap.Card.Title>
            Profil <strong>{userName}</strong>
          </ReactBootStrap.Card.Title>
          <ReactBootStrap.Card.Body>
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

                <label>Login:</label>
                <input
                  name="userName"
                  type="text"
                  defaultValue={userName}
                  className="form-control"
                  readOnly
                />

                <label>Imię:</label>
                <input
                  onChange={this.OnChangeHandler}
                  name="name"
                  type="text"
                  value={name}
                  className="form-control"
                />

                <label>Nazwisko:</label>
                <input
                  onChange={this.OnChangeHandler}
                  name="surname"
                  type="text"
                  value={surname}
                  className="form-control"
                />

                <label>Numer telefonu:</label>
                <input
                  onChange={this.OnNumberHandler}
                  name="number"
                  maxLength="9"
                  type="text"
                  value={number}
                  className="form-control"
                />

                <label>Address email:</label>
                <input
                  onChange={this.OnChangeHandler}
                  name="email"
                  type="email"
                  value={email}
                  className="form-control"
                />

                <label>Lokalizacja:</label>
                <input
                  name="localization"
                  type="text"
                  defaultValue={localization}
                  className="form-control"
                  readOnly
                />
                <label>Uprawnienia:</label>
                <div className="form-check">
                  <input
                    onChange={this.OnChangeHandler}
                    className="form-check-input"
                    type="checkbox"
                    name="role_paker"
                    checked={this.state.role_paker}
                  />
                  <label className="form-check-label">Pracownik</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={this.OnChangeHandler}
                    className="form-check-input"
                    type="checkbox"
                    name="role_driver"
                    checked={this.state.role_driver}
                  />
                  <label className="form-check-label">Kierowca</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={this.OnChangeHandler}
                    className="form-check-input"
                    type="checkbox"
                    name="role_moderator"
                    checked={this.state.role_moderator}
                  />
                  <label className="form-check-label">Moderator</label>
                </div>
                <div className="form-check">
                  <input
                    onChange={this.OnChangeHandler}
                    className="form-check-input"
                    type="checkbox"
                    name="role_admin"
                    checked={this.state.role_admin}
                  />
                  <label className="form-check-label">Administrator</label>
                </div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={this.UpdateUser} >Zapisz zmiany</button>
            </form>
            <button
              style={{ marginTop: 30 }}
              className="btn btn-danger btn-lg"
              onClick={this.props.deleteOne}
            >
              Usuń użytkownika
            </button>
            <br />
            <button
              style={{ marginTop: 30 }}
              className="btn btn-secondary btn-lg"
              onClick={this.props.clickBack}
            >
              Powrót
            </button>
          </ReactBootStrap.Card.Body>
        </ReactBootStrap.Card>
      </>
    );
  }
}
