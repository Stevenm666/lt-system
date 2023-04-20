import React, { useState, useEffect } from "react";

// MUI
import { Box, Grid, Typography, Button, TextField } from "@material-ui/core";

// styles
import { styles } from "../../styles/users.styles";

// list component
import ListByUsers from "./ListByUsers";

// services

import { postUploadUsers } from "../../services/uploadFiles";
import { getUsers } from "../../services/users";

// import pages
import ItemsPerPage from "../../share/Pagination/ItemsPerPage";
import TotalPages from "../../share/Pagination/TotalPages";

// useDebounce
import { useDebounceHook } from "../../hooks/useDebounce";
import { Loading } from "../../share/Loading/Loading";

// redux
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

const Users = () => {
  const [listUsers, setListUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  // rol
  const user = useSelector((state) => state?.user);

  // pages
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // filter using using debounce
  const [filter, setFilter] = useState("");

  const useDebounceFilter = useDebounceHook(filter);

  const { enqueueSnackbar } = useSnackbar();

  // check if exists list users
  useEffect(() => {
    try {
      setLoading(true);
      getUsers(itemsPerPage, pages, useDebounceFilter)
        .then(({ data }) => {
          if (data?.status === "success") {
            setListUsers(data?.data?.data);
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

  const handleUploadUsers = (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("file", file);

      postUploadUsers(formData, user?.rol)
        .then(() => {
          setTimeout(() => {
            enqueueSnackbar("Se ha cargado correctamente", successToast);
            setReload((prev) => !prev);
          }, 500);
        })
        .catch((e) => console.log(e));
      // service upload users
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Box style={styles?.container}>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Typography style={styles?.title}> Usuarios</Typography>
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
              onChange={(e) => handleUploadUsers(e)}
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
                  Cargar usuarios
                </Typography>
              </Button>
            </label>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box>
            <TextField
              variant="outlined"
              label="Buscar usuarios"
              size="small"
              onChange={(e) => setFilter(e.target.value.toLowerCase())}
            />
          </Box>
        </Grid>
      </Grid>
      <Box mt={3}>
        <Grid container>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Nombre</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Documento</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography style={styles?.textHeader}>Celular</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Dirección</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} style={styles?.containerOverflow}>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={8}>
              <Loading />
            </Box>
          ) : !listUsers?.length ? (
            <Box display="flex" justifyContent="center" mt={8}>
              No hay usuarios
            </Box>
          ) : (
            listUsers?.map((user) => <ListByUsers user={user} key={user?.id} />)
          )}
        </Box>
        <Box mt={5} style={styles?.containerPagination}>
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

export default Users;
