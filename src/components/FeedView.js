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
    return <Feed scoops={this.state.scoops} />;
  }
}

export default FeedView;
