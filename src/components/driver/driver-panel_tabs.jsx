import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";


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
          orders
        </Tab>
        <Tab eventKey="customers" title="Klienci">
          customers
        </Tab>
      </Tabs>
    );
  }
}
