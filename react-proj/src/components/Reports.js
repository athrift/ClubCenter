import React, { Component } from "react";
import { Link, Route, withRouter, Switch } from "react-router-dom";

class Reports extends Component {

    render() {
        return (
          <div className="club-center-report">
            <h1>Reports:</h1>
            <Link to="/AllEventsReport">All Events Report</Link>
            <br></br>
            <Link to="/EventReport">Event Report</Link>
            <br></br>
            <Link to="/UserReport">User Report</Link>
            <br></br>
            <Link to="/OrgReport">Organization Report</Link>
          </div>
        );
      }
}
export default Reports;