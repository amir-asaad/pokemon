import { Card, CardMedia, Typography } from '@mui/material';
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

const PokemonView: React.FC = () => {
  const dispatch = useAppDispatch();
  const viewPokemon = useAppSelector((state) => state.pokemon.viewPokemon);
  const params = useParams();

  useEffect(() => {
    if (viewPokemon.order < 1) {
      const id = params.id ? params.id.toLowerCase() : '';

      dispatch(viewPokemonData(id));
    }
  }, [dispatch, viewPokemon, params]);

  return (
    <div className="main">
      <Typography
        align="center"
        variant="h4"
        sx={{
          marginBottom: '5%'
        }}
      >
        {viewPokemon.name} - #{addZeroes(viewPokemon.order)}
      </Typography>
      <div className="main__display">
        <div className="display__first-column">
          <Card sx={{ boxShadow: 0 }}>
            <CardMedia
              component="img"
              image={viewPokemon.artwork}
              height="300"
              sx={{
                backgroundColor: '#f0eded',
                objectFit: 'contain',
                marginBottom: '50px'
              }}
            />
          </Card>
          <PokemonStats stats={viewPokemon.stats} />
        </div>
        <div className="display__second-column">
          <PokemonInfo />
          {viewPokemon.order > 0 && <PokemonTypeOrWeakness name="Type" />}
          {viewPokemon.order > 0 && (
            <PokemonTypeOrWeakness name="Weakness" />
          )}
        </div>
      </div>
      {viewPokemon.order > 0 && <PokemonEvolution />}
    </div>
  );
};

export default PokemonView;
