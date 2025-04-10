import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  const handleSearch = (data) => setCountries(data);
  const handleFilter = (data) => setCountries(data);

  return (
    <div className="container">
      <h1>REST Countries Explorer</h1>
      <SearchBar onSearch={handleSearch} />
      <Filter onFilter={handleFilter} />
      <CountryList countries={countries} />
    </div>
  );
}

export default App;