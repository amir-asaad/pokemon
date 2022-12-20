import { Box, capitalize, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';
import { ArrangedEvolutionT } from '../interface/evolution.interface';
import EvolutionDisplayPokemon from './EvolutionDisplayPokemon';
import TypesOrWeakness from './TypesOrWeakness';

const Evolution: React.FC = () => {
  const { arrangedEvolution } = useAppSelector((state) => state.pokemon);

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
              <EvolutionDisplayPokemon pokemon={pokemon} />
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
