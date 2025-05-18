import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (country) => {
    setFavorites((prev) => {
      if (!prev.some((fav) => fav.alpha3Code === country.alpha3Code)) {
        return [...prev, country];
      }
      return prev;
    });
  };

  const removeFavorite = (alpha3Code) => {
    setFavorites((prev) => prev.filter((fav) => fav.alpha3Code !== alpha3Code));
  };

  const isFavorite = (alpha3Code) => {
    return favorites.some((fav) => fav.alpha3Code === alpha3Code);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);