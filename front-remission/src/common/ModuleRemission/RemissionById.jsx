import { useState, useEffect } from "react";
import { Box, Button, Grid, Typography } from "@material-ui/core";
import { getRemissionById } from "../../services/remission";

// styles
import { styles } from "../../styles/remissionById.styles";

// services
import { getUserByDocumentOnly } from "../../services/users";
import { getProductByCode } from "../../services/products";

// modal
import SharedDialog from "../../share/Dialog/SharedDialog";
import ModalPutRemission from "./ModalPutRemission";
import CancelRemission from "./CancelRemission";

const RemissionById = ({ id }) => {
  // states
  const [remission, setRemission] = useState({});
  const [products, setProducts] = useState([]);
  const [loadingByCode, setLoadingByCode] = useState(false);
  const [reload, setReload] = useState(false);

  // modal
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [user, setUser] = useState({});

  const ISCANCEL = remission?.status == 3;

  // CONST
  const STATUSREMISSION = ["completado", "pendiente", "cancelado"];
  const PAYMENTMETHOD = [
    "efectivo",
    "Bancolombia",
    "Nequi",
    "Daviplata",
    "Tarjeta",
  ];

  // useEffects
  useEffect(() => {
    // get remission by id
    try {
      getRemissionById(id)
        .then(({ data }) => {
          if (data?.status === "success") {
            setRemission(data?.data);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, [id, reload]);

  useEffect(() => {
    try {
      if (remission?.identy_user) {
        getUserByDocumentOnly(remission?.identy_user)
          .then(({ data }) => {
            if (data?.status === "success") {
              setUser(data?.data);
            }
          })
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  }, [remission]);

  useEffect(() => {
    // get name of products
    try {
      setLoadingByCode(true);
      console.log({ remission });
      if (remission?.code_product) {
        getProductByCode({ codes: remission?.code_product })
          .then(({ data }) => {
            if (data?.status === "success") {
              if (Array.isArray(data?.data)) {
                setProducts(data?.data);
              } else {
                setProducts([data?.data]);
              }
            }
          })
          .catch((e) => console.log(e));
      } else {
        setProducts([]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoadingByCode(false);
    }
  }, [id, remission, reload]);

  // defaultValue let
  const defaultValue = {
    defaultProducts: products,
    defaultPaymentMethod: remission?.payment_method,
  };

  return (
    <Box style={styles?.container}>
      {/* EDIT REMISSION */}
      <SharedDialog
        open={open}
        handleClose={() => setOpen(false)}
        title="Editar remisión"
        body={
          <ModalPutRemission
            defaultValues={defaultValue}
            id={id}
            setReload={setReload}
            handleClose={() => setOpen(false)}
          />
        }
      />
      {/* CANCEL REMISSION */}
      <SharedDialog
        open={cancelOpen}
        handleClose={() => setCancelOpen(false)}
        title="Cancelar remisión"
        body={
          <CancelRemission
            id={id}
            setReload={setReload}
            handleClose={() => setCancelOpen(false)}
          />
        }
      />
      <Grid container>
        <Grid item xs={2}>
          <Box>
            <Typography>{`Remisión #${id}`}</Typography>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" alignItems="center">
            <Box>
              <Typography>A nombre de: </Typography>
            </Box>
            <Box ml={1}>
              <Typography>{`${user?.name} | ${user?.type_identy} - ${user?.identy}`}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* status, payment, pdf, edit*/}
      <Grid container style={{ marginTop: "40px" }}>
        <Grid item xs={4}>
          <Box>
            <Typography>Estado de la remisión</Typography>
          </Box>
          <Box>
            <Typography>
              {STATUSREMISSION[parseInt(remission?.status) - 1]}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box>
            <Typography>Forma de pago</Typography>
          </Box>
          <Box>
            <Typography>
              {remission?.payment_method
                ? `${PAYMENTMETHOD[parseInt(remission?.payment_method) - 1]} ${
                    remission?.payment_method != 5 ? "(Pago directo)" : ""
                  }`
                : "Sin especificar"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Button variant="outlined" disabled={ISCANCEL}>
              PDF
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Button variant="outlined" onClick={() => setOpen(true)}>
              Editar
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* products */}
      <Box style={{ marginTop: "40px", height: "280px", overflowY: "auto" }}>
        <Grid container>
          <Grid item xs={12}>
            <Box mb={1}>
              <Typography>
                <b>Productos</b>
              </Typography>
            </Box>
          </Grid>
          {products?.map((product, i) => (
            <Grid item xs={6} key={i} style={{ marginTop: "15px" }}>
              <Box>
                <Typography>{`${product?.name} - ${product?.code}`}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* cancel */}
      <Box mt={2}>
        <Button variant="outlined" onClick={() => setCancelOpen(true)}>
          Cancelar remisión
        </Button>
      </Box>
    </Box>
  );
};

export default RemissionById;
