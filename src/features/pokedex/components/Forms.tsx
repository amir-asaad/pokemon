import { Box } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchPokemonWeaknessData, setState } from '../store/pokemonSlice';
import { PokemonDataInterface } from '../interface/store.interface';
import SkeletonLoading from '../../../components/SkeletonLoading';

interface Props {
  isFetchingSpecies: boolean;
}

const Forms: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const { varietiesData, viewPokemon } = useAppSelector(
    (state) => state.pokemon
  );

  const onViewPokemon = (pokemon: PokemonDataInterface) => {
    if (viewPokemon.name !== pokemon.name) {
      dispatch(setState([{ stateName: 'viewPokemon', value: pokemon }]));
      dispatch(fetchPokemonWeaknessData());
    }
  };

  const displayImage = (
    variety: PokemonDataInterface,
    varietyIndex: number
  ) => {
    return (
      <Box
        key={`variety-${varietyIndex}`}
        className="forms__image"
        component="img"
        src={variety.sprites.other['official-artwork'].front_default}
        alt={`${variety.name} image`}
        sx={{
          height: {
            xs: '50px',
            sm: '100px',
            md: '150px'
          }
        }}
        onClick={() => {
          onViewPokemon(variety);
        }}
      />
    );
  };

  const displayForms = () => {
    return (
      <Box className="forms">
        {varietiesData.map((variety, varietyIndex) =>
          displayImage(variety, varietyIndex)
        )}
      </Box>
    );
  };

  return props.isFetchingSpecies ? (
    <SkeletonLoading
      numberOfSkeletons={1}
      shouldBeRow
      rectangularHeight="150px"
    />
  ) : (
    displayForms()
  );
};

export default Forms;
