import React, { useState, useEffect } from 'react';
import { X, Ruler, Weight } from 'lucide-react';

const DetailModal = ({ pokemon, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pokemon) return;
    setLoading(true);
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`)
      .then(res => res.json())
      .then(data => {
        setDetails(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [pokemon]);

  if (!pokemon) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg overflow-hidden relative shadow-2xl animate-slide-up border border-gray-200 dark:border-gray-700">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 rounded-full transition-colors z-20 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : details ? (
          <>
            <div className="bg-blue-600 dark:bg-blue-700 p-8 flex flex-col items-center relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
               
               <img 
                 src={details.sprites.other['official-artwork'].front_default}
                 alt={pokemon.name}
                 className="w-48 h-48 relative z-10 drop-shadow-xl hover:scale-105 transition-transform"
               />
               <h2 className="text-3xl font-black text-white capitalize mt-4 tracking-wide relative z-10">
                 {pokemon.name}
               </h2>
               <div className="flex gap-2 mt-3 relative z-10">
                 {details.types.map((t) => (
                   <span key={t.type.name} className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium capitalize backdrop-blur-md">
                     {t.type.name}
                   </span>
                 ))}
               </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <Weight className="w-4 h-4" />
                        <span className="text-xs uppercase font-bold">Weight</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800 dark:text-white">{details.weight / 10} kg</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                        <Ruler className="w-4 h-4" />
                        <span className="text-xs uppercase font-bold">Height</span>
                    </div>
                    <span className="text-xl font-bold text-gray-800 dark:text-white">{details.height / 10} m</span>
                </div>
              </div>

              <h3 className="font-bold text-gray-800 dark:text-white mb-3">Base Stats</h3>
              <div className="space-y-3">
                {details.stats.map((s) => (
                  <div key={s.stat.name} className="flex items-center text-sm">
                    <span className="w-24 capitalize text-gray-500 dark:text-gray-400 font-medium">{s.stat.name.replace('-', ' ')}</span>
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${s.base_stat > 90 ? 'bg-green-500' : s.base_stat > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                        style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                      ></div>
                    </div>
                    <span className="w-10 text-right font-bold text-gray-700 dark:text-gray-300">{s.base_stat}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="p-10 text-center text-red-500">Failed to load details.</div>
        )}
      </div>
    </div>
  );
};

export default DetailModal;