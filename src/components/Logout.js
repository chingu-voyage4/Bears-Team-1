import React, { Component } from "react";
import axios from "axios";

class Logout extends Component {
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

  render() {
    return (
      <div>
        <button
          onClick={this.handleLogout}
          className="profile--button--edit-profile"
        >
          Logout
        </button>
      </div>
    );
  }
}

export default Logout;
