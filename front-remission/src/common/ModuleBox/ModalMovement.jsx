import { useState } from "react";

// MUI
import { Box, Grid, Button } from "@material-ui/core";

// import shared
import SharedDialog from "../../share/Dialog/SharedDialog";
import ModalIncomes from "./ModalIncomes";
import ModalOutcomes from "./ModalOutcomes";

const ModalMovement = ({ handleClose, dataBox, setReloadMovement }) => {

  const [incomes, setIncomes] = useState(false);
  const [outcomes, setOutcomes] = useState(false);

  return (
    <Box>
      {/* INCOMES */}
      <SharedDialog
        open={incomes}
        handleClose={() => setIncomes(false)}
        title="Ingresos"
        body={
          <ModalIncomes
            handleClose={() => setIncomes(false)}
            handleCloseAll={() => {
              setIncomes(false);
              handleClose();
            }}
            setReloadMovement={setReloadMovement}
            dataBox={dataBox}
          />
        }
      />

      {/* OUTCOMES */}
      <SharedDialog
        open={outcomes}
        handleClose={() => setOutcomes(false)}
        title="Egresos"
        body={
          <ModalOutcomes
            handleClose={() => setOutcomes(false)}
            handleCloseAll={() => {
              setIncomes(false);
              handleClose();
            }}
            setReloadMovement={setReloadMovement}
            dataBox={dataBox}
          />
        }
      />

      {/* MAIN */}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => setIncomes(true)}>
            Ingresos
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => setOutcomes(true)}>
            Egresos
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined" onClick={() => handleClose()}>
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ModalMovement;
