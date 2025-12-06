import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const PokemonCard = ({ pokemon, onClick }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isFav = isFavorite(pokemon.id);
  
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl dark:shadow-none dark:hover:bg-gray-750 transition-all duration-300 p-4 relative cursor-pointer group border border-gray-100 dark:border-gray-700"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(pokemon);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 transition-colors backdrop-blur-sm"
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${isFav ? 'fill-red-500 text-red-500' : 'text-gray-300 dark:text-gray-500 hover:text-red-300'}`} 
        />
      </button>

      <div onClick={() => onClick(pokemon)} className="flex flex-col items-center pt-2">
        <div className="w-32 h-32 mb-4 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative">
            <div className="absolute inset-0 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src={imageUrl} 
              alt={pokemon.name}
              className="w-28 h-28 object-contain relative z-10"
              loading="lazy"
            />
        </div>
        <span className="text-gray-400 dark:text-gray-500 text-xs font-bold tracking-wider mb-1">#{pokemon.id.padStart(3, '0')}</span>
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 capitalize">{pokemon.name}</h3>
      </div>
    </div>
  );
};

export default PokemonCard;