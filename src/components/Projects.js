import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { projects as staticProjects } from '../data/projects';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import FeaturedTile from './FeaturedTile';

const Projects = () => {
  const { t } = useLanguage();
  const { data: listings } = useCollection('listings');
  const firestoreProjects = listings.filter((l) => l.category === 'Project');
  const allProjects = firestoreProjects.length > 0 ? firestoreProjects : staticProjects;
  const featured = allProjects.filter((p) => p.featured).slice(0, 3);
  const shown = featured.length > 0 ? featured : allProjects.slice(0, 3);

  return (
    <Box id="projects" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h1" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 1.5 }}>
            {t('featured_title')}
          </Typography>
          <Typography variant="h6" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontWeight: 400 }}>
            {t('portfolio_subtitle')}
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {shown.map((project) => (
            <Grid item xs={12} sm={4} key={project.id}>
              <FeaturedTile item={project} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Button
            component={RouterLink}
            to="/projects"
            variant="outlined"
            size="large"
            endIcon={<ArrowForward />}
            sx={{ borderColor: 'secondary.main', color: 'text.primary', borderWidth: 1.5, px: 4 }}
          >
            {t('view_all_projects')}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Projects;
