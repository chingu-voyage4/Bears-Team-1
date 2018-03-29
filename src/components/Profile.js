import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Feed from "./Feed";
import Logout from "./Logout";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileData: ""
    };
  }

  componentDidMount(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591d"}/profile`)
      .then(response => {
        console.log(response);
        this.setState({ profileData: response.data });
        console.log(this.state.profileData);
      })
      .catch(error => {
        console.log(error);
      });
  }

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
              <div className="profile--name">
                {this.state.profileData.firstName}{" "}
                {this.state.profileData.lastName}
              </div>
              <div className="profile--username">
                {this.state.profileData.username}
              </div>
              <div className="profile--location">
                {this.state.profileData.location}
              </div>
              <div className="profile--about">
                {this.state.profileData.about}
              </div>

              <div>
                <ul className="profile--stats">
                  <li>
                    <span className="profile--stats-name">Scoops</span>
                    <span className="profile--stats-number">1432</span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Following</span>
                    <span className="profile--stats-number">
                      <a href="/following">847</a>
                    </span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Followers</span>
                    <span className="profile--stats-number">
                      <a href="/followers">123</a>
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
