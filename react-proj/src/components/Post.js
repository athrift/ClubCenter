import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



class Post extends Component {
  state = {
    organization: '',
    headline: '',
    description: '',
    time: '',
    date: '',
    place: '',
    posts: [],
    errors: {}
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  componentDidMount = () => {
    this.getPost();
  };

  getPost = () => {
    axios.get('/api')
    .then((response) => {
      const data = response.data;
      this.setState({posts: data})
      console.log('Data has been recieved');
      
    })
    .catch(() => {
      console.log('Internal server error');
    });;

  }

  resetUserInputs = () => {
    this.setState({
      organization: '',
      headline: '',
      description: '',
      time: '',
      date: '',
      place: ''
    });
  };

  submit = (event) => {
    event.preventDefault();

    const payload = {
      organization: this.state.organization,
      headline: this.state.headline,
      description: this.state.description,
      time: this.state.time,
      date: this.state.date,
      place: this.state.place
    };

    //this.props.registerEvent(payload, this.props.history);
    // // Sending the data from the html form to the server
    axios({
      url: '/api/registerEvent',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server');
        this.resetUserInputs();
        this.getPost();
      })
      .catch(() => {
        console.log('Internal server error');
      });;

      this.props.history.push("/Dashboard");
  };


  cancel = e => {
    this.props.history.push("/Dashboard");
       
  };

  displayPost = (posts) => {
    if(!posts.length) return null;

    return posts.map((post, index) =>(
      <div key={index}>
        <h3>{post.organization}</h3>
        <h3>{post.headline}</h3>
      </div>
    ));
  };


    render() {
      const { errors } = this.state;

      console.log('State: ', this.state);

        return (
            <div className="Post">
                <header className="Post-header">
                
                
                <div className="Org">
            <Form onSubmit={this.submit}>
            
                <h2>Post</h2>
                
                <Form.Group controlId="FormOrg">
              <h2>Event</h2>
              <p></p>
              
              <Form.Label>Organization</Form.Label>
              
              <Form.Control type="text" name="organization" placeholder="Bob Ross Club" value={this.state.organization} onChange={this.handleChange} />
            </Form.Group>

                <Form.Group controlId="FormTitle">
                <Form.Label>Title of Event</Form.Label>
                <Form.Control type="text" name="headline" placeholder="Callout" value={this.state.headline} onChange={this.handleChange} />
                </Form.Group>

              <Form.Group controlId="FormDesc">
                <Form.Label>Description of Event</Form.Label>
                <Form.Control type="text" name="description" placeholder="Come paint with us" value={this.state.description} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="FormDate">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" name="date" placeholder="" value={this.state.date} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="FormTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" name="time" placeholder="" value={this.state.time} onChange={this.handleChange} />
              </Form.Group>

              <Form.Group controlId="FormPlace">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" name="place" placeholder="WALC Room 1039" value={this.state.place} onChange={this.handleChange} />
              </Form.Group>



              <Button variant="secondary" type="submit">Post</Button>
            </Form>

            
          </div>

          <div className="cancel">
            <Form onSubmit={this.cancel}>
              <Button variant="secondary" type="submit">Cancel</Button>
            </Form>
          </div>

          {/* <div className="eventPost">
              {this.displayPost(this.state.posts)}
            </div> */}
          </header>
          </div >
        );
    }
}

export default Post;