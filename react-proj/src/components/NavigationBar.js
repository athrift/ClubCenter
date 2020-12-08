import React from 'react'
import { Button, Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Link, Route, Switch, BrowserRouter } from "react-router-dom";

import Create from "./Create";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./Dashboard";
import image from "../Images/clubcenter.png";


class NavigationBar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const isLoggedin = this.props.isLoggedin
    console.log(isLoggedin)
    return (

      <Navbar>

          <Nav className="nav navbar-nav">
          <Link to="/">
            <img src={image} alt="ClubCenter" class="mainLogo" />
          </Link>
          {!isLoggedin && (<Nav.Link><Link to="/Create">Create Account</Link></Nav.Link>)}
          {!isLoggedin && (<Nav.Link><Link to="/Login">Login</Link></Nav.Link>)}
          {isLoggedin && (<Nav.Link><Link to='/logout'>Logout</Link></Nav.Link>)}
          </Nav>

      </Navbar>
    );
  }
}

export default NavigationBar
