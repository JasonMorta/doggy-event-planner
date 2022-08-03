import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mui/material';



// This is the loading animation that is shown when a users clicks the login/join buttons
export default function CircularLoader() {
  return (
      <Button >
        <CircularProgress />
      </Button>
      
   
  );
}