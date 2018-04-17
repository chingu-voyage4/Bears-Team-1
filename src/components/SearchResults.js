import React, { Component } from "react";
import { Link } from "react-router-dom";

class SearchResults extends Component {
  render() {
    return (
      <div className="searchresults--container">
        <div className="searchresults">
          <ol className="search--list">
            {this.props.results.map((user, index) => {
              return (
                <li className="search--list-item" key={index}>
                  <div>
                    <div className="search--avatar" />
                  </div>
                  <div>
                    <div className="search--user">
                      <Link to={`/profile/${user._id}`}>
                        <span className="search--username">
                          {user.username}
                        </span>
                      </Link>
                      <div className="search--name">
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
