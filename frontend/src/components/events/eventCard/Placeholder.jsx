import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import "./event.css";

export default function Placeholder() {
  return (
    <>
      <h3 style={{ margin: 0, textAlign: "center" }}>
        No events at the moment
      </h3>
      <h3 style={{ margin: 0, textAlign: "center" }}>check back later</h3>
      <div className="placeholder">
        <Box sx={{ width: 300 }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <br />
          <Skeleton variant="rectangular" width={300} height={118} />
        </Box>
      </div>
    </>
  );
}
