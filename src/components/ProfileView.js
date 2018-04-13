import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Profile from "./Profile";
import Feed from "./Feed";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      scoops: null,
      userID: this.props.match.params.id,
      isAuthenticated: null
    };
  }

  getAuthenticatedProfile() {
    axios
      .get("auth/isAuthenticated")
      .then(response => {
        console.log("isAuthenticated:", response.data);
        this.setState({ profile: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUserProfile() {
    axios
      .get(`/user/${this.state.userID}/profile`)
      .then(response => {
        console.log("profile:", response.data);
        this.setState({ profile: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllScoops() {
    axios
      .get(`/user/${this.state.profile.id}/tweets`)
      .then(response => {
        console.log("scoops:", response);
        this.setState({ scoops: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    if (this.state.userID) {
      this.getUserProfile();
      console.log("Other user fetched");
    }

    //if (this.state.isAuthenticated) {
    this.getAuthenticatedProfile();
    //  console.log('Logged in user fetched');
    //}

    if (this.state.profile !== null) {
      this.getAllScoops();
      console.log("Profile scoops fetched");
    }
  }

  render() {
    console.log(this.state.profile);
    return (
      <div>
        {this.state.profile ? <Profile profile={this.state.profile} /> : null}
        {this.state.scoops ? <Feed scoops={this.state.scoops} /> : null}
      </div>
    );
  }
}

export default ProfileView;
