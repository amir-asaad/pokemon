import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPokemonData, fetchPokemonList } from '../store/pokemonSlice';
import { Grid } from '@mui/material';
import PokemonCard from './PokemonCard';
import LoadMorePokemon from './LoadMoreButton';
import '../styles/PokemonList.css';

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { resultsData: pokemonData } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemonList())
      .unwrap()
      .then((data) => {
        dispatch(fetchPokemonData(data.results));
      });
  }, [dispatch]);

  const pokemonCards = () => {
    return pokemonData.map((val, index) => (
      <Grid
        key={val.name}
        item
        sx={{
          mx: 'auto',
          my: 2
        }}
        xs={12}
        sm={4}
        md={3}
        lg={2}
      >
        <PokemonCard
          name={val.name}
          image={val.artwork}
          types={val.types}
        />
      </Grid>
    ));
  };

  return (
    <div>
      <Grid container>{pokemonCards()}</Grid>
      <div className="load-more__btn">
        <LoadMorePokemon />
      </div>
    </div>
  );
};

export default PokemonList;
