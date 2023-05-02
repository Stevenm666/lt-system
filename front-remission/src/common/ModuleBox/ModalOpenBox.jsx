import React from "react";

// MUI
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";

// number format
import { NumericFormat } from "react-number-format";

import { useForm, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { postOpenBox } from "../../services/box";
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

const ModalOpenBox = ({ handleClose, setReload }) => {
  // redux user
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  // form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    try {
      values["opening"] = parseInt(values["opening"].replace(/\D/g, ""));
      values["status"] = 1;
      values["user_creator"] = user?.rol;

      // service
      postOpenBox(values)
        .then(({ data }) => {
          if (data?.status === "success") {
            setReload((prev) => !prev);
            enqueueSnackbar("Se ha abierto la caja", successToast);
            handleClose();
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const onError = (e) => {
    console.log(e);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="opening"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => field.onChange(e.target.value)}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
            {errors?.opening && (
              <FormHelperText error>{errors?.opening?.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={6} onClick={handleClose}>
            <Button variant="outlined">Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" type="submit">
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ModalOpenBox;
