import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import { VerifiedUser, CalendarMonth, Groups, Home } from '@mui/icons-material';

const TrustBadges = () => {
  const badges = [
    { icon: <CalendarMonth />, label: 'Since 2008' },
    { icon: <VerifiedUser />, label: 'MVDA Approved' },
    { icon: <Groups />, label: '1,000+ Families Housed' },
    { icon: <Home />, label: '50+ Projects Delivered' },
  ];

  return (
    <Box sx={{ backgroundColor: 'primary.dark', py: 2.5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          {badges.map((badge) => (
            <Grid item xs={6} md={3} key={badge.label}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: { xs: 'center', sm: 'left' },
                  gap: { xs: 0.5, sm: 1 },
                  color: 'white',
                }}
              >
                <Box sx={{ color: 'secondary.light', display: 'flex', '& svg': { fontSize: 20 } }}>
                  {badge.icon}
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {badge.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default TrustBadges;
