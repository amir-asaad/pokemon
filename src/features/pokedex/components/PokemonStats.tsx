import { Typography } from '@mui/material';
import React from 'react';
import { PokemonStatsI } from '../store/pokemonSlice';

import '../styles/PokemonStats.css';

interface Props {
  stats: PokemonStatsI[];
}

const PokemonStats: React.FC<Props> = ({ stats }) => {
  const listStat = (stat: string, base_stat: number) => {
    const howManyToColor = parseInt(`${(base_stat * 15) / 200}`, 10);

    return [...Array(15)].map((val, index) => {
      return (
        <li
          key={`${stat}-${index}`}
          className={`value__list ${
            15 - howManyToColor <= index ? 'is-colored' : 'is-not-colored'
          }`}
        />
      );
    });
  };

  const mapStats = () => {
    return stats.map(({ base_stat, stat }) => (
      <ul
        key={stat.name}
        className="stats-wrapper__stat-list"
      >
        <li style={{ listStyleType: 'none' }}>
          <ul className="stat-list__value">
            {listStat(stat.name, base_stat)}
          </ul>
          <Typography align="center">{stat.name}</Typography>
        </li>
      </ul>
    ));
  };

  return (
    <div className="main__stats">
      <Typography sx={{ padding: '10px' }}>Stats</Typography>
      <div className="stats-wrapper">{mapStats()}</div>
    </div>
  );
};

export default PokemonStats;
