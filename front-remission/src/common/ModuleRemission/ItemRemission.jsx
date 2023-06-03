// React
import { useMemo } from "react";
// MUI
import { Box, Grid, Typography } from "@material-ui/core";

// styles
import { styles } from "../../styles/listRemission.styles";

// icons
import { AiOutlineEye } from "react-icons/ai";

// navigate
import { useNavigate } from "react-router-dom";

// date
import { addDays, addHours } from "date-fns";

const ItemRemission = ({ remission }) => {
  const statusArray = ["Completado", "Pendiente", "Cancelado"]; // remission.status - 1
  const navigate = useNavigate();

  const isPending = useMemo(() => {
    if (remission?.status == 2) {
      let createdAtPlusFiveDays = new Date(remission?.created_at);
      return new Date() > addDays(createdAtPlusFiveDays, 5) ? true : false;
    }
    return false;
  }, [remission]);

  return (
    <Box mt={2} style={styles?.container}>
      <Grid container>
        <Grid item xs={2}>
          <Typography>{remission?.identy_user}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>
            {statusArray[parseInt(remission?.status) - 1]}{" "}
            <span>{isPending ? "+ 5 días" : ""}</span>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {parseInt(remission?.total).toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </Grid>
        <Grid item xs={2}>
          <Box ml={3}>
            <Typography>{remission?.user_creator}</Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ fontSize: "14px" }}>
            {new Date(remission?.created_at).toLocaleString()}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box
            onClick={() => navigate(`/remissions/${remission?.id}`)}
            style={{ cursor: "pointer" }}
          >
            <AiOutlineEye size={20} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ItemRemission;
