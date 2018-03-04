import React, { Component } from "react";
import ProfileCard from "./components/ProfileCard";
import Feed from "./components/Feed";

class Main extends Component {
  render() {
    return (
      <div>
        <ProfileCard />
        <Feed />
      </div>
    );
  }
}

export default Main;
