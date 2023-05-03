import { useEffect, useState, useMemo } from "react";

// MUI
import { Box, Grid, Typography, TextField, Button } from "@material-ui/core";

// ICONS
import { BsCash } from "react-icons/bs";
import { AiFillCreditCard } from "react-icons/ai";

// Styles
import { styles } from "../../styles/closeBox.styles";
import { NumericFormat } from "react-number-format";

// useForm
import { Controller, useForm } from "react-hook-form";

// sharedDialog
import SharedDialog from "../../share/Dialog/SharedDialog";
import SecondStepClose from "./SecondStepClose";

const CloseBox = ({ handleClose, dataBox, setReload }) => {
  const { handleSubmit, control, watch } = useForm();

  // useState
  const [dataValues, setDataValues] = useState({});
  const [secondForm, setSecondForm] = useState();
  const onSubmit = (values) => {
    values["cash"] = values["cash"] ? parseInt(values["cash"].replace(/\D/g, "")) : 0
    values["bancolombia"] = values["bancolombia"] ? parseInt(values["bancolombia"].replace(/\D/g, "")) : 0
    values["nequi"] = values["nequi"] ? parseInt(values["nequi"].replace(/\D/g, "")) : 0
    values["daviplata"] = values["daviplata"] ? parseInt(values["daviplata"].replace(/\D/g, "")) : 0
    values["card"] = values["card"] ? parseInt(values["card"].replace(/\D/g, "")) : 0
    values["outcomes"] = values["outcomes"] ? parseInt(values["outcomes"].replace(/\D/g, "")) : 0
    setDataValues(values);
    setSecondForm(true);
  };
  const onError = (err) => {
    console.log(err);
  };

  const totalCount = useMemo(() => {
    const keys = watch([
      "cash",
      "bancolombia",
      "nequi",
      "daviplata",
      "card",
      "outcomes",
    ]);

    const keysModified = keys.map((element) => {
      if (element === undefined) {
        return 0;
      }
      return parseInt(element.replace(/\D/g, ""));
    });

    const totalValue = keysModified.reduce(
      (accumulator, currentValue, currentIndex, array) => {
        if (currentIndex === array.length - 1) {
          return accumulator - currentValue;
        }
        return accumulator + currentValue;
      },
      0
    );

    return totalValue;
  }, [
    watch(["cash", "bancolombia", "nequi", "daviplata", "card", "outcomes"]),
  ]);

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      {/* SECOND MODAL */}
      <SharedDialog
        open={secondForm}
        handleClose={() => setSecondForm(false)}
        title="Cierre de caja"
        body={
          <SecondStepClose
            handleClose={() => setSecondForm(false)}
            handleAllClose={() => {
              handleClose();
              setSecondForm(false);
            }}
            dataValues={dataValues}
            dataBox={dataBox}
            totalCount={totalCount}
            setReload={setReload}
          />
        }
      />
      <Grid container spacing={1}>
        {/* CASH */}
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
            name="cash"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                defaultValue={0}
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
                size="small"
                variant="outlined"
              />
            )}
          />
        </Grid>
        {/* BANCOLOMBIA */}
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
            name="bancolombia"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                size="small"
                variant="outlined"
                defaultValue={0}
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
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
            name="nequi"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                size="small"
                defaultValue={0}
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
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
            name="daviplata"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                defaultValue={0}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
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
            name="card"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                defaultValue={0}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
              />
            )}
          />
        </Grid>
        {/* egresos */}
        <Grid item xs={6}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <BsCash size={25} />
            </Grid>
            <Grid item xs={6}>
              <Typography>Egresos</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="outcomes"
            control={control}
            render={({ field }) => (
              <NumericFormat
                {...field}
                thousandSeparator={","}
                prefix={"$ "}
                customInput={TextField}
                fullWidth
                defaultValue={0}
                size="small"
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value) {
                    field.onChange(e.target.value);
                  } else {
                    field.onChange("$ 0");
                  }
                }}
              />
            )}
          />
        </Grid>
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
              {parseInt(totalCount).toLocaleString("es-CO", {
                style: "currency",
                currency: "COP",
              })}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <hr />
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" onClick={() => handleClose()}>
            Cancelar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" type="submit">
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CloseBox;
