import React, { useState } from 'react';

interface SearchFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<{ name: string; typeId: string; limit: number }>>;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ setFilters }) => {
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [limit, setLimit] = useState(50);

  const handleApplyFilters = () => {
    setFilters({ name, typeId, limit });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center bg-white shadow-md p-6 rounded-lg gap-4 mb-6">
      <input
        type="text"
        placeholder="Recherche par nom"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-64"
      />

      <select
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-32"
      >
        <option value="">Tout les types</option>
        <option value="1">Poison</option>
        <option value="3">Eau</option>
        <option value="4">Insecte</option>
        <option value="5">Vol</option>
        <option value="6">Feu</option>
        <option value="7">Normal</option>
        <option value="8">Sol</option>
        <option value="9">Électrique</option>
        <option value="10">Fée</option>
        <option value="11">Roche</option>
        <option value="12">Glace</option>
        <option value="13">Psy</option>
        <option value="14">Acier</option>
        <option value="15">Ténèbre</option>
        <option value="16">Combat</option>
        <option value="17">Dragon</option>
        <option value="18">Spectre</option>
      </select>

      <select
        value={limit}
        onChange={(e) => setLimit(Number(e.target.value))}
        className="border border-gray-300 rounded-lg p-2 w-full sm:w-32"
      >
        <option value={50}>50 Pokémon</option>
        <option value={75}>75 Pokémon</option>
        <option value={100}>100 Pokémon</option>
      </select>

      <button
        onClick={handleApplyFilters}
        className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition"
      >
        Appliquer les filtres
      </button>
    </div>
  );
};

export default SearchFilters;
