import React from 'react';

// MUI
import { Grid, Box, Typography } from '@material-ui/core';

// styles
import { styles } from '../../styles/listUsers.styles';

const ListByUsers = ({ user }) => {
  return (
    <Box style={styles?.container}>
      <Grid container>
        <Grid item xs={3}>
          <Box>
            <Typography style={styles?.textItemName}>
              {user?.name}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography style={styles?.textItem}>
              {`${user?.type_identy} ${user?.identy}`}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Typography style={styles?.textItem}>
              {user?.phone}
            </Typography>
          </Box> 
        </Grid> 
        <Grid item xs={3}>
          <Box>
            <Typography style={styles?.textItem}>
              {`${user?.city} ${user?.addres}`}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ListByUsers