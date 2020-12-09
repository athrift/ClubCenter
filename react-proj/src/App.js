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
import { setCurrentUser, logoutUser, isAuthenticated } from "./actions/authActions";

import { connect } from "react-redux";

//Add external pages

import Create from "./components/Create";
import Login from "./components/Login";
import Update from "./components/Update";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import Post from "./components/Post";
import NavigationBar from "./components/NavigationBar";
import Reports from "./components/Reports";
import AllEventsReport from "./components/AllEventsReport";
import EventReport from "./components/EventReport";
import UserReport from "./components/UserReport";
import OrgReport from "./components/OrgReport";

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

  console.log("DECODED");
  console.log(decoded);


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
      <Link to="/">
        <img src={image} alt="ClubCenter" width="500" class="Logo navbar-left" />
      </Link>
      <ul class="navbar-nav">
      <Link to="/Create">Create Account</Link>
      <li class="ml-3">
      <Link to="/Login">Login</Link>
      </li>
      </ul>
  </div>
);




class App extends React.Component {


  constructor(props) {
    super(props);
    this.state = { isAuthenticated: false };

  }

  login = () => {
    this.setState({ isAuthenticated: true });
  }

  logout = () => {
    this.setState({ isAuthenticated: false });
  }



  render() {

    //const { isAuthenticated } = this.state.isAuthenticated;

    console.log("Code rendering App.js\n");
    console.log('State: ', this.state);
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            {/* Tried to implement navBar switch but rendering isAuthenticated not working,
           to see you can uncomment the line below and put in true or false values for isAuthenticated */}
            {/*}<NavigationBar isLoggedin={this.state.isAuthenticated} logout={this.logoutUser}/>*/}
            {/*}<ul className="nav navbar-nav">
              <li>
                <Link to="/">
                  <img src={image} alt="ClubCenter" class="mainLogo" />
                </Link>
                <Link to="/Reports">Reports</Link>
                <Link to="/Create">Create Account</Link>
                <Link to="/Login">Login</Link>
              </li>
            </ul>*/}
            <Route exact={true} path="/" component={Home} className="Home" />
            <Route exact={true} path="/Create" component={Create} className="Create" />
            <Route exact={true} path="/Login" component={Login} className="Login" />
            <Route exact={true} path="/Reports" component={Reports} className="club-center-report" />
            <Route exact={true} path="/AllEventsReport" component={AllEventsReport} className="club-center-report" />
            <Route exact={true} path="/EventReport" component={EventReport} className="club-center-report" />
            <Route exact={true} path="/UserReport" component={UserReport} className="club-center-report" />
            <Route exact={true} path="/OrgReport" component={OrgReport} className="club-center-report" />
            <Switch>
              <PrivateRoute exact path="/Dashboard" component={Dashboard} className="Dashboard"/>
              <PrivateRoute exact path="/Post" component={Post} className="Post" />
              <PrivateRoute exact path="/Update" component={Update} className="Update" />
            </Switch>
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
