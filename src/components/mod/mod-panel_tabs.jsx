import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Customers from "./mod-panel_tabs_customers";
import Orders from "./mod-panel_tabs_orders";
import OrderNew from "./mod-panel_tabs_order_new";

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
          <OrderNew />
        </Tab>
        <Tab eventKey="customers" title="Klienci">
          <Customers />
        </Tab>
        <Tab eventKey="orders" title="Zamówienia">
          <Orders />
        </Tab>
      </Tabs>
    );
  }
}
