import React, { Component } from "react";

class Scoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoopText: ""
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
      <div>
        What's the scoop?
        <form onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.scoopText}
            onChange={this.handleChange}
            placeholder="What's the scoop?"
            className="scoop--textarea"
          />
          <input
            type="submit"
            value="Submit"
            className="profile--button--edit-profile"
          />
        </form>
        200 characters remaining
      </div>
    );
  }
}

export default Scoop;
