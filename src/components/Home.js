import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <div className="profile-card">
          <div className="profile-card--background" />
          <div>
            <a className="profile-card--avatar" />

            <div className="profile-card--name">
              <div className="profile-card--name--real">Real Name</div>
              <div>@username</div>
            </div>

            <div>
              <ul>
                <li className="profile-card--info">
                  <span className="profile-card--info--name">Tweets</span>
                  <span className="profile-card--info--number">100</span>
                </li>
                <li className="profile-card--info">
                  <span className="profile-card--info--name">Following</span>
                  <span className="profile-card--info--number">100</span>
                </li>
                <li className="profile-card--info">
                  <span className="profile-card--info--name">Followers</span>
                  <span className="profile-card--info--number">100</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
