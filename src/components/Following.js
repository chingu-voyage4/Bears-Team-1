import React, { Component } from "react";
import axios from "axios";

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
  }

  componentDidMount(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591c"}/following`)
      .then(response => {
        console.log(response);
        this.setState({ list: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return <div className="container">{JSON.stringify(this.state.list)}</div>;
  }
}

export default Following;
