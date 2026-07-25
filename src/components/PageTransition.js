import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';

// Wraps the routed page in a fade + gentle rise so navigating between
// screens doesn't feel like an abrupt hard-cut. Keying on the pathname
// forces React to remount the box on every navigation, which restarts the
// CSS animation each time.
const PageTransition = () => {
  const location = useLocation();
  return (
    <Box key={location.pathname} sx={{ animation: 'pageFadeIn 0.4s ease' }}>
      <Outlet />
    </Box>
  );
};

export default PageTransition;
