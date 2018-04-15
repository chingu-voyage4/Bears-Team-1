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
      userID: this.props.match.params.id
    };
  }

  getUserProfile(event) {
    axios
      .get(`/user/${"5ad01f62de46a605780562a6"}/profile`)
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
      .get(`/user/${"5ad01f62de46a605780562a6"}/tweets`)
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
    console.log(this.state.userID);
    return (
      <div>
        {this.state.profile ? <Profile profile={this.state.profile} /> : null}
        {this.state.scoops ? <Feed scoops={this.state.scoops} /> : null}
      </div>
    );
  }
}

export default ProfileView;
