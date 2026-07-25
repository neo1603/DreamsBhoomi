import React from 'react';
import { Container, Typography, Box, Grid, Card, CardContent, Chip, Button } from '@mui/material';
import { Phone, WhatsApp } from '@mui/icons-material';
import { useDocument } from '../hooks/useDocument';

const DEFAULT_SETTINGS = {
  phones: '+91 90842 03961, +91 80025 23318, +91 84451 50180, +91 98976 46552',
  whatsapp: '+91 90842 03961',
  email: 'info@dreamsbhoomi.com',
};

const OPENINGS = [
  {
    title: 'Telecaller',
    department: 'Restaurant & Movie Theater',
    type: 'Full-time',
    description: 'Handle incoming calls, table and show bookings, and customer queries. Good communication in Hindi is a must; basic English is a plus.',
  },
  {
    title: 'Sales Person',
    department: 'Restaurant & Movie Theater',
    type: 'Full-time',
    description: 'Drive walk-in sales, group bookings, and local tie-ups. Prior experience in hospitality or retail sales preferred but not required.',
  },
  {
    title: 'Restaurant Staff',
    department: 'Restaurant',
    type: 'Full-time',
    description: 'Kitchen, service, and floor staff roles. Training provided. Open to freshers.',
  },
  {
    title: 'Movie Theater Staff',
    department: 'Movie Theater',
    type: 'Full-time',
    description: 'Ticketing, ushering, concessions, and housekeeping roles. Training provided. Open to freshers.',
  },
];

const Careers = () => {
  const { data: settingsDoc } = useDocument('settings', 'general');
  const settings = { ...DEFAULT_SETTINGS, ...settingsDoc };
  const primaryPhone = settings.phones.split(',')[0].trim();

  return (
    <Container maxWidth="lg" sx={{ pt: { xs: '110px', md: '140px' }, pb: { xs: 6, md: 10 } }}>
      <Typography variant="h3" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1 }}>
        Careers
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.secondary', mb: 6, fontWeight: 400, maxWidth: 700 }}>
        We're hiring across our restaurant and movie theater businesses. Male and female candidates are both welcome to apply for every role below.
      </Typography>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {OPENINGS.map((job) => (
          <Grid item xs={12} md={6} key={job.title}>
            <Card sx={{ height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, gap: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {job.title}
                  </Typography>
                  <Chip label={job.type} size="small" sx={{ backgroundColor: '#3A3226', color: 'text.primary', fontWeight: 600 }} />
                </Box>
                <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600, mb: 1.5 }}>
                  {job.department}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                  {job.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ p: 4, borderRadius: 3, backgroundColor: 'background.paper', border: '1px solid #2E2A24' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          How to apply
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
          {`Call or WhatsApp us with the role you're interested in, or email your details to ${settings.email}.`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            startIcon={<Phone />}
            href={`tel:${primaryPhone}`}
            sx={{ backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
          >
            Call Now
          </Button>
          <Button
            variant="outlined"
            startIcon={<WhatsApp />}
            href={`https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderColor: 'secondary.main', color: 'text.primary' }}
          >
            WhatsApp
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Careers;
