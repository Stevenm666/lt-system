import React from "react";

// MUI

import {
  Box,
  Grid,
  Button,
  Typography,
  TextField,
  FormHelperText,
} from "@material-ui/core";

// hook form
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-multi-date-picker";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { postGeneratePDFBox } from "../../services/pdf";
import { saveAs } from "file-saver";
const ModalPDF = ({ handleClose, dataBox, setReload }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    try {
      postGeneratePDFBox(values)
        .then(({ data }) => {
          const file = new Blob([data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          saveAs(file, `box_${values["startDate"]}-${values["endDate"]}.pdf`); // save the file
          handleClose()
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
          <Grid item xs={6}>
            <Controller
              rules={{
                required: { value: true, message: "Este campo es obligatorio" },
              }}
              name="startDate"
              control={control}
              defaultValue={format(new Date(), "yyyy-MM-dd", {
                locale: es,
              })}
              render={({ field }) => (
                <TextField
                  id="date"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Desde"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd", {
                    locale: es,
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
            {errors?.startDate && (
              <FormHelperText error>
                {errors?.startDate?.message}
              </FormHelperText>
            )}
          </Grid>

          <Grid item xs={6}>
            <Controller
              rules={{
                required: { value: true, message: "Este campo es obligatorio" },
              }}
              name="endDate"
              control={control}
              defaultValue={format(new Date(), "yyyy-MM-dd", {
                locale: es,
              })}
              render={({ field }) => (
                <TextField
                  id="date"
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Hasta"
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd", {
                    locale: es,
                  })}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              )}
            />
            {errors?.endDate && (
              <FormHelperText error>{errors?.endDate?.message}</FormHelperText>
            )}
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleClose} variant="outlined">
              Cancelar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ModalPDF;
