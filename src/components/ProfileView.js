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
      .get(`/user/${"5aa054ac1a6e5a01b90f591c"}/profile`)
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
      .get(`/user/${"5aa054ac1a6e5a01b90f591c"}/tweets`)
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
