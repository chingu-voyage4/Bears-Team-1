import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import profile from "../assets/iconmonstr-user-1.svg";
import feed from "../assets/iconmonstr-newspaper-13.svg";
import search from "../assets/iconmonstr-magnifier-2.svg";
import notifications from "../assets/iconmonstr-bell-1.svg";
import post from "../assets/iconmonstr-candy-27.svg";

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <ul className="navbar--list">
            <li>
              <NavLink to="/profile" activeClassName="navbar--selected">
                <img src={profile} alt="Profile" className="navbar--icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/notifications" activeClassName="navbar--selected">
                <img
                  src={notifications}
                  alt="Notifications"
                  className="navbar--icon"
                />
              </NavLink>
            </li>
            <li>
              <NavLink to="/scoop" activeClassName="navbar--selected">
                <img
                  src={post}
                  alt="Post"
                  className="navbar--icon navbar--icon-center"
                />
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/" activeClassName="navbar--selected">
                <img src={feed} alt="Feed" className="navbar--icon" />
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" activeClassName="navbar--selected">
                <img src={search} alt="Search" className="navbar--icon" />
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
