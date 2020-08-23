import React, { Component } from "react";
import AuthService from "../services/auth.service";
import ProfileService from "../services/profile-service";
import CityService from "../services/city-service";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userData: {},
      message: {},
      localization: {},
      oldPassword: "",
      newPassword: "",
      open: false,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    ProfileService.changePassword(
      this.state.currentUser.id,
      this.state.newPassword,
      this.state.oldPassword
    )
      .then((response) => {
        console.log(response.data);
        this.setState({
          message: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({
      oldPassword: "",
      newPassword: "",
    });
  };
  componentWillMount() {
    ProfileService.getUserData(this.state.currentUser.id).then((response) => {
      this.setState({ userData: response.data });
      CityService.getCityData(this.state.userData.localization).then(
        (response) => {
          this.setState({
            localization: response.data,
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
    });
  }

  OnChangeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { userData, localization, open } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>
            Profil <strong>{userData.userName}</strong>
          </h3>
        </header>
        <p>
          <strong>Imię:</strong> {userData.name}
        </p>
        <p>
          <strong>Nazwisko:</strong> {userData.surname}
        </p>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Lokalizacja:</strong> {localization.name}
        </p>
        <hr />

        <Button
          onClick={() => {
            this.setState((prevState) => {
              return {
                open: !prevState.open,
              };
            });
          }}
          aria-controls="change-password-form"
          aria-expanded={open}
        >
          Zmień hasło
        </Button>
        <br/>
        <Collapse in={open}>
          <div id="change-password-form">
            <h4>Zmiana hasła</h4>
            {this.state.message.message}
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Stare hasło:</label>
                <input
                  onChange={this.OnChangeHandler}
                  name="oldPassword"
                  type="password"
                  className="form-control"
                  value={this.state.oldPassword}
                />
              </div>
              <div className="form-group">
                <label>Nowe hasło:</label>
                <input
                  onChange={this.OnChangeHandler}
                  name="newPassword"
                  type="password"
                  className="form-control"
                  value={this.state.newPassword}
                />
              </div>

              <button className="btn btn-secondary btn-lg">Zapisz</button>
            </form>
          </div>
        </Collapse>
      </div>
    );
  }
}
