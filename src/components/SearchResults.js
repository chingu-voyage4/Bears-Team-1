import React, { Component } from "react";
import { Link } from "react-router-dom";
import search from "../assets/search.svg";

class SearchResults extends Component {
  render() {
    return (
      <div className="follow--container">
        <div className="follow">
          <ol className="follow--list">
            {this.props.results.map((user, index) => {
              return (
                <li className="follow--list-item" key={index}>
                  <div>
                    <div className="follow--avatar" />
                  </div>
                  <div>
                    <div className="feed--user">
                      <Link to={`/profile/${user._id}`}>
                        <span className="feed--username">{user.username}</span>
                      </Link>
                      <div className="follow--name">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchResults;
