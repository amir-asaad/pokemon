import { PokemonDataInterface } from '../store/pokemonSlice';

export interface PokemonSpeciesI {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorTextEntriesI[];
  varieties: VarietiesI[];
}

interface FlavorTextEntriesI {
  flavor_text: string;
}

interface VarietiesI {
  is_default: boolean;
  pokemon: PokemonVarietyI;
}

interface PokemonVarietyI {
  name: string;
  url: string;
}
