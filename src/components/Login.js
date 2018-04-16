import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="login--container">
        <div className="authContainer">
          <h2>Sign into Scoop</h2>
          <div className="authButtons">
            <a href="http://localhost:3001/auth/google">
              Sign In using Google+
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
