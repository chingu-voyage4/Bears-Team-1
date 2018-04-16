import React, { Component } from "react";
import Feed from "./Feed";
import axios from "axios";

class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: null,
      scoops: null,
      selected: "everybody"
    };
    this.getAllScoops = this.getAllScoops.bind(this);
    this.getFollowingScoops = this.getFollowingScoops.bind(this);
  }

  getAllScoops() {
    axios
      .get("/tweet/all")
      .then(response => {
        console.log(response);
        this.setState({ scoops: response.data, selected: "everybody" });
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
        this.setState({ scoops: response.data, selected: "following" });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllScoops();
  }

  render() {
    const everybodySelected = (
      <div className="feed--header">
        <div
          onClick={this.getAllScoops}
          className="feed--button--everybody feed--button-selected"
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
    );
    const followingSelected = (
      <div className="feed--header">
        <div onClick={this.getAllScoops} className="feed--button--everybody">
          Everybody
        </div>
        <div
          onClick={this.getFollowingScoops}
          className="feed--button--following feed--button-selected"
        >
          Following
        </div>
      </div>
    );

    return (
      <div className="feed--container">
        <div className="feed--header-container">
          {this.state.selected === "everybody"
            ? everybodySelected
            : followingSelected}
          <div className="clear" />
        </div>
        <Feed scoops={this.state.scoops} />
      </div>
    );
  }
}

export default FeedView;
