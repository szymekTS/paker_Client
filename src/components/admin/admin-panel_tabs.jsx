import React, { Component } from "react";
import { Tab, Tabs } from "react-bootstrap";
import Users from "./admin-panel_tabs_users";
import Cities from "./admin-panel_tabs_cities";
import Cars from "./admin-panel_tabs_cars";



export default class AdminPanelTab extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      key: "users",
    };
  }

  componentDidMount(){
    
  }

  render() {
    const { key } = this.state;
    return (
      <Tabs
        id="admin-panel-tabs"
        activeKey={key}
        onSelect={(key) => this.setState({ key })}
      >
        <Tab eventKey="users" title="Użytkownicy">
          <Users />
        </Tab>
        <Tab eventKey="cities" title="Miasta">
          <Cities />
        </Tab>
        <Tab eventKey="cars" title="Auta">
          <Cars />
        </Tab>
      </Tabs>
    );
  }
}
