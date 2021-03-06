import React, { Component } from "react";
import axios from "axios";
import SearchResults from "./SearchResults";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchResults: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get(`user/${this.state.searchText}/searchusers`)
      .then(response => {
        this.setState({ searchResults: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  scoopList() {
    const scoops = this.state.searchResults;
    const scoopItems = scoops.map((scoop, index) => {
      return (
        <li key={scoop.id} className="searchResults--list-item">
          {scoop.username}
        </li>
      );
    });
    return <ul>{scoopItems}</ul>;
  }

  render() {
    return (
      <div>
        <div className="search--container">
          <div className="search">
            <h1 className="search--header">Who's on your mind?</h1>
            <form onSubmit={this.handleSubmit} className="search--form">
              <input
                className="search--input"
                type="text"
                value={this.state.searchText}
                onChange={this.handleChange}
                placeholder="Search by username (case-sensitive)"
                required
              />
              <button type="submit" className="search--form--submit-button">
                Search
              </button>
            </form>
          </div>
        </div>
        {!this.state.searchResults ? (
          ""
        ) : !this.state.searchResults.length ? (
          "No Results Found"
        ) : (
          <SearchResults results={this.state.searchResults} />
        )}
      </div>
    );
  }
}

export default SearchBar;
