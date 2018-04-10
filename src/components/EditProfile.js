import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      .put(`/user/5aa054ac1a6e5a01b90f591c/profile`, {
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

  getUserProfile(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591d"}/profile`)
      .then(response => {
        console.log("profile:", response);
        this.setState({
          username: response.data.username || "",
          firstname: response.data.firstName || "",
          lastname: response.data.lastName || "",
          location: response.data.location || "",
          about: response.data.about || ""
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getUserProfile();
  }

  render() {
    return (
      <div className="editprofile--container">
        <form onSubmit={this.handleSubmit} className="editprofile--form">
          <h1 className="editprofile--header">Edit Profile</h1>

          <div className="editprofile--input-container">
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
            <Link to="/">
              <button className="editprofile--form--cancel">Cancel</button>
            </Link>
            <input
              type="submit"
              value="Save"
              className="editprofile--form--save"
            />
            <div className="editprofile--button-container" />
          </div>
        </form>
      </div>
    );
  }
}

export default EditProfile;
