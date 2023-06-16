import { useState, useEffect } from "react";

// MUI
import {
  Box,
  Typography,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  FormHelperText,
} from "@material-ui/core";

import { Autocomplete } from "@material-ui/lab";

import { useForm, Controller } from "react-hook-form";

// useDebounce
import { useDebounceHook } from "../../hooks/useDebounce";

// utils
import { cities, successToast } from "../../utils/misc";
import { getUserByDocument } from "../../services/users";
import { getAllProducts } from "../../services/products";

// useSnackbar
import { useSnackbar } from "notistack";
import { errorToast } from "../../utils/misc";

// services
import { postRemission } from "../../services/remission";

// redux
import { useSelector } from "react-redux";

// dialog
import SharedDialog from "../../share/Dialog/SharedDialog";
import ChooseProducts from "./ChooseProducts";

const FormRemission = ({ setReload, handleClose }) => {
  // redux
  const user = useSelector((state) => state?.user);
  // form hook
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm();

  // enque
  const { enqueueSnackbar } = useSnackbar();

  // debounce
  const [document, setDocument] = useState("");
  const debounceFilter = useDebounceHook(document);
  const typeIdenty = watch("type_identy");

  // userFound
  const [userFound, setUserFound] = useState(false);

  // disabledSubmit
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  // get products
  const [products, setProducts] = useState([]);

  // choose products - modal
  const [openModal, setOpenModal] = useState(false);
  const [productSelected, setProductSelected] = useState([]);

  const validateProducts = (products) => {
    const amountOfProducts = products?.reduce(
      (ant, acc) => ant + acc.amount,
      0
    );
    if (!products?.length) {
      enqueueSnackbar("Se necesita al menos un producto", errorToast);
      return -1;
    }
    if (products && products?.length > 10) {
      enqueueSnackbar("Maximo 10 productos", errorToast);
      return -1;
    }

    if (amountOfProducts >= 10) {
      enqueueSnackbar("Maximo 10 productos", errorToast);
      return -1;
    }
  };

  const onSubmit = (values) => {
    try {
      values["is_new"] = !userFound;
      values["rol"] = user?.rol;
      values["payment_method"] = null;
      values["products"] = productSelected;
      const valid = validateProducts(productSelected); // validate rules products for remission
      if (valid == -1) {
        return;
      }
      postRemission(values)
        .then(({ data }) => {
          setDisabledSubmit(true);
          if (data?.status === "success") {
            setReload((prev) => !prev);
            enqueueSnackbar("Se ha creado exitosamente", successToast);
            handleClose();
          }
        })
        .finally(() => setDisabledSubmit(false))
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  const onError = (e) => {
    console.log(e);
  };

  // get user by document
  useEffect(() => {
    try {
      if (typeIdenty && debounceFilter) {
        getUserByDocument(typeIdenty, debounceFilter)
          .then(({ data }) => {
            if (data?.status === "success") {
              if (data?.data?.hasOwnProperty("id")) {
                setUserFound(true);
                setValue("name", data?.data?.name);
                setValue("phone", data?.data?.phone);
                setValue("city", data?.data?.city);
                setValue("addres", data?.data?.addres);
              } else {
                // clear values
                setUserFound(false);
                setValue("name", "");
                setValue("phone", "");
                setValue("city", "");
                setValue("addres", "");
              }
            }
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  }, [debounceFilter, typeIdenty]);

  // products
  useEffect(() => {
    try {
      getAllProducts()
        .then(({ data }) => {
          if (data?.status === "success" && data?.data) {
            setProducts(data?.data);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <Box>
      <SharedDialog
        open={openModal}
        title="Ecoge los productos"
        handleClose={() => setOpenModal(false)}
        body={
          <ChooseProducts
            control={control}
            errors={errors}
            products={products}
            handleClose={() => setOpenModal(false)}
            setValue={setValue}
            setProductSelected={setProductSelected}
            productsSelected={productSelected}
          />
        }
      />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>
          {/* type_identy */}
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="type_identy"
              control={control}
              defaultValue={userFound?.type_identy ?? ""}
              render={({ field }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="type_identy">Tipo</InputLabel>
                  <Select
                    {...field}
                    labelId="type_identy"
                    id="type_identy"
                    label="Tipo"
                    defaultValue={userFound?.type_identy ?? ""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value="Cédula de ciudadanía">
                      Cédula de ciudadanía
                    </MenuItem>
                    <MenuItem value="NIT">NIT</MenuItem>
                    <MenuItem value="Tarjeta de extranjería">
                      Tarjeta de extranjería
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {errors?.type_identy && (
              <FormHelperText error>
                {errors?.type_identy?.message}
              </FormHelperText>
            )}
          </Grid>
          {/* identy */}
          <Grid item xs={8}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="identy"
              control={control}
              defaultValue={userFound?.identy ?? ""}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Número de documento"
                  defaultValue={userFound?.identy ?? ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    setDocument(e.target.value);
                  }}
                />
              )}
            />
            {errors?.identy && (
              <FormHelperText error>{errors?.identy?.message}</FormHelperText>
            )}
          </Grid>
          {/* name */}
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="name"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Nombres"
                  defaultValue={""}
                  disabled={userFound}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            {errors?.name && (
              <FormHelperText error>{errors?.name?.message}</FormHelperText>
            )}
          </Grid>
          {/* phone */}
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="phone"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Celular"
                  disabled={userFound}
                  defaultValue=""
                  onChange={(e) => {
                    field.onChange(e.target.value);
                  }}
                />
              )}
            />
            {errors?.phone && (
              <FormHelperText error>{errors?.phone?.message}</FormHelperText>
            )}
          </Grid>
          {/* city */}
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="city">Ciudad</InputLabel>
                  <Select
                    {...field}
                    labelId="city"
                    id="city"
                    label="Ciudad"
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={userFound}
                    defaultValue=""
                  >
                    {cities.map((city) => (
                      <MenuItem value={city?.name} key={city?.id}>
                        {city?.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            />
            {errors?.city && (
              <FormHelperText error>{errors?.city?.message}</FormHelperText>
            )}
          </Grid>
          {/* address */}
          <Grid item xs={8}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="addres"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  disabled={userFound}
                  label="Dirección"
                  variant="outlined"
                  size="small"
                  defaultValue={""}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
            {errors?.addres && (
              <FormHelperText error>{errors?.addres?.message}</FormHelperText>
            )}
          </Grid>

          {/* observation */}
          <Grid item xs={12}>
            <Controller
              name="observation"
              control={control}
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

          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setOpenModal(true)}
            >
              Escoger productos
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleClose}>
              <Typography>Cancelar</Typography>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button type="submit" disabled={disabledSubmit}>
              <Typography>Guardar</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default FormRemission;
