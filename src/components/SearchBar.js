import React, { Component } from "react";
import search from "../assets/search.svg";
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
        console.log(response);
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
    console.log("component sr: ", this.state.searchResults);

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
                placeholder="Search by username"
                required
              />
              <input
                type="submit"
                value="Search"
                className="search--form--submit-button"
              />
            </form>
            <ul>
              {
                //results === null ? results === [] ? results : <p>...</p> : <p>No results found</p>
              }
              {!this.state.searchResults
                ? "Waiting"
                : !this.state.searchResults.length
                  ? "No Results Found"
                  : this.state.searchResults.map((item, index) => {
                      return (
                        <li key={item.id} className="searchResults--list-item">
                          {item.username}
                        </li>
                      );
                    })}

              {/*
                this.state.searchResults !== null 
                ? this.state.searchResults !== []
                ? this.state.searchResults.map((item, index) => {
                    return (        
                      <li key={item.id} className="searchResults--list-item">
                        {item.username}
                      </li>
                    )
                  })
                : <li>No results found</li> 
                : <li>...</li>  */}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchBar;
