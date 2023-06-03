import React from "react";

// MUI
import {
  Box,
  FormHelperText,
  Grid,
  TextField,
  Typography,
  Button,
} from "@material-ui/core";

// styles
import { styles } from "../../styles/login.styles.js";

// form
import { useForm, Controller } from "react-hook-form";

// services
import { loginService } from "../../services/serviceLogin";

// redux
import { useDispatch } from "react-redux";
import { loggedIn } from "../../features/user/userSlice";

// image
import image from "../../assets/LoginIlustrator.svg";

// useSnackbar
import { useSnackbar } from "notistack";
import { errorToast, successToast } from "../../utils/misc.js";

const Login = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar()

  const onSubmit = async (values) => {
    try {
      const { data } = await loginService(values);

      if (data?.status === "success") {
        if (data?.message !== "success") {
          enqueueSnackbar(data?.message, errorToast)
          return;
        }

        dispatch(
          loggedIn({
            username: data?.data?.username,
            rol: [data?.data?.rol],
            isLoggedIn: true,
          })
        );

        // save in local storage
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data?.data?.username,
            rol: [data?.data?.rol],
            isLoggedIn: true,
          })
        );
      }else{
        enqueueSnackbar(data?.message, errorToast)
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onError = (err) => {
    console.error(err);
  };

  return (
    <Box sx={{ height: "100vh" }}>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        style={{ height: "100%" }}
      >
        <Grid container style={{ height: "100%" }}>
          <Grid item xs={6} style={styles?.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box>
                  <Typography style={styles.title}>Ingresar</Typography>
                </Box>
                <Box>
                  <Typography style={styles?.subTitle}>
                    Bienvenido a lt system, por favor ingresa correo y
                    contraseña validas para ingresar sessión.
                  </Typography>
                </Box>
              </Grid>
              {/* user input */}
              <Grid item xs={12}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: "El campo es obligatorio",
                    },
                  }}
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Box style={styles?.containerInput}>
                      <Box>
                        <Typography style={styles?.textInput}>
                          E-mail:
                        </Typography>
                      </Box>
                      <Box>
                        <TextField
                          {...field}
                          variant="outlined"
                          label="email"
                          type="email"
                          onChange={(e) => field.onChange(e.target.value)}
                          defaultValue=""
                          size="small"
                        />
                      </Box>
                    </Box>
                  )}
                />
                {errors?.username && (
                  <FormHelperText error>
                    {errors?.username?.message}
                  </FormHelperText>
                )}
              </Grid>
              {/* passsword */}

              <Grid item xs={12}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es obligatorio",
                    },
                  }}
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Box style={styles?.containerInput}>
                      <Box>
                        <Typography style={styles?.textInput}>
                          Contraseña
                        </Typography>
                      </Box>
                      <Box>
                        <TextField
                          {...field}
                          variant="outlined"
                          label="Contraseña"
                          onChange={(e) => field.onChange(e.target.value)}
                          type="password"
                          defaultValue=""
                          size="small"
                        />
                      </Box>
                    </Box>
                  )}
                />
                {errors?.password && (
                  <FormHelperText error>
                    {errors?.password?.message}
                  </FormHelperText>
                )}
              </Grid>

              <Box style={styles?.separateLine} />

              {/* save button*/}
              <Grid item xs={6} />
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  type="submmit"
                  style={styles.buttonSave}
                >
                  <Typography style={styles.textSave}>Ingresar</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} style={styles?.sideIlustrator}>
            <Box style={styles?.ilustrator}>
              <img src={image} alt="ilustración" width={400} height={400} />
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default Login;
