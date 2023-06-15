import React, { useState } from "react";

import { Autocomplete } from "@material-ui/lab";
import { TextField, Grid, Box, Button } from "@material-ui/core";

// icons
import { AiOutlinePlus } from "react-icons/ai";
import { RiSubtractFill } from "react-icons/ri";
import { NumericFormat } from "react-number-format";

const ChooseProducts = ({
  products,
  handleClose,
  setValue,
  setProductSelected,
  productsSelected,
  isEdit = false,
  defaultValues
}) => {
  const [productList, setProductList] = useState(
    productsSelected?.length ? productsSelected?.length : 1
  );


  const handleAddProduct = () => {
    if (productList > 9) {
      return;
    } else {
      setProductList((prev) => prev + 1);
    }
  };

  const handleSubProduct = () => {
    if (productList == 1) {
      return;
    } else {
      setProductList((prev) => prev - 1);
      setProductSelected((previousArr) => previousArr.slice(0, -1));
    }
  };

  // taken default values before to close modal
  const validatedValues = () => {
    if (Boolean(productsSelected?.length)) {
      handleClose();
      productsSelected?.forEach((element) => {
        if (!element.hasOwnProperty("amount")) {
          element.amount = defaultValues?.defaultProducts[i]?.amount ?? 1; // default amount
        }
        if (!element.hasOwnProperty("price")) {
          element.price = element?.product?.price; // taken the default price of the product
        } else {
          element.price = parseInt(element.price.replace(/\D/g, "")); // format the price
        }
      });
    }
    handleClose();
  };

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
      {Array.from({ length: productList })?.map((e, i) => (
        <React.Fragment key={i}>
          <Grid item xs={5}>
            <Autocomplete
              id="products"
              options={products}
              defaultValue={productsSelected[i]?.product ?? null}
              getOptionLabel={(option) => `${option?.name} - ${option?.code}`}
              onChange={(_event, newValue) => {
                if (newValue) {
                  let newArray = [...productsSelected];
                  newArray[i] = { product: newValue };
                  setProductSelected(newArray);
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
          <Grid item xs={2}>
            <TextField
              label="#"
              type="number"
              size="small"
              variant="outlined"
              defaultValue={productsSelected[i]?.amount ?? defaultValues?.defaultProducts[i]?.amount ?? 1}
              onChange={(e) => {
                let newArray = [...productsSelected];
                newArray[i]["amount"] = parseInt(e.target.value);
                setProductSelected(newArray);
              }}
              InputProps={{
                inputProps: { min: 1 },
              }}
            />
          </Grid>
          <Grid item xs={5}>
            <NumericFormat
              thousandSeparator={","}
              prefix={"$ "}
              customInput={TextField}
              fullWidth
              size="small"
              variant="outlined"
              label="Precio unitario"
              defaultValue={productsSelected[i]?.price ?? defaultValues?.defaultProducts[i]?.price ?? null}
              onChange={(e) => {
                let newArray = [...productsSelected];
                newArray[i]["price"] = e.target.value;
                setProductSelected(newArray);
              }}
            />
          </Grid>
        </React.Fragment>
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
        <Button variant="outlined" onClick={() => validatedValues()}>
          Guardar
        </Button>
      </Grid>
    </Grid>
  );
};

export default ChooseProducts;
