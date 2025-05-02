import React from 'react';

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    const query = e.target.value.trim();
    if (query.length > 2) {
      fetch(`https://restcountries.com/v3.1/name/${query}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
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
