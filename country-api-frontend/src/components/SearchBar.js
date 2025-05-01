import React from 'react';

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    const query = e.target.value;
    if (query.length > 2) {
      fetch(`https://restcountries.eu/rest/v2/name/${query}`)
        .then((response) => response.json())
        .then((data) => onSearch(data))
        .catch((error) => console.error('Error searching:', error));
    }
  };

  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search for a country..."
      onChange={handleSearch}
    />
  );
}

export default SearchBar;