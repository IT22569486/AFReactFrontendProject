import React, { useState, useEffect, useContext } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        return response.json();
      })
      .then((data) => setCountry(data[0]))
      .catch((error) => {
        console.error('Error fetching country data:', error);
        // Keep country as null to stay in loading state
      });
  }, [code]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!country) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow" style={{ width: '24rem' }}>
        <img src={country.flags.png} alt={`${country.name.common} flag`} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title text-primary">{country.name.common}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</li>
            <li className="list-group-item"><strong>Population:</strong> {country.population.toLocaleString()}</li>
            <li className="list-group-item"><strong>Region:</strong> {country.region}</li>
            <li className="list-group-item"><strong>Languages:</strong> {Object.values(country.languages).join(', ')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;