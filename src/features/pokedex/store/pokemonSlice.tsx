import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { capitalize } from '../../../utils/helpers'
interface PokemonResultInterface {
  name: string,
  url: string,
};

interface TypeNameI {
  name: string
}

export interface PokemonTypesInterface {
  slot: number,
  type: TypeNameI
}

interface FrontDefaultInterface {
  front_default: string
}
interface OfficialArtworkInterface {
  'official-artwork': FrontDefaultInterface
}

interface OtherSpritesInterface {
  other: OfficialArtworkInterface
}

export interface PokemonDataInterface {
  name: string,
  order: number,
  sprites: OtherSpritesInterface,
  artwork: string
  types: PokemonTypesInterface[],
}

export interface PokemonStateInterface {
  next: string,
  previous: string | null,
  results: PokemonResultInterface[],
  resultsData: PokemonDataInterface[],
  numberToFetch: number[]
};

const initialState: PokemonStateInterface = {
  next: '',
  previous: null,
  results: [],
  resultsData: [],
  numberToFetch: [0, 19]
};

export const fetchPokemonList = createAsyncThunk<PokemonStateInterface, string, {state: RootState }>(
  'pokemon/fetchPokemonList',
  async (_, { getState }) => {
    const { pokemon } = getState()
    const url = pokemon.next || 'https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0';
    const response = await fetch(url);
    const data = await response.json()

    return data;
  }
);

export const fetchPokemonData = createAsyncThunk<PokemonDataInterface[], void, {state: RootState}>(
  'pokemon/fetchPokemonData',
  async (_, { getState }) => {
    const { pokemon } = getState();
    const { results, resultsData } = pokemon;
    const startData = resultsData.length;
    const filtered = results.filter((val, index) => index >= startData)

    const responses = await Promise.all(
      filtered.map(({ url }) => fetch(url))
    );

    return await Promise.all(
      responses.map(response => response.json())
    )
  }
)

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.fulfilled, (state, { payload }) => {
      state.next = payload.next;
      state.results = [ ...state.results, ...payload.results];
      state.previous = payload.previous;
    })
    builder.addCase(fetchPokemonList.rejected, (state, action) => {
    })
    builder.addCase(fetchPokemonList.pending, (state) => {
    })
    builder.addCase(fetchPokemonData.fulfilled, (state, { payload }) => {
      state.resultsData = [
        ...state.resultsData,
        ...payload.map((val) => ({
          name: capitalize(val.name),
          order: val.order,
          sprites: {
            other: {
              'official-artwork': {
                front_default: val.sprites.other['official-artwork'].front_default
              }
            }
          },
          artwork: val.sprites.other['official-artwork'].front_default,
          types: val.types.map(({ type, slot }) => ({ type, slot }))
        }))
      ]
    })
    builder.addCase(fetchPokemonData.rejected, (state, action) => {
    })
    builder.addCase(fetchPokemonData.pending, (state, action) => {
    })
  }
});

export default pokemonSlice.reducer;