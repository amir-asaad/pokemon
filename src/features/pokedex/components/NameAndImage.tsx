import { Box, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';

const DisplayImage: React.FC = () => {
  const { viewPokemon: pokemon } = useAppSelector(
    (state) => state.pokemon
  );

  return (
    <Box className="name-image">
      <Typography
        className="name-image__name"
        textAlign="center"
        fontWeight="bold"
        sx={{
          fontSize: { xs: '1.2rem', sm: '2rem' }
        }}
      >
        {pokemon.name}
      </Typography>
      <Typography
        className="name-image__id"
        textAlign="center"
        sx={{
          fontSize: { xs: '1rem', sm: '1.2rem' }
        }}
      >
        #{addZeroes(pokemon.id)}
      </Typography>
      <Box
        className={`name-image__image ${pokemon.types[0]?.type.name}--background`}
        component="img"
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={`${pokemon.name} image`}
        sx={{
          maxWidth: {
            xs: '100px',
            sm: '200px',
            md: '350px'
          }
        }}
      />
    </Box>
  );
};

export default DisplayImage;
