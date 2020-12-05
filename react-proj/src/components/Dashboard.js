import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Post from "./Post";
import Login from "./Login";

class Dashboard extends Component {
    logout = e => {
        e.preventDefault();
        console.log("User Logged Out\n")
        this.props.logoutUser();
    };
    newPost = e => {
        this.props.history.push("/Post");
    };
    render() {
        const { user } = this.props.auth;
        console.log("Current User\n")
        console.log(user)

        return (
            <div className="Dashboard">
                <header className="Dashboard-header">
                    <div className="logout">
                        <Form onSubmit={this.logout}>
                            <Button variant="secondary" type="submit">Logout</Button>
                        </Form>
                    </div>
                    <div className="newPost">
                        <Form onSubmit={this.newPost}>
                        <Button variant="secondary" type="submit">+</Button>
                         {/* <Button variant="secondary" type="submit"><Link to="/Post">+</Link>
                         <Route exact={true} path="/Post" component={Post} className="Post" />
                         </Button> */}
                         
                        </Form>
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