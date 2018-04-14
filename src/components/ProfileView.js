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
      signedInUser: null
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
      .get(`/user/${ID}/scoops`)
      .then(response => {
        console.log("scoops:", response);
        this.setState({ scoops: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    // If clicking another user, get their profile,
    if (this.state.userID) {
      this.getUserProfile(this.state.userID);
      this.getAllScoops(this.state.userID);
    } else {
      // else get signed in user's profile
      axios
        .get("auth/isAuthenticated")
        .then(response => {
          this.setState({
            signedInUser: response.data
          });
          this.getUserProfile(response.data._id);
          this.getAllScoops(response.data._id);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.profile ? <Profile profile={this.state.profile} /> : null}
        {this.state.scoops ? <Feed scoops={this.state.scoops} /> : null}
        {!this.state.scoops && !this.state.profile ? "Please log in" : null}
      </div>
    );
  }
}

export default ProfileView;
