import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useAppSelector } from '../../../hooks';
import { pokemonTypeColor } from '../../../utils/helpers';
import { capitalize } from '../../../utils/helpers';
import {
  fetchPokemonWeaknessData,
  TypeNameI
} from '../store/pokemonSlice';
import { DamageRelationsDataI } from '../interface/type.interface';

import '../styles/PokemonTypeOrWeakness.css';
import { useAppDispatch } from '../../../hooks';
interface Props {
  name?: string;
  typeOrWeaknessArray?: TypeNameI[] | DamageRelationsDataI[];
}

const PokemonTypeOrWeakness: React.FC<Props> = ({
  name,
  typeOrWeaknessArray
}) => {
  const dispatch = useAppDispatch();
  const { viewPokemon } = useAppSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonWeaknessData());
  }, [dispatch]);

  const mapTypeOrWeakness = () => {
    const typeColors = pokemonTypeColor();
    let arrayToUse: TypeNameI[] | DamageRelationsDataI[];

    if (typeOrWeaknessArray) {
      arrayToUse = typeOrWeaknessArray || [];
    } else {
      if (name === 'Type') {
        arrayToUse = viewPokemon.types.map(({ type }) => ({
          name: type.name,
          url: type.url
        }));
      } else {
        arrayToUse = viewPokemon.weakness;
      }
    }

    return arrayToUse.map((val) => {
      const foundColor = typeColors.find(({ name }) => val.name === name);

      return (
        <Box
          key={val.name}
          sx={{
            backgroundColor: foundColor?.color,
            borderRadius: '3px',
            padding: '5px 20px',
            color: 'white'
          }}
        >
          {capitalize(val.name)}
        </Box>
      );
    });
  };

  return (
    <div className="types">
      {name && <Typography sx={{ margin: '10px 0' }}>{name}</Typography>}
      <div className="pokemon-type">{mapTypeOrWeakness()}</div>
    </div>
  );
};

export default PokemonTypeOrWeakness;
