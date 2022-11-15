import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { capitalize } from "../../../utils/helpers";
import { DamageRelationsDataI, TypeDataI } from "../interface/typeInterface";

interface PokemonResultInterface {
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
  "official-artwork": FrontDefaultInterface;
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

export interface PokemonDataInterface {
  name: string;
  order: number;
  sprites: OtherSpritesInterface;
  artwork: string;
  types: PokemonTypesInterface[];
  stats: PokemonStatsI[];
  height: number;
  weight: number;
  abilities: PokemonAbilityI[];
  weakness: DamageRelationsDataI[];
}

export interface PokemonStateInterface {
  next: string;
  previous: string | null;
  results: PokemonResultInterface[];
  resultsData: PokemonDataInterface[];
  numberToFetch: number[];
  viewPokemon: PokemonDataInterface;
  typeData: TypeDataI[];
}

const initialState: PokemonStateInterface = {
  next: "",
  previous: null,
  results: [],
  resultsData: [],
  numberToFetch: [0, 19],
  viewPokemon: {
    name: "",
    order: 0,
    sprites: {
      other: {
        "official-artwork": {
          front_default: "",
        },
      },
    },
    artwork: "",
    types: [],
    stats: [],
    height: 0,
    weight: 0,
    abilities: [],
    weakness: [],
  },
  typeData: [],
};

export const fetchPokemonList = createAsyncThunk<
  PokemonStateInterface,
  string,
  { state: RootState }
>("pokemon/fetchPokemonList", async (_, { getState }) => {
  const { pokemon } = getState();
  const url =
    pokemon.next || "https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0";
  const response = await fetch(url);
  const data = await response.json();

  return data;
});

export const fetchPokemonData = createAsyncThunk<
  PokemonDataInterface[],
  void,
  { state: RootState }
>("pokemon/fetchPokemonData", async (_, { getState }) => {
  const { pokemon } = getState();
  const { results, resultsData } = pokemon;
  const startData = resultsData.length;
  const filtered = results.filter((val, index) => index >= startData);

  const responses = await Promise.all(filtered.map(({ url }) => fetch(url)));

  return await Promise.all(responses.map((response) => response.json()));
});

export const viewPokemonData = createAsyncThunk<PokemonDataInterface, string>(
  "pokemon/viewPokemonData",
  async (routeId: string) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${routeId}`
    );

    return await response.json();
  }
);

export const fetchPokemonWeaknessData = createAsyncThunk<
  TypeDataI[],
  void,
  { state: RootState }
>("pokemon/fetchPokemonWeaknessData", async (_, { getState }) => {
  const { pokemon } = getState();
  const typeUrls = pokemon.viewPokemon.types.reduce<string[]>((acc, val) => {
    if (val.type) {
      acc.push(val.type.url);
    }
    return acc;
  }, []);

  const typeData = await Promise.all(typeUrls.map((url) => fetch(url))).then(
    (responses) => {
      return Promise.all(responses.map((response) => response.json()));
    }
  );

  return typeData;
});

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    SET_VIEW_POKEMON: (state, action) => {
      state.viewPokemon = action.payload;
      // state.viewPokemon = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonList.fulfilled, (state, { payload }) => {
      state.next = payload.next;
      state.results = [...state.results, ...payload.results];
      state.previous = payload.previous;
    });
    builder.addCase(fetchPokemonList.rejected, (state, action) => {});
    builder.addCase(fetchPokemonList.pending, (state) => {});
    builder.addCase(fetchPokemonData.fulfilled, (state, { payload }) => {
      state.resultsData = [
        ...state.resultsData,
        ...payload.map((val) => ({
          name: capitalize(val.name),
          order: val.order,
          sprites: {
            other: {
              "official-artwork": {
                front_default:
                  val.sprites.other["official-artwork"].front_default,
              },
            },
          },
          artwork: val.sprites.other["official-artwork"].front_default,
          types: val.types.map(({ type, slot }) => ({ type, slot })),
          stats: val.stats,
          height: val.height,
          weight: val.weight,
          abilities: val.abilities,
          weakness: [],
        })),
      ];
    });
    builder.addCase(fetchPokemonData.rejected, (state, action) => {});
    builder.addCase(fetchPokemonData.pending, (state, action) => {});
    builder.addCase(viewPokemonData.fulfilled, (state, { payload }) => {
      state.viewPokemon = {
        name: capitalize(payload.name),
        order: payload.order,
        sprites: {
          other: {
            "official-artwork": {
              front_default:
                payload.sprites.other["official-artwork"].front_default,
            },
          },
        },
        artwork: payload.sprites.other["official-artwork"].front_default,
        types: payload.types.map(({ type, slot }) => ({ type, slot })),
        stats: payload.stats,
        height: payload.height,
        weight: payload.weight,
        abilities: payload.abilities,
        weakness: [],
      };
    });
    builder.addCase(viewPokemonData.rejected, (state, action) => {});
    builder.addCase(
      fetchPokemonWeaknessData.fulfilled,
      (state, { payload }) => {
        state.typeData = payload;

        const removeDuplicates = (damageFromOrTo: string) => {
          return payload
            .map(({ damage_relations }) => {
              return damage_relations[
                `${damageFromOrTo as keyof typeof damage_relations}`
              ];
            })
            .flat()
            .filter(
              (val, index, arr) =>
                arr.findIndex((el) => el.name === val.name) === index
            );
        };

        const doubleDamageFrom = removeDuplicates("double_damage_from");
        const noDamageFrom = removeDuplicates("no_damage_from");
        const halfDamageFrom = removeDuplicates("half_damage_from");
        const removeFromDoubleDamageFrom = [...noDamageFrom, ...halfDamageFrom];

        state.viewPokemon.weakness = doubleDamageFrom.filter((val) => {
          return (
            removeFromDoubleDamageFrom.findIndex(
              (removeVal) => removeVal.name === val.name
            ) === -1
          );
        });
      }
    );
  },
});

export const { SET_VIEW_POKEMON } = pokemonSlice.actions;

export default pokemonSlice.reducer;
