import React, { Component } from "react";
import { connect } from "react-redux";
import { getCards, deleteCard } from "../../actions/cardAction";
import { Link } from "react-router-dom";

import "./ViewCard.css";
import Loader from "../loader/Loader";

class ViewCard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCards(this.props.auth.user.id);
  }

  onDelete = (e) => {
    e.preventDefault();
    this.props.deleteCard(e.target.value);
  };

  render() {
    let content;
    if (this.props.cardsLoading) {
        content = <Loader />;
    }
    else {
      content = this.props.cards.map((card) => (
        <div className="card" key={card._id}>
          <div className="delete-btn">
            <button
              className="btn btn-danger black waves-effect"
              value={card._id}
              onClick={this.onDelete}
            >
              X
            </button>
          </div>
          <div className="title">
            <h3>{card.title}</h3>
          </div>
          <div className="description">
            <p>{card.description}</p>
          </div>
        </div>
      ));
    }
    
    return (
      <div className="container">
        <Link to="/dashboard" className="btn-flat waves-effect">
          <i className="material-icons left">keyboard_backspace</i>
          Back to Dashboard
        </Link>
        <h1>Cards</h1>
        {content}
      </div>
    );
  }
}

// Get state from redux and map it to properties of component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cards: state.cards.cards, // name: state.cardReducerName in root.cardReducer
  cardsLoading: state.cards.cardsLoading
});

// export default connect(mapStateToProps, { getCards })(withRouter(ViewCard));
export default connect(mapStateToProps, { getCards, deleteCard })(ViewCard);