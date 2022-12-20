import { Box, capitalize, Typography } from '@mui/material';
import React from 'react';
import { addZeroes } from '../../../utils/helpers';
import { ArrangedEvolutionT } from '../interface/evolution.interface';
import TypesOrWeakness from './TypesOrWeakness';

interface Props {
  pokemon: ArrangedEvolutionT;
}

const EvolutionDisplayPokemon: React.FC<Props> = ({ pokemon }) => {
  return (
    <Box>
      <Box
        className="evolution__image"
        component="img"
        src={pokemon[2]?.sprites.other['official-artwork'].front_default}
        alt={pokemon[2]?.name}
        sx={{
          maxWidth: {
            xs: '50px',
            sm: '75px',
            md: '100px'
          },
          width: '100%'
        }}
      />
      <Typography
        className="evolution__name"
        textAlign="center"
        sx={{
          fontSize: {
            sm: '1.2rem',
            md: '1.3rem'
          }
        }}
      >
        {capitalize(pokemon[2]?.name || '')}
      </Typography>
      <Typography
        className="evolution__id"
        textAlign="center"
        sx={{
          fontSize: {
            sm: '1rem',
            md: '1.1rem'
          }
        }}
      >
        #{addZeroes(pokemon[2]?.id || 0)}
      </Typography>
      <TypesOrWeakness
        text="Types"
        showLabel={false}
        centerList
        values={pokemon[2]?.types || []}
      />
    </Box>
  );
};

export default EvolutionDisplayPokemon;
