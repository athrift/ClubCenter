import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
// import logo, { ReactComponent } from './Images/logo.svg';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../actions/authActions";
import { loginOrg } from "../actions/authActions";
import classnames from "classnames";
import image from "../Images/clubcenter.png";

class Login extends React.Component {

  state = {
    username: "",
    password: "",
    orgUser: '',
    orgPass: '',
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/Dashboard"); // push user to Dashboard when they login
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // TODO: Fix the part where a Logged in User cannot navigate to Create/Login Pages
  // componentDidMount() {
  //   // If logged in and user navigates to Login page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/Dashboard");
  //   }

  //   // Setting the current user global var
  // }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Function to reset user input
  resetUserInputs = () => {
    this.setState({
      username: '',
      password: '',
      orgUser: '',
      orgPass: '',
    });
  };

  // Function which handles the changes when the Student Login Button is clicked
  submit = (event) => {
    event.preventDefault();

    const payload = {
      username: this.state.username,
      password: this.state.password
    };

    this.props.loginUser(payload); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter

    // Sending the data from the html form to the server
    // axios({
    //   url: '/api/login',
    //   method: 'POST',
    //   data: payload
    // })
    //   .then(() => {
    //     console.log('Data has been sent to the server');
    //     this.resetUserInputs();
    //   })
    //   .catch(() => {
    //     console.log('Internal server error');
    //   });;
  };

  // Function which handles the changes when the Submit Button is clicked
  submit2 = (event) => {
    event.preventDefault();

    const payload = {
      orgUser: this.state.orgUser,
      orgPass: this.state.orgPass
    };

    this.props.loginOrg(payload);

    // Sending the data from the html form to the server
    // axios({
    //   url: '/api/loginOrg',
    //   method: 'POST',
    //   data: payload
    // })
    //   .then(() => {
    //     console.log('Data has been sent to the server');
    //     this.resetUserInputs();
    //   })
    //   .catch(() => {
    //     console.log('Internal server error');
    //   });;
  };

  render() {

    const { errors } = this.state;
    console.log('State: ', this.state);

    return (
      <div className="Login">
        <header className="Login-header">
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-dark justify-content-center">
            <Link to="/">
              <img src={image} alt="ClubCenter" width="500" class="mainLogo navbar-left" />
            </Link>
            <ul class="navbar-nav">
            <Link to="/Create">Create Account</Link>
            <li class="ml-3">
            <Link to="/Login">Login</Link>
            </li>
            </ul>
            </nav>
          <div className="Student">
            <Form onSubmit={this.submit}>
              <Form.Group controlId="FormEmail">
                <h2>Student</h2>
                <p></p>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="username" placeholder="example@email.com"
                  value={this.state.username} onChange={this.handleChange}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })} />
                <span className="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </Form.Group>
              <Form.Group controlId="FormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password"
                  value={this.state.password} onChange={this.handleChange}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })} />
                <span className="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </Form.Group>
              <Button variant="secondary" type="submit">Login</Button>
            </Form>
          </div>

          <div className="Org">
            <Form onSubmit={this.submit2}>
              <Form.Group controlId="FormEmail2">
                <h2>Organization</h2>
                <p></p>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="orgUser" placeholder="example@email.com"
                  value={this.state.orgUser} onChange={this.handleChange}
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })} />
              </Form.Group>
              <Form.Group controlId="FormPassword2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="orgPass" placeholder="Password"
                  value={this.state.orgPass} onChange={this.handleChange}
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })} />
              </Form.Group>
              <Button variant="secondary" type="submit2">Login</Button>
            </Form>
          </div>
        </header>
      </div >
    );
  }

}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  loginOrg: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {
    loginUser,
    loginOrg
  }
)(Login);
