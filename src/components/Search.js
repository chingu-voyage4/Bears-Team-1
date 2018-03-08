import React, { Component } from "react";
import SearchBar from "./SearchBar.js";
import SearchResults from "./SearchResults.js";

class Search extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <SearchResults />
      </div>
    );
  }
}

export default Search;
