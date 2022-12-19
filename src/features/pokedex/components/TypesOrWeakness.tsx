import { Box, Typography } from '@mui/material';
import React from 'react';
import { DamageRelationsDataI } from '../interface/type.interface';
import { PokemonTypesInterface } from '../store/pokemonSlice';

interface TypesOrWeaknessProps {
  text: 'Types' | 'Weakness';
  values: PokemonTypesInterface[] | DamageRelationsDataI[];
}

const TypesOrWeakness: React.FC<TypesOrWeaknessProps> = (props) => {
  const displayTypeOrWeakness = () => {
    return props.values.map((value) => {
      const name = 'type' in value ? value.type.name : value.name;

      return (
        <Box
          className={`types__box ${name}--background`}
          key={`${props.text}-${name}`}
        >
          {name}
        </Box>
      );
    });
  };

  return (
    <Box
      className="types"
      height="100%"
    >
      <Typography fontWeight="bold">{props.text}</Typography>
      <Box className="d-flex gap-10">{displayTypeOrWeakness()}</Box>
    </Box>
  );
};

export default TypesOrWeakness;
