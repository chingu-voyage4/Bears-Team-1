import React, { Component } from "react";
import Feed from "./Feed";
import axios from "axios";

class FeedView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoops: null
    };
  }

  getAllScoops(event) {
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

  componentDidMount() {
    this.getAllScoops();
  }

  render() {
    return (
      <div className="feed--container">
        <div className="feed--header-container">
          <div className="feed--header">
            <div className="feed--button--everybody">Everybody</div>
            <div className="feed--button--following">Following</div>
          </div>
          <div className="clear" />
        </div>
        <Feed scoops={this.state.scoops} />
      </div>
    );
  }
}

export default FeedView;
