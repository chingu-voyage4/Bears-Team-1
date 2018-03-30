import React, { Component } from "react";
import search from "../assets/search.svg";
import axios from "axios";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchResults: ""
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

  render() {
    const searchResults = this.state.searchResults;

    return (
      <div>
        <div className="search--container">
          <form onSubmit={this.handleSubmit} className="">
            <input
              className="search--input"
              type="text"
              value={this.state.searchText}
              onChange={this.handleChange}
              placeholder="Search Scoop..."
            />
            <img src={search} alt="search" className="search--icon" />

            <input type="submit" value="Submit" className="" />
          </form>
        </div>

        <div>
          {searchResults === "" ? <p>...</p> : JSON.stringify(searchResults)}
        </div>
      </div>
    );
  }
}

export default SearchBar;
