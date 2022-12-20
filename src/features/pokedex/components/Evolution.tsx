import { Box, capitalize, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';
import { ArrangedEvolutionT } from '../interface/evolution.interface';
import TypesOrWeakness from './TypesOrWeakness';

const Evolution: React.FC = () => {
  const { arrangedEvolution } = useAppSelector((state) => state.pokemon);
  const displayPokemon = (pokemon: ArrangedEvolutionT) => {
    return (
      <Box sx={{}}>
        <Box
          className="evolution__image"
          component="img"
          src={pokemon[2]?.sprites.other['official-artwork'].front_default}
          alt={pokemon[2]?.name}
          sx={{
            maxWidth: {
              xs: '50px',
              sm: '75px',
              md: '100px',
              lg: '130px'
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

  const layoutPokemon = (stage: ArrangedEvolutionT[]) => {
    return (
      <Grid
        className="evolution__inner-container"
        container
        flexWrap="nowrap"
        sx={{
          flexDirection: {
            md: 'column'
          }
        }}
      >
        {stage.map((pokemon, pokemonIndex) => {
          return (
            <Grid
              key={`pokemon-${pokemonIndex}`}
              className="evolution__inner-item"
              item
              flexBasis={0}
            >
              {displayPokemon(pokemon)}
            </Grid>
          );
        })}
      </Grid>
    );
  };

  const layoutStage = () => {
    return arrangedEvolution.map((stage, stageIndex) => {
      return (
        <Grid
          className="evolution__outer-item"
          key={`stage-${stageIndex}`}
          item
          flexGrow={1}
        >
          {layoutPokemon(stage)}
        </Grid>
      );
    });
  };

  return (
    <Box className="evolution">
      <Typography paddingBottom={3}>Evolution</Typography>
      <Grid
        className="evolution__outer-container"
        container
        sx={{
          flexDirection: {
            xs: 'column',
            md: 'row'
          }
        }}
      >
        {layoutStage()}
      </Grid>
    </Box>
  );
};

export default Evolution;
