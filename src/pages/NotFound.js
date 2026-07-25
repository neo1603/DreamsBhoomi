import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const NotFound = () => (
  <Container maxWidth="sm" sx={{ pt: { xs: '140px', md: '180px' }, pb: 10, textAlign: 'center' }}>
    <Typography variant="h2" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 2 }}>
      404
    </Typography>
    <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4, fontWeight: 400 }}>
      We couldn't find the page you're looking for.
    </Typography>
    <Box>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
      >
        Back to Home
      </Button>
    </Box>
  </Container>
);

export default NotFound;
