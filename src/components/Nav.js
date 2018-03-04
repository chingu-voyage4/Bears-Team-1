import React, { Component } from "react";

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <ul className="navbar--left">
            <li>
              <a href="#">Home</a>
            </li>
            <li>Notifications</li>
          </ul>
          <ul className="navbar--icon">
            <li>Icon</li>
          </ul>
          <ul className="navbar--right">
            <li>Search</li>
            <li>Pic</li>
            <li>Tweety</li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
