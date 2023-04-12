import { useState } from 'react'

// MUI
import { Box, Button, Grid, Typography } from "@material-ui/core";

// styles
import { styles } from '../../styles/remission.style';

import SharedDialog from '../../share/Dialog/SharedDialog';

// form
import FormRemission from './FormRemission';

const Remission = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box style={styles?.container}>
      {/* modal */}
      <SharedDialog 
        open={open}
        handleClose={() => setOpen(false)}
        title="Crear remisión"
        body={
          <FormRemission handleClose={() => setOpen(false)}/>
        }
      />
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Typography>Remisiones</Typography>
          </Box>
        </Grid>
        <Grid  item xs={6}/>
        <Grid item xs={2}>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            <Typography>Crear</Typography>
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Remission;