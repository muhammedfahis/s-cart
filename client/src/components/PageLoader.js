import React from "react";
import { Grid, Box, Fab, CircularProgress } from "@mui/material";
import { blue } from "@mui/material/colors";
import { ReactComponent as PearsonSvg } from "../assets/images/PearsonIcon.svg";

export default function PageLoader(props) {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: props.miniLoader ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.9)",
        zIndex: 9999,
      }}
    >
      <Box sx={{ position: "absolute" }}>
        <Fab aria-label="save">
          <PearsonSvg />
        </Fab>
        <CircularProgress
          size={68}
          sx={{
            color: blue[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 2,
          }}
        />
      </Box>
    </Grid>
  );
}
