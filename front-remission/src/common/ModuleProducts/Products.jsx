import React, { useState, useEffect } from "react";

// MUI
import { Box, Grid, Typography, Button, TextField } from "@material-ui/core";

// styles
import { styles } from "../../styles/products.styles";

// list component
import ListProducts from "./ListProducts";

// services

import { postUploadProducts } from "../../services/uploadFiles";
import { getProducts } from "../../services/products";

// import pages
import ItemsPerPage from "../../share/Pagination/ItemsPerPage";
import TotalPages from "../../share/Pagination/TotalPages";

// useDebounce
import { useDebounceHook } from "../../hooks/useDebounce";
import FormProduct from "./FormProduct";

const Products = () => {
  const [listProducts, setListProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // pages
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // filter using using debounce
  const [filter, setFilter] = useState("");

  const useDebounceFilter = useDebounceHook(filter);

  // check if exists list users
  useEffect(() => {
    try {
      setLoading(true);
      getProducts(itemsPerPage, pages, useDebounceFilter)
        .then(({ data }) => {
          if (data?.status === "success") {
            setListProducts(data?.data?.data);
            setTotalPages(data?.data?.total_pages);
            if (pages > data?.data?.total_pages) {
              setPages(1);
            }
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [reload, itemsPerPage, pages, useDebounceFilter]);

  const handleUploadProducts = (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);

      postUploadProducts(formData)
        .then(() => {
          setTimeout(() => {
            setReload((prev) => !prev);
          }, 500);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box style={styles?.container}>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Typography style={styles?.title}>Productos</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={2}>
          <Box>
            <input
              accept=".xlsx,.xls"
              style={{ display: "none" }}
              id="files"
              type="file"
              onChange={(e) => handleUploadProducts(e)}
              onClick={(e) => {
                e.target.value = ""; // allow check upload same file
              }}
            />
            <label htmlFor="files">
              <Button
                variant="contained"
                component="span"
                style={styles.buttonUpload}
              >
                <Typography style={styles?.textUpload}>
                  {" "}
                  Cargar productos
                </Typography>
              </Button>
            </label>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <TextField
              variant="outlined"
              label="Buscar producto"
              size="small"
              onChange={(e) => setFilter(e.target.value.toLowerCase())}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box mt={1} mb={1}>
            <FormProduct setReload={setReload}/>
          </Box>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Grid container>
          <Grid item xs={4}>
            <Box>
              <Typography style={styles?.textHeader}>Nombre</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Código</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography style={styles?.textHeader}>Precio</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Estado</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={2} style={styles?.containerOverflow}>
          {loading ? (
            "loading"
          ) : !listProducts?.length ? (
            <Box display="flex" justifyContent="center" mt={8}>
              No hay productos
            </Box>
          ) : (
            listProducts?.map((product) => <ListProducts product={product} key={product?.id} setReload={setReload} />)
          )}
        </Box>
        <Box mt={3} style={styles?.containerPagination}>
          <ItemsPerPage
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
          <TotalPages
            totalPages={totalPages}
            setPages={setPages}
            pages={pages}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Products;
