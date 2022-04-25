import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { pokemonTypeColor } from '../../../utils/helpers';
import { capitalize } from '../../../utils/helpers';

import '../styles/PokemonTypeAndWeakness.css';

const PokemonTypeAndWeakness: React.FC = () => {
  const { viewPokemon } = useAppSelector(state => state.pokemon);

  const types = () => {
    const typeColors = pokemonTypeColor();

    return viewPokemon.types.map(({ type }) => {
      const found = typeColors.find(({ name }) => name === type.name);

      return (
        <Box
          key={type.name}
          sx={{
            backgroundColor: found?.color,
            borderRadius: '3px',
            padding: '5px 20px',
            color: 'white'
          }}
        >
          { capitalize(type.name) }
        </Box>
      );
    });
  };

  // const weakness = () => {
  //   const typeColors = pokemonTypeColor();

  //   return view
    
  // };

  return (
    <div>
      <Typography sx={{ margin: '10px 0' }}>
        Type
      </Typography>
      <div className="pokemon-type">
        { types() }
      </div>
    </div>
  )

};

export default PokemonTypeAndWeakness;