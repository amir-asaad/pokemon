import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  fetchPokemonWeaknessData,
  PokemonDataInterface,
  setState
} from '../store/pokemonSlice';

const Forms: React.FC = () => {
  const dispatch = useAppDispatch();
  const { varietiesData, viewPokemon } = useAppSelector(
    (state) => state.pokemon
  );

  const onViewPokemon = (pokemon: PokemonDataInterface) => {
    if (viewPokemon.name !== pokemon.name) {
      dispatch(setState([{ stateName: 'viewPokemon', value: pokemon }]));
      dispatch(fetchPokemonWeaknessData());
    }
  };

  const displayImage = (
    variety: PokemonDataInterface,
    varietyIndex: number
  ) => {
    return (
      <Box
        key={`variety-${varietyIndex}`}
        className="forms__image"
        component="img"
        src={variety.sprites.other['official-artwork'].front_default}
        alt={`${variety.name} image`}
        sx={{
          height: {
            xs: '50px',
            sm: '100px',
            md: '150px'
          }
        }}
        onClick={() => {
          onViewPokemon(variety);
        }}
      />
    );
  };

  return (
    <Box className="forms">
      {varietiesData.map((variety, varietyIndex) =>
        displayImage(variety, varietyIndex)
      )}
    </Box>
  );
};

export default Forms;
