import { LoadingButton } from '@mui/lab';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../hooks';
import { fetchPokemonList, fetchPokemonData } from '../store/pokemonSlice';

const LoadMorePokemon: React.FC = () => {
  const [didClickLoadMore, setDidClickLoadMore] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (didClickLoadMore) {
      dispatch(fetchPokemonList())
        .unwrap()
        .then((data) => {
          dispatch(fetchPokemonData(data.results));
        });
      setDidClickLoadMore(false);
    }
  }, [dispatch, didClickLoadMore]);

  return (
    <LoadingButton onClick={() => setDidClickLoadMore(true)}>
      Load More Pokemon
    </LoadingButton>
  );
};

export default LoadMorePokemon;
