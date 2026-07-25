import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const FEATURES = [
  {
    title: 'MVDA Approved',
    text: 'Complete legal clarity and seamless registry on every listing.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#BCA78D" strokeWidth="1">
        <path d="M20 6 L35 32 L5 32 Z" />
        <path d="M20 14 L28 28 L12 28 Z" />
        <line x1="8" y1="32" x2="32" y2="32" />
      </svg>
    ),
  },
  {
    title: 'Trusted Since 2008',
    text: 'Fifteen years of straightforward dealing in the Mathura–Vrindavan region.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#BCA78D" strokeWidth="1">
        <rect x="7" y="7" width="26" height="26" rx="3" />
        <circle cx="20" cy="19" r="8" />
        <path d="M20 11 C 15 15, 15 23, 20 27 C 25 23, 25 15, 20 11 Z" />
        <line x1="12" y1="19" x2="28" y2="19" />
      </svg>
    ),
  },
  {
    title: 'Prime Locations',
    text: 'Vrindavan, Mathura, and Agra — close to what matters most.',
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="#BCA78D" strokeWidth="1">
        <path d="M14 8 L22 12 L22 20 L14 24 L6 20 L6 12 Z" />
        <path d="M26 14 L33 18 L33 25 L26 29 L19 25 L19 18 Z" />
        <circle cx="14" cy="16" r="1.4" fill="#BCA78D" />
        <circle cx="26" cy="21.5" r="1.4" fill="#BCA78D" />
      </svg>
    ),
  },
];

const HomeFeatures = () => (
  <Box sx={{ backgroundColor: 'background.default', py: { xs: 6, md: 9 } }}>
    <Container maxWidth="lg">
      <Grid container>
        {FEATURES.map((f, i) => (
          <Grid
            item
            xs={12}
            sm={4}
            key={f.title}
            sx={{
              textAlign: 'center',
              px: { xs: 0, sm: 4 },
              py: { xs: 4, sm: 0 },
              borderLeft: { sm: i === 0 ? 'none' : '1px solid #2E2A24' },
              borderTop: { xs: i === 0 ? 'none' : '1px solid #2E2A24', sm: 'none' },
            }}
          >
            <Box sx={{ width: 44, height: 44, mx: 'auto', mb: 2.5 }}>{f.icon}</Box>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mb: 1 }}>
              {f.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.65, maxWidth: 260, mx: 'auto' }}>
              {f.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default HomeFeatures;
