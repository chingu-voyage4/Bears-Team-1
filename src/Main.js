import React, { Component } from "react";
import Profile from "./components/Profile";
import Feed from "./components/Feed";

class Main extends Component {
  render() {
    return (
      <div>
        <Profile />
        <Feed />
      </div>
    );
  }
}

export default Main;
