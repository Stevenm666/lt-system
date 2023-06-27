import React from "react";
import { useNavigate } from "react-router-dom";
import { versionApp } from "../../utils/misc";

import { Box, Button, Grid, Typography } from "@material-ui/core";

// redux
import { useDispatch } from "react-redux";
import { logoutIn } from "../../features/user/userSlice";

const AsideSection = ({ routers, styles }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutFunction = (e) => {
    e.preventDefault(); // prevent load event
    dispatch(
      logoutIn({
        username: "",
        rol: [],
        isLoggedIn: false,
      })
    ); // logoout
    localStorage.clear(); // clear local storage
    navigate("/"); // navigate to login page
  };

  return (
    <Box style={{ height: "100%" }}>
      {routers?.map((el, i) => (
        <Box
          key={i}
          style={styles.listItems}
          onClick={(e) => {
            e.preventDefault();
            navigate(el?.path);
          }}
        >
          <Box>{el?.icon && el?.icon}</Box>
          <Box>
            <Typography style={styles.textItems}>{el?.name}</Typography>
          </Box>
        </Box>
      ))}
      <Box style={styles?.logoutContainer}>
        <Box style={{display: "flex", alignItems: "center"}}>
          <Box>
            <Typography style={{ fontSize: "10px" }}>
              version: {versionApp}
            </Typography>
          </Box>
          <Button onClick={(e) => logoutFunction(e)}>
            <Typography style={styles?.logoutText}>Salir</Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AsideSection;
