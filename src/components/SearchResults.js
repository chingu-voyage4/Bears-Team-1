import React, { Component } from "react";
import search from "../assets/search.svg";

class SearchResults extends Component {
  render() {
    return (
      <div className="searchResults--outerContainer">
        <div className="searchResults--container">
          <img className="avatar" src={search} alt="search" />
          <ul className="searchResults--list">
            <li className="name">Joyce Ling</li>
            <li className="handle">@Joyce_Y_Ling</li>
          </ul>
        </div>
        <div className="searchResults--container">
          <img className="avatar" src={search} alt="search" />
          <ul className="searchResults--list">
            <li className="name">Joyce Ling</li>
            <li className="handle">@Joyce_Y_Ling</li>
          </ul>
        </div>
        <div className="searchResults--container">
          <img className="avatar" src={search} alt="search" />
          <ul className="searchResults--list">
            <li className="name">Joyce Ling</li>
            <li className="handle">@Joyce_Y_Ling</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default SearchResults;
