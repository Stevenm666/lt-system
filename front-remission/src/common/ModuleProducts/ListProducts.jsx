import { useState } from "react";

// MUI
import { Grid, Box, Typography, Button } from "@material-ui/core";

// styles
import { styles } from "../../styles/listProducts.styles";

// icons
import { FiEdit2, FiDelete } from "react-icons/fi";

// services
import { deleteProducts, activeProduct } from "../../services/products";

// modal

import SharedDialog from "../../share/Dialog/SharedDialog";
import PutFormProducts from "./PutFormProduct";

// useSnackbar
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

// redux
import { useSelector } from "react-redux";

const ListProducts = ({ product, setReload, status }) => {
  // states
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // redux
  const user = useSelector(state => state.user);

  // delete product
  const handleDelProduct = () => {
    try {
      deleteProducts(product?.id, user?.rol).then(({ data }) => {
        if (data?.status === "success") {
          // show alter sweet
          setReload((prev) => !prev);
          enqueueSnackbar("Se ha borrado correctamente", successToast);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleActive = () => {
    try{
      const submitData = {
        status: 1,
        rol: user?.rol
      }
      activeProduct(product?.id, submitData)
        .then(({data}) => {
          if (data?.status === "success"){
            enqueueSnackbar("Se ha recuperado exitosamente", successToast);
            setReload(prev => !prev);
          }
        })
        .catch(e => console.log(e))
    }catch(e){
      console.log(e);
    }
  }

  // put product
  return (
    <>
      {/* open modal */}
      <SharedDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Actualizar producto"
        body={
          <PutFormProducts
            product={product}
            setReload={setReload}
            handleClose={() => setOpen(false)}
          />
        }
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
                <Typography style={styles?.textItem}>
                  {status ? "Activo" : "Inactivo"}
                </Typography>
              </Box>
              {status ? (
                <>
                  <Box
                    style={styles?.pointerCursor}
                    onClick={() => setOpen(true)}
                  >
                    <FiEdit2 />
                  </Box>
                  <Box
                    style={styles?.pointerCursor}
                    onClick={() => handleDelProduct()}
                  >
                    <FiDelete />
                  </Box>
                </>
              ) : (
                <>
                  <Box>
                    <Button variant="outlined" style={styles?.backButton} onClick={() => handleActive()}>
                      <Typography style={styles?.backText}>
                        Recuperar
                      </Typography>
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ListProducts;
