/*
Register.js (component/authentication)

Register component for Front End.
*/

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import "./Authentication.css";

class Register extends Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUSer = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUSer, this.props.history);
  };

  render() {
    const { errors } = this.state;
    //Same as const errors = this.state.errors;
    return (
      <div className="authentication-container">
        <div className="form-content">
          <div className="button-home-wrapper">
            <Link to="/" className="button-home">
              <b>Home</b>
            </Link>
          </div>
          <div className="content-information">
            <h4>
              <b>Register</b> below
            </h4>
            <p>
              Already have an account?{" "}
              <Link to="/login" className="content-information-link">
                Login
              </Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field">
              <label>Username</label>
              <input
                onChange={this.onChange}
                value={this.state.username}
                error={errors.username}
                id="username"
                type="text"
                className={classnames("username", {
                  invalid: errors.username,
                })}
              />
              <span className="error-text">{errors.username}</span>
            </div>
            <div className="input-field">
              <label>Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("email", {
                  invalid: errors.email,
                })}
              />
              <span className="error-text">{errors.email}</span>
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("password", {
                  invalid: errors.password,
                })}
              />
              <span className="error-text">{errors.password}</span>
            </div>
            <div className="input-field">
              <label>Password</label>
              <input
                onChange={this.onChange}
                value={this.state.password2}
                error={errors.password2}
                id="password2"
                type="password"
                className={classnames("password2", {
                  invalid: errors.password2,
                })}
              />
              <span className="error-text">{errors.password2}</span>
            </div>
            <div className="submit-button">
              <button
                type="submit"
                className="button"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//Register property types
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// connect() connects our React component to our Redux store.
export default connect(mapStateToProps, { registerUser })(withRouter(Register));
/*
 Since we can't redirect from within an action,
 Wrap Register with withRouter() and add the param this.props.history
 to allow our action (registerUser) to redirect us to another page when 
 the registration process is complete.
 */
