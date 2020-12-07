import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';
// import logo, { ReactComponent } from '../Images/logo.svg';
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateUser } from "../actions/authActions";
import { updateOrg } from "../actions/authActions";
import classnames from "classnames";

class Update extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
        orgUser: '',
        orgPass: '',
        orgName: '',
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push("/Dashboard"); // push user to Dashboard when they update their profile
        }
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

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

    // Function which handles the changes when the Submit Button is clicked for Student
    submit = (event) => {
        event.preventDefault();
        const payload = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        };

        this.props.updateUser(payload);
    };

    submit2 = (event) => {
        event.preventDefault();

        const payload = {
            orgUser: this.state.orgUser,
            orgName: this.state.orgName,
            orgPass: this.state.orgPass
        };

        this.props.updateOrg(payload);
    };

    render() {
        var type = localStorage.getItem("Type");

        if (type == "Student") {
            return (
                <div className="Update">
                    <header className="Update-header">
                        <div className="Student">
                            <Form onSubmit={this.updateStudent}>
                                <Form.Group controlId="FormEmail">
                                    <h2>Update Student Account</h2>
                                    <p></p>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="example@email.com"
                                        value={this.state.username} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="FormName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="John Smith"
                                        value={this.state.name} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="FormPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password"
                                        value={this.state.password} onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant="secondary" type="submit">Update Account</Button>
                            </Form>
                        </div>
                    </header>
                </div >
            );
        }
        else {
            return (
                <div className="Update">
                    <header className="Update-header">
                        <div className="Org">
                            <Form onSubmit={this.updateOrg}>
                                <Form.Group controlId="FormEmail">
                                    <h2>Update Organization Account</h2>
                                    <p></p>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="text" name="username" placeholder="example@email.com"
                                        value={this.state.orgUser} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="FormName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" name="name" placeholder="John Smith"
                                        value={this.state.orgName} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group controlId="FormPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" placeholder="Password"
                                        value={this.state.orgPass} onChange={this.handleChange} />
                                </Form.Group>
                                <Button variant="secondary" type="submit">Update Account</Button>
                            </Form>
                        </div>
                    </header>
                </div >
            );
        }
    }

}

Update.propTypes = {
    updateUser: PropTypes.func.isRequired,
    updateOrg: PropTypes.func.isRequired,
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
        updateUser,
        updateOrg
    }
)(Update);