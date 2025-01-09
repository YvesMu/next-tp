import { useState } from 'react';

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    image: string;
    types: { name: string }[];
    stats: { [key: string]: number };
  };
}

// Fonction pour obtenir la couleur de fond basée sur le type principal
function getTypeBackgroundColor(type: string): string {
  switch (type.toLowerCase()) {
    case 'poison':
      return '#a040a0';
    case 'eau':
      return '#6890f0';
    case 'insecte':
      return '#a8b820';
    case 'vol':
      return '#a890f0';
    case 'feu':
      return '#f08030';
    case 'normal':
      return '#f5f5dc'; // Fond clair pour le type Normal
    case 'plante':
      return '#78c850'; // Vert clair pour le type Plante
    case 'sol':
      return '#e0c068';
    case 'électrik':
      return '#FFDD57'; // Jaune vif pour le type Électrique
    case 'fée':
      return '#ee99ac';
    case 'roche':
      return '#b8a038';
    case 'glace':
      return '#98d8d8';
    case 'psy':
      return '#f85888';
    case 'acier':
      return '#b8b8d0';
    case 'ténèbre':
      return '#705848';
    case 'combat':
      return '#c03028';
    case 'dragon':
      return '#7038f8';
    case 'spectre':
      return '#705898';
    default:
      return '#f5f5f5'; // Couleur par défaut si aucun type n'est trouvé
  }
}

// Fonction pour obtenir la couleur du texte (noir pour le type Normal)
function getTextColor(type: string): string {
  return type.toLowerCase() === 'normal' ? '#000000' : '#ffffff';
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const [showModal, setShowModal] = useState(false);

  // Obtenir la couleur de fond et la couleur du texte
  const backgroundColor = getTypeBackgroundColor(pokemon.types[0]?.name || '');
  const textColor = getTextColor(pokemon.types[0]?.name || '');

  return (
    <>
      {/* Card Pokémon */}
      <div
        className="pokemon-card"
        style={{ backgroundColor, color: textColor, cursor: 'pointer' }}
        onClick={() => setShowModal(true)}
      >
        <img src={pokemon.image} alt={pokemon.name} />
        <h2 style={{ color: textColor }}>{pokemon.name}</h2>
        <p style={{ color: textColor }}>ID: #{pokemon.id}</p>
        <div className="types">
          {pokemon.types.map((type, index) => (
            <span key={index} className={`type-badge ${type.name.toLowerCase()}`}>
              {type.name}
            </span>
          ))}
        </div>
      </div>

      {/* Modal Fullscreen */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 overflow-auto"
          style={{ backgroundColor }}
        >
          <div
            className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center lg:flex-row lg:justify-between"
            style={{ color: textColor }}
          >
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

          {/* Bouton de fermeture */}
          <button
            className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
            onClick={() => setShowModal(false)}
          >
            Retour
          </button>
        </div>
      )}
    </>
  );
}
