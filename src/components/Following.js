import React, { Component } from "react";
import axios from "axios";

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(event) {
    axios
      .get(`/user/${"5aa054ac1a6e5a01b90f591c"}/following`)
      .then(response => {
        console.log(response);
        this.setState({ following: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // The user to be followed/unfollowed is the id in the link
  handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`/user/${event.target.dataset.followingid}/following`, {
        self_id: "5aa054ac1a6e5a01b90f591d"
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.following);
    return (
      <div>
        <ol className="follow--list">
          {this.state.following !== null &&
            this.state.following.following.length > 0 &&
            this.state.following.following.map((following, index) => (
              <li className="follow--list-item" key={index}>
                <div>
                  <div className="follow--avatar" />
                </div>
                <div>
                  <div className="follow--user">
                    <div className="follow--username">{following.username}</div>
                    <div className="follow--name">
                      {following.firstName} {following.lastName}
                    </div>
                    <div className="follow--about">{following.about}</div>
                  </div>
                </div>
                <form
                  data-followingid={following._id}
                  data-listindex={index}
                  onSubmit={this.handleSubmit}
                >
                  <input
                    type="submit"
                    value="Unfollow"
                    className="follow--follow-button"
                  />
                </form>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default Following;
