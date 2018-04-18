import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

class Scoop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoopText: "",
      remainingCharacters: 200,
      redirectToNewPage: false,
      username: "",
      firstname: "",
      signedIn: false
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

  componentDidMount() {
    axios
      .get("auth/isAuthenticated")
      .then(response => {
        if (response.data.username) {
          this.setState({
            username: response.data.username || "",
            firstname: response.data.firstName || "",
            signedIn: true
          });
        } else {
          this.setState({ signedIn: false });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const loggedOutElement = (
      <span className="scoop--graytext">
        Please{" "}
        <Link to="/login" className="scoop--link">
          sign in
        </Link>
      </span>
    );
    const loggedInElement = (
      <span className="scoop--graytext">
        Give us the details, {this.state.username}!
      </span>
    );

    if (this.state.redirectToNewPage) {
      return <Redirect to="/" />;
    }

    return (
      <div className="scoop--container">
        <div className="scoop">
          <h1 className="scoop--header">What's the scoop?</h1>
          {this.state.signedIn ? loggedInElement : loggedOutElement}
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
