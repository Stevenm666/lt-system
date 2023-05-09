import { useState, useEffect, useMemo } from "react";
import React from "react";

// MUI
import { Box, Button, Grid, Typography } from "@material-ui/core";

// styles
import { styles } from "../../styles/box.styles";

// date format
import { format, addDays, subDays } from "date-fns";
import { getBoxByDate } from "../../services/box";
import { es } from "date-fns/locale";

// modals components
import SharedDialog from "../../share/Dialog/SharedDialog";
import ModalOpenBox from "./ModalOpenBox";
import ModalMovement from "./ModalMovement";
import { getBoxMovementById } from "../../services/boxMovement";
import FlowMovement from "./FlowMovement";
import CloseBox from "./CloseBox";
import ModalPDF from "./ModalPDF";

const BoxModule = () => {
  // reload
  const [reload, setReload] = useState(false);
  const [reloadMovement, setReloadMovement] = useState(false);
  const [date, setDate] = useState(new Date());
  const [disablePDF, setDisablePDF] = useState(true);

  // box open and close
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenStill, setIsOpenStill] = useState(false);

  // modal OpenBox
  const [openBox, setOpenBox] = useState(false);

  // modal box movement
  const [openMovement, setOpenMovement] = useState(false);

  // modal close box
  const [closeBox, setCloseBox] = useState(false);

  // modal pdf
  const [openPDF, setOpenPDF] = useState(false);

  // data Box

  const [dataBox, setDataBox] = useState({});

  // box movement
  const [dataBoxMovement, setDataBoxMovement] = useState([]);

  useEffect(() => {
    try {
      let dateFormatted = format(date, "yyyy-MM-dd");
      getBoxByDate(dateFormatted)
        .then(({ data }) => {
          if (data?.status === "success") {
            setIsOpenStill(data?.data?.status == 1 ?? false); // disabled the open box if existe one with status 1 in this day
            setIsOpen(
              Array.isArray(data?.data) ? true : data?.data?.status == 0
            );
            setDisablePDF(
              Array.isArray(data?.data) ? true : isNaN(data?.data?.status)
            ); // if not existe the object then disable pdf
            setDataBox(data?.data);
          }
        })
        .catch((e) => console.log(e));
    } catch (e) {
      console.log(e);
    }
  }, [date, reload]);

  useEffect(() => {
    try {
      if (dataBox?.id) {
        getBoxMovementById(dataBox?.id).then(({ data }) => {
          if (data?.status === "success") {
            setDataBoxMovement(data?.data);
          }
        });
      } else {
        setDataBoxMovement({
          price_total: 0,
          data: [],
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [reloadMovement, dataBox?.id]);

  const validOpenBox = useMemo(() => {
    return format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  }, [date]);

  return (
    <Box style={styles?.container}>
      {/* MODALS */}
      <SharedDialog
        open={openBox}
        handleClose={() => setOpenBox(false)}
        title="Abrir Caja"
        body={
          <ModalOpenBox
            handleClose={() => setOpenBox(false)}
            setReload={setReload}
            dataBox={dataBox}
          />
        }
      />

      <SharedDialog
        open={openMovement}
        handleClose={() => setOpenMovement(false)}
        title="Movimientos de caja"
        body={
          <ModalMovement
            handleClose={() => setOpenMovement(false)}
            dataBox={dataBox}
            setReloadMovement={setReloadMovement}
            setReload={setReload}
          />
        }
      />

      <SharedDialog
        open={closeBox}
        handleClose={() => setCloseBox(false)}
        title="Cierre de caja"
        body={
          <CloseBox
            handleClose={() => setCloseBox(false)}
            dataBox={dataBox}
            setReload={setReload}
          />
        }
      />

      <SharedDialog
        open={openPDF}
        handleClose={() => setOpenPDF(false)}
        title="Descargar PDF"
        body={
          <ModalPDF
            handleClose={() => setOpenPDF(false)}
            dataBox={dataBox}
            setReload={setReload}
          />
        }
      />
      {/* MAIN */}
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box>
            <Typography>Información de la Caja</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Box>
            <Typography>
              {isOpenStill ? "Caja abierta" : "Caja cerrada"}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>
              Valor de la caja abierta:{" "}
              {dataBox.opening
                ? parseInt(dataBox?.opening).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                : ""}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Typography>
              Diferencia de caja:{" "}
              {dataBox.total_diff
                ? parseInt(dataBox?.total_diff).toLocaleString("es-CO", {
                    style: "currency",
                    currency: "COP",
                  })
                : ""}
            </Typography>
          </Box>
        </Grid>

        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button
                style={styles?.boxBorder}
                variant="outlined"
                disabled={!validOpenBox || isOpenStill}
                onClick={() => setOpenBox(true)}
              >
                <Box style={styles?.alignItemsBorder}>
                  <Typography style={styles?.textButtonBorder}>
                    Abrir caja
                  </Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={styles?.boxBorder}
                variant="outlined"
                disabled={isOpen || !validOpenBox}
                onClick={() => setCloseBox(true)}
              >
                <Box style={styles?.alignItemsBorder}>
                  <Typography style={styles?.textButtonBorder}>
                    Cerrar caja
                  </Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={styles.boxBorder}
                variant="outlined"
                disabled={disablePDF}
                onClick={() => setOpenPDF(true)}
              >
                <Box style={styles?.alignItemsBorder}>
                  <Typography style={styles?.textButtonBorder}>PDF</Typography>
                </Box>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                style={styles.boxBorder}
                variant="outlined"
                disabled={isOpen || !validOpenBox}
                onClick={() => setOpenMovement(true)}
              >
                <Box style={styles.alignItemsBorder}>
                  <Typography style={styles?.textButtonBorder}>
                    Movimientos
                  </Typography>
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Button onClick={() => setDate((prev) => subDays(prev, 1))}>
                  {"<"}
                </Button>
                <Typography>
                  {format(date, "dd MMM", { locale: es })}
                </Typography>
                <Button onClick={() => setDate((prev) => addDays(prev, 1))}>
                  {">"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Box display="flex" justifyContent="center" width="65%">
                  <Typography>
                    {parseInt(dataBoxMovement?.price_total).toLocaleString(
                      "es-CO",
                      {
                        style: "currency",
                        currency: "COP",
                      }
                    )}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="center" width="65%" mt={2}>
                  <Typography>
                    <b>Total del día</b>
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <FlowMovement data={dataBoxMovement?.data} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default BoxModule;
