import { Card, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { memo } from 'react';
import { PokemonStatsI } from '../store/pokemonSlice';

import '../styles/stats.style.css';

interface Props {
  stats: PokemonStatsI[];
}

const PokemonStats: React.FC<Props> = ({ stats }) => {
  const getPercentageHeight = (base_stat: number) => {
    return parseInt(`${(base_stat * 15) / 200}`, 10) * 10;
  };

  const mapStats = () => {
    return stats.map(({ base_stat, stat }) => {
      const percentageHeight = getPercentageHeight(base_stat);

      return (
        <Grid
          item
          sx={{
            my: 2
          }}
          xs={2}
          key={stat.name}
        >
          <Card
            sx={{
              height: '200px',
              width: '50%',
              mx: 'auto'
            }}
          >
            <div
              style={{
                height: `${100 - percentageHeight}%`,
                backgroundColor: 'white'
              }}
            />
            <div
              className="stats__value--animation"
              style={{
                height: `${percentageHeight}%`,
                backgroundColor: 'pink'
              }}
            />
          </Card>
          <Typography
            align="center"
            sx={{ overflowWrap: 'break-word', my: 1 }}
          >
            {stat.name}
          </Typography>
        </Grid>
      );
    });
  };

  return (
    <Container sx={{ backgroundColor: 'gray' }}>
      <Typography sx={{ padding: '10px' }}>Stats</Typography>
      <Grid container>{mapStats()}</Grid>
    </Container>
  );
};

export default memo(PokemonStats);
