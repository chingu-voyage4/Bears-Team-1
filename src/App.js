import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Main from "./Main";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
