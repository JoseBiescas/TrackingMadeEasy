import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  //z-depth-0
  render() {
    return (
      <div className="navbar">
        <nav className="navbar-depth"> 
          <div className="navbar-wrapper">
            <Link
              to="/"
              className="navbar-logo"
            >
              <b>TRACKING MADE EASY</b>
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;