import React, { Component } from "react";
import { Link } from "react-router-dom";
import profile from "../assets/iconmonstr-user-1-240.png";
import profileActive from "../assets/iconmonstr-user-1-240-active.png";
import feed from "../assets/iconmonstr-newspaper-13-240.png";
import feedActive from "../assets/iconmonstr-newspaper-13-240-active.png";
import search from "../assets/iconmonstr-magnifier-2-240.png";
import searchActive from "../assets/iconmonstr-magnifier-2-240-active.png";
import notifications from "../assets/iconmonstr-bell-1-240.png";
import notificationsActive from "../assets/iconmonstr-bell-1-240-active.png";
import post from "../assets/iconmonstr-candy-27-240.png";
import postActive from "../assets/iconmonstr-candy-27-240-active.png";

class Nav extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar">
          <ul className="navbar--list">
            <li>
              <Link to="/">
                <img
                  src={profileActive}
                  alt="Profile"
                  className="navbar--icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/feed">
                <img src={feed} alt="Feed" className="navbar--icon" />
              </Link>
            </li>
            <li>
              <Link to="/search">
                <img src={search} alt="Search" className="navbar--icon" />
              </Link>
            </li>
            <li>
              <Link to="/notifications">
                <img
                  src={notifications}
                  alt="Notifications"
                  className="navbar--icon"
                />
              </Link>
            </li>
            <li>
              <Link to="/scoop">
                <img src={post} alt="Post" className="navbar--icon" />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
