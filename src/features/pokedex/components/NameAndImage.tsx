import { Box, Skeleton, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';

interface Props {
  isFetchingDetails: boolean;
}

const DisplayImage: React.FC<Props> = (props) => {
  const { viewPokemon: pokemon } = useAppSelector(
    (state) => state.pokemon
  );

  const centerDisplay = {
    display: 'block',
    margin: 'auto'
  };

  const displaySkeletonLoading = () => {
    return (
      <Box height="100%">
        <Skeleton
          variant="rectangular"
          width="60%"
          sx={{
            ...centerDisplay,
            mt: 3,
            height: {
              xs: '100px',
              md: '200px',
              lg: '80%'
            }
          }}
        />
      </Box>
    );
  };

  const displayPokemon = () => {
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

  return props.isFetchingDetails
    ? displaySkeletonLoading()
    : displayPokemon();
};

export default DisplayImage;
