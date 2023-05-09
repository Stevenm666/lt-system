import { useState } from "react";

import { Controller } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Grid,
  Box,
  FormHelperText,
  Button,
} from "@material-ui/core";

// icons
import { AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";

const ChooseProducts = ({
  control,
  products,
  errors,
  handleClose,
  setValue,
  setProductSelected,
  productsSelected,
  isEdit = false,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box style={{ cursor: "pointer" }}>
            <RiSubtractFill />
          </Box>
          <Box>Cantidad</Box>
          <Box style={{ cursor: "pointer" }}>
            <AiOutlinePlus />
          </Box>
        </Box>
      </Grid>
      {/* products */}
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              defaultValue={productsSelected[0] ?? null}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[0] = null;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 1"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              defaultValue={productsSelected[1] ?? null}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[1] = null;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 2"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[2] = null;
                }
              }}
              defaultValue={productsSelected[2] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 3"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[3] = null;
                }
              }}
              defaultValue={productsSelected[3] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 4"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[4] = null;
                }
              }}
              defaultValue={productsSelected[4] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 5"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>

      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              defaultValue={productsSelected[5] ?? null}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[5] = null;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 6"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              defaultValue={productsSelected[6] ?? null}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[6] = null;
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 7"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[7] = null;
                }
              }}
              defaultValue={productsSelected[7] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 8"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[8] = null;
                }
              }}
              defaultValue={productsSelected[8] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 9"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>
      <Grid item xs={12}>
        <Controller
          rules={{
            required: {
              value: false,
              message: "Este campo es obligatorio",
            },
          }}
          name="products"
          control={control}
          render={({ field }) => (
            <Autocomplete
              id="products"
              options={products}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  setProductSelected((prev) => [...prev, newValue]);
                } else {
                  productsSelected[9] = null;
                }
              }}
              defaultValue={productsSelected[9] ?? null}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  size="small"
                  variant="outlined"
                  label="Producto 10"
                />
              )}
            />
          )}
        />
        {errors?.products && (
          <FormHelperText error>{errors?.products?.message}</FormHelperText>
        )}
      </Grid>

      <Grid item xs={6}>
        <Button
          variant="outlined"
          onClick={() => {
            if (!isEdit) {
              setProductSelected([]);
              setValue("products", "");
            }

            handleClose();
          }}
        >
          Cancelar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" onClick={() => handleClose()}>
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChooseProducts;
