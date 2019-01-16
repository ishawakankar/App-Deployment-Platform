import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingSpinner(props) {
  return (
    <div>
      <CircularProgress className= "progress" thickness={7} />
    </div>
  );
}

export default LoadingSpinner;