import React, { useState, useEffect } from "react";

// MUI
import {
  Box,
  Grid,
  Typography,
  Button,
  TextField,
  FormHelperText,
} from "@material-ui/core";

// Styles
import { styles } from "../../styles/closeBox.styles";

// ICONS
import { BsCash } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";

// number format
import { NumericFormat } from "react-number-format";

import { useForm, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";
import { postOpenBox, putOpenBox } from "../../services/box";
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

const ModalOpenBox = ({ handleClose, setReload, dataBox }) => {
  // redux user
  const user = useSelector((state) => state.user);
  const { enqueueSnackbar } = useSnackbar();
  const [total, setTotal] = useState(0);
  const [values, setValues] = useState({
    "efectivo" : 0,
    "bancolombia" : 0,
    "nequi" : 0,
    "daviplata" : 0,
    "tarjeta" : 0
  })

  // form
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const name = e.target.name
    const val = parseInt(e.target.value.replace(/\D/g, ""))
    setValues({ ...values, [name] : val })
  }

  useEffect(() => {
    setTotal(values?.efectivo+values?.bancolombia+values?.nequi+values?.daviplata+values?.tarjeta)
  }, [values])
  

  const onSubmit = (values) => {
    try {
      values["efectivo"] = parseInt(values["efectivo"].replace(/\D/g, ""));
      values["bancolombia"] = parseInt(values["bancolombia"].replace(/\D/g, ""));
      values["nequi"] = parseInt(values["nequi"].replace(/\D/g, ""));
      values["daviplata"] = parseInt(values["daviplata"].replace(/\D/g, ""));
      values["tarjeta"] = parseInt(values["tarjeta"].replace(/\D/g, ""));
      values["total"] = total;
      values["status"] = 1;
      values["user_creator"] = user?.rol;

      if (dataBox?.id) {
        // edit the box
        putOpenBox(dataBox?.id, values)
          .then(({ data }) => {
            if (data?.status === "success") {
              setReload((prev) => !prev);
              enqueueSnackbar("Se ha abierto la caja", successToast);
              handleClose();
            }
          })
          .catch((e) => console.log(e));
        return;
      }

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
          {/* Efectivo */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <BsCash size={25} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Efectivo</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="efectivo"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Bancolombia */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <AiFillCreditCard size={25} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Bancolombia</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="bancolombia"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Nequi */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <AiFillCreditCard size={25} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Nequi</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="nequi"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Daviplata */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <AiFillCreditCard size={25} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Daviplata</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="daviplata"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* Tarjeta */}
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <AiFillCreditCard size={25} />
              </Grid>
              <Grid item xs={6}>
                <Typography>Tarjeta</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Controller
              rules={{
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              }}
              name="tarjeta"
              control={control}
              render={({ field }) => (
                <NumericFormat
                  {...field}
                  thousandSeparator={","}
                  prefix={"$ "}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
                  customInput={TextField}
                  label="Caja inicial"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          {/* <Grid item xs={12}>
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
                  onChange={(e) => {
                    field.onChange(e.target.value)
                    handleChange(e)
                  }}
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
          </Grid>           */}
          <Grid item xs={6}>
          <Box>
          <Typography style={styles?.totalBox}>
              <b>$ Total caja</b>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>
              {parseInt(total).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </Typography>
          </Box>
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
