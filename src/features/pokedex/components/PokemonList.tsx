import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPokemonData, fetchPokemonList } from '../store/pokemonSlice';
import { Grid } from '@mui/material';

import '../styles/PokemonList.css';

import PokemonCard from './PokemonCard';
import LoadingBar from './LoadingBar';

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { resultsData: pokemonData } = useAppSelector(
    (state) => state.pokemon
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(fetchPokemonList())
      .unwrap()
      .then((data) => {
        dispatch(fetchPokemonData(data.results));
      });
  }, [dispatch]);

  const observer = useRef<IntersectionObserver>();
  const loadMoreRef = useCallback(
    (node: any) => {
      if (isFetching) {
        return;
      }

      if (observer.current) {
        observer.current?.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setIsFetching(true);
          dispatch(fetchPokemonList())
            .unwrap()
            .then((data) => {
              dispatch(fetchPokemonData(data.results))
                .unwrap()
                .then(() => {
                  setIsFetching(false);
                });
            });
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [isFetching, dispatch]
  );

  const pokemonCards = () => {
    return pokemonData.map((val, index) => (
      <Grid
        key={val.name}
        className="here"
        item
        sx={{
          mx: 'auto',
          my: 2
        }}
        xs={12}
        sm={4}
        md={3}
        lg={2}
        ref={index === pokemonData.length - 1 ? loadMoreRef : null}
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
      {isFetching && <LoadingBar />}
    </div>
  );
};

export default PokemonList;
