import React, { Component } from "react";
import search from "../assets/search.svg";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchText: event.target.value });
  }

  render() {
    return (
      <div>
        <div className="search--container">
          <input
            className="search--input"
            type="text"
            value={this.state.searchText}
            onChange={this.handleChange}
            placeholder="Search Scoop..."
          />
          <img src={search} alt="search" className="search--icon" />
        </div>
      </div>
    );
  }
}

export default SearchBar;
