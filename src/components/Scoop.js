import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

class Scoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoopText: "",
      remainingCharacters: 200,
      redirectToNewPage: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      scoopText: event.target.value,
      remainingCharacters: 200 - event.target.value.length
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Here's the Scoop:", this.state.scoopText);
    axios
      .post("tweet/new", {
        // Can't create a scoop without a valid user id. This one is from server/__tests__/test-data.js -Jdawg
        creator: "5aa054ac1a6e5a01b90f591c",
        text: this.state.scoopText
      })
      .then(response => {
        this.setState({ scoopText: "" });
        this.setState({ redirectToNewPage: true });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    if (this.state.redirectToNewPage) {
      return <Redirect to="/feed" />;
    }

    return (
      <div className="scoop--container">
        <div className="scoop">
          <h1 className="scoop--header">What's the scoop?</h1>
          <form onSubmit={this.handleSubmit} className="scoop--form">
            <textarea
              value={this.state.scoopText}
              onChange={this.handleChange}
              placeholder=""
              className="scoop--textarea"
              maxLength="200"
              required
            />
            <div className="scoop--characters-remaining">
              {this.state.remainingCharacters} characters remaining
            </div>
            <input
              type="submit"
              value="Submit"
              className="scoop--form--submit-button"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Scoop;
