import React from 'react';

// MUI
import { 
  Box, 
  Grid, 
  Typography, 
  FormControl,  
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

const ItemsPerPage = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <Box 
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}
    >
      <Box>
        <Typography>
          Items: 
        </Typography>
      </Box>
      <Box>
        <FormControl>
          <Select
            defaultValue={itemsPerPage}
            onChange={(e) => setItemsPerPage(e.target.value)}
            id="item-per-page"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  )
}

export default ItemsPerPage;