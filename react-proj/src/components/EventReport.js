import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";
import axios from 'axios';

class EventReport extends Component {

    constructor(props) {
      super(props);
      this.state = { eventName: '' };
    }

    submitHandler = (event) => {
      this.getVals();
      event.preventDefault();
    }
    changeHandler = (event) => {
      this.setState({eventName: event.target.value});
    }

    state = {
        val1: null,
        val2: null,
        val3: null,
        val4: null,
      };

      getVals = () => {

        axios.get("api/eventReport1", { params: { orgName: this.state.eventName } })
        .then((response) => {
          const data = response.data;
          this.setState({val1: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/eventReport2", { params: { orgName: this.state.eventName } })
        .then((response) => {
          const data = response.data;
          this.setState({val2: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/eventReport3", { params: { orgName: this.state.eventName } })
        .then((response) => {
          const data = response.data;
          this.setState({val3: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/eventReport4", { params: { orgName: this.state.eventName } })
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
          <h1>Event Report</h1>
          <form onSubmit={this.submitHandler}>
            <p>Enter event name:</p>
            <input
              type='text'
              onChange={this.changeHandler}
            />
            <input
              type='submit'
            />
          </form>
          <ul>
            <h2>Event: {this.state.eventName}</h2>
            <h2>Stat 1: {this.state.val1}</h2>
            <h2>Stat 2: {this.state.val2}</h2>
            <h2>Stat 3: {this.state.val3}</h2>
            <h2>Stat 4: {this.state.val4}</h2>
          </ul>
        </div>
      );
    }
  }

export default EventReport;