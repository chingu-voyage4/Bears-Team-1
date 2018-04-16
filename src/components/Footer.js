import React, { Component } from "react";
import { Link } from "react-router-dom";
class Footer extends Component {
  render() {
    return (
      <div className="footer--container">
        <ul className="footer--list">
          <li>2018</li>
          <li>
            {" "}
            <Link to="/login">Sign in</Link>
          </li>
          <li>
            <a href="https://github.com/chingu-voyage4/Bears-Team-1">GitHub</a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Footer;
