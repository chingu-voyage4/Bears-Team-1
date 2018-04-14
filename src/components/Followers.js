import React, { Component } from "react";
import axios from "axios";

class Followers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      followers: null,
      userID: this.props.match.params.id
    };
  }

  componentDidMount() {
    axios
      .get(`/user/${this.state.userID}/followers`)
      .then(response => {
        console.log(response);
        this.setState({ followers: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.state.followers);
    return (
      <div className="follow--container">
        <div className="follow">
          <ol className="follow--list">
            {this.state.followers !== null &&
              this.state.followers.followers.length > 0 &&
              this.state.followers.followers.map((follower, index) => (
                <li className="follow--list-item" key={index}>
                  <div>
                    <div className="follow--avatar" />
                  </div>
                  <div>
                    <div className="follow--user">
                      <div className="follow--username">
                        {follower.username}
                      </div>
                      <div className="follow--name">
                        {follower.firstName} {follower.lastName}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Followers;
