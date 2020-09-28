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
      <div className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Hey there,</b> {user.username.split(" ")[0]}
              <p className="flow-text grey-text text-darken-1">
                You are logged into a full-stack{" "}
                <span style={{ fontFamily: "monospace" }}>MERN</span> app
              </p>
            </h4>
            <button
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
            <button
              onClick={this.onCreateClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              CreateCard
            </button>
            <button
              onClick={this.onViewClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              ViewCards
            </button>
          </div>
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
