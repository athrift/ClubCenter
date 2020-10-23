import React from 'react';
import axios from 'axios';
import logo, { ReactComponent } from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

class App extends React.Component {

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
      <div className="App">
        <header className="App-header">
          {/* <Container> */}
          <Form onSubmit={this.submit}>
            <Form.Group controlId="FormEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" name="username" placeholder="example@email.com" value={this.state.username} onChange={this.handleChange} />
              {/* <Form.Text className="text-muted"></Form.Text> */}
            </Form.Group>
            <Form.Group controlId="FormPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
            </Form.Group>
            <Button variant="secondary" type="submit">Sign Up</Button>
          </Form>
          {/* </Container> */}
        </header>
      </div >
    );
  }

}

export default App;