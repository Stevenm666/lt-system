import React from "react";

import { Box, Button, Typography, Grid } from "@material-ui/core";

// services
import { cancelRemissionById } from "../../services/remission";

// Snackbar
import { useSnackbar } from "notistack";
import { successToast, errorToast } from "../../utils/misc";

// Redux
import { useSelector } from "react-redux";

const CancelRemission = ({ id, setReload, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state) => state?.user);

  const handleCancel = () => {
    try {
      let dataSubmit = {
        rol: user?.rol,
      };
      cancelRemissionById(parseInt(id), dataSubmit)
        .then(({ data }) => {
          if (data?.status === "success") {
            enqueueSnackbar("Se ha cancelado correctamente", successToast);
            setReload((prev) => !prev);
            handleClose();
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Box mb={3}>
            <Typography>
              ¿Estás seguro que desea cancelar la remisión?
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Button variant="outlined" onClick={() => handleClose()}>
              Cancelar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Button variant="outlined" onClick={() => handleCancel()}>
              Aceptar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CancelRemission;
