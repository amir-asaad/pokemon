import { LinearProgress } from '@mui/material';
import React from 'react';

const LoadingBar: React.FC = () => {
  return (
    <div>
      <LinearProgress
        color="secondary"
        sx={{ height: '25px', borderRadius: '10px' }}
      />
    </div>
  );
};

export default LoadingBar;
