import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCards } from "../../actions/cardAction";
import { Link, withRouter } from "react-router-dom";

class ViewCard extends Component {
  constructor() {
    super();

    this.state = {
      cards: [],
      errors: {},
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCards(this.props.auth.user.id)
    console.log(this.props)
  }

  render() {
      // const { cards } = this.props.cards;
      
      // let cardList = cards.map((card, index) => (
      //     <div className="card" key={card._id}>
      //     </div>
      // ))
      return (
          <div className="container">
          </div>
      )
  }
}

ViewCard.propTypes = {
  getCards: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  cards: state.cards
});

export default connect(mapStateToProps, { getCards })(withRouter(ViewCard));
