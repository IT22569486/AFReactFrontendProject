import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
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
    <Router>
      <div className="container">
        <h1>REST Countries Explorer</h1>
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
        <Routes>
          <Route path="/" element={<CountryList countries={countries} />} />
          <Route path="/country/:code" element={<CountryDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;