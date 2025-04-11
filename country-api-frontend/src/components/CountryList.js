import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function CountryList({ countries }) {
  return (
    <div className="row">
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