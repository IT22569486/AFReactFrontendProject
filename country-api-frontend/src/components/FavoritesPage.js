import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { user } = useContext(AuthContext);
  const { favorites, removeFavorite } = useFavorites();

  if (!user) {
    return <Navigate to="/favorites" replace />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Favorite Countries</h1>
      {favorites.length === 0 ? (
        <p>No favorite countries yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((country) => (
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
                    onClick={() => removeFavorite(country.alpha3Code)}
                    className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Remove Favorite
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;