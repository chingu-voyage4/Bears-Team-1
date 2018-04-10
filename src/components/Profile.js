import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Feed from "./Feed";
import Logout from "./Logout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const profile = this.props.profile;

    return (
      <div className="profile--container">
        <div className="profile">
          <div className="profile--header" />
          <div>
            <a className="profile--avatar" />
            <Link to="editprofile">
              <button className="profile--button--edit-profile">
                Edit Profile
              </button>
            </Link>
            <Logout />
            <div className="profile--container--bottom-half">
              <div className="profile--name">
                {profile.firstName} {profile.lastName}
              </div>
              <div className="profile--username">{profile.username}</div>
              <div className="profile--location">{profile.location}</div>
              <div className="profile--about">{profile.about}</div>
              <div>
                <ul className="profile--stats">
                  <li>
                    <span className="profile--stats-name">Scoops</span>
                    <span className="profile--stats-number">1432</span>
                  </li>
                  <li>
                    <a href="/following">
                      <span className="profile--stats-name">Following</span>
                      <span className="profile--stats-number">
                        {profile.following.length}
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="/followers">
                      <span className="profile--stats-name">Followers</span>
                      <span className="profile--stats-number">
                        {profile.followers.length}
                      </span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
