import React, { Component } from "react";
import userService from "../../services/user.service";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import authService from "../../services/auth.service";
import UserDetails from "./admin-panel_tabs_users_details";
import UserNew from "./admin-panel_tabs_users_new";

export default class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
      columns: [
        {
          dataField: "userName",
          text: "Login",
          sort: true,
          filter: textFilter(),
        },
        { dataField: "name", text: "Imię", sort: true, filter: textFilter() },
        {
          dataField: "surname",
          text: "Nazwisko",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "number",
          text: "Numer",
          sort: true,
          filter: textFilter(),
        },
        { dataField: "email", text: "Email", sort: true, filter: textFilter() },
      ],
      row: {},
      id: "",
      localization: {},
      loaded: false,
      details: false,
      newUser: false,
    };
  }

  componentDidMount() {
    this.getUserList();
  }
  HandleBack = () => {
    this.setState({
      details: false,
      newUser: false,
    });
    setTimeout(() => {  this.getUserList() }, 1000);
  };

  DeleteUser = () => {
    this.setState({
      details: false,
    });
    userService.deleteUser(this.state.id).then(
      (response) => {
        console.log(response);
        this.getUserList();
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

  getUserList = () => {
    this.setState({ loading: false });
    userService.getAllUsers().then(
      (response) => {
        this.setState({
          usersData: response.data,
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
    const {
      row,
      details,
      loaded,
      usersData,
      columns,
      newUser,
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
        <UserDetails
          row={row}
          details={details}
          clickBack={this.HandleBack}
          deleteOne={this.DeleteUser}
        />
      ) : (
        newUser?(
          <UserNew clickBack={this.HandleBack}/>
        ):(
          <>
          <button
            style={{ marginTop: 30 }}
            className="btn btn-success btn-lg"
            onClick={()=>this.setState({newUser:true})}
          >
            Nowy użytkownik
          </button>
          <BootstrapTable
            keyField="id"
            striped
            hover
            filter={filterFactory()}
            data={usersData}
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
