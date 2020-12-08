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

var type = localStorage.getItem("Type");;

class Update extends React.Component {
    state = {
        username: '',
        password: '',
        name: '',
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
        });
    };

    updateUser = (event) => {
        console.log("Type: ", type);
        event.preventDefault();
        const payload = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        };

        this.props.updateUser(payload);

        // Redirect 
        this.props.history.push("/Dashboard");
    };

    updateStudent = (event) => {
        event.preventDefault();
        const payload = {
            username: this.state.username,
            password: this.state.password,
            name: this.state.name
        };

        this.props.updateUser(payload);

        // Redirect 
        this.props.history.push("/Dashboard");
    };

    updateOrg = (event) => {
        event.preventDefault();
        const payload = {
            orgUser: this.state.username,
            orgName: this.state.name,
            orgPass: this.state.password
        };

        console.log("Data Sent: ", payload);
        this.props.updateOrg(payload);
        // Redirect 
        this.props.history.push("/Dashboard");
    };


    render() {
        type = localStorage.getItem("Type");

        console.log("Type: ", type);
        let button;
        let placeholder;
        if (type == "Student") {
            button = <Button variant="secondary" type="submit" onClick={this.updateStudent}>Update Account</Button>;
            placeholder = "John Smith";
        } else {
            button = <Button variant="secondary" type="submit" onClick={this.updateOrg}>Update Account</Button>;
            placeholder = "After School Club";
        }

        return (
            <div className="Update">
                <header className="Update-header">
                    <div className="Student">
                        <Form>
                            <Form.Group controlId="FormEmail">
                                <h2>Update Account</h2>
                                <p></p>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" name="username" placeholder="example@email.com"
                                    value={this.state.username} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="FormName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder={placeholder}
                                    value={this.state.name} onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group controlId="FormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password"
                                    value={this.state.password} onChange={this.handleChange} />
                            </Form.Group>
                            {button}
                        </Form>
                    </div>
                </header>
            </div >
        );

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