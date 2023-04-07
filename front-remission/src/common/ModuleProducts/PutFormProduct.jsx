import { useState } from "react";

// react hook form
import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Grid,
  Typography,
  TextField,
  FormHelperText,
  Button,
} from "@material-ui/core";

import { putProducts } from "../../services/products";

const PutFormProducts = ({ setReload, product, handleClose }) => {

  const [changeCode, setChangeCode] = useState(product?.code)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (values) => {
    try {
      const submitData = {
        ...values,
        changeCode: !(changeCode == product?.code),
      }
      putProducts(product?.id, submitData)
        .then(({ data }) => {
          if (data?.status === "success") {
            setReload((prev) => !prev);
            handleClose();
            reset();
          } else {
            // show the message with alert sweet
            console.log(data?.message);
          }
        })
        .catch((e) => console.log({ e }));
    } catch (e) {
      console.log(e);
    }
  };

  const onError = (err) => {
    console.log({ err });
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box mb={2}>
              <Typography>{`${product?.name} - ${product?.code}`}</Typography>
            </Box>
          </Grid>
          {/* Name */}
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              }}
              name="name"
              control={control}
              defaultValue={product?.name}
              render={({ field }) => (
                <TextField
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  variant="outlined"
                  size="small"
                  label="Nombre"
                  defaultValue={product?.name}
                />
              )}
            />
            {errors?.name && (
              <FormHelperText error>{errors?.name?.message}</FormHelperText>
            )}
          </Grid>

          {/* Code */}
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
              }}
              name="code"
              control={control}
              defaultValue={product?.code}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setChangeCode(e.target.value);
                  }}
                  size="small"
                  label="Código"
                  defaultValue={product?.code}
                />
              )}
            />
            {errors?.code && (
              <FormHelperText error>{errors?.code?.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  messsage: "Este campo es obligatorio",
                },
              }}
              name="price"
              control={control}
              defaultValue={product?.price}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  onChange={(e) => field.onChange(e.target.value)}
                  size="small"
                  label="precio"
                  defaultValue={product?.price}
                />
              )}
            />
            {errors?.price && (
              <FormHelperText error>{errors?.price?.message}</FormHelperText>
            )}
          </Grid>

          {/* button save*/}

          <Grid item xs={12}>
            <Box mt={2}>
              <Button type="submit" variant="outlined">
                <Typography>Guardar</Typography>
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default PutFormProducts;
