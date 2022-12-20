import { PokemonDataInterface } from '../store/pokemonSlice';

export interface EvolutionI {
  chain: EvolutionChainI;
}

export interface EvolutionChainI {
  species: SpeciesI;
  evolves_to: EvolutionChainI[];
}

export interface SpeciesI {
  name: string;
  url: string;
}

export type ArrangedEvolutionT = [
  number,
  string,
  PokemonDataInterface | undefined
];
