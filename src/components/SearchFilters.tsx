'use client';

import { useState } from 'react';

interface SearchFiltersProps {
  setFilters: (filters: { name: string; typeId: string; limit: number }) => void;
}

export default function SearchFilters({ setFilters }: SearchFiltersProps) {
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [limit, setLimit] = useState(50);

  const handleSearch = () => {
    setFilters({ name, typeId, limit });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
      <input
        type="text"
        placeholder="Recherche"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border border-gray-300 rounded-lg p-3 w-full sm:w-auto"
      />
      <select
        value={typeId}
        onChange={(e) => setTypeId(e.target.value)}
        className="border border-gray-300 rounded-lg p-3"
      >
        <option value="">Tout les types</option>
        <option value="1">Poison</option>
        <option value="3">Eau</option>
        <option value="4">Insecte</option>
        <option value="5">Vol</option>
        <option value="6">Feu</option>
        <option value="7">Normal</option>
        <option value="8">Sol</option>
        <option value="9">Electrique</option>
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
        className="border border-gray-300 rounded-lg p-3"
      >
        <option value={50}>50 Pokémon</option>
        <option value={75}>75 Pokémon</option>
        <option value={100}>100 Pokémon</option>
      </select>
      <button onClick={handleSearch} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600">
        Appliquer le filtre
      </button>
    </div>
  );
}
