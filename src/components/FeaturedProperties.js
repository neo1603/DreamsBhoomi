import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { properties as staticProperties } from '../data/properties';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import FeaturedTile from './FeaturedTile';

const FeaturedProperties = () => {
  const { t } = useLanguage();
  const { data: listings } = useCollection('listings');
  const firestoreProperties = listings.filter((l) => l.category === 'Property');
  const allProperties = firestoreProperties.length > 0 ? firestoreProperties : staticProperties;
  const featured = allProperties.filter((p) => p.featured).slice(0, 3);
  const shown = featured.length > 0 ? featured : allProperties.slice(0, 3);

  return (
    <Box id="properties" sx={{ py: 8, backgroundColor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
            {t('featured_properties_title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            {t('featured_properties_subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {shown.map((property) => (
            <Grid item xs={12} sm={4} key={property.id}>
              <FeaturedTile item={property} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
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
