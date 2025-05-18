import React, { useEffect, useState, useContext } from 'react';
import { Navigate, useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch(`https://restcountries.com/v2/alpha/${code}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch country data');
        }
        return response.json();
      })
      .then((data) => setCountry(data))
      .catch((error) => {
        console.error('Error fetching country data:', error);
      });
  }, [code]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!country) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow-md">
      <Link
        to="/countries"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        &larr; Back to Countries
      </Link>

      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={country.flags.png}
          alt={`${country.name} flag`}
          className="w-full md:w-1/2 rounded shadow-md"
        />

        <div className="md:w-1/2 text-gray-800">
          <h2 className="text-3xl font-bold mb-4">{country.name}</h2>
          <p className="mb-4 italic text-gray-600">{country.altSpellings?.[1] || ''}</p>

          <p className="mb-2"><strong>Native Name:</strong> {country.nativeName}</p>
          <p className="mb-2"><strong>Capital:</strong> {country.capital || 'N/A'}</p>
          <p className="mb-2"><strong>Population:</strong> {country.population.toLocaleString()}</p>
          <p className="mb-2"><strong>Region:</strong> {country.region}</p>
          <p className="mb-2"><strong>Subregion:</strong> {country.subregion || 'N/A'}</p>
          <p className="mb-2"><strong>Top Level Domain:</strong> {country.topLevelDomain?.join(', ')}</p>

          <p className="mb-2">
            <strong>Currencies:</strong>{' '}
            {country.currencies
              ? country.currencies.map(c => `${c.name} (${c.symbol})`).join(', ')
              : 'N/A'}
          </p>

          <p className="mb-2">
            <strong>Languages:</strong>{' '}
            {country.languages ? country.languages.map(l => l.name).join(', ') : 'N/A'}
          </p>

          <p className="mb-2">
            <strong>Timezones:</strong>{' '}
            {country.timezones ? country.timezones.join(', ') : 'N/A'}
          </p>

          <p className="mb-2">
            <strong>Calling Codes:</strong>{' '}
            {country.callingCodes ? country.callingCodes.join(', ') : 'N/A'}
          </p>

          <p className="mb-2">
            <strong>Borders:</strong>{' '}
            {country.borders && country.borders.length > 0
              ? country.borders.join(', ')
              : 'None'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;
