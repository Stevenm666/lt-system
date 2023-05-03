import React from "react";

// MUI
import { Box, Grid, Typography } from "@material-ui/core";

const FlowMovement = ({ data }) => {
  return (
    <Box>
      <Box mb={2}>
        <Typography>
          <b>Movimientos</b>
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          width: "100%",
        }}
      >
        {data?.map((el, i) => (
          <Grid item xs={12} key={i}>
            <Box
              style={{
                boxShadow: "-2px -1px 10px 0px rgba(0,0,0,0.5)",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <Grid container>
                <Grid item xs={4}>
                  <Box>
                    <Typography style={{ fontSize: "12px" }}>
                      {el?.type == 1 ? "Ingreso" : "Egreso"}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={5}>
                  <Box>
                    <Typography
                      style={{
                        color: el?.type == 1 ? "green" : "red",
                        fontSize: "12px",
                      }}
                    >
                      {parseInt(el?.price).toLocaleString("es-CO", {
                        style: "currency",
                        currency: "COP",
                      })}
                    </Typography>
                  </Box>
                </Grid>
                {el?.type == 1 && (
                  <Grid item xs={3}>
                    <Box>
                      <Typography style={{ fontSize: "12px" }}>
                        {el?.consecutive}
                      </Typography>
                    </Box>
                  </Grid>
                )}
                {el?.observations && (
                  <Grid item xs={12}>
                    <Box>
                      <Typography style={{ fontSize: "12px" }}>
                        <b>Observaciones: </b> {el?.observations}
                      </Typography>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FlowMovement;
