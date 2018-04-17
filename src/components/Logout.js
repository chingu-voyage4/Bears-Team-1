import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.combinedFunction = this.combinedFunction.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    axios
      .get("/auth/logout")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  combinedFunction() {
    this.handleLogout();
    this.props.redir();
  }

  render() {
    return (
      <div>
        <button
          onClick={this.combinedFunction}
          className="profile--button--edit-profile"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
