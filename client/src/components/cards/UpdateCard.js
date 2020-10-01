import React, { Component } from "react";
import Modal from "react-modal";

class UpdateCard extends Component {

  onClose = e => {
    this.props.onClose(e);
  }

  render() {
    return (
      <div className="modal-popup">
        <Modal isOpen={this.props.modal}>
          <h2>Update Your Card!</h2>
          <button className="close-modal" onClick={this.onClose}>x</button>
        </Modal>
      </div>
    );
  }
}

export default UpdateCard;