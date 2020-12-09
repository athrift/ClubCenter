import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Alert } from 'react-alert';
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import image from "../Images/clubcenter.png";

import 'bootstrap/dist/css/bootstrap.min.css'

import Post from "./Post";
import Login from "./Login";
import Update from "./Update";

class Dashboard extends Component {
    state = {
        posts: []
    };
    componentDidMount = () => {
        this.getPost();
    };

    getPost = () => {
        axios.get('/api')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data })
                console.log('Data has been recieved');

            })
            .catch(() => {
                console.log('Internal server error');
            });;

    }

    // Function to handle the RSVP when the button is clicked
    handleRSVP = (post) => {
        axios({
            url: '/api/handleRSVP',
            method: 'POST',
            data: post
        })
            .then(() => {
                console.log('Data has been sent to the server');
            })
            .catch(() => {
                console.log('Internal server error');
            });;

    }

    deleteUser = e => {
        // Sending the data from the html form to the server
        e.preventDefault();
        console.log("User Logged Out\n")
        this.props.logoutUser();
        axios({
            url: '/api/deleteUser',
            method: 'POST',
            data: global.currentUser
        })
            .then(() => {
                console.log('Data has been sent to the server');
            })
            .catch(() => {
                console.log('Internal server error');
            });;

        this.props.history.push("/Create");
    }

    displayPost = (posts) => {
        if (!posts.length) return null;

        return posts.map((post, index) => (
            <div key={index}>
                <Card style={{ width: '18rem', backgroundColor: "DodgerBlue", margin: "3rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                        <Card.Title>{post.headline}</Card.Title>
                        <Card.Title>{post.organization}</Card.Title>
                        <Card.Text>{post.description}</Card.Text>
                        <Card.Text>Time: {post.time}</Card.Text>
                        <Card.Text>Date: {post.date}</Card.Text>
                        <Card.Text>Location: {post.place}</Card.Text>
                        <Card.Text>Attendees: {post.numattendees}</Card.Text>
                        <Button variant="secondary"
                            onClick={() => this.handleRSVP(post)}>RSVP</Button>
                    </Card.Body>
                </Card>
            </div >
        ));
    };


    logout = e => {
        e.preventDefault();
        console.log("User Logged Out\n")
        this.props.logoutUser();
    };

    updateUser = e => {
        this.props.history.push("/Update");
    };


    newPost = e => {
        this.props.history.push("/Post");
    };
    render() {
        const { user } = this.props.auth;

        return (
            <div className="Dashboard">
                <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-dark justify-content-center">
                    <Link to="/">
                        <img src={image} alt="ClubCenter" width="500" class="mainLogo navbar-left" />
                    </Link>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <div className="newPost">
                                <Form onSubmit={this.newPost}>
                                    <Button variant="secondary" type="submit">+</Button>
                                    {/* <Button variant="secondary" type="submit"><Link to="/Post">+</Link>
                                <Route exact={true} path="/Post" component={Post} className="Post" />
                                </Button> */}

                                </Form>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className="updateUser" >
                                <Form onSubmit={this.updateUser}>
                                    <Button variant="secondary" type="submit">Update Account</Button>
                                </Form>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className="logout" >
                                <Form onSubmit={this.logout}>
                                    <Button variant="secondary" type="submit">Logout</Button>
                                </Form>
                            </div>
                        </li>
                        <li class="nav-item">
                            <div className="deleteAccount" >
                                <Form onSubmit={this.deleteUser}>
                                    <Button variant="secondary" type="submit">Delete Account</Button>
                                </Form>
                            </div>
                        </li>
                    </ul>
                </nav>
                <header className="Dashboard-header" class="d-flex justify-content-center mt-5">
                    <div className="eventPost">
                        {this.displayPost(this.state.posts)}
                    </div>
                </header>
            </div >
        );
    }
}



Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);
