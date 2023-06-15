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
  const statusArray = ["Pago", "Pendiente", "Cancelado"]; // remission.status - 1
  const navigate = useNavigate();

  const isPending = useMemo(() => {
    if (remission?.status == 2) {
      let createdAtPlusFiveDays = new Date(remission?.created_at);
      return new Date() > addDays(createdAtPlusFiveDays, 5) ? true : false;
    }
    return false;
  }, [remission]);

  // format date
  let date = new Date(remission?.created_at);
  const getYear = date.toLocaleString("default", { year: "numeric" });
  const getMonth = date.toLocaleString("default", { month: "2-digit" });
  const getDay = date.toLocaleString("default", { day: "2-digit" });

  const dateFormat = getYear + "-" + getMonth + "-" + getDay;

  return (
    <Box mt={2} style={styles?.container}>
      <Grid container>
        <Grid item xs={6}>
          <Typography>{`#${remission.id} ${remission.name} - ${remission?.identy_user}`}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography style={{ display: "flex", alignItems: "center" }}>
            {statusArray[parseInt(remission?.status) - 1]}{" "}
            <span>
              {isPending ? (
                <Box
                  style={{
                    width: "10px",
                    height: "10px",
                    background: "red",
                    borderRadius: "50%",
                    marginLeft: "5px",
                  }}
                />
              ) : (
                ""
              )}
            </span>
          </Typography>
        </Grid>
        <Grid item xs={2}>
          {parseInt(remission?.total).toLocaleString("es-CO", {
            style: "currency",
            currency: "COP",
          })}
        </Grid>
        <Grid item xs={1}>
          <Typography style={{ fontSize: "13px" }}>{dateFormat}</Typography>
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
