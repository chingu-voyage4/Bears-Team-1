import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import user1 from "../assets/iconmonstr-user-1.svg";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const profile = this.props.profile;
    console.log(profile);
    return (
      <div className="profile--container">
        <div className="profile">
          <div className="profile--header" />
          <div>
            <img
              className="profile--avatar"
              src={profile.avatarUrl || user1}
              alt="Avatar"
            />
            {this.props.signedInUserBoolean ? (
              <div>
                <Link to="/editprofile">
                  <button className="profile--button--edit-profile">
                    Edit Profile
                  </button>
                </Link>
                <Logout redir={this.props.redir} />
              </div>
            ) : this.props.signedInUserIsFollowing ? (
              <button className="profile--button--edit-profile">
                Following
              </button>
            ) : (
              <button className="profile--button--edit-profile">Follow</button>
            )}

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
                    <span className="profile--stats-number">
                      {this.props.scoops ? this.props.scoops.length : 0}
                    </span>
                  </li>
                  <li>
                    <Link to={`/following/${profile._id}`}>
                      <span className="profile--stats-name">Following</span>
                      <span className="profile--stats-number">
                        {profile.following ? profile.following.length : 0}
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link to={`/followers/${profile._id}`}>
                      <span className="profile--stats-name">Followers</span>
                      <span className="profile--stats-number">
                        {profile.followers ? profile.followers.length : 0}
                      </span>
                    </Link>
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
