import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';
import logo, { ReactComponent } from './logo.svg';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends React.Component {

  state = {
    username: "",
    password: "",
    orgUser: '',
    orgPass: ''
  };

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

    // Sending the data from the html form to the server
    axios({
      url: '/api/login',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  // Function which handles the changes when the Submit Button is clicked
  submit2 = (event) => {
    event.preventDefault();

    const payload = {
      orgUser: this.state.orgUser,
      orgPass: this.state.orgPass
    };

    // Sending the data from the html form to the server
    axios({
      url: '/api/loginOrg',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
      })
      .catch(() => {
        console.log('Internal server error');
      });;
  };

  render() {

    console.log('State: ', this.state);

    return (
      <div className="Login">
        <header className="Login-header">
          <div className="Student">
            <Form onSubmit={this.submit}>
              <Form.Group controlId="FormEmail">
                <h2>Student</h2>
                <p></p>
                <Form.Label>Email</Form.Label>

                <Form.Control type="text" name="username" placeholder="example@email.com" value={this.state.username} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="FormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
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
                <Form.Control type="text" name="orgUser" placeholder="example@email.com" value={this.state.orgUser} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="FormPassword2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="orgPass" placeholder="Password" value={this.state.orgPass} onChange={this.handleChange} />
              </Form.Group>
              <Button variant="secondary" type="submit2">Login</Button>
            </Form>
          </div>
        </header>
      </div >
    );
  }

}

export default Login;
