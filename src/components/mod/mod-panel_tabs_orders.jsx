import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import orderService from "../../services/order-service";
import OrderDetails from "./mod-panel_tabs_orders_details";

export default class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          dataField: "car",
          text: "Auto",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "customer",
          text: "Klient",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "driver",
          text: "Kierowca",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "lastStatus",
          text: "Status",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "origin",
          text: "Z",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "destiny",
          text: "Do",
          sort: true,
          filter: textFilter(),
        }
      ],
      orderData: [],
      row: {},
      id: "",
      loaded: false,
      details: false,
      newOrder: false,
    };
  }

  componentDidMount() {
    this.getOrderList();
  }
  HandleBack = () => {
    this.setState({
      details: false,
      newCustomer: false,
    });
    setTimeout(() => {  this.getOrderList() }, 1000);
  };

  getOrderList = () => {
    orderService.getAllOrder().then(
      (response) => {
        this.setState({
          orderData: response.data,
          loaded: true,
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
  };


  render() {
    const { row, details, loaded, orderData, columns } = this.state;
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({
          row: row,
          id: row.id,
          details: true,
        });
      },
    };
    return loaded ? (
      details ? (
        <OrderDetails
          row={row}
          details={details}
          clickBack={this.HandleBack}
          deleteOne={this.DeleteUser}
        />
      ) : (
        <BootstrapTable
          keyField="id"
          striped
          hover
          filter={filterFactory()}
          data={orderData}
          columns={columns}
          rowEvents={rowEvents}
          pagination={paginationFactory()}
        />
      )
    ) : (
      <div className="d-flex justify-content-center">
        <ReactBootStrap.Spinner animation="border" />
      </div>
    );
  }
}
