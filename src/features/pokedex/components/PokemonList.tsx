import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPokemonData, fetchPokemonList } from '../store/pokemonSlice';
import { Grid, Skeleton } from '@mui/material';

import '../styles/PokemonList.css';

import PokemonCard from './PokemonCard';
import LoadingBar from './LoadingBar';

const PokemonList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { resultsData: pokemonData } = useAppSelector(
    (state) => state.pokemon
  );
  const [isInitialFetching, setIsInitialFetching] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (pokemonData.length === 0) {
      dispatch(fetchPokemonList())
        .unwrap()
        .then((data) => {
          dispatch(fetchPokemonData(data.results)).then(() => {
            setIsInitialFetching(false);
          });
        });
    } else {
      setIsInitialFetching(false);
    }
  }, [dispatch, pokemonData]);

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

  const displaySkeletonLoadingCards = () => {
    const skeletons: JSX.Element[] = [];

    for (let i = 0; i < 30; i++) {
      skeletons.push(
        <Grid
          key={`skeleton-${i}`}
          item
          sx={{ mx: 'auto', my: 2 }}
          xs={12}
          sm={6}
          md={4}
          lg={3}
        >
          <Skeleton
            variant="rectangular"
            height="150px"
            width="80%"
          />
        </Grid>
      );
    }

    return skeletons;
  };

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
        sm={6}
        md={4}
        lg={3}
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
      <Grid container>
        {isInitialFetching
          ? displaySkeletonLoadingCards()
          : pokemonCards()}
      </Grid>
      {isFetching && <LoadingBar />}
    </div>
  );
};

export default PokemonList;
