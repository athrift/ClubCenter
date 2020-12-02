import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom"
import axios from 'axios';
// import logo, { ReactComponent } from './Images/logo.svg';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import image from "./Images/clubcenter.png";

//Add external pages

import Create from "./components/Create";
import Login from "./components/Login";

// Redux Management
import { Provider } from "react-redux";
import store from "./store";


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
            <Route path="/Create" component={Create} className="Create" />
            <Route path="/Login" component={Login} className="Login" />
          </header>
        </div>
      </Provider>
    );
  }
}

export default App;
