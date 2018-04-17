import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: "",
      firstname: "",
      lastname: "",
      location: "",
      about: "",
      redirectToNewPage: false
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
      .put(`/user/${this.state.id}/profile`, {
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,
        location: this.state.location,
        about: this.state.about
      })
      .then(response => {
        console.log("Profile saved");
        this.setState({ redirectToNewPage: true });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getUserProfile(event) {
    axios
      .get("auth/isAuthenticated")
      .then(response => {
        console.log("profile:", response);
        this.setState({
          id: response.data._id,
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
    if (this.state.redirectToNewPage) {
      return <Redirect to="/login" />;
    }

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
