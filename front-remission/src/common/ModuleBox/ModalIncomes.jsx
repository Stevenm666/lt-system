import {useState} from "react";

// MUI
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

// react hook form
import { useForm, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { NumericFormat } from "react-number-format";
import { postIncomes } from "../../services/boxMovement";
import { useSnackbar } from "notistack";
import { successToast, errorToast } from "../../utils/misc";

const ModalIncomes = ({
  handleClose,
  handleCloseAll,
  dataBox,
  setReloadMovement,
  setReload,
}) => {
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();

  const [disableBUtton, setDisableButton] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    try {
      values["id_box"] = dataBox.id;
      values["user_creator"] = user.rol;
      values["user_updated"] = user.rol;
      values["type"] = 1;
      values["price"] = parseInt(values["price"].replace(/\D/g, ""));
      values["status"] = 1;
      values["consecutive"] = `${values["consecutive"]}-${values["number_consecutive"]}`

      setDisableButton(true)
      postIncomes(values)
        .then(({ data }) => {
          if (data?.status === "success") {
            handleCloseAll();
            setReloadMovement((prev) => !prev);
            setReload((prev) => !prev);
            enqueueSnackbar("Se ha generado el ingreso", successToast);
          }else {
            enqueueSnackbar(data?.message, errorToast);
          }
          setDisableButton(false)
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
          <Grid item xs={4}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="consecutive"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="consecutive">Consecutivo</InputLabel>
                  <Select
                    {...field}
                    labelId="consecutive"
                    id="consecutive"
                    label="Consecutivo"
                    defaultValue={""}
                    onChange={(e) => field.onChange(e.target.value)}
                  >
                    <MenuItem value="FV">FV</MenuItem>
                    <MenuItem value="RM">RM</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
            {errors?.consecutive && (
              <FormHelperText error>
                {errors?.consecutive?.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="number_consecutive"
              control={control}
              defaultValue={""}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="#"
                  type="number"
                  size="small"
                  fullWidth
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="type_income"
              control={control}
              render={({ field }) => (
                <FormControl variant="outlined" size="small" fullWidth>
                  <InputLabel id="type_income">Método de pago</InputLabel>
                  <Select
                    {...field}
                    labelId="type_income"
                    id="type_income"
                    label="Método de pago"
                    defaultValue={""}
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
            {errors?.type_income && (
              <FormHelperText error>
                {errors?.type_income?.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="price"
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
            <Button variant="outlined" type="submit" disabled={disableBUtton}>
              Guardar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ModalIncomes;
