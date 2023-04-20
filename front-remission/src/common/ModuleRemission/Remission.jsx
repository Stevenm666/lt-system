import { useState, useEffect } from "react";

// MUI
import { Box, Button, Grid, Typography, TextField } from "@material-ui/core";

// styles
import { styles } from "../../styles/remission.style";

import SharedDialog from "../../share/Dialog/SharedDialog";

// form
import FormRemission from "./FormRemission";
import ItemsPerPage from "../../share/Pagination/ItemsPerPage";
import TotalPages from "../../share/Pagination/TotalPages";
import { getRemission } from "../../services/remission";
import { useDebounceHook } from "../../hooks/useDebounce";
import ItemRemission from "./ItemRemission";
import { getProductByCode } from "../../services/products";
import { Loading } from "../../share/Loading/Loading";

const Remission = () => {
  // modal
  const [open, setOpen] = useState(false);

  // reload
  const [reload, setReload] = useState(false);

  // filter
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const [listRemission, setListRemission] = useState([]);

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  // filter using using debounce
  const useDebounceFilter = useDebounceHook(filter);

  const [pages, setPages] = useState(1);

  useEffect(() => {
    try {
      setLoading(true);
      getRemission(itemsPerPage, pages, useDebounceFilter)
        .then(({ data }) => {
          if (data?.status === "success") {
            setListRemission(data?.data?.data);
            setTotalPages(data.data?.total_pages);
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
  }, [itemsPerPage, pages, useDebounceFilter, reload]);

  return (
    <Box style={styles?.container}>
      {/* modal */}
      <SharedDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Crear remisión"
        body={
          <FormRemission
            handleClose={() => setOpen(false)}
            setReload={setReload}
          />
        }
      />
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <Typography style={styles.title}>Remisiones</Typography>
          </Box>
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={1}>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            <Typography>Crear</Typography>
          </Button>
        </Grid>
        <Grid item xs={5}>
          <Box ml={3}>
            <TextField
              variant="outlined"
              label="Buscar remisiones"
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
              <Typography style={styles?.textHeader}>Identificación</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>Estado</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box>
              <Typography style={styles?.textHeader}>Creador</Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Typography style={styles?.textHeader}>F. de creación</Typography>
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} style={styles?.containerOverflow}>
          {loading ? (
            <Box display="flex" justifyContent="center" mt={8}>
              <Loading />
            </Box>
          ) : !listRemission?.length ? (
            <Box display="flex" justifyContent="center" mt={8}>
              No hay usuarios
            </Box>
          ) : (
            listRemission?.map((remission, i) => (
              <Box key={i}>
                <ItemRemission remission={remission} />
              </Box>
            ))
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

export default Remission;
