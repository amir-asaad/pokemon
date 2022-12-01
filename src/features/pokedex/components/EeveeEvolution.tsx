import { Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes, capitalize } from '../../../utils/helpers';
import PokemonTypeOrWeakness from './PokemonTypeOrWeakness';

const EeveeEvolution: React.FC = () => {
  const arrangedEvolution = useAppSelector(
    (state) => state.pokemon.arrangedEvolution
  );

  const arrangedGrid = arrangedEvolution.flat();
  arrangedGrid.splice(5, 0, arrangedGrid[0]);
  arrangedGrid.shift();

  return (
    <div className="evolution">
      <Grid
        container
        spacing={10}
      >
        {arrangedGrid.map((val) => {
          const pokemon = val[2];
          const types = pokemon?.types.map(({ type }) => ({
            name: type.name,
            url: type.url
          }));

          return (
            <Grid
              key={pokemon?.name}
              item
              textAlign="center"
              xs={4}
            >
              <div className="inner-stage__pokemon">
                <img
                  src={
                    pokemon?.sprites.other['official-artwork']
                      .front_default
                  }
                  alt={pokemon?.name}
                />
                <Typography
                  align="center"
                  variant="h5"
                  sx={{
                    color: 'white'
                  }}
                >
                  {`${capitalize(pokemon?.name || '')} #${addZeroes(
                    pokemon?.order || 0
                  )}`}
                </Typography>
                <PokemonTypeOrWeakness typeOrWeaknessArray={types} />
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default EeveeEvolution;
