import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage on initial mount
  useEffect(() => {
    const saved = localStorage.getItem('poke-favorites');
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Function to toggle favorite status
  const toggleFavorite = (pokemon) => {
    let newFavorites;
    const exists = favorites.some((fav) => fav.id === pokemon.id);

    if (exists) {
      newFavorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      newFavorites = [...favorites, pokemon];
    }

    setFavorites(newFavorites);
    localStorage.setItem('poke-favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (id) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);