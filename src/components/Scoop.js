import React, { Component } from "react";
import axios from "axios";

class Scoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoopText: "",
      remainingCharacters: 200
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
        creator: "placeholder",
        text: this.state.scoopText
      })
      .then(response => {
        this.setState({ scoopText: "" });
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="scoop">
        <h1>What's the scoop?</h1>
        <form onSubmit={this.handleSubmit} className="scoop--form">
          <textarea
            value={this.state.scoopText}
            onChange={this.handleChange}
            placeholder="..."
            className="scoop--textarea"
            maxLength="200"
          />
          <div>{this.state.remainingCharacters} characters remaining</div>
          <input
            type="submit"
            value="Submit"
            className="scoop--form--submit-button"
          />
        </form>
      </div>
    );
  }
}

export default Scoop;
