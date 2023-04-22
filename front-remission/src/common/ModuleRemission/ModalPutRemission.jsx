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
import SharedDialog from "../../share/Dialog/SharedDialog";
import ChooseProducts from "./ChooseProducts";

// @props defaultValues is a object with default values
const ModalPutRemission = ({
  defaultValues,
  id,
  setReload,
  handleClose,
  defaultProducts,
}) => {
  // redux
  const user = useSelector((state) => state?.user);
  const [allProducts, setAllProducts] = useState([]);
  const [isEdit, setEdit] = useState(false);

  // choose products - modal
  const [openModal, setOpenModal] = useState(false);
  const [productSelected, setProductSelected] = useState(defaultProducts ?? []);

  // form states
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
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
      values["products"] = productSelected
        ? productSelected?.map((el) => el?.code).join(",")
        : "";
      values["user_updated"] = user?.rol;
      console.log({values, productSelected})
      const valid = validateProducts(productSelected); // validate rules products for remission
      if (valid == -1) {
        return;
      }
      // change status to completed - 1
      console.log({ values });
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
      <SharedDialog
        open={openModal}
        title="Ecoge los productos"
        handleClose={() => setOpenModal(false)}
        body={
          <ChooseProducts
            control={control}
            errors={errors}
            products={allProducts}
            handleClose={() => setOpenModal(false)}
            setValue={setValue}
            setProductSelected={setProductSelected}
            productsSelected={productSelected}
            isEdit={true}
          />
        }
      />
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

          {/* observation */}
          <Grid item xs={12}>
            <Controller
              name="observation"
              control={control}
              defaultValue={defaultValues?.defaultObservation}
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
