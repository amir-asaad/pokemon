import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { PokemonDataInterface, setState } from '../store/pokemonSlice';

const Forms: React.FC = () => {
  const dispatch = useAppDispatch();
  const varietiesData = useAppSelector(
    (state) => state.pokemon.varietiesData
  );

  const onViewPokemon = (pokemon: PokemonDataInterface) => {
    dispatch(setState([{ stateName: 'viewPokemon', value: pokemon }]));
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
