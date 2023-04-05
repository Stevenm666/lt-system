import React, {useState, useEffect } from 'react';

// MUI
import { Box, Grid, Typography, Button, TextField } from "@material-ui/core";

// styles
import { styles } from '../../styles/users.styles';

// list component
import ListByUsers from './ListByUsers';

// services

import { postUploadUsers } from '../../services/uploadFiles';
import { getUsers } from '../../services/users';

const Users = () => {

  const [listUsers, setListUsers] = useState([])
  const [loading, setLoading ] = useState(false)
  const [reload, setReload] = useState(false)


  // check if exists list users
  useEffect(() => {
    try{
      setLoading(true);
      getUsers()
        .then(({data}) => {
          if (data?.status === "success"){
            setListUsers(data?.data);
          }
        })
        .catch(e => console.log(e))
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }, [reload])

  const handleUploadUsers = (e) => {
    try{
      const formData = new FormData();
      const file = e.target.files[0]
      formData.append('file', file);

      postUploadUsers(formData)
        .then(() => {
            setReload(prev => !prev);
        })
        .catch(e => console.log(e))
      // service upload users
    }catch(e){
      console.log(e)
    }
  }

  return (
    <Box style={styles?.container}>
        <Grid container>
            <Grid item xs={12}>
                <Box>
                    <Typography style={styles?.title}> Usuarios</Typography>
                </Box>
            </Grid>
            <Grid item xs={6}/>
            <Grid item xs={2}>
                <Box>
                  <input
                    accept=".xlsx,.xls"
                    style={{ display: 'none' }}
                    id="files"
                    type="file"
                    onChange={(e) => handleUploadUsers(e)}
                    onClick={(e) => {
                      e.target.value = '' // allow check upload same file
                    }}
                  />
                    <label htmlFor="files">
                      <Button variant="contained" component="span" style={styles.buttonUpload}>
                        <Typography style={styles?.textUpload}> Cargar usuarios</Typography>
                      </Button>
                    </label> 
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
       <Box mt={3}>
        <Grid container>
          <Grid item xs={3}>
            <Box>
              <Typography>Nombre</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography>Documento</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography>Celular</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography>Dirección</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3}>
          {loading 
            ? "loading" 
            : !listUsers?.length 
            ? <Box display="flex" justifyContent="center" mt={8}>No hay usuarios</Box> 
            : listUsers?.map((user) => (
                 <ListByUsers user={user}/>
             )) 
          }
        </Box>
        </Box> 
    </Box>
  )
}

export default Users