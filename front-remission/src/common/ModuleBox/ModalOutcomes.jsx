import React from "react";
// MUI
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormHelperText,
} from "@material-ui/core";

// react hook form
import { useForm, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { enqueueSnackbar } from "notistack";
import { successToast } from "../../utils/misc";
import { postOutcomes } from "../../services/boxMovement";

const ModalOutcomes = ({
  handleClose,
  handleCloseAll,
  dataBox,
  setReloadMovement,
  setReload
}) => {
  const user = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    try {
      values["id_box"] = dataBox.id;
      values["price"] = parseInt(values["price"].replace(/\D/g, ""));
      values["type"] = 2;
      values["user_creator"] = user.rol;
      values["user_updated"] = user.rol;
      values["status"] = 1

      postOutcomes(values)
        .then(({ data }) => {
          if (data?.status === "success") {
            setReloadMovement((prev) => !prev);
            setReload((prev) => !prev);
            handleCloseAll();
            enqueueSnackbar("Se ha generado el egreso", successToast);
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
              name="price"
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => field.onChange(e.target.value)}
                  customInput={TextField}
                  label="Precio"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
            {errors?.price && (
              <FormHelperText error>{errors?.price?.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="observation"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  multiline
                  variant="outlined"
                  label="Observaciones"
                  size="small"
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" onClick={handleClose}>
              Cancelar
            </Button>
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

export default ModalOutcomes;
