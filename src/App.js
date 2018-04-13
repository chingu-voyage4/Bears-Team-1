import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Main from "./Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedInUser: null
    };
  }

  componentDidMount() {
    axios
      .get("auth/isAuthenticated")
      .then(response => {
        this.setState({
          loggedInUser: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <Nav />
        <Main loggedInUser={this.state.loggedInUser} />
        <Footer />
      </div>
    );
  }
}

export default App;
