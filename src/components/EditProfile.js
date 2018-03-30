import React, { Component } from "react";
import axios from "axios";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      location: "",
      about: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`/user/5aa054ac1a6e5a01b90f591d/profile`, {
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        location: this.state.location,
        about: this.state.about
      })
      .then(response => {
        console.log("Profile saved");
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="editprofile--form">
          <h1 className="editprofile">Edit Profile</h1>
          <label>
            Username:
            <input
              name="username"
              type="text"
              value={this.state.username}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            First name:
            <input
              name="firstname"
              type="text"
              value={this.state.firstname}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            Last name:
            <input
              name="lastname"
              type="text"
              value={this.state.lastname}
              onChange={this.handleInputChange}
              maxLength="50"
              required
            />
          </label>

          <label>
            Location:
            <input
              name="location"
              type="text"
              value={this.state.location}
              onChange={this.handleInputChange}
              maxLength="50"
            />
          </label>

          <label>
            About:
            <input
              name="about"
              type="text"
              value={this.state.about}
              onChange={this.handleInputChange}
              maxLength="200"
            />
          </label>

          <input
            type="submit"
            value="Save"
            className="editprofile--form--save"
          />
        </form>
      </div>
    );
  }
}

export default EditProfile;
