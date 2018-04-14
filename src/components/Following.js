import React, { Component } from "react";
import axios from "axios";

class Following extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: null,
      userID: this.props.match.params.id
    };
    this.handleUnfollow = this.handleUnfollow.bind(this);
  }

  componentDidMount(event) {
    axios
      .get(`/user/${this.state.userID}/following`)
      .then(response => {
        console.log(response);
        this.setState({ following: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // The user to be followed/unfollowed is the id in the link
  handleUnfollow(event) {
    event.preventDefault();
    axios
      .put(`/user/${event.target.dataset.followingid}/following`, {
        self_id: this.state.userID
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
      <div className="follow--container">
        <div className="follow">
          <ol className="follow--list">
            {this.state.following !== null &&
              this.state.following.following.length > 0 &&
              this.state.following.following.map((following, index) => (
                <li className="follow--list-item" key={index}>
                  <div className="follow--leftside">
                    <div className="follow--avatar" />

                    <div>
                      <div className="follow--user">
                        <div className="follow--username">
                          {following.username}
                        </div>
                        <div className="follow--name">
                          {following.firstName} {following.lastName}
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={this.handleUnfollow}
                    className="follow--unfollow-button"
                  >
                    Unfollow
                  </button>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Following;
