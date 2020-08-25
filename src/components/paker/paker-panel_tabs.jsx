import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";

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
          pack it
        </Tab>
        <Tab eventKey="maintanence" title="Naprawy">
          naprawy
        </Tab>
      </Tabs>
    );
  }
}