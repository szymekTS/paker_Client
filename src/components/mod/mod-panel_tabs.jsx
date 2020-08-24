import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Customers from "./mod-panel_tabs_customers";

export default class ModPanelTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      key: "new",
    };
  }
  render() {
    const { key } = this.state;
    return (
      <Tabs
        id="mod-panel-tabs"
        activeKey={key}
        onSelect={(key) => this.setState({ key })}
      >
        <Tab eventKey="new" title="Nowe zamówienie">
          new order
        </Tab>
        <Tab eventKey="customers" title="Klienci">
          <Customers />
        </Tab>
        <Tab eventKey="orders" title="Zamówienia">
          orders
        </Tab>
      </Tabs>
    );
  }
}
