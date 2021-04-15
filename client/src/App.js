import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import "./App.css";
import forest from "./images/forest.jpg";

import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import store from "./store";

//Components
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/authentication/Register";
import CreateCard from "./components/cards/CreateCard";
import ViewCard from "./components/cards/ViewCard";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/private-route/PrivateRoute";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  //set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  //De code token and get user info and exp
  const decoded = jwt_decode(token);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //logout
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ChakraProvider resetCSS={true}>
          <Router>
            <div>
              <Navbar />
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create" component={CreateCard} />
                <PrivateRoute exact path="/view" component={ViewCard} />
              </Switch>
            </div>
          </Router>
        </ChakraProvider>
      </Provider>
    );
  }
}

export default App;
