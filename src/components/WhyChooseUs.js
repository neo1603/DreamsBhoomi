import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { VerifiedUser, Construction, LocationOn, Schedule } from '@mui/icons-material';

const items = [
  {
    icon: <VerifiedUser />,
    title: 'Trusted Developer',
    description: 'Transparent dealings and clear titles on every listing, for over 15 years.',
  },
  {
    icon: <Construction />,
    title: 'Quality Construction',
    description: 'MVDA-approved developments built to last, not just to sell.',
  },
  {
    icon: <LocationOn />,
    title: 'Best Locations',
    description: 'Prime plots and properties across Mathura, Vrindavan, and Agra.',
  },
  {
    icon: <Schedule />,
    title: 'On-Time Delivery',
    description: 'A track record of handing over projects on schedule.',
  },
];

const WhyChooseUs = () => (
  <Box sx={{ py: 8, backgroundColor: 'background.default' }}>
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}>
        Why Choose Us
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, textAlign: 'center', maxWidth: 640, mx: 'auto' }}>
        Fifteen years of straightforward dealing in the Mathura–Vrindavan region.
      </Typography>

      <Grid container spacing={4}>
        {items.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(200,149,43,0.12)',
                  color: 'secondary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                  '& svg': { fontSize: 28 },
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                {item.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default WhyChooseUs;
