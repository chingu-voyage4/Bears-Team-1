import React, { Component } from "react";
import { Link } from "react-router-dom";

class Login extends Component {
  render() {
    return (
      <div className="login--container">
        <div className="login">
          <h1 className="login--header">Sign in</h1>
          <div className="login--conversion-message">
            Get the latest scoop on your friends
          </div>
          <div className="login--container--signin-buttons">
            <a
              href="http://localhost:3001/auth/google"
              className="login--signin-button"
            >
              Google+
            </a>
            <div />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
