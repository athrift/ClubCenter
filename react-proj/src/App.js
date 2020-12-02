import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from 'axios';
// import logo, { ReactComponent } from './Images/logo.svg';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from "./Images/clubcenter.png";

// Imports to keep the User Logged In
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//Add external pages

import Create from "./components/Create";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

// Redux Management
import { Provider } from "react-redux";
import store from "./store";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
//Add internal pages

const Home = () => (
  <div className="Homepage">
    <h2>Home</h2>
  </div>
);

class App extends React.Component {

  render() {

    console.log("Code rendering App.js\n");

    console.log('State: ', this.state);
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <ul className="nav navbar-nav">
              <li>
                <Link to="/">
                  <img src={image} alt="ClubCenter" class="mainLogo" />
                </Link>
                <Link to="/Create">Create Account</Link>
                <Link to="/Login">Login</Link>
              </li>
            </ul>
            <Route exact={true} path="/" component={Home} className="Home" />
            <Route exact={true} path="/Create" component={Create} className="Create" />
            <Route exact={true} path="/Login" component={Login} className="Login" />
            <Switch>
              <PrivateRoute exact path="/Dashboard" component={Dashboard} className="Dashboard" />
            </Switch>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
