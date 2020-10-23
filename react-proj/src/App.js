import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Container> */}
        <Form>
          <Form.Group controlId="FormEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="example@email.com" />
            {/* <Form.Text className="text-muted"></Form.Text> */}
          </Form.Group>
          <Form.Group controlId="FormPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="secondary" type="submit">Sign Up</Button>
        </Form>
        {/* </Container> */}
      </header>
    </div >
  );
}

export default App;