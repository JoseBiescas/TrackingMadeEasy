import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "./Dashboard.css";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  onCreateClick = (e) => {
    e.preventDefault();
    this.props.history.push("/create");
  };

  onViewClick = (e) => {
    e.preventDefault();
    this.props.history.push("/view");
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="dashboard-container">
        <div className="row">
          <h1 className="title-text">
            <b>Hey there,</b> {user.username.split(" ")[0]}
            <p className="main-text">
              You are logged into a full-stack{" "}
              <span style={{ fontFamily: "monospace" }}>MERN</span> app
            </p>
          </h1>
        </div>
        <div className="row">
          <button onClick={this.onLogoutClick} className="dashboard-button">
            Logout
          </button>
          <button onClick={this.onCreateClick} className="dashboard-button">
            CreateCard
          </button>
          <button onClick={this.onViewClick} className="dashboard-button">
            ViewCards
          </button>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
