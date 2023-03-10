import { Box, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../../../hooks';
import SkeletonLoading from '../../../components/SkeletonLoading';

interface Props {
  isFetchingDetails: boolean;
}

const Stats: React.FC<Props> = (props) => {
  const { stats, types } = useAppSelector(
    (state) => state.pokemon.viewPokemon
  );
  const getPercentageWidth = (base_stat: number) => {
    return parseFloat(`${base_stat / 200}`) * 100;
  };

  const mapStats = () => {
    return stats.map(({ base_stat, stat }) => {
      const percentageWidth = getPercentageWidth(base_stat);

      return (
        <Grid
          item
          sx={{
            my: 1
          }}
          key={stat.name}
          flexGrow={1}
          flexBasis={0}
        >
          <Card
            sx={{
              height: '1.2rem'
            }}
            elevation={3}
          >
            <div
              className={`stats__value--animation ${types[0]?.type.name}--background`}
              style={{
                width: `${percentageWidth}%`,
                height: '100%'
              }}
            />
          </Card>
          <Typography sx={{ overflowWrap: 'break-word', my: 1 }}>
            {stat.name}
          </Typography>
        </Grid>
      );
    });
  };

  const displayStats = () => {
    return (
      <Box className="stats">
        <Grid
          container
          flexDirection="column"
        >
          {mapStats()}
        </Grid>
      </Box>
    );
  };

  const displaySkeletonLoading = () => {
    return (
      <Box>
        <SkeletonLoading
          numberOfSkeletons={3}
          shouldDisplayText
        />
      </Box>
    );
  };

  return props.isFetchingDetails
    ? displaySkeletonLoading()
    : displayStats();
};

export default Stats;
