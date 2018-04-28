import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <div className="footer--container">
        <div className="footer">
          <span>
            &copy; {new Date().getFullYear()},{" "}
            <a href="https://github.com/chingu-voyage4/Bears-Team-1">
              Bears-Team-1 Chingu Voyage-4
            </a>
          </span>
          <span>
            <a href="https://github.com/chingu-voyage4/Bears-Team-1">GitHub</a>
          </span>
        </div>
      </div>
    );
  }
}

export default Footer;
