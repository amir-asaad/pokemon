import {
  Card,
  CardMedia,
  Container,
  Grid,
  Typography
} from '@mui/material';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';
import { useParams } from 'react-router-dom';

import '../styles/PokemonView.css';

import PokemonInfo from './PokemonInfo';
import PokemonStats from './PokemonStats';
import PokemonTypeOrWeakness from './PokemonTypeOrWeakness';
import PokemonEvolution from './PokemonEvolution';

import { viewPokemonData } from '../store/pokemonSlice';
import EeveeEvolution from './EeveeEvolution';
import { RESET_VIEW_POKEMON } from '../store/pokemonSlice';

const PokemonView: React.FC = () => {
  const dispatch = useAppDispatch();
  const { viewPokemon, evolution } = useAppSelector(
    (state) => state.pokemon
  );
  const params = useParams();

  useEffect(() => {
    return function () {
      dispatch(RESET_VIEW_POKEMON());

      RESET_VIEW_POKEMON();
    };
  }, [dispatch]);

  useEffect(() => {
    if (viewPokemon.order < 1) {
      const id = params.id ? params.id.toLowerCase() : '';

      dispatch(viewPokemonData(id));
    }
  }, [dispatch, viewPokemon, params]);

  const displayEvolution = () => {
    return evolution.chain.species.name === 'eevee' ? (
      <EeveeEvolution />
    ) : (
      <PokemonEvolution />
    );
  };

  return (
    <Container sx={{ mt: '10%' }}>
      <Typography
        align="center"
        variant="h4"
        sx={{
          marginBottom: '5%',
          mx: '2%'
        }}
      >
        {viewPokemon.name} - #{addZeroes(viewPokemon.id)}
      </Typography>
      <Grid
        className="outside-grid"
        container
        sx={{
          flexDirection: {
            md: 'row'
          }
        }}
        spacing={3}
      >
        <Grid
          item
          md={6}
          flexGrow="1"
        >
          <Grid
            container
            direction="column"
            spacing={3}
          >
            <Grid item>
              <Card sx={{ boxShadow: 0 }}>
                <CardMedia
                  component="img"
                  image={viewPokemon.artwork}
                  sx={{
                    backgroundColor: '#f0eded',
                    objectFit: 'contain'
                  }}
                />
              </Card>
            </Grid>
            <Grid item>
              <PokemonStats stats={viewPokemon.stats} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          md={6}
          sx={{ width: '100%' }}
        >
          <Grid
            direction="column"
            container
            spacing={3}
          >
            <Grid item>
              <PokemonInfo />
            </Grid>
            <Grid item>
              {viewPokemon.order > 0 && (
                <PokemonTypeOrWeakness name="Type" />
              )}
            </Grid>
            <Grid item>
              {viewPokemon.order > 0 && (
                <PokemonTypeOrWeakness name="Weakness" />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          flexGrow={1}
        >
          {viewPokemon.order > 0 && displayEvolution()}
        </Grid>
      </Grid>
      {/* <div className="main__display">
        <div className="display__first-column"></div>
        <div className="display__second-column"></div>
      </div> */}
    </Container>
  );
};

export default PokemonView;
