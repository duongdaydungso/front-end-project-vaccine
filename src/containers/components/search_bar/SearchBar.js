import React, { Component } from "react";

import "./SearchBar.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchBar extends Component {
  render() {
    return (
      <div className="search-container">
        <label className="search-title form-label" htmlFor="form1">
          {this.props.searchLabel}
        </label>
        <div className="search-input-container">
          {!this.props.button && !this.props.value && (
            <FontAwesomeIcon className="search-icon" icon={faSearch} />
          )}
          <input
            type="search"
            id="form1"
            className="search-input form-control"
            onChange={this.props.onChange}
            value={this.props.value}
            placeholder={this.props.placeholder}
          />
        </div>
        {this.props.button && (
          <button type="button" className="search-button btn btn-primary">
            <FontAwesomeIcon className="button-icon" icon={faSearch} />
          </button>
        )}
      </div>
    );
  }
}

export default SearchBar;
