import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => response.json())
      .then((data) => setCountry(data[0]));
  }, [code]);

  if (!country) return <p>Loading...</p>;

  return (
    <div className="card">
      <img src={country.flags.png} alt={`${country.name.common} flag`} className="card-img-top" />
      <div className="card-body">
        <h5>{country.name.common}</h5>
        <p>Capital: {country.capital?.[0] || 'N/A'}</p>
        <p>Population: {country.population.toLocaleString()}</p>
        <p>Region: {country.region}</p>
        <p>Languages: {Object.values(country.languages).join(', ')}</p>
      </div>
    </div>
  );
}

export default CountryDetails;