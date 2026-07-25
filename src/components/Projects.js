import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Container, Typography, Grid, Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { projects as staticProjects } from '../data/projects';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from './ProjectCard';

const Projects = () => {
  const { t } = useLanguage();
  const { data: listings } = useCollection('listings');
  const firestoreProjects = listings.filter((l) => l.category === 'Project');
  const allProjects = firestoreProjects.length > 0 ? firestoreProjects : staticProjects;
  const featured = allProjects.filter((p) => p.featured).slice(0, 6);
  const shown = featured.length > 0 ? featured : allProjects.slice(0, 6);

  return (
    <Box id="projects" sx={{ py: 8, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 2, mb: 1 }}>
          <Typography variant="h3" component="h1" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary' }}>
            {t('featured_title')}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {t('portfolio_count', allProjects.length)}
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', maxWidth: 800, fontWeight: 400 }}>
          {t('portfolio_subtitle')}
        </Typography>

        <Grid container spacing={3}>
          {shown.map((project) => (
            <Grid item xs={12} sm={6} lg={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
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
