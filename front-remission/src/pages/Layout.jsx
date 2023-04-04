import { useState, useMemo, Suspense } from 'react';

// MUI
import { Box, Grid } from "@material-ui/core";

// styles
import { styles } from "../styles/layout.styles.js";
import AsideSection from '../common/AsideCommon/AsideSection.jsx';
import { useLocation } from 'react-router-dom';

// components

const Layout = ({ authRouters = [] }) => {
  const location = useLocation()

  const useComponent = useMemo(() => {
    if (authRouters.length){
      return authRouters.filter((el) => el.path === location.pathname);
    }
  }, [location])

  return (
    <Box style={styles.container}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Box style={styles.containerAside}>
            <AsideSection routers={authRouters} styles={styles} />
          </Box>
        </Grid>
        <Grid item xs={1}/>
        <Grid item xs={9}>
          <Suspense fallback="loading...">
            {useComponent?.map((el, i) => ( <div key={i}>{el?.element}</div>))}
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Layout