import React, { useContext, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import { AuthContext } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    setLoading(true);
    fetch('https://restcountries.com/v2/all')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch countries');
        return response.json();
      })
      .then((data) => {
        console.log('Fetched countries:', data);
        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error('Data is not an array:', data);
          setCountries([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        setError('Failed to load countries');
        setLoading(false);
      });
  }, []);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleSearch = (data) => {
    setCountries(Array.isArray(data) ? data : []);
  };

  const handleFilter = (data) => {
    setCountries(Array.isArray(data) ? data : []);
  };

  const toggleFavorite = (country) => {
    if (isFavorite(country.alpha3Code)) {
      removeFavorite(country.alpha3Code);
    } else {
      addFavorite(country);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Loading...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <SearchBar onSearch={handleSearch} />
        <Filter onFilter={handleFilter} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.length === 0 ? (
          <p>No countries found</p>
        ) : (
          countries.map((country) => (
            <div
              key={country.alpha3Code}
              className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col border border-gray-200"
            >
              <img
                src={country.flags.png}
                alt={`${country.name} flag`}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow text-gray-800">
                <h5 className="text-lg font-bold mb-2 text-gray-900">{country.name}</h5>
                <p><span className="font-semibold">Capital:</span> {country.capital || 'N/A'}</p>
                <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
                <p><span className="font-semibold">Region:</span> {country.region}</p>
                <div className="mt-auto pt-4 flex gap-2">
                  <Link
                    to={`/country/${country.alpha3Code}`}
                    className="flex-1 text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(country)}
                    className={`flex-1 py-2 rounded transition-colors ${
                      isFavorite(country.alpha3Code)
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {isFavorite(country.alpha3Code) ? 'Remove Favorite' : 'Add Favorite'}
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CountryList;