import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import DriverOrders from "./driver-panel_tabs_orders";
import RepairDriver from "./driver-panel_tabs_repair";


export default class DriverPanelTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      key: "orders",
    };
  }
  render() {
    const { key } = this.state;
    return (
      <Tabs
        id="driver-panel-tabs"
        activeKey={key}
        onSelect={(key) => this.setState({ key })}
      >
        <Tab eventKey="orders" title="Zamówienia">
          <DriverOrders />
        </Tab>
        <Tab eventKey="repairs" title="Zgłoś naprawę">
          <RepairDriver />
        </Tab>
      </Tabs>
    );
  }
}
