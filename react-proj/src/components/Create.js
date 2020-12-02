import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import axios from 'axios';
// import logo, { ReactComponent } from '../Images/logo.svg';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

class Create extends React.Component {

  state = {
    username: '',
    password: '',
    name: '',
    orgUser: '',
    orgPass: '',
    orgName: '',
    errors: {}
  };

  // Function which handles the user input 
  // i.e when user inputs the username and password

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  // Function to reset user input
  resetUserInputs = () => {
    this.setState({
      username: '',
      password: '',
      name: '',
      orgUser: '',
      orgPass: '',
      orgName: ''
    });
  };

  // Function which handles the chnages when the Submit Button is clicked for Student
  submit = (event) => {
    event.preventDefault();

    const payload = {
      username: this.state.username,
      password: this.state.password,
      name: this.state.name
    };

    // Sending the data from the html form to the server
    axios({
      url: '/api/register',
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

  // Function which handles the chnages when the Submit Button is clicked for Organisation
  submit2 = (event) => {
    event.preventDefault();

    const payload = {
      orgUser: this.state.orgUser,
      orgPass: this.state.orgPass,
      orgName: this.state.orgName
    };

    // Sending the data from the html form to the server

    axios({
      url: '/api/registerOrg',
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

    const { errors } = this.state;

    console.log('State: ', this.state);

    return (
      <div className="Create">
        <header className="Create-header">
          <div className="Student">
            <Form onSubmit={this.submit}>
              <Form.Group controlId="FormEmail">
                <h2>Student</h2>
                <p></p>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="username" placeholder="example@email.com" value={this.state.username} onChange={this.handleChange} error={errors.username} />
              </Form.Group>
              <Form.Group controlId="FormName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" placeholder="John Smith" value={this.state.name} onChange={this.handleChange} error={errors.name} />
              </Form.Group>
              <Form.Group controlId="FormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} error={errors.password} />
              </Form.Group>
              <Button variant="secondary" type="submit">Create Account</Button>
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
              <Form.Group controlId="FormName">
                <Form.Label>Organization Name</Form.Label>
                <Form.Control type="text" name="orgName" placeholder="After School Club" value={this.state.orgName} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="FormPassword2">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="orgPass" placeholder="Password" value={this.state.orgPass} onChange={this.handleChange} />
              </Form.Group>
              <Button variant="secondary" type="submit2">Create Account</Button>
            </Form>
          </div>


        </header>
      </div >
    );
  }

}

export default Create;