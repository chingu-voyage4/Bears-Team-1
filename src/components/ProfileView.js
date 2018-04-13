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

  getUserProfile(ID) {
    axios
      .get(`/user/${ID}/profile`)
      .then(response => {
        console.log("profile:", response.data);
        this.setState({ profile: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllScoops(ID) {
    axios
      .get(`/user/${ID}/tweets`)
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
      this.getUserProfile(this.state.userID);
      this.getAllScoops(this.state.userID);
    } else if (this.props.loggedInUser) {
      console.log(this.props.loggedInUser);
      this.getAllScoops(this.props.loggedInUser._id);
    }
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
