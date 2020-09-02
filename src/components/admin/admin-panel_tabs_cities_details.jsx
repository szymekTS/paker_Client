import React, { Component } from "react";
import {  Card } from "react-bootstrap";
import cityService from "../../services/city-service";

export default class CityDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.row.id,
      name: props.row.name,
      province: props.row.province,
      zipCode: props.row.zipCode,
      neighbours: [],
      names: [],
      selected:"",
      distance: 0
    };
  }

  componentDidMount(){
      this.getNeighbours()
  }

  getNeighbours = () =>{
      cityService.getCityNeighbours(this.state.id).then(
        (response) => {
            this.setState({
              neighbours: response.data.neighbours,
              names: response.data.names,
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
  }

  AddNeighbours = (event) =>{
    cityService.addNewNeighbour(this.state.id,this.state.selected, this.state.distance).then(
      (response) => {
        this.setState({
          neighbours: response.data.neighbours,
          names: response.data.names,
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
      this.props.clickBack()
  }

  OnSelect=(event)=>{
    const{value} = event.target
    this.setState({
      selected: value
    })
  }
  OnDistance = (event) =>{
    const{value} = event.target
    this.setState({
      distance: value
    })
  }

  render() {
    const { id, name, province, zipCode ,neighbours, names} = this.state;
    const list =[];
    for(var key in neighbours){
      list.push({name:`${names[key]} - ${neighbours[key] } km`,id:key})
    }
    return (
      <Card>
        <Card.Title>
          Miasto <strong>{name}</strong>
        </Card.Title>
        <Card.Body>
          <form>
            <div className="form-group">
              <label>Id:</label>
              <input
                name="id"
                type="text"
                defaultValue={id}
                className="form-control"
                readOnly
              />

              <label>Nazwa:</label>
              <input
                name="name"
                type="text"
                defaultValue={name}
                className="form-control"
                readOnly
              />

              <label>Wojewodztwo:</label>
              <input
                name="province"
                type="text"
                defaultValue={province}
                className="form-control"
                readOnly
              />

              <label>Kod pocztowy:</label>
              <input
                name="zipCode"
                type="text"
                defaultValue={zipCode}
                className="form-control"
                readOnly
              />
            </div>
            <div className="form-group">
            <label>Sąsiedzi</label>
            <ul className="list-group">
                {list.map(item =>{
                  return (
                  <li className="list-group-item" key={item.id}>{item.name}</li>
                  )
                })
                }
            </ul>
            </div>
            <div className="form-group">
              <label>Dodaj nowego sąsiada:</label>
              <label>Miasto:</label>
              <select 
                name="localization"
                onChange={this.OnSelect}
                className="form-control"
                >
                  {this.props.allCities.map(city=>{
                    return (<option key={city.id} value={city.id}>{city.name}, {city.zipCode}</option>)
                  })}
                </select>
                <label>Dystans</label>
                <input className="form-control" type="number" value={this.state.distance} onChange={this.OnDistance}></input>

            </div>
            <button className="btn btn-primary btn-lg" onClick={this.AddNeighbours} >Zapisz sąsiada</button>
          </form>
          <button
              style={{ marginTop: 30 }}
              className="btn btn-danger btn-lg"
              onClick={this.props.deleteOne}
            >
              Usuń miasto
            </button><br/>
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
