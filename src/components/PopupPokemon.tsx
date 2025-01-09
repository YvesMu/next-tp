'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import EvolutionModal from './EvolutionModal';

interface PokemonModalProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    stats: { [key: string]: number };
  };
  onClose: () => void;
}

interface Evolution {
  id: number;
  name: string;
  image: string;
}

export default function PokemonModal({ pokemon, onClose }: PokemonModalProps) {
  const [evolutions, setEvolutions] = useState<Evolution[]>([]);
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);

  // Charger les évolutions
  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        const response = await axios.get(
          `https://nestjs-pokedex-api.vercel.app/pokemons/${pokemon.id}`
        );
        if (response.data.evolutions) {
          setEvolutions(response.data.evolutions);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des évolutions:', error);
      }
    };

    fetchEvolutions();
  }, [pokemon.id]);

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center lg:flex-row lg:justify-between">
        {/* Section image et nom */}
        <div className="flex flex-col items-center">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
          />
          <h2 className="text-3xl font-bold mt-4">{pokemon.name}</h2>
        </div>

        {/* Section des statistiques */}
        <div className="mt-8 lg:mt-0 lg:ml-12">
          <h3 className="text-2xl font-semibold mb-4">Statistiques</h3>
          <ul className="space-y-2">
            {Object.entries(pokemon.stats).map(([key, value]) => (
              <li key={key} className="flex justify-between text-lg">
                <span className="capitalize">{key.replace('_', ' ')} :</span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bouton pour ouvrir le modal des évolutions */}
      {evolutions.length > 0 && (
        <div className="mt-8 text-center">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
            onClick={() => setShowEvolutionModal(true)}
          >
            Voir la lignée évolutive
          </button>
        </div>
      )}

      {/* Modal des évolutions */}
      {showEvolutionModal && (
        <EvolutionModal
          evolutions={evolutions}
          onClose={() => setShowEvolutionModal(false)}
        />
      )}

      {/* Bouton de fermeture */}
      <button
        className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
        onClick={onClose}
      >
        Retour
      </button>
    </div>
  );
}
