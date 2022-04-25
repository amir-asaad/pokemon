import { Card, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { addZeroes } from '../../../utils/helpers';

import '../styles/PokemonView.css';
import PokemonInfo from './PokemonInfo';
import PokemonStats from './PokemonStats';
import PokemonType from './PokemonType';


const PokemonView: React.FC = () => {
  const viewPokemon = useAppSelector(state => state.pokemon.viewPokemon);
  
  return (
    <div className="main">
      <Typography
        align="center"
        variant="h4"
        sx={{
          marginBottom: '5%'
        }}
      >
        { viewPokemon.name } - #{ addZeroes(viewPokemon.order) }
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
          <PokemonStats
            stats={viewPokemon.stats}
          />
        </div>
        <div className="display__second-column">
          <PokemonInfo />
          <PokemonType />
        </div>
      </div>
    </div>
  )
};

export default PokemonView;