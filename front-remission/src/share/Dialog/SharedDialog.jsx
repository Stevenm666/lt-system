import React from "react";

// MUI
import {
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";

// ICON
import {AiOutlineClose} from "react-icons/ai";

const SharedDialog = ({ open, handleClose, title, body }) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        <Grid container>
          <Grid item xs={11}>
            <Typography>{title}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Box onClick={handleClose} sx={{cursor: "pointer"}}>
              <AiOutlineClose/>
            </Box>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent style={{ width: "520px", padding: "20px" }}>{body}</DialogContent>
    </Dialog>
  );
};

export default SharedDialog;
