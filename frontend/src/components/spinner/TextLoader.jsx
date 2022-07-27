import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


//Display a loading text animation while waiting for server response
export default function TextLoader() {
  return (
    <Box sx={{ width: 300, margin:' 30px' }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
  );
}
