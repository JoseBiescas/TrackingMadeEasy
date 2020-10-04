import React, { Component } from "react";
import Modal from "react-modal";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { updateCard } from "../../actions/cardAction";

class UpdateCard extends Component {
  constructor() {
    super();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      labels: "",
    };
  }

  componentDidMount() {
    let curr_card = JSON.parse(this.props.card);
    this.setState({
      title: curr_card.title,
      description: curr_card.description,
      labels: curr_card.labels,
    });
  }

  onClose = (e) => {
    this.props.onClose(e);
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    let curr_card = JSON.parse(this.props.card);
    this.props.updateCard(this.state, curr_card._id);
  };

  render() {
    return (
      <div className="modal-popup">
        <Modal isOpen={this.props.modal} ariaHideApp={false}>
          <h2>Update Your Card!</h2>
          <div className="container-modal">
            <button className="close-modal" onClick={this.onClose}>
              Exit
            </button>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="title-modal">
                <label>Title</label>
                <input
                  id="title"
                  type="text"
                  onChange={this.onChange}
                  value={this.state.title}
                />
              </div>
              <div className="description-modal">
                <label>Description</label>
                <br ></br>
                <br ></br>
                <input
                  id="description"
                  type="textarea"
                  value={this.state.description}
                  onChange={this.onChange}
                />
              </div>
              <div className="labels-modal">
                <label>Label</label>
                <input
                  id="labels"
                  type="text"
                  value={this.state.labels}
                  onChange={this.onChange}
                />
              </div>
              <div className="button-modal">
                <button
                  type="submit"
                  className="btn waves-effect waves-light hoverable blue accent-3"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { updateCard })(withRouter(UpdateCard));
