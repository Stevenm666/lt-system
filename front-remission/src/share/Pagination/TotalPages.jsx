import React from 'react';

// MUI
import { Box, Grid, Typography } from "@material-ui/core";

// Icons
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

const TotalPages = ({ totalPages, setPages, pages }) => {
  return (
    <Box 
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px"
      }}
    >
      <Box>
        <Typography>
          Pagina:
        </Typography>
      </Box>
      <button
        disabled={pages <= 1}
        onClick={(e) => setPages(prev => prev - 1)}
      >
        <AiOutlineArrowLeft/>
      </button>
      <Box>
        {pages}
      </Box>
      <Box>
        de
      </Box>
      <Box>
        {totalPages}
      </Box>
      <button 
        disabled={pages >= totalPages}
        onClick={() => setPages(prev => prev + 1)}
      >
        <AiOutlineArrowRight />
      </button>
    </Box>
  )
};

export default TotalPages