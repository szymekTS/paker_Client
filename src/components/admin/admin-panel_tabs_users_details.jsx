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
      isFree: props.row.free,
      isDriver: props.row.driver,

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

    userService.updateUser(this.state.userName, this.state.name, this.state.surname, this.state.number, this.state.email, rolesArray, this.state.row.localization,this.state.isDriver).then(
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

  ResetPassword = () =>{
    userService.resetPassword(this.state.id).then(
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
    );
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
      ? this.setState({ [name]: checked,changed:true })
      : this.setState({ [name]: value ,
      changed:true});
  };
  OnNumberHandler = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      this.setState({ number: event.target.value ,changed:true});
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
      changed
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
                <label>Kierowca:</label>
                <div className="form-check">
                  <input
                    onChange={this.OnChangeHandler}
                    className="form-check-input"
                    type="checkbox"
                    name="isDriver"
                    checked={this.state.isDriver}
                  />
                  <label className="form-check-label">Kierowca</label>
                </div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={this.UpdateUser} disabled={!changed}>Zapisz zmiany</button>
            </form>
            <button
              style={{ marginTop: 30 }}
              className="btn btn-warning btn-lg"
              onClick={this.ResetPassword}
            >
              Reset hasła
            </button>
            <br />
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
