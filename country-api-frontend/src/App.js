import React, { useState, useEffect } from 'react';
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  return (
    <div className="container">
      <h1>REST Countries Explorer</h1>
      <CountryList countries={countries} />
    </div>
  );
}

export default App;
