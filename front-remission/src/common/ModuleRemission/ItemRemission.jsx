// MUI
import { Box, Grid, Typography } from "@material-ui/core";

// styles
import { styles } from "../../styles/listRemission.styles";

// icons
import { AiOutlineEye } from "react-icons/ai";

// navigate
import { useNavigate } from "react-router-dom";

const ItemRemission = ({ remission }) => {
  const statusArray = ["Completado", "Pendiente", "Cancelado"]; // remission.status - 1
  const navigate = useNavigate();

  return (
    <Box mt={2} style={styles?.container}>
      <Grid container>
        <Grid item xs={3}>
          <Typography>{remission?.identy_user}</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>
            {statusArray[parseInt(remission?.status) - 1]}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>{remission?.user_creator}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>
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
