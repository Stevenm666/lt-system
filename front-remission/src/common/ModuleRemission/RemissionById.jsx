import React, { useState, useEffect, useMemo } from "react";
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
import { getGeneratePDF } from "../../services/pdf";
import { useSnackbar } from "notistack";
import { successToast } from "../../utils/misc";

import { saveAs } from "file-saver";

const RemissionById = ({ id }) => {
  // states
  const [remission, setRemission] = useState({});
  const [products, setProducts] = useState([]);
  const [loadingByCode, setLoadingByCode] = useState(false);
  const [reload, setReload] = useState(false);
  const [pdf, setPdf] = useState(null);

  const totalRemissionPrice = useMemo(() => {
    let arrAccumulate = [];

    remission?.products?.forEach((el) => {
      arrAccumulate.push(el?.price * el?.amount);
    });

    return arrAccumulate.reduce((acc, curr) => acc + curr, 0);
  }, [remission]);

  const { enqueueSnackbar } = useSnackbar();

  // modal
  const [open, setOpen] = useState(false);
  const [cancelOpen, setCancelOpen] = useState(false);

  const [user, setUser] = useState({});
  const [generatePdfLoading, setGeneratePdfLoading] = useState(false);

  const ISCANCEL = remission?.status == 3;

  // CONST
  const STATUSREMISSION = ["Pago", "Pendiente", "Cancelado"];
  const PAYMENTMETHOD = [
    "Efectivo",
    "Bancolombia",
    "Nequi",
    "Daviplata",
    "Tarjeta",
  ];

  let date = new Date(remission?.created_at);
  const getYear = date.toLocaleString("default", { year: "numeric" });
  const getMonth = date.toLocaleString("default", { month: "2-digit" });
  const getDay = date.toLocaleString("default", { day: "2-digit" });

  const dateFormat = getYear + "-" + getMonth + "-" + getDay;

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
      console.log(remission, )
      if (remission?.identy_user) {
        getUserByDocumentOnly(remission?.identy_user, remission?.type_identy_user)
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
      if (remission?.products) {
        let arr = remission?.products.map((el) => el?.product_code);
        getProductByCode({ codes: arr.join(",") })
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
    defaultProducts: remission?.products ? remission?.products : [],
    defaultPaymentMethod: remission?.payment_method,
    defaultObservation:
      remission?.observation != "null" ? remission?.observation : "",
  };

  // handleGeneratePDF
  const handleGeneratePDF = (id) => {
    try {
      setGeneratePdfLoading(true);
      getGeneratePDF(id)
        .then(({ data }) => {
          const file = new Blob([data], { type: "application/pdf" });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          saveAs(file, `remission_${id}.pdf`); // save the file
          setGeneratePdfLoading(false);
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
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
            defaultProducts={products.map((el) => {
              return { product: el };
            })}
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
            <Button
              variant="outlined"
              disabled={ISCANCEL || generatePdfLoading}
              onClick={() => handleGeneratePDF(remission?.id)}
            >
              PDF
            </Button>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Button
              variant="outlined"
              onClick={() => setOpen(true)}
              disabled={remission?.status != 2}
            >
              Editar
            </Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={2}>{`Valor total: ${
            totalRemissionPrice
              ? parseInt(totalRemissionPrice).toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                })
              : "loading"
          }`}</Box>
        </Grid>
        <Grid item xs={6}>
          <Box mt={2}>
            <Typography>{`Fecha: ${dateFormat}`}</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* products */}
      <Box style={{ marginTop: "40px", height: "280px", overflowY: "auto" }}>
        <Grid container>
          <Grid item xs={7}>
            <Typography>
              <b>Nombre</b>
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              <b>Cantidad</b>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography>
              <b>Precio</b>
            </Typography>
          </Grid>

          {remission?.products?.map((product, i) => (
            <React.Fragment key={i}>
              <Grid item xs={7} style={{ marginTop: "15px" }}>
                <Box>
                  <Typography>{`${product?.name} - ${product?.code}`}</Typography>
                </Box>
              </Grid>
              <Grid item xs={2} style={{ marginTop: "15px" }}>
                <Box>
                  <Typography>{product?.amount}</Typography>
                </Box>
              </Grid>
              <Grid item xs={3} style={{ marginTop: "15px" }}>
                <Typography>{`${parseInt(product?.price).toLocaleString(
                  "es-CO",
                  {
                    style: "currency",
                    currency: "COP",
                  }
                )}`}</Typography>
              </Grid>
            </React.Fragment>
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
