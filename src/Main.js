import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Followers from "./components/Followers";
import Following from "./components/Following";
import Feed from "./components/Feed";
import Search from "./components/Search";
import Notifications from "./components/Notifications";
import Scoop from "./components/Scoop";

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Profile} />
      <Route exact path="/followers" component={Followers} />
      <Route exact path="/following" component={Following} />
      <Route exact path="/editprofile" component={EditProfile} />
      <Route path="/feed" component={Feed} />
      <Route path="/search" component={Search} />
      <Route path="/notifications" component={Notifications} />
      <Route path="/scoop" component={Scoop} />
    </Switch>
  </main>
);

export default Main;
