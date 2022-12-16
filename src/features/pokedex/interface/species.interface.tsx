export interface PokemonSpeciesI {
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: FlavorTextEntriesI[];
}

interface FlavorTextEntriesI {
  flavor_text: string;
}
