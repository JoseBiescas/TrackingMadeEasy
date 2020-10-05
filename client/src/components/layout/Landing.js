import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
//col s12 center-align: landing-col
class Landing extends Component {
  render() {
    return (
      <div className="landing-container">
        <div className="landing-row">
          <div className="landing-col">
              <div className="landing-title"> 
                <b>Track</b> your project's progess
              </div>
            <br />
            <div className="landing-link-col">
              <Link
                to="/register"
                className="landing-button"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="landing-button"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;