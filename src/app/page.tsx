'use client';
import Image from 'next/image';
import icon_pokemon from './icon_pokemon.png';

import { useEffect, useState } from 'react';
import axios from 'axios';
import PokemonCard from '@/components/PokemonCard';
import SearchFilters from '@/components/SearchFilters';

const API_URL = 'https://nestjs-pokedex-api.vercel.app/pokemons';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: { name: string }[];
}

export default function Home() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({ name: '', typeId: '', limit: 50 });
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Charger le nombre total de Pokémon disponibles dans l'API
  const getTotalPokemon = async () => {
    try {
      const response = await axios.get(API_URL);
      setTotalPokemon(response.data.total);
    } catch (error) {
      console.error('Erreur lors de la récupération du total de Pokémon :', error);
    }
  };

  // Charger les Pokémon depuis l'API
  const loadPokemon = async () => {
    if (!hasMore) return;

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          name: filters.name,
          typeId: filters.typeId,
          limit: filters.limit,
        },
      });

      const newPokemon = response.data;

      // Vérifiez si nous avons atteint la fin de la liste
      if (newPokemon.length < filters.limit || pokemonList.length >= totalPokemon) {
        setHasMore(false);
      }

      // Mettre à jour la liste des Pokémon
      setPokemonList(newPokemon);
    } catch (error) {
      console.error('Erreur lors du chargement des Pokémon :', error);
    }
    setLoading(false);
  };

  // Charger le nombre total de Pokémon au démarrage
  useEffect(() => {
    getTotalPokemon();
  }, []);

  // Charger les Pokémon au démarrage ou quand les filtres changent
  useEffect(() => {
    setPokemonList([]);
    setHasMore(true);
    loadPokemon();
  }, [filters]);

  // Gestion du scroll infini
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          limit: prevFilters.limit + 50, // Augmenter la limite de 50 à chaque scroll
        }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filters, loading, hasMore]);

  return (
    <div className="bg-red-500 min-h-screen">
      <header className="bg-red-500 text-white py-6">
        <h1 className="text-5xl font-bold text-center">
          <Image src={icon_pokemon} alt="Icon Pokémon" width={150} height={150} />
        </h1>
      </header>
      <div className="max-w-7xl mx-auto px-4">
        <SearchFilters setFilters={setFilters} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        {loading && <p className="text-white text-center mt-4">Chargement...</p>}
        {!hasMore && <p className="text-white text-center mt-4">Tous les Pokémon ont été chargés !</p>}
      </div>
    </div>
  );
}
