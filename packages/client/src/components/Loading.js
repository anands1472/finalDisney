import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = ({ size, thickness }) => {
  return <CircularProgress color="secondary"  size={size} thickness={thickness} />
}

export default Loading
