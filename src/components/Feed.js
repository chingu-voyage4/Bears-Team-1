import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import reply from "../assets/iconmonstr-speech-bubble-2-240.png";
import share from "../assets/iconmonstr-retweet-1-240.png";
import like from "../assets/iconmonstr-favorite-2-240.png";
import liked from "../assets/iconmonstr-favorite-1-240.png";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: ""
    };
    this.handleLike = this.handleLike.bind(this);
    this.getAllTweets = this.getAllTweets.bind(this);
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
    console.log("delete:", event.target.dataset.scoopid);
    /* Tested filter method to update list
    let itemIndex = event.target.dataset.listindex;
    let updatedList = this.state.list.filter((x, i) => i !== itemIndex)
    console.log(updatedList);
    this.setState({
      list: updatedList
    })*/
    // Save this.state.list as a variable
    let newList = this.state.list;
    // Get the index number of the list item to be deleted
    let itemIndex = event.target.dataset.listindex;
    axios
      .delete(`/tweet/${event.target.dataset.scoopid}`)
      .then(response => {
        console.log("response:", response);
        // Splice the list item from the new list
        newList.splice(itemIndex, 1);
        // Update this.state.list with the newList
        this.setState({ list: newList });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getAllTweets(event) {
    axios
      .get("/tweet/all")
      .then(response => {
        console.log(response);
        console.log(this.state.date);
        this.setState({ list: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.getAllTweets();
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
                    <span className="feed--username">
                      {scoop.creator.userInfo.username}
                    </span>
                    <span className="feed--date">
                      {" - "}
                      {moment(scoop.date).fromNow()}
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
                        {this.likeButton("isLiked")}0
                      </form>
                    </li>
                    <li>
                      <form
                        data-scoopid={scoop._id}
                        data-listindex={index}
                        onSubmit={this.handleDelete}
                      >
                        <input type="submit" value="Delete" />
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
