import { useState, useEffect } from "react";
import React from "react";

// MUI
import { Box, Grid, Typography } from "@material-ui/core";

// styles
import { styles } from "../../styles/box.styles";

// date format
import { format } from "date-fns";

const BoxModule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Box style={styles?.container}>
      <Grid container>
        <Grid item xs={10}>
          <Box>
            <Typography>Información de la Caja</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Typography>Caja cerrada</Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>a</Grid>
        <Grid item xs={4}>b</Grid>
        <Grid item xs={4}>c</Grid>
      </Grid>
    </Box>
  );
};

export default BoxModule;
