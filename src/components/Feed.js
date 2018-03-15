import React, { Component } from "react";
import axios from "axios";
import reply from "../assets/iconmonstr-speech-bubble-2-240.png";
import share from "../assets/iconmonstr-retweet-1-240.png";
import like from "../assets/iconmonstr-favorite-2-240.png";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    this.handleLike = this.handleLike.bind(this);
  }

  handleLike(event) {
    event.preventDefault();
    axios
      .put("/user/" + "5aa054ac1a6e5a01b90f591d" + "/likes", {
        tweet_id: "5aa05812fcbbc803417de0b6",
        action: "like"
      })
      .then(response => {
        console.log(response);
        console.log("like img clicked");
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    axios
      .get("/tweet/all")
      .then(response => {
        console.log(response);
        this.setState({ list: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <ol className="feed--list">
          {this.state.list !== "" &&
            this.state.list.map((scoop, index) => (
              <li className="feed--list-item" key={"listitem" + index}>
                <div>
                  <div className="feed--avatar" />
                </div>
                <div>
                  <div className="feed--user">
                    <span className="feed--username">@username</span>
                    <span className="feed--date">
                      {" - "}
                      {scoop.date}
                    </span>
                  </div>
                  <div>
                    <span className="feed--message">{scoop.text}</span>
                  </div>
                  <ul className="feed--list-item--actions">
                    <li>
                      <img src={reply} alt="reply" />0
                    </li>
                    <li>
                      <img src={share} alt="share" />0
                    </li>
                    <li>
                      <form onSubmit={this.handleLike}>
                        <img src={like} alt="like" onClick={this.handleLike} />0
                      </form>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default Feed;
