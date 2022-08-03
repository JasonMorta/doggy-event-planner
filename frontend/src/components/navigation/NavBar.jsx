import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import PanoramaIcon from "@mui/icons-material/Panorama";
import "./nav.css";

export default function NavBar() {
  const [value, setValue] = React.useState(0);

  let navigate = useNavigate();

  const navStyle = {
    backgroundColor: "#efffafd6",
    
  };

  const btnStyle = {
    color: "#9da2dd",
  };

  return (
    <div className="nav-container">
      <Box className="navBar">
        <BottomNavigation
          sx={navStyle}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            sx={btnStyle}
            onClick={() => navigate("./")}
            label="Home"
            icon={<HomeIcon />}
          />

          <BottomNavigationAction
            sx={btnStyle}
            onClick={() => navigate("./Gallery")}
            label="Gallery"
            icon={<PanoramaIcon />}
          />
        </BottomNavigation>
      </Box>
    </div>
  );
}
