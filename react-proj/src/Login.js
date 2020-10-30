import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';
import logo, { ReactComponent } from './logo.svg';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Login extends React.Component {

  state = {
    username: '',
    password: '',
    // posts: []
  };

  // Function which handles the user input
  // i.e when user inputs the username and password

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };
  // handleChange = (event) => {
  //   const target = event.target;
  //   const name = target.name;
  //   const value = target.value;

  //   this.setState({ [name]: value });
  // };

  // Function to reset user input
  resetUserInputs = () => {
    this.setState({
      username: '',
      password: ''
    });
  };

  // Function which handles the chnages when the Submit Button is clicked
  submit = (event) => {
    event.preventDefault();

    const payload = {
      username: this.state.username,
      password: this.state.password
    };

    // Sending the data from the html form to the server
    axios({
      url: '/api/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        // this.getBlogPost();
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
	  {/* <Container> */}
          <div className="Student">
          <Form onSubmit={this.submit}>
            <Form.Group controlId="FormEmail">
              <h2>Login</h2>
              <p></p>
              <Form.Label>Email</Form.Label>

              <Form.Control type="text" name="username" placeholder="example@email.com" value={this.state.username} onChange={this.handleChange} />
            </Form.Group>
            <Form.Group controlId="FormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="secondary" type="submit">Create Account</Button>
          </Form>
          </div>
              {/* <Form.Text className="text-muted"></Form.Text> */}
          {/* </Container> */}
        </header>
      </div >
    );
  }

}

export default Login;
