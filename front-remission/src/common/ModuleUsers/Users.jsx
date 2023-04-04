import React, {useState, useEffect } from 'react';

// MUI
import { Box, Grid, Typography, Button, TextField } from "@material-ui/core";

// styles
import { styles } from '../../styles/users.styles';

const Users = () => {

  const [listUsers, setListUsers] = useState([])
  const [loading, setLoading ] = useState(false)
  const [reload, setReload] = useState(false)


  // check if exists list users
  useEffect(() => {
    
  }, [])

  return (
    <Box style={styles?.container}>
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Typography style={styles?.title}> Usuarios</Typography>
                </Box>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={3}>
                <Box>
                    <Button>
                        <Typography>
                            Cargar usuarioss
                        </Typography>
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box>
                    <TextField 
                        variant="outlined"
                        label="Buscar usuarios"
                        size="small"
                    />
                </Box>
            </Grid>
        </Grid>
    </Box>
  )
}

export default Users