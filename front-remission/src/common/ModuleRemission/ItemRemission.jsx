// MUI
import {
  Box,
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core";

// styles
import { styles } from "../../styles/listRemission.styles";

// ICON
import { AiOutlinePlus } from "react-icons/ai";
import { Loading } from "../../share/Loading/Loading";

const ItemRemission = ({
  remission,
  idx,
  expanded,
  handleChange,
  loadingByCode,
  products,
}) => {
  const paymentMethod = ["En efectivo", "Bancolombia", "Nequi", "Daviplata"]; // remission.payment_method - 1

  return (
    <Box mt={2} style={styles?.container}>
      <Accordion
        expanded={expanded === `panel${remission?.id}`}
        onChange={handleChange(`panel${remission?.id}`, remission?.code_product)}
      >
        <AccordionSummary expandIcon={<AiOutlinePlus />}>
          <Grid container>
            <Grid item xs={3}>
              <Typography>{remission?.identy_user}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {paymentMethod[parseInt(remission?.payment_method) - 1]}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography>{remission?.user_creator}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography>
                {new Date(remission?.created_at).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box style={{ width: "100%", maxHeight: "120px", overflowY: "auto" }}>
            <Grid container>
              {loadingByCode ? (
                <Box>
                  <Loading />
                </Box>
              ) : (
                products.map((product, i) => (
                  <Grid item xs={6} key={i}>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography style={styles?.textEllipsis}>
                        {product?.name}
                      </Typography>
                      <Box ml={1} mr={1}>
                        <Typography>-</Typography>
                      </Box>
                      <Typography style={styles?.textNormal}>
                        {product?.code}
                      </Typography>
                    </Box>
                  </Grid>
                ))
              )}
            </Grid>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ItemRemission;
