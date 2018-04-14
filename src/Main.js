import React from "react";
import { Switch, Route } from "react-router-dom";
import ProfileView from "./components/ProfileView";
import EditProfile from "./components/EditProfile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import FeedView from "./components/FeedView";
import Search from "./components/Search";
import Notifications from "./components/Notifications";
import Scoop from "./components/Scoop";

const Main = props => (
  <main>
    <Switch>
      <Route exact path="/" component={ProfileView} />
      <Route path="/profile/:id" component={ProfileView} />
      <Route exact path="/followers" component={Followers} />
      <Route exact path="/following/:id" component={Following} />
      <Route exact path="/editprofile" component={EditProfile} />
      <Route path="/feed" component={FeedView} />
      <Route path="/search" component={Search} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/scoop" component={Scoop} />
    </Switch>
  </main>
);

export default Main;
