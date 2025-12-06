import { useState, useEffect } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { FavoritesProvider } from './context/FavoritesContext';
import PokemonCard from './components/PokemonCard';
import DetailModal from './components/DetailModal';
import { Search, Loader2, Moon, Sun, X } from 'lucide-react';

const POKEMON_TYPES = [
  'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 
  'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 
  'ghost', 'dragon', 'steel', 'fairy'
];

function App() {
  const { 
    pokemon, loading, error, setOffset, offset, 
    searchQuery, setSearchQuery, selectedType, setSelectedType, isTypeFilterActive
  } = usePokemon();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Dark Mode Logic
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <FavoritesProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pb-20">
        
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-30 shadow-sm transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-tight flex items-center gap-2">
              Pokedex<span className="text-gray-400 dark:text-gray-500 font-light">Lite</span>
            </h1>
            
            {/* Dark Mode Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Hero / Search Section */}
          <div className="flex flex-col items-center mb-12 space-y-6">
             <div className="w-full max-w-2xl relative group">
                {/* Glow Effect behind search */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                
                {/* The Search Bar */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-6 w-6 text-gray-400" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search your favorite Pokémon..."
                    className="block w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-0 rounded-xl text-gray-900 dark:text-white shadow-xl ring-1 ring-gray-900/5 focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 text-lg transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {/* Clear Button */}
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer" />
                    </button>
                  )}
                </div>
             </div>

            {/* Type Filter Pills */}
            <div className="w-full overflow-x-auto pb-4 no-scrollbar">
              <div className="flex justify-start md:justify-center gap-2 min-w-max px-2">
                <button 
                    onClick={() => setSelectedType('')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedType 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                >
                  All
                </button>
                {POKEMON_TYPES.map(type => (
                  <button 
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${selectedType === type 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105' 
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 p-4 rounded-xl text-center mb-8">
              Error: {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
             <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
               <p className="text-gray-500 dark:text-gray-400 font-medium">Catching them all...</p>
             </div>
          ) : (
            <>
              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {pokemon.map((p) => (
                  <PokemonCard 
                    key={p.id} 
                    pokemon={p} 
                    onClick={setSelectedPokemon} 
                  />
                ))}
              </div>

              {/* Empty State */}
              {!loading && pokemon.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No Pokemon found.</p>
                </div>
              )}
            </>
          )}

          {/* Pagination */}
          {!loading && !searchQuery && !isTypeFilterActive && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button 
                disabled={offset === 0}
                onClick={() => setOffset(prev => Math.max(0, prev - 20))}
                className="px-6 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors shadow-sm"
              >
                Previous
              </button>
              <span className="text-gray-400 font-medium">
                Page {offset / 20 + 1}
              </span>
              <button 
                onClick={() => setOffset(prev => prev + 20)}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all"
              >
                Next
              </button>
            </div>
          )}
        </main>

        {/* Modal Overlay */}
        {selectedPokemon && (
          <DetailModal 
            pokemon={selectedPokemon} 
            onClose={() => setSelectedPokemon(null)} 
          />
        )}
      </div>
    </FavoritesProvider>
  );
}

export default App;