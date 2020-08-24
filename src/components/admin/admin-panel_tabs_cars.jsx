import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import carService from "../../services/car-service";
import CarDetails from "./admin-panel_tabs_cars_details";
import CarNew from "./admin-panel_tabs_cars_new";

export default class Cars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        {
          dataField: "brand",
          text: "Marka",
          sort: true,
          filter: textFilter(),
        },
        { dataField: "model", text: "Model", sort: true, filter: textFilter() },
        {
          dataField: "licensePlate",
          text: "Numery rejestracyjne",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "number",
          text: "Numer",
          sort: true,
          filter: textFilter(),
        }
      ],
      carsData: [],
      row: {},
      id: "",
      localization: {},
      loaded: false,
      details: false,
      newCar: false,
    };
  }

  componentDidMount() {
    this.getCarsList();
  }
  HandleBackFromEdit = () => {
    this.setState({
      details: false,
    });
  };
  HandleBackFromNewUser = () => {
    this.setState({
      newCar: false,
    });
  };
  DeleteUser = () => {
    this.setState({
      details: false,
    });
    carService.deleteCar(this.state.row.id).then(
      (response) => {
        console.log(response);
        this.getCarsList();
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

  getCarsList = () => {
    this.setState({ loading: false });
    carService.getAllCars().then(
      (response) => {
        this.setState({
          carsData: response.data,
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
      carsData,
      columns,
      newCar,
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
        <CarDetails
          row={row}
          details={details}
          clickBack={this.HandleBackFromEdit}
          deleteOne={this.DeleteUser}
        />
      ) : (
        newCar?(
          <CarNew clickBack={this.HandleBackFromNewUser}/>
        ):(
          <>
          <button
            style={{ marginTop: 30 }}
            className="btn btn-success btn-lg"
            onClick={()=>this.setState({newCar:true})}
          >
            Nowe auto
          </button>
          <BootstrapTable
            keyField="id"
            striped
            hover
            filter={filterFactory()}
            data={carsData}
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
