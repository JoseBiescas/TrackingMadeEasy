import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createCard } from "../../actions/cardAction";
import { Link, withRouter } from "react-router-dom";

import "./CreateCard.css";

class CreateCard extends Component {
  constructor() {
    super();

    this.lableInput = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      description: "",
      labels: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If not logged in and user navigates to Dashboard page, should redirect them to login
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      this.props.history.push("/login");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const cardData = {
      user: this.props.auth.user.id,
      title: this.state.title,
      description: this.state.description,
      labels: this.state.labels,
    };

    this.props.createCard(cardData, this.props.history);
  };

  render() {
    // const { user } = this.props.auth;
    // const { errors } = this.state;
    return (
      <div className="create-container">
        <div className="row">
          <div className="form-content">
            <div className="button-home-wrapper">
              <Link to="/dashboard" className="button-home">
                Back
              </Link>
            </div>
            <div className="create-content-information">
              <h4>
                <b>Create</b> Card
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field">
                <label style={{ color: "black" }} htmlFor="email">
                  Title
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  type="text"
                  id="title"
                />
              </div>
              <div className="input-field">
                <label style={{ color: "black" }} htmlFor="password">
                  Description
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  type="text"
                  id="description"
                />
              </div>
              <div className="input-field">
                <label style={{ color: "black" }} htmlFor="password">
                  Label
                </label>
                <input
                  onChange={this.onChange}
                  value={this.state.labels}
                  type="text"
                  id="labels"
                />
              </div>
              <div className="submit-button">
                <button
                  type="submit"
                  className="button"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateCard.propTypes = {
  createCard: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { createCard })(withRouter(CreateCard));
