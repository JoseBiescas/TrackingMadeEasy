import React, { Component } from "react";
import { connect } from "react-redux";
import { getCards } from "../../actions/cardAction";

class ViewCard extends Component {
  
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCards(this.props.auth.user.id);
  }

  render() {
      let cardList = this.props.cards.map(card => (
          <div className="card" key={card._id}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
      ))
      // for (const key in this.props.cards.data) {
      //     <div className="card" >
      //       <h3>{this.props.cards.data[key].title}</h3>
      //       <p>{this.props.cards.data[key].description}</p>
      //     </div>
      // }
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
export default connect(mapStateToProps, { getCards })(ViewCard);