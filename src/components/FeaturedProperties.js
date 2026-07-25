import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { properties as staticProperties } from '../data/properties';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';

const FeaturedProperties = () => {
  const { t } = useLanguage();
  const { data: listings } = useCollection('listings');
  const firestoreProperties = listings.filter((l) => l.category === 'Property');
  const allProperties = firestoreProperties.length > 0 ? firestoreProperties : staticProperties;
  const featured = allProperties.filter((p) => p.featured).slice(0, 6);
  const shown = featured.length > 0 ? featured : allProperties.slice(0, 6);

  return (
    <Box id="properties" sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 2, mb: 1 }}>
          <Typography variant="h3" component="h2" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary' }}>
            {t('featured_properties_title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {t('properties_count', allProperties.length)}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', maxWidth: 800, fontWeight: 400 }}>
          {t('featured_properties_subtitle')}
        </Typography>

        <Grid container spacing={3}>
          {shown.map((property) => (
            <Grid item xs={12} sm={6} lg={4} key={property.id}>
              <ProjectCard project={property} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Button
            component={RouterLink}
            to="/properties"
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            sx={{ borderColor: 'secondary.main', color: 'text.primary', borderWidth: 1.5, px: 4 }}
          >
            {t('view_all_properties')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturedProperties;
