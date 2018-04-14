import React, { Component } from "react";
import Feed from "./Feed";
import axios from "axios";

class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      scoops: null
    };
    this.getAllScoops = this.getAllScoops.bind(this);
    this.getFollowingScoops = this.getFollowingScoops.bind(this);
  }

  getAllScoops() {
    axios
      .get("/tweet/all")
      .then(response => {
        console.log(response);
        this.setState({ scoops: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getFollowingScoops() {
    axios
      .get("/user/feed")
      .then(response => {
        console.log(response);
        this.setState({ scoops: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllScoops();
  }

  render() {
    return (
      <div className="feed--container">
        <div className="feed--header-container">
          <div className="feed--header">
            <div
              onClick={this.getAllScoops}
              className="feed--button--everybody"
            >
              Everybody
            </div>
            <div
              onClick={this.getFollowingScoops}
              className="feed--button--following"
            >
              Following
            </div>
          </div>
          <div className="clear" />
        </div>
        <Feed scoops={this.state.scoops} />
      </div>
    );
  }
}

export default FeedView;
