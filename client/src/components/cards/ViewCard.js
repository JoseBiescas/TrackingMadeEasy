import React, { Component } from "react";
import { connect } from "react-redux";
import { getCards, deleteCard } from "../../actions/cardAction";

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
  }

  render() {
      let cardList = this.props.cards.map(card => (
          <div className="card" key={card._id}>
            <div className="delete-btn" >
              <button
                className="btn btn-danger red waves-effect"
                value= {card._id}
                onClick={this.onDelete}
              >
                Delete
              </button>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
      ))
      return (
          <div className="container">
            <h1>Cards</h1>
            {cardList}
          </div>
      )
  }
}

// Get state from redux and map it to properties of component
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cards: state.cards.cards // name: state.cardReducerName in root.cardReducer
});

// export default connect(mapStateToProps, { getCards })(withRouter(ViewCard));
export default connect(mapStateToProps, { getCards, deleteCard })(ViewCard);