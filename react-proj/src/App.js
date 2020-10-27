import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

//Add external pages

import Create from "./Create";
import Login from "./Login";

//Add internal pages

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

class App extends React.Component {

  render () {

    console.log('State: ', this.state);
    return(
    <div className="App">
      <header className="App-header">
      <nav className="navbar navbar-light">
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Create">Create Account</Link>
          </li>
          <li>
            <Link to="/Login">Login</Link>
          </li>
        </ul>
      </nav>
      <Route exact={true} path="/" component={Home} />
      <Route path="/Create" component={Create} />
      <Route path="/Login" component={Login} />
      </header>
    </div>
    );
  }
}

export default App;
