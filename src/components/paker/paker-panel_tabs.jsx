import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import PakerOrders from "./paker-panel_tabs_orders";
import PakerRepairs from "./paker-panel_tabs_repair";

export default class PakerPanelTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      key: "paker",
    };
  }
  render() {
    const { key } = this.state;
    return (
      <Tabs
        id="paker-panel-tabs"
        activeKey={key}
        onSelect={(key) => this.setState({ key })}
      >
        <Tab eventKey="paker" title="Zapakuj">
          <PakerOrders />
        </Tab>
        <Tab eventKey="maintanence" title="Naprawy">
          <PakerRepairs />
        </Tab>
      </Tabs>
    );
  }
}