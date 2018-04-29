import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import reply from "../assets/iconmonstr-speech-bubble-2.svg";
import share from "../assets/iconmonstr-retweet-1.svg";
import like from "../assets/iconmonstr-favorite-2.svg";
import liked from "../assets/iconmonstr-favorite-1.svg";
import user1 from "../assets/iconmonstr-user-1.svg";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scoops: this.props.scoops
    };
    this.handleLike = this.handleLike.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  likeButton(props) {
    const isLiked = props.isLiked;
    if (!isLiked) {
      return <img src={like} alt="like" onClick={this.handleLike} />;
    } else {
      return <img src={liked} alt="liked" onClick={this.handleLike} />;
    }
  }

  handleLike(event) {
    event.preventDefault();
    axios
      .put(`/user/5aa054ac1a6e5a01b90f591d/likes`, {
        tweet_id: "5aa05812fcbbc803417de0b6",
        action: "like"
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDelete(event) {
    event.preventDefault();
    let scoopid = event.target.dataset.scoopid;
    let itemIndex = event.target.dataset.listindex;
    let updatedList = this.state.scoops.filter(
      (x, i) => i !== parseInt(itemIndex)
    );
    this.setState({
      scoops: updatedList
    });
    axios
      .delete(`/tweet/${scoopid}`)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    let scoops = this.state.scoops || this.props.scoops;

    return (
      <div className="feed">
        <ol className="feed--list">
          {scoops !== null &&
            scoops.map((scoop, index) => (
              <li className="feed--list-item" key={"listitem" + index}>
                <div>
                  <img
                    className="feed--avatar"
                    src={scoop.creator.avatarUrl || user1}
                    alt="Avatar"
                  />
                </div>
                <div className="feed--user-container">
                  <div className="feed--user">
                    <Link to={`/profile/${scoop.creator._id}`}>
                      <span className="feed--username">
                        {scoop.creator.username}
                      </span>
                    </Link>
                    <span className="feed--date">
                      {" "}
                      &middot; {moment(scoop.date).fromNow()}
                    </span>
                  </div>
                  <div>
                    <p className="feed--message">{scoop.text}</p>
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
                        {this.likeButton("isLiked")}0
                      </form>
                    </li>
                  </ul>

                  {this.props.signedInUser ? (
                    <form
                      data-scoopid={scoop._id}
                      data-listindex={index}
                      onSubmit={this.handleDelete}
                    >
                      <input
                        type="submit"
                        value="Delete"
                        className="feed--delete-button"
                      />
                    </form>
                  ) : null}
                </div>
              </li>
            ))}
        </ol>
      </div>
    );
  }
}

export default Feed;
