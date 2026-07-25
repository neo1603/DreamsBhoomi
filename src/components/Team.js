import React from 'react';
import { Box, Container, Typography, Grid, Avatar } from '@mui/material';
import { useCollection } from '../hooks/useCollection';

const Team = () => {
  const { data: team } = useCollection('team');

  if (team.length === 0) return null;

  return (
    <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1, textAlign: 'center' }}
        >
          Meet Our Team
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, textAlign: 'center' }}>
          The people behind DreamsBhoomi's projects and properties.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {team.map((member) => (
            <Grid item xs={6} sm={4} md={3} key={member.id} sx={{ textAlign: 'center' }}>
              <Avatar
                src={member.photo}
                alt={member.name}
                sx={{ width: 96, height: 96, mx: 'auto', mb: 2, border: '2px solid', borderColor: 'secondary.main' }}
              />
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                {member.name}
              </Typography>
              {member.role && (
                <Typography variant="body2" sx={{ color: 'secondary.main' }}>
                  {member.role}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Team;
