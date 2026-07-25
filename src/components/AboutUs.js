import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import { useLanguage } from '../context/LanguageContext';
import { useDocument } from '../hooks/useDocument';

const AboutUs = () => {
  const { t } = useLanguage();
  const { data: companyDetails } = useDocument('settings', 'companyDetails');
  const stats = [
    { value: companyDetails?.founded || '2008', label: t('stat_founded') },
    { value: companyDetails?.familiesServed || '1,000+', label: t('stat_families') },
    { value: companyDetails?.projectsDelivered || '50+', label: t('stat_projects') },
    { value: companyDetails?.yearsInBrij || '15+', label: t('stat_brij_years') },
  ];

  return (
    <Box id="about" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h3" component="h2" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 3 }}>
              {t('about_title')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
              {t('about_p1')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2, lineHeight: 1.8 }}>
              {t('about_p2')}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              {t('about_p3')}
            </Typography>
          </Grid>
          <Grid item xs={12} md={5}>
            <Grid container spacing={2}>
              {stats.map((stat) => (
                <Grid item xs={6} key={stat.label}>
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundColor: 'primary.main',
                      color: 'white',
                      borderRadius: 5,
                      p: 3,
                      textAlign: 'center',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="svg"
                      viewBox="0 0 80 80"
                      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}
                    >
                      <defs>
                        <pattern id={`scallop-${stat.label}`} width="16" height="16" patternUnits="userSpaceOnUse">
                          <path d="M0 16 A 8 8 0 0 1 16 16" fill="none" stroke="#ffffff" strokeWidth="1.5" />
                        </pattern>
                      </defs>
                      <rect width="80" height="80" fill={`url(#scallop-${stat.label})`} />
                    </Box>
                    <Typography variant="h4" sx={{ position: 'relative', fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, color: 'secondary.light' }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ position: 'relative', opacity: 0.8, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.75rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutUs;
