import React, { Component } from "react";

import AuthService from "../services/auth.service";
import ProfileService from "../services/profile-service";
import PakerService from "../services/paker-service";
import CityService from "../services/city-service";
import Basic from "./datatable-order.component";
import ModalPage from "./modal";

export default class BoardPaker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
      userData: {},
      orderList: [],
      localization: {},
      content: "",
    };
  }

  componentDidMount() {
    ProfileService.getUserData(this.state.currentUser.id).then(
      (response) => {
        this.setState({
          userData: response.data,
        });

        PakerService.getOrdersFromLocalizationWithStatus(
          "STATUS_ACCEPTED",
          this.state.userData.localization
        ).then(
          (response) => {
            this.setState({
              orderList: response.data,
            });

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

  render() {
    const { userData, orderList, localization } = this.state;
    const list =
      orderList.length === 0 ? (
        <h2>
          W lokalizacji {localization.name} nie ma zamówień do zapakowania
        </h2>
      ) : (
        <h2>Lista zamówień w {localization.name}</h2>
      );
      const rows = orderList.map((order) => {
        return {
          id: order.id,
          car: order.car,
          cargo: order.cargo,
          customer: order.customer,
          lastStatus: order.lastStatus,
          localization: order.localization,
          origin: order.origin,
          destiny: order.destiny,
          route: order.route,
          edit: (
            <ModalPage
              props={order.id, order.lastStatus, this.state.currentUser.id}
            />
          ),
        };
      });

    return (
      <div className="container">
        {list}
        {//orderList.length !== 0 && <Basic props={rows}/>}
  }
      </div>
    );
  }
}
