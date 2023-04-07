import { useState } from "react";

// MUI
import { Grid, Box, Typography } from "@material-ui/core";

// styles
import { styles } from "../../styles/listProducts.styles";

// icons
import { FiEdit2, FiDelete } from "react-icons/fi";

// services
import { putProducts, deleteProducts } from "../../services/products";

// modal

import SharedDialog from "../../share/Dialog/SharedDialog";
import PutFormProducts from "./PutFormProduct";

const ListProducts = ({ product, setReload }) => {
  // states
  const [open, setOpen] = useState(false);

  // delete product
  const handleDelProduct = () => {
    try {
      deleteProducts(product?.id).then(({ data }) => {
        if (data?.status === "success") {
          // show alter sweet
          setReload((prev) => !prev);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  // put product
  return (
    <>
      {/* open modal */}
      <SharedDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Actualizar producto"
        body={<PutFormProducts product={product} setReload={setReload} handleClose={() => setOpen(false)}/>}
      />

      <Box style={styles?.container}>
        <Grid container>
          <Grid item xs={4}>
            <Box>
              <Typography style={styles?.textItemName}>
                {product?.name}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textItem}>{product?.code}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography style={styles?.textItem}>{product?.price}</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box style={styles?.containerStatus}>
              <Box style={{ marginLeft: "42px" }}>
                <Typography style={styles?.textItem}>Activo</Typography>
              </Box>
              <Box style={styles?.pointerCursor} onClick={() => setOpen(true)}>
                <FiEdit2 />
              </Box>
              <Box
                style={styles?.pointerCursor}
                onClick={() => handleDelProduct()}
              >
                <FiDelete />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ListProducts;
