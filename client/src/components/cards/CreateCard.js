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
      <div className="container">
        <div className="row">
          <div className="col s8 offset-s2">
            <Link to="/dashboard" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i>
              Back to Dashboard
            </Link>
            <div className="col s12">
              <h4>
                <b>Create</b> Card
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.title}
                  type="text"
                  id="title"
                />
                <label style={{ color: "black" }} htmlFor="email">
                  Title
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.description}
                  type="text"
                  id="description"
                />
                <label style={{ color: "black" }} htmlFor="password">
                  Description
                </label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.labels}
                  type="text"
                  id="labels"
                />
                <label style={{ color: "black" }} htmlFor="password">
                  Label
                </label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
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

export default connect(mapStateToProps, { createCard })( withRouter(CreateCard));
