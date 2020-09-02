import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import CustomerDetails from "./mod-panel_tabs_customers_details";
import CustomerNew from "./mod-panel_tabs_customers_new";
import customerService from "../../services/customer-service";

export default class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          dataField: "name",
          text: "Imię",
          sort: true,
          filter: textFilter(),
        },
        { 
            dataField: "surname", 
            text: "Nazwisko", 
            sort: true, 
            filter: textFilter() 
        },
        {
          dataField: "email",
          text: "Adres email",
          sort: true,
          filter: textFilter(),
        }
      ],
      customerData: [],
      row: {},
      id: "",
      loaded: false,
      details: false,
      newCustomer: false,
    };
  }

  componentDidMount() {
    this.getCustomerList();
  }
  HandleBack = () => {
    this.setState({
      details: false,
      newCustomer: false,
    });
    setTimeout(() => {  this.getCustomerList() }, 1000);
  };

  DeleteUser = () => {
    this.setState({
      details: false,
    });

    customerService.deleteCustomer(this.state.row.id).then(
      (response) => {
        this.setState({
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
    )
    this.getCustomerList()    
  }

  getCustomerList = () => {
    customerService.getAllCustomers().then(
        (response) => {
        this.setState({
          customerData: response.data,
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
    )
  };

  render() {
    const {
      row,
      details,
      loaded,
      customerData,
      columns,
      newCustomer,
    } = this.state;
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
        <CustomerDetails
          row={row}
          details={details}
          clickBack={this.HandleBack}
          deleteOne={this.DeleteUser}
        />
      ) : (
        newCustomer?(
          <CustomerNew clickBack={this.HandleBack}/>
        ):(
          <>
          <button
            style={{ marginTop: 30 }}
            className="btn btn-success btn-lg"
            onClick={()=>this.setState({newCustomer:true})}
          >
            Nowy klient
          </button>
          <BootstrapTable
            keyField="id"
            striped
            hover
            filter={filterFactory()}
            data={customerData}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
          />
        </>
        )
        
      )
    ) : (
      <div className="d-flex justify-content-center">
        <ReactBootStrap.Spinner animation="border" />
      </div>
    );
  }
}
