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
      scoops: null
    };
  }

  getUserProfile(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591d"}/profile`)
      .then(response => {
        console.log("profile:", response);
        this.setState({ profile: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllScoops(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591d"}/tweets`)
      .then(response => {
        console.log("scoops:", response);
        this.setState({ scoops: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserProfile();
    this.getAllScoops();
  }

  render() {
    return (
      <div>
        {this.state.profile ? <Profile profile={this.state.profile} /> : null}
        {this.state.scoops ? <Feed scoops={this.state.scoops} /> : null}
      </div>
    );
  }
}

export default ProfileView;