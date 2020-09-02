import React, { Component } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import maintenenceService from "../../services/maintenence-service";

export default class RepairDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      carId: props.row.carId,
      description: props.row.description,
      status: props.row.status,

      openRepairHistory: false,
      carRepairs: [],
    };
  }
  componentDidMount() {
    maintenenceService.getCarMaintenece(this.state.carId).then(
      (response) => {
        this.setState({
          carRepairs: response.data,
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
  }
  ChangeStatus =()=>{
      maintenenceService.changeMainteneceStatus(this.state.id).then(
        (response) => {
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
      this.props.clickBack()
  }

  OnSelect = (event) => {
    const { value } = event.target;
    this.setState({
      selected: value,
    });
  };
  OnDistance = (event) => {
    const { value } = event.target;
    this.setState({
      distance: value,
    });
  };

  render() {
    const { id, carId, description, status, carRepairs ,openRepairHistory} = this.state;
    return (
      <Card>
        <Card.Title>
          Naprawa <strong>{id}</strong> auta <strong>{carId}</strong>
        </Card.Title>
        <Card.Body>
          <label>Auto:</label>
          <input
            type="text"
            defaultValue={carId}
            className="form-control"
            readOnly
          />
          <label>Status naprawy:</label>
          <input
            type="text"
            defaultValue={status}
            className="form-control"
            readOnly
          />
          <label>Opis problemu:</label>
          <input
            type="text"
            defaultValue={description}
            className="form-control"
            readOnly
          />
          <Button
            onClick={() => {
              this.setState((prevState) => {
                return {
                  openRepairHistory: !prevState.openRepairHistory,
                };
              });
            }}
            aria-expanded={openRepairHistory}
            style={{ marginTop: 30 }}
          >
            Pokaż wszystkie naprawy tego auta
          </Button>
          <br></br>
          <Collapse in={openRepairHistory}>
            <ul className="list-group">
              {carRepairs.map((repair) => {
                return ( <il className="list-group-item" key={repair.id}>
                    <b>ID:</b> {repair.id} <b>Auto:</b> {repair.carId}<br></br> 
                    <b>Status:</b> {repair.status}<br></br>
                    <b>Opis:</b> {repair.description}<br></br>
                    <b>Start:</b> {new Date(repair.startTime).toUTCString()}<br></br>
                    
                    {repair.status === "DONE"&&(<><b>Koniec:</b> {new Date(repair.doneTime).toUTCString()}</>)
                    } 
                </il>)
              })}
            </ul>
          </Collapse>

          {status!=="DONE"&&(          <button
            style={{ marginTop: 30 }}
            className="btn btn-warning btn-lg"
            onClick={this.ChangeStatus}
          >
            Zmień status
          </button>)}
          <button
            style={{ marginTop: 30 }}
            className="btn btn-secondary btn-lg"
            onClick={this.props.clickBack}
          >
            Powrót
          </button>
        </Card.Body>
      </Card>
    );
  }
}
