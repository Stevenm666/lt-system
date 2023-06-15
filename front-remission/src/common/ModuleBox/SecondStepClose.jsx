import { useState, useEffect } from "react";

// MUI
import {
  Box,
  Grid,
  Typography,
  Button,
  FormHelperText,
} from "@material-ui/core";
import { BsCash } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";
import { getBoxMovementClose } from "../../services/boxMovement";

// redux
import { useSelector } from "react-redux";
import { putOpenBoxToClose } from "../../services/box";
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

const SecondStepClose = ({
  handleClose,
  handleAllClose,
  dataValues,
  dataBox,
  totalCount,
  setReload,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  // redux
  const user = useSelector((state) => state.user);

  // useState
  const [dataSystem, setDataSystem] = useState({
    cash: 0,
    bancolombia: 0,
    nequi: 0,
    daviplata: 0,
    card: 0,
    outcomes: 0,
  });

  const [disabled, setDisabled] = useState(true);

  const handleCloseBox = () => {
    try {
      const dataSubmit = {
        ending: totalCount,
        total_diff: dataBox?.opening - totalCount,
        user_finished: user?.rol,
      };
      putOpenBoxToClose(dataBox?.id, dataSubmit)
        .then(({ data }) => {
          if (data?.status === "success") {
            setReload((prev) => !prev);
            handleAllClose();
            enqueueSnackbar("Se ha cerrado correctamente", successToast);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      getBoxMovementClose(dataBox?.id)
        .then(({ data }) => {
          if (data?.status === "success") {
            setDataSystem(data?.data);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, [dataBox?.id]);

  // valid the system data with box data using useffect
  useEffect(() => {
    const systemValues = Object.values(dataSystem);
    const valuesValues = Object.values(dataValues);

    const validated = systemValues.every(
      (el, idx) => el - valuesValues[idx] === 0
    );

    setDisabled(!validated);
  }, [dataSystem, dataValues]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={3}></Grid>
        <Grid item xs={3}>
          <Box>
            <Typography style={{ fontSize: "12px" }}>Sistema</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography style={{ fontSize: "12px" }}>Caja</Typography>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <Typography style={{ fontSize: "12px" }}>Diferencia</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>

        {/* cash */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <BsCash size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Efectivo</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["cash"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["cash"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["cash"] - dataValues["cash"]).toLocaleString(
              "es-CO",
              {
                style: "currency",
                currency: "COP",
              }
            )}
          </Typography>
        </Grid>

        {/* bancolombia */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <AiFillCreditCard size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Bancolombia</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["bancolombia"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["bancolombia"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(
              dataSystem["bancolombia"] - dataValues["bancolombia"]
            ).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>

        {/* nequi */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <AiFillCreditCard size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Nequi</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["nequi"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["nequi"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["nequi"] - dataValues["nequi"]).toLocaleString(
              "es-CO",
              {
                style: "currency",
                currency: "COP",
              }
            )}
          </Typography>
        </Grid>

        {/* daviplata */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <AiFillCreditCard size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Daviplata</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["daviplata"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["daviplata"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(
              dataSystem["daviplata"] - dataValues["daviplata"]
            ).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>

        {/* card */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <AiFillCreditCard size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Tarjeta</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["card"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["card"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["card"] - dataValues["card"]).toLocaleString(
              "es-CO",
              {
                style: "currency",
                currency: "COP",
              }
            )}
          </Typography>
        </Grid>

        {/* outcome */}
        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <BsCash size="25" />
            </Grid>
            <Grid item xs={8}>
              <Typography style={{ fontSize: "12px" }}>Egreso</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataSystem["outcomes"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(dataValues["outcomes"]).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography style={{ fontSize: "12px" }}>
            {parseInt(
              dataSystem["outcomes"] - dataValues["outcomes"]
            ).toLocaleString("es-CO", {
              style: "currency",
              currency: "COP",
            })}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <hr />
        </Grid>

        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => handleClose()}>
            Atras
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="outlined"
            onClick={() => handleCloseBox()}
            disabled={disabled}
          >
            Cerrar caja
          </Button>
        </Grid>

        {disabled && (
          <Grid item xs={12}>
            <FormHelperText error>
              Los datos no coiciden, por favor, retificar.
            </FormHelperText>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SecondStepClose;
