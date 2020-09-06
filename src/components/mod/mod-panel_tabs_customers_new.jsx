import React, { Component } from "react";
import * as ReactBootStrap from "react-bootstrap";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import customerService from "../../services/customer-service";

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

export default class UserNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      surname: "",
      email: "",

      canSave: false,
     
      successful: false,
      message: "",
    };
  }

  componentDidUpdate(){
    if(!this.state.canSave){
      if(this.state.name!=="" && this.state.surname!=="" &&this.state.email!=="" ){
        this.setState({
          canSave:true,
        }
        )
      }
    }
  }

  onChangeEmail = (e) => {
    this.setState({
      email: e.target.value,
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

  handleNewCustomer = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      customerService.addNewCustomer(this.state.name, this.state.surname, this.state.email).then(
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
      )
    }
    this.props.clickBack()
  };

  render() {
    return (
      <ReactBootStrap.Card>
        <ReactBootStrap.Card.Title>Nowy klient</ReactBootStrap.Card.Title>
        <ReactBootStrap.Card.Body>
          <Form
            onSubmit={this.handleNewCustomer}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
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
                  <button style={{marginTop: 30}} className="btn btn-primary btn-lg" disabled={!this.state.canSave}>Dodaj klienta</button>
                
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
