import React, { Component } from "react";
import post from "../assets/iconmonstr-candy-27.svg";

class Login extends Component {
  render() {
    return (
      <div className="login--container">
        <div className="login">
          <h1 className="login--header">Sign in</h1>
          <div className="login--conversion-message">
            Get the latest scoop <br />with your friends{" "}
            <img src={post} alt="Scoop" className="login--icon" />
          </div>
          <div className="login--container--signin-buttons">
            <a
              href="http://localhost:3001/auth/google"
              className="login--signin-button"
            >
              Google+
            </a>
            <div />
            <p className="login--smalltext-create-account">
              Accounts are created automatically, just sign in!
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
