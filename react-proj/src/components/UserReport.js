import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';

class UserReport extends Component {

    constructor(props) {
      super(props);
      this.state = { userName: '' };
    }

    submitHandler = (event) => {
      this.getVals();
      event.preventDefault();
    }
    changeHandler = (event) => {
      this.setState({userName: event.target.value});
    }

    state = {
        val1: null,
        val2: null,
        val3: null,
        val4: null,
        val5: null,
      };

      getVals = () => {

        axios.get("api/userReport1", { params: { userName: this.state.userName } })
        .then((response) => {
          const data = response.data;
          this.setState({val1: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/userReport2", { params: { userName: this.state.userName } })
        .then((response) => {
          const data = response.data;
          this.setState({val2: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/userReport3", { params: { userName: this.state.userName } })
        .then((response) => {
          const data = response.data;
          this.setState({val3: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/userReport4", { params: { userName: this.state.userName } })
        .then((response) => {
          const data = response.data;
          this.setState({val4: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;
    
      }

    render() {
      return (
        <div className="club-center-report">
          <h1>User Report</h1>
          <form onSubmit={this.submitHandler}>
            <p>Enter user name:</p>
            <input
              type='text'
              onChange={this.changeHandler}
            />
            <input
              type='submit'
            />
          </form>
          <ul>
            <h2>User: {this.state.userName}</h2>
            <h2>Stat 1: {this.state.val1}</h2>
            <h2>Stat 2: {this.state.val2}</h2>
            <h2>Stat 3: {this.state.val3}</h2>
            <h2>Stat 4: {this.state.val4}</h2>
          </ul>
        </div>
      );
    }
  }

export default UserReport;