import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
  state = {
    modal: false,
    orderId: this.props.id,
    comment: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  OnChangeHandler = (event) =>{

  }

  SaveChanges = () =>{

  }

  render() {
    return (
      <MDBContainer>
        {/* BUTTON */}
        <MDBBtn color="secondary" onClick={this.toggle}>Zmień status</MDBBtn>
        {/* MODAL */}
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}    >
          <MDBModalHeader toggle={this.toggle}>Dodaj status</MDBModalHeader>
          <MDBModalBody>
            <input onChange={this.OnChangeHandler} type="text" value={this.state.comment} />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={this.toggle}>Close</MDBBtn>
            <MDBBtn color="primary"onClick={this.SaveChanges}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}
export default ModalPage;