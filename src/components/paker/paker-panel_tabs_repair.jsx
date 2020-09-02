import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as ReactBootStrap from "react-bootstrap";
import authService from "../../services/auth.service";
import RepairDetails from "./paker-panel_tabs_repair_details";
import maintenenceService from "../../services/maintenence-service";

export default class PakerRepairs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      curr: authService.getCurrentUser(),
      columns: [
        {
          dataField: "id",
          text: "ID",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "carId",
          text: "Auto",
          sort: true,
          filter: textFilter(),
        },
        {
          dataField: "status",
          text: "status",
          sort: true,
          filter: textFilter(),
        },
      ],
      maitanenceData: [],
      row: {},
      id: "",
      localization: "",
      loaded: false,
      details: false,
      newCar: false,
    };
  }
  componentDidMount() {
    this.getMaintenenceList()
  }
  HandleBack = () => {
    this.setState({
      details: false,
      newCar: false,
    });
    setTimeout(() => {
      this.getMaintenenceList();
    }, 1000);
  };

  getMaintenenceList = () => {
    this.setState({ loading: false });
    maintenenceService.getAllMaintenece().then(
      (response) => {
        this.setState({
          maitanenceData: response.data,
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
    const { row, details, loaded, maitanenceData, columns } = this.state;
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
        <RepairDetails
          row={row}
          details={details}
          clickBack={this.HandleBack}
        />
      ) : (
        <>
          <BootstrapTable
            keyField="id"
            striped
            hover
            filter={filterFactory()}
            data={maitanenceData}
            columns={columns}
            rowEvents={rowEvents}
            pagination={paginationFactory()}
          />
        </>
      )
    ) : (
      <div className="d-flex justify-content-center">
        <ReactBootStrap.Spinner animation="border" />
      </div>
    );
  }
}
