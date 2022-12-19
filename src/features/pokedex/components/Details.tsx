import { Box, Typography } from '@mui/material';
import React, { memo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { capitalize } from '../../../utils/helpers';
import TypesOrWeakness from './TypesOrWeakness';

import { fetchPokemonWeaknessData } from '../store/pokemonSlice';

const Details: React.FC = () => {
  const {
    height: pokemonHeight,
    weight: pokemonWeight,
    abilities,
    types,
    weakness
  } = useAppSelector((state) => state.pokemon.viewPokemon);
  const pokemonSpecies = useAppSelector(
    (state) => state.pokemon.pokemonSpecies
  );

  const height = parseInt(`${pokemonHeight}0`, 10);
  const weight = pokemonWeight / 10;

  const mapAbilities = () => {
    const reduced = abilities.reduce((acc: String[], val) => {
      if (!val.is_hidden) {
        acc.push(capitalize(val.ability.name));
      }

      return acc;
    }, []);

    return reduced.join(', ');
  };

  return (
    <Box className="details">
      <Box className="flex-grow-1">
        <Typography
          className="details__description"
          sx={{
            fontSize: {
              sm: '1.2rem'
            }
          }}
        >
          {pokemonSpecies.flavor_text_entries[0]?.flavor_text}
        </Typography>
      </Box>
      <Box
        className="flex-grow-1"
        sx={{ display: 'flex', flexWrap: 'wrap' }}
      >
        <Box className="flex-grow-1">
          <Typography className="bold--text">Height</Typography>
          <Typography
            sx={{
              fontSize: {
                sm: '1.2rem'
              }
            }}
          >
            {height} cm
          </Typography>
        </Box>
        <Box className="flex-grow-1">
          <Typography className="bold--text">Weight</Typography>
          <Typography
            sx={{
              fontSize: {
                sm: '1.2rem'
              }
            }}
          >
            {weight} kg
          </Typography>
        </Box>
      </Box>
      <Box className="flex-grow-1">
        <Typography className="bold--text">Abilities</Typography>
        <Typography
          sx={{
            fontSize: {
              sm: '1.2rem'
            }
          }}
        >
          {mapAbilities()}
        </Typography>
      </Box>
      <TypesOrWeakness
        text="Types"
        values={types}
      />
      <TypesOrWeakness
        text="Weakness"
        values={weakness}
      />
    </Box>
  );
};

export default memo(Details);
