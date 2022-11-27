import { Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import { capitalize } from '../../../utils/helpers';

import '../styles/PokemonInfo.css';

const PokemonInfo: React.FC = () => {
  const { viewPokemon } = useAppSelector((state) => state.pokemon);
  const height = parseInt(`${viewPokemon.height}0`, 10);
  const weight = viewPokemon.weight / 10;

  const mapAbilities = () => {
    const reduced = viewPokemon.abilities.reduce((acc: String[], val) => {
      if (!val.is_hidden) {
        acc.push(capitalize(val.ability.name));
      }

      return acc;
    }, []);

    return reduced.join(', ');
  };

  const headerCss = () => {
    return {
      color: 'white'
    };
  };

  return (
    <div className="pokemon-info__wrapper">
      <Typography sx={headerCss}>Height</Typography>
      <Typography>{height} cm</Typography>
      <Typography sx={headerCss}>Weight</Typography>
      <Typography>{weight} kg</Typography>
      <Typography sx={headerCss}>Abilities</Typography>
      <Typography>{mapAbilities()}</Typography>
    </div>
  );
};

export default PokemonInfo;
