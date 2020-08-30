import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

//Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Landing />
      </div>
    </Router>
  );
}

export default App;
