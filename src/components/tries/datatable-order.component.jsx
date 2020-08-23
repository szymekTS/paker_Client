import React from "react";
import { MDBDataTable } from "mdbreact";
import { Component } from "react";

class OrderDataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        columns: [
          {
            label: "Id",
            field: "id",
            sort: "asc",
            width: 150,
          },
          {
            label: "Car",
            field: "car",
            sort: "asc",
            width: 270,
          },
          {
            label: "Cargo",
            field: "car",
            sort: "asc",
            width: 200,
          },
          {
            label: "Age",
            field: "age",
            sort: "asc",
            width: 100,
          },
          {
            label: "Start date",
            field: "date",
            sort: "asc",
            width: 150,
          },
          {
            label: "Salary",
            field: "salary",
            sort: "asc",
            width: 100,
          },
          {
            label: "Edit",
            field: "edit",
            sort: "asc",
            width: 100,
          },
        ],
        rows: this.props.rows,
      },
    };

    return <MDBDataTable striped bordered hover data={this.state.data} />;
  }
}
export default OrderDataTable;
