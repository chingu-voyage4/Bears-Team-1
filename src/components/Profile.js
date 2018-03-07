import React, { Component } from "react";
import Feed from "./Feed";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile">
          <div className="profile--background" />
          <div>
            <a className="profile--avatar" />
            <button className="profile--button--edit-profile">
              Edit profile
            </button>

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
                    <span className="profile--stats-name">Tweets</span>
                    <span className="profile--stats-number">1432</span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Following</span>
                    <span className="profile--stats-number">847</span>
                  </li>
                  <li>
                    <span className="profile--stats-name">Followers</span>
                    <span className="profile--stats-number">323k</span>
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
