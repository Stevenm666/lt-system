import { useState, useEffect } from "react";

// mui
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";

// useSnackbar
import { useSnackbar } from "notistack";
import { successToast, errorToast } from "../../utils/misc";
import { getAllProducts } from "../../services/products";
import { Autocomplete } from "@material-ui/lab";

// react-redux
import { useSelector } from "react-redux";

// services
import { putRemissionById } from "../../services/remission";

// @props defaultValues is a object with default values
const ModalPutRemission = ({ defaultValues, id, setReload, handleClose }) => {
  // redux
  const user = useSelector((state) => state?.user);
  const [allProducts, setAllProducts] = useState([]);
  const [isEdit, setEdit] = useState(false);

  // form states
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useSnackbar
  const { enqueueSnackbar } = useSnackbar();

  // valid products
  const validateProducts = (products) => {
    if (!products?.length) {
      enqueueSnackbar("Se necesita al menos un producto", errorToast);
      return -1;
    }
    if (products && products?.length > 10) {
      enqueueSnackbar("Maximo 10 productos", errorToast);
      return -1;
    }
  };

  const onSubmit = (values) => {
    try {
      const valid = validateProducts(values?.products); // validate rules products for remission
      if (valid == -1) {
        return;
      }
      values["products"] = isEdit
        ? values?.products
        : values.products.map((el) => el?.code).join(","); // change data to accept it in back-end
      values["user_updated"] = user?.rol;
      // change status to completed - 1
      console.log(parseInt(id), values);
      putRemissionById(parseInt(id), values)
        .then(({ data }) => {
          if (data?.status === "success") {
            setReload((prev) => !prev);
            handleClose();
            enqueueSnackbar("Se ha editado correctamente", successToast);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };
  const onError = (e) => {};

  // useEffect
  useEffect(() => {
    try {
      getAllProducts()
        .then(({ data }) => {
          if (data?.status === "success" && data?.data) {
            setAllProducts(data?.data);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  //console.log({ allProducts, defaultValues, id });
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
              control={control}
              name="payment_method"
              defaultValue={defaultValues?.defaultPaymentMethod ?? ""}
              render={({ field }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="payment_method">Metodo de pago</InputLabel>
                  <Select
                    {...field}
                    labelId="payment_method"
                    id="payment_method"
                    label="Metodo de pago"
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value={1}>Efectivo</MenuItem>
                    <MenuItem value={2}>Bancolombia</MenuItem>
                    <MenuItem value={3}>Nequi</MenuItem>
                    <MenuItem value={4}>Daviplata</MenuItem>
                    <MenuItem value={5}>Tarjeta</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {errors?.payment_method && (
              <FormHelperText error>
                {errors?.payment_method?.message}
              </FormHelperText>
            )}
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
              defaultValue={defaultValues?.defaultProducts}
              render={({ field }) => (
                <Autocomplete
                  multiple
                  limitTags={1}
                  id="products"
                  options={allProducts}
                  defaultValue={defaultValues?.defaultProducts}
                  getOptionLabel={(option) =>
                    `${option?.name} - ${option?.code}`
                  }
                  getOptionSelected={(option, value) =>
                    option?.code == value?.code
                  }
                  onChange={(_event, newValue) => {
                    field.onChange(newValue.map((value) => value?.code));
                    setEdit(true);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      variant="outlined"
                      label="Productos"
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
            <Button onClick={() => handleClose()}>Cancelar</Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit">Guardar</Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ModalPutRemission;
