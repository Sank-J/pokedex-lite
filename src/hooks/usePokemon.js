import { useState, useEffect } from 'react';

const API_BASE = 'https://pokeapi.co/api/v2';

export const usePokemon = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination State
  const [offset, setOffset] = useState(0);
  const LIMIT = 20;

  // Filter States
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Helper: Extract ID from URL to avoid N+1 API calls for images
  const getPokemonId = (url) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1];
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let results = [];

        if (selectedType) {
          // If a type is selected, fetch ALL pokemon of that type (API restriction)
          const response = await fetch(`${API_BASE}/type/${selectedType}`);
          if (!response.ok) throw new Error('Failed to fetch type data');
          const data = await response.json();
          // Map type structure to standard structure
          results = data.pokemon.map(p => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
            id: getPokemonId(p.pokemon.url)
          }));
        } else {
          // Default: Fetch paginated list
          const response = await fetch(`${API_BASE}/pokemon?limit=${LIMIT}&offset=${offset}`);
          if (!response.ok) throw new Error('Failed to fetch pokemon list');
          const data = await response.json();
          
          results = data.results.map(p => ({
            name: p.name,
            url: p.url,
            id: getPokemonId(p.url)
          }));
        }

        setPokemonList(results);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, selectedType]); // Re-run when page or type changes

  // Client-side filtering for search
  // Note: For a "Lite" app, filtering the fetched list is acceptable.
  // For a full app, you would hit the /pokemon/{name} endpoint.
  const filteredList = pokemonList.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    pokemon: filteredList,
    loading,
    error,
    offset,
    setOffset,
    selectedType,
    setSelectedType,
    searchQuery,
    setSearchQuery,
    isTypeFilterActive: !!selectedType
  };
};