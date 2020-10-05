import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import "./Authentication.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
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
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(userData);
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
              <b>Login</b> below
            </h4>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="content-information-link">
                Register
              </Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field">
              <label>
                Email
              </label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("email", {
                  invalid: errors.email || errors.emailnotFound,
                })}
              />
              <span className="error-text">
                {errors.email}
                {errors.emailnotFound}
              </span>
            </div>
            <div className="input-field">
              <label>
                Password
              </label>
              <input
                onChange={this.onChange}
                value={this.state.password}
                error={errors.password}
                id="password"
                type="password"
                className={classnames("password", {
                  invalid: errors.password || errors.passwordincorrect,
                })}
              />
              <span className="error-text">
                {errors.password}
                {errors.passwordincorrect}
              </span>
            </div>
            <div className="submit-button">
              <button
                type="submit"
                className="button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

//Login property types
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

//Allows us to get our state from Redux and map it to props which we can use inside components
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

// connect() connects our React component to our Redux store.
export default connect(mapStateToProps, { loginUser })(Login);
