import React, { Component } from "react";
import { Link } from "react-router-dom";
import Feed from "./Feed";
import Logout from "./Logout";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile">
          <div className="profile--background" />
          <div>
            <a className="profile--avatar" />
            <Link to="editprofile">
              <button className="profile--button--edit-profile">
                Edit profile
              </button>
            </Link>
            <Logout />
            <div className="profile--container--bottom-half">
              <div className="profile--name">Real Name</div>
              <div className="profile--username">@username</div>
              <div className="profile--location">Pawnee, IN</div>
              <div className="profile--about">
                A little about me? Well, I like people, places, and things. City
                name Sports team is going all the way this year!
              </div>

              <div>
                <ul className="profile--stats">
                  <li>
                    <span className="profile--stats-name">Scoops</span>
                    <span className="profile--stats-number">
                      <a href="#">1432</a>
                    </span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Following</span>
                    <span className="profile--stats-number">
                      <a href="#">847</a>
                    </span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Followers</span>
                    <span className="profile--stats-number">
                      <a href="#">323k</a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Feed />
      </div>
    );
  }
}

export default Profile;
