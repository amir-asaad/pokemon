import { Grid, Skeleton } from '@mui/material';
import React from 'react';

interface Props {
  numberOfSkeletons: number;
  shouldDisplayText?: boolean;
  shouldBeRow?: boolean;
  rectangularHeight?: string;
}

const SkeletonLoading: React.FC<Props> = (props) => {
  const displaySkeletonLoadingDetails = () => {
    const skeletons: JSX.Element[] = [];

    for (let i = 0; i < props.numberOfSkeletons; i++) {
      skeletons.push(
        <Grid
          key={`skeleton-${i}`}
          item
          xs={props.shouldBeRow ? 12 / props.numberOfSkeletons : 12}
        >
          {props.shouldDisplayText && (
            <Skeleton
              variant="text"
              height="2.2rem"
              width="30%"
            />
          )}
          <Skeleton
            variant="rectangular"
            height={props.rectangularHeight || '3rem'}
          />
        </Grid>
      );
    }

    return (
      <Grid
        justifyContent={props.shouldBeRow ? 'row' : 'column'}
        container
        marginTop={3}
        alignContent="center"
        gap={5}
      >
        {skeletons}
      </Grid>
    );
  };
  return displaySkeletonLoadingDetails();
};

export default SkeletonLoading;
