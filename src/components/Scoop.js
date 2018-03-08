import React, { Component } from "react";

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
    this.setState({ scoopText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log("Here's the Scoop:", this.state.scoopText);
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
          />
          <div>200 characters remaining</div>
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
