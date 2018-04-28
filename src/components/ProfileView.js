import React, { Component } from "react";
import { Redirect } from "react-router-dom";
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
      signedInUser: null,
      signedInUserBoolean: false,
      redirectToNewPage: false,
      signedInUserIsFollowing: false,
      redir: () => {
        this.setState({ redirectToNewPage: true });
      }
    };
  }

  getUserProfile(ID) {
    axios
      .all([
        axios.get("/auth/isAuthenticated"),
        axios.get(`/user/${ID}/profile`)
      ])
      .then(
        axios.spread((loggedInUser, userProfile) => {
          if (loggedInUser.data.username) {
            const foundSignedInUser = loggedInUser.data.following.find(e => {
              return e === userProfile.data._id;
            });
            if (foundSignedInUser) {
              this.setState({
                profile: userProfile.data,
                signedInUserIsFollowing: true
              });
            } else {
              this.setState({
                profile: userProfile.data,
                signedInUserIsFollowing: false
              });
            }
          }
          this.setState({ profile: userProfile.data });
        })
      )
      .catch(error => {
        console.log(error);
      });
  }

  getAllScoops(ID) {
    axios
      .get(`/user/${ID}/scoops`)
      .then(response => {
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
          if (response.data !== "Not logged in") {
            this.setState({
              signedInUser: response.data,
              signedInUserBoolean: true
            });
            this.getUserProfile(response.data._id);
            this.getAllScoops(response.data._id);
          } else {
            this.setState({ redirectToNewPage: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        {this.state.profile ? (
          <Profile
            profile={this.state.profile}
            signedInUserBoolean={this.state.signedInUserBoolean}
            redir={this.state.redir}
            signedInUserIsFollowing={this.state.signedInUserIsFollowing}
          />
        ) : null}
        {this.state.scoops ? <Feed scoops={this.state.scoops} /> : null}
        {!this.state.scoops && !this.state.profile ? "Loading" : null}
      </div>
    );
  }
}

export default ProfileView;
