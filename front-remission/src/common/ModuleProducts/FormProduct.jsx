import { useState, useEffect } from "react";

// react hook form
import { useForm, Controller } from "react-hook-form";

import {
  Box,
  Grid,
  Typography,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormHelperText,
  Button
} from "@material-ui/core";

import { AiOutlinePlus } from "react-icons/ai";
import { postProducts } from "../../services/products";

const FormProduct = ({ setReload }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [expanded, setExpanded] = useState(false);

  const handleExpanded = (panel) => (event, isExpanded) => {
    event.preventDefault();
    setExpanded(isExpanded ? panel : false);
    reset(); // RESET ALL fields
  };

  const onSubmit = values => {
    try{
      postProducts(values)
        .then(({data}) => {
          if (data?.status === 'success'){
            setExpanded(false)
            reset();
            setReload(prev => !prev)
          }else{
            // show the message with alert sweet
            console.log(data?.message)
          }
        })
        .catch(e => console.log({e}))
    }catch(e){
      console.log(e)
    }
  }

  const onError = (err) => {
    console.log({err})
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <Accordion expanded={expanded} onChange={handleExpanded(true)}>
          <AccordionSummary
            expandIcon={<AiOutlinePlus />}
            arial-control="accordion"
            id="accordion"
          >
            <Box>
              <Typography>Crear nuevo producto</Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1}>
              {/* Name */}
              <Grid item xs={4}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  }}
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                      variant="outlined"
                      size="small"
                      label="Nombre"
                      defaultValue={""}
                    />
                  )}
                />
                {errors?.name && (
                  <FormHelperText error>{errors?.name?.message}</FormHelperText>
                )}
              </Grid>

              {/* Code */}
              <Grid item xs={4}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      message: "Este campo es requerido",
                    },
                  }}
                  name="code"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      label="Código"
                      defaultValue={""}
                    />
                  )}
                />
                {errors?.code && (
                  <FormHelperText error>{errors?.code?.message}</FormHelperText>
                )}
              </Grid>
              <Grid item xs={4}>
                <Controller
                  rules={{
                    required: {
                      value: true,
                      messsage: "Este campo es obligatorio",
                    },
                  }}
                  name="price"
                  control={control}
                  defaultValue={0}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      onChange={(e) => field.onChange(e.target.value)}
                      size="small"
                      label="precio"
                      defaultValue={0}
                    />
                  )}
                />
                {errors?.price && (
                  <FormHelperText error>
                    {errors?.price?.message}
                  </FormHelperText>
                )}
              </Grid>

              {/* button save*/}

              <Grid item xs={12}>
                <Box mt={2}>
                  <Button type="submit" variant="outlined">
                    <Typography>Guardar</Typography>
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      </form>
    </Box>
  );
};

export default FormProduct;
