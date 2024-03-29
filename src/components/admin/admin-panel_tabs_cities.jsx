import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import authService from "../../services/auth.service";
import cityService from "../../services/city-service";
import CityDetails from "./admin-panel_tabs_cities_details";
import CityNew from "./admin-panel_tabs_cities_new";

export default class Cities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: authService.getCurrentUser(),
      columns: [
        {
          dataField: "name",
          text: "Nazwa",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "zipCode",
          text: "Kod pocztowy",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "province",
          text: "Województwo",
          sort: true,
          filter: textFilter(),
        },
      ],
      citiesData:[],
      row: {},
      loading: false,
      details: false,
      newCity: false
    };
  }

  componentDidMount() {
    this.getCitiesList();
  }
  HandleBack = () => {
    this.setState({
      details: false,
      newCity: false
    });
    setTimeout(() => {  this.getCitiesList() }, 1000);
  };
  DelOne =() =>{
    this.setState({
      details: false,
    })
    cityService.deleteCity(this.state.row.id).then(
      (response) => {
        console.log(response);
        this.getCitiesList();
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
  }

  getCitiesList = () => {
    this.setState({ loading: false });
    cityService.getAllCities().then(
      (response) => {
        this.setState({
          citiesData: response.data,
          loading: true,
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
      loading,
      columns,
      citiesData,
      newCity
    } = this.state;
    const rowEvents = {
      onClick: (e, row, rowIndex) => {
        this.setState({
          row: row,
          details: true,
        });
      },
    };
    return loading ? (
      details ? (
        <CityDetails row={row} details={details} clickBack={this.HandleBack} deleteOne={this.DelOne} allCities={citiesData}/>
      ) : (
        newCity?(<CityNew clickBack={this.HandleBack}/>):(        <>
          <button
          style={{ marginTop: 30 }}
          className="btn btn-success btn-lg"
          onClick={()=>this.setState({newCity:true})}
        >
          Nowe miasto
        </button>
          <BootstrapTable
            keyField="id"
            striped
            hover
            filter={filterFactory()}
            data={citiesData}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
          />
          </>)

      )
    ) : (
      <div className="d-flex justify-content-center">
        <ReactBootStrap.Spinner animation="border" />
      </div>
    );
  }
}
