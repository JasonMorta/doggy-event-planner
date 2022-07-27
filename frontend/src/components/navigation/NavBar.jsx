import * as React from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PanoramaIcon from '@mui/icons-material/Panorama';
import InfoIcon from '@mui/icons-material/Info';
import './nav.css'

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  let navigate = useNavigate()

  return (
    <Box sx={{ width: 500 }} className="navBar">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >

  
        <BottomNavigationAction onClick={()=>navigate('./')}  label="Home"  icon={<HomeIcon />} />

        <BottomNavigationAction onClick={()=>navigate('./Gallery')}  label="Gallery" icon={<PanoramaIcon />} />

        <BottomNavigationAction onClick={()=>navigate('./About')} label="About"  icon={<InfoIcon />} />
       
    


      </BottomNavigation>
    </Box>
  );
}