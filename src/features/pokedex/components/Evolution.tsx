import { Box, Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { ArrangedEvolutionT } from '../interface/evolution.interface';
import EvolutionDisplayPokemon from './EvolutionDisplayPokemon';

const Evolution: React.FC = () => {
  const { arrangedEvolution } = useAppSelector((state) => state.pokemon);

  const layoutPokemon = (stage: ArrangedEvolutionT[]) => {
    return (
      <Grid
        className="evolution__inner-container"
        container
        spacing={3}
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
      <Grid
        className="evolution__outer-container"
        container
        spacing={3}
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
