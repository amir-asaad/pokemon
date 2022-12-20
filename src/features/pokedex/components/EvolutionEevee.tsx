import { Grid } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import EvolutionDisplayPokemon from './EvolutionDisplayPokemon';

const EvolutionEevee: React.FC = () => {
  const arrangedEvolution = useAppSelector(
    (state) => state.pokemon.arrangedEvolution
  );
  const arrangedGrid = arrangedEvolution.flat();
  arrangedGrid.splice(5, 0, arrangedGrid[0]);
  arrangedGrid.shift();

  return (
    <Grid
      className="evolution"
      container
      spacing={3}
    >
      {arrangedGrid.map((eevee) => {
        return (
          <Grid
            item
            key={`eevee-${eevee[2]?.name}`}
            xs={4}
          >
            <EvolutionDisplayPokemon pokemon={eevee} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default EvolutionEevee;
