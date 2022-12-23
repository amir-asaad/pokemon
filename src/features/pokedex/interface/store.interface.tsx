import { PokemonSpeciesI } from './species.interface';
import { DamageRelationsDataI, TypeDataI } from './type.interface';
import { EvolutionI, SpeciesI } from './evolution.interface';

export interface PokemonStateInterface {
  next: string;
  previous: string | null;
  results: PokemonResultInterface[];
  resultsData: PokemonDataInterface[];
  numberToFetch: number[];
  viewPokemon: PokemonDataInterface;
  typeData: TypeDataI[];
  evolution: EvolutionI;
  arrangedEvolution: [
    number,
    string,
    PokemonDataInterface | undefined
  ][][];
  pokemonSpecies: PokemonSpeciesI;
  varietiesData: PokemonDataInterface[];
}

export interface PokemonDataInterface {
  name: string;
  id: number;
  order: number;
  sprites: OtherSpritesInterface;
  artwork: string;
  types: PokemonTypesInterface[];
  stats: PokemonStatsI[];
  height: number;
  weight: number;
  abilities: PokemonAbilityI[];
  weakness: DamageRelationsDataI[];
  species: SpeciesI;
}

export interface PokemonResultInterface {
  name: string;
  url: string;
}

export interface TypeNameI {
  name: string;
  url: string;
}

export interface PokemonTypesInterface {
  slot: number;
  type: TypeNameI;
}

interface FrontDefaultInterface {
  front_default: string;
}
interface OfficialArtworkInterface {
  'official-artwork': FrontDefaultInterface;
}

interface OtherSpritesInterface {
  other: OfficialArtworkInterface;
}

interface StatNameI {
  name: string;
}

export interface PokemonStatsI {
  base_stat: number;
  stat: StatNameI;
}

interface PokemonAbilityNameI {
  name: string;
  url: string;
}

interface PokemonAbilityI {
  ability: PokemonAbilityNameI;
  is_hidden: boolean;
}
