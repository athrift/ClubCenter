import React, { Component } from "react";
import axios from 'axios';

class AllEventsReport extends Component {

    state = {
        val1: null,
        val2: null,
        val3: null,
        val4: null,
        val5: null,
      };

      componentDidMount = () => {
        this.getVals();
      };

      getVals = () => {

        axios.get("api/allEventsReport1")
        .then((response) => {
          const data = response.data;
          this.setState({val1: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/allEventsReport2")
        .then((response) => {
          const data = response.data;
          this.setState({val2: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/allEventsReport3")
        .then((response) => {
          const data = response.data;
          this.setState({val3: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/allEventsReport4")
        .then((response) => {
          const data = response.data;
          this.setState({val4: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;

        axios.get("api/allEventsReport5")
        .then((response) => {
          const data = response.data;
          this.setState({val5: data})
          console.log(data)
        })
        .catch(() => {
          console.log('Internal server error');
        });;
    
      }

    render() {
      return (
        <div className="club-center-report">
          <h1>All Events Report</h1>
          <ul>
            <h2>Total Events: {this.state.val1}</h2>
            <h2>Most Prevelent Headline: {this.state.val2}</h2>
            <h2>Least Prevelent Headline: {this.state.val3}</h2>
            <h2>Event with most RSVPs: {this.state.val4}</h2>
            <h2>Event with least RSVPs: {this.state.val5}</h2>
          </ul>
        </div>
      );
    }
  }

export default AllEventsReport;