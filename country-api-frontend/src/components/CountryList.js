import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';

function CountryList() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  const handleSearch = (data) => setCountries(data);
  const handleFilter = (data) => setCountries(data);
  return (
    <div className="row">
            <SearchBar onSearch={handleSearch} />
            <Filter onFilter={handleFilter} />
      {countries.map((country) => (
        <div key={country.cca3} className="col-md-4 mb-3">
          <div className="card">
            <img src={country.flags.png} alt={`${country.name.common} flag`} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{country.name.common}</h5>
              <p>Capital: {country.capital?.[0] || 'N/A'}</p>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>
              <Link to={`/country/${country.cca3}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CountryList;