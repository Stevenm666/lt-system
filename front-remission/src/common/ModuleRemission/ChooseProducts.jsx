import { useState } from "react";

import { Controller } from "react-hook-form";
import { Autocomplete } from "@material-ui/lab";
import {
  TextField,
  Grid,
  Box,
  FormHelperText,
  Button,
} from "@material-ui/core";

// icons
import { AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";

const ChooseProducts = ({
  control,
  products,
  errors,
  handleClose,
  setValue,
  setProductSelected,
  productsSelected,
  isEdit = false,
}) => {

  const [productList, setProductList] = useState(productsSelected?.length ? productsSelected?.length : 1)

  const handleAddProduct = () => {
    if (productList > 9){
      return
    }else{
      setProductList(prev => prev + 1)
    }
  }

  const handleSubProduct = () => {
    if (productList == 1){
      return
    }else{
      setProductList(prev => prev - 1)
      setProductSelected((previousArr) => (previousArr.slice(0, -1)))
    }
  }
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box style={{ cursor: "pointer" }} onClick={handleSubProduct}>
            <RiSubtractFill />
          </Box>
          <Box>Cantidad</Box>
          <Box style={{ cursor: "pointer" }} onClick={handleAddProduct}>
            <AiOutlinePlus />
          </Box>
        </Box>
      </Grid>
      {/* products */}
      {Array.from({length: productList})?.map((el, i) => (
      <Grid item xs={12} key={i}>
        <Autocomplete
          id="products"
          options={products}
          defaultValue={productsSelected[i] ??  null}
          getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
          onChange={(_event, newValue) => {
            if (newValue) {
              setProductSelected((prev) => [...prev, newValue]);
            } else {
              productsSelected[i] = null;
            }
          }}
          renderInput={(params) => (
             <TextField
              {...params}
              fullWidth
              size="small"
              variant="outlined"
              label="Producto"
             />
           )}
         />
      </Grid>
      ))}

      <Grid item xs={6}>
        <Button
          variant="outlined"
          onClick={() => {
            if (!isEdit) {
              setProductSelected([]);
              setValue("products", "");
            }

            handleClose();
          }}
        >
          Cancelar
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Button variant="outlined" onClick={() => handleClose()}>
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChooseProducts;
