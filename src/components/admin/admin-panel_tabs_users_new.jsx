import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import userService from "../../services/user.service";
import authService from "../../services/auth.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        To pole jest wymagane!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        To nie jest poprawny adres email!
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Login musi mnieć od 3 do 20 znaków!
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        Hasło musi mnieć od 6 do 40 znaków!
      </div>
    );
  }
};

export default class UserNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
      id: "",
      userName: "",
      name: "",
      surname: "",
      number: "",
      email: "",
      roles: [],
      password: "",
      localization: "",
      isFree: true,
      isDriver: false,
      role_admin: false,
      role_moderator: false,
      role_driver: false,
      role_paker: false,

      canSave:false,

      successful: false,
      message: "",
    };
  }

  componentDidUpdate(){
    if(!this.state.canSave){
      if(this.state.id!=="" && this.state.userName!=="" &&this.state.name!==""&&this.state.surname!==""&&this.state.number!==""&&this.state.email!==""&&this.state.password!==""&&this.state.localization!==""&&this.state.role_admin||this.state.role_driver||this.state.role_moderator||this.state.role_paker){
        this.setState({
          canSave:true,
        }
        )
      }
    }
  }

  componentDidMount(){
    userService.findById(this.state.currentUser.id).then(
      (response) => {
        this.setState({
          localization: response.data.localization,
        });
      },
      (error) => {
        console.log(error)
        });
      }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

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

  GenerateRoleArray = () => {
    var array = [];
    this.state.role_paker && array.push("ROLE_PAKER");
    this.state.role_driver && array.push("ROLE_DRIVER");
    this.state.role_moderator && array.push("ROLE_MODERATOR");
    this.state.role_admin && array.push("ROLE_ADMIN");
    return array;
  };

  handleRegister = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      const rolesArray = this.GenerateRoleArray();

      userService
        .createUser(
          this.state.userName,
          this.state.name,
          this.state.surname,
          this.state.number,
          this.state.email,
          this.state.password,
          rolesArray,
          this.state.localization,
          this.state.isDriver
        )
        .then(
          (response) => {
            this.setState({
              message: response.data.message,
              successful: true,
            });
            this.props.clickBack()
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
    }
  };

  render() {
    return (
      <ReactBootStrap.Card>
        <ReactBootStrap.Card.Title>Nowy Profil</ReactBootStrap.Card.Title>
        <ReactBootStrap.Card.Body>
          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Login</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.OnChangeHandler}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Hasło</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Imię</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="name"
                    value={this.state.name}
                    onChange={this.OnChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="surname">Nazwisko</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={this.state.surname}
                    onChange={this.OnChangeHandler}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="number">Numer</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="number"
                    value={this.state.number}
                    onChange={this.OnNumberHandler}
                  />
                </div>
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

                  <button style={{marginTop: 30}} className="btn btn-primary btn-lg" disabled={!this.state.canSave}>Dodaj użytkownika</button>
                
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <button
              style={{ marginTop: 30 }}
              className="btn btn-secondary btn-lg"
              onClick={this.props.clickBack}
            >
              Powrót
            </button>
        </ReactBootStrap.Card.Body>
      </ReactBootStrap.Card>
    );
  }
}
