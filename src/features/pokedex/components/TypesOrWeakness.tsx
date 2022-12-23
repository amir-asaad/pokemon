import { Box, Typography } from '@mui/material';
import React from 'react';
import { DamageRelationsDataI } from '../interface/type.interface';
import { PokemonTypesInterface } from '../interface/store.interface';

interface TypesOrWeaknessProps {
  text: 'Types' | 'Weakness';
  values: PokemonTypesInterface[] | DamageRelationsDataI[];
  showLabel?: boolean;
  centerList?: boolean;
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
      {props.showLabel && (
        <Typography fontWeight="bold">{props.text}</Typography>
      )}
      <Box
        className={`d-flex gap-10 flex-wrap ${
          props.centerList ? 'justify-center' : ''
        }`}
      >
        {displayTypeOrWeakness()}
      </Box>
    </Box>
  );
};

export default TypesOrWeakness;
