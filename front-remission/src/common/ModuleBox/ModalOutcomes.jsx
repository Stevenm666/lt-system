import React from "react";
// MUI
import { Box, Grid, Typography, TextField, Button } from "@material-ui/core";

// react hook form
import { useForm, Controller } from "react-hook-form";

// redux
import { useSelector } from "react-redux";

const ModalOutcomes = ({ handleClose, handleCloseAll, dataBox }) => {
  const user = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    console.log({ values });
  };
  const onError = (e) => {
    console.log(e);
  };
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Grid container spacing={2}>

        </Grid>
      </form>
    </Box>
  );
};

export default ModalOutcomes;
