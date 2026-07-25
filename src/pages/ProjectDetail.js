import React, { useState } from 'react';
import { useParams, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import { LocationOn, Phone, Email, Map, ArrowBack, SquareFoot, Explore, Info, Event, Fullscreen } from '@mui/icons-material';
import { projects as staticProjects } from '../data/projects';
import { properties as staticProperties } from '../data/properties';
import { useCollection } from '../hooks/useCollection';
import { useLanguage } from '../context/LanguageContext';
import ProjectCard from '../components/ProjectCard';
import LoanCalculator from '../components/LoanCalculator';
import ImageLightbox from '../components/ImageLightbox';

const mapQueryFor = (project) => {
  try {
    return new URL(project.mapLink).searchParams.get('q') || project.location;
  } catch {
    return project.location;
  }
};

const SpecItem = ({ icon, label, value }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 2, py: 1.5, backgroundColor: 'background.paper', borderRadius: 2, border: '1px solid #2E2A24', flex: '1 1 140px' }}>
    <Box sx={{ color: 'secondary.main', display: 'flex' }}>{icon}</Box>
    <Box>
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1.2 }}>{label}</Typography>
      <Typography variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>{value}</Typography>
    </Box>
  </Box>
);

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { data: listings } = useCollection('listings');
  const firestoreProjects = listings.filter((l) => l.category === 'Project');
  const firestoreProperties = listings.filter((l) => l.category === 'Property');
  const allProjects = [
    ...(firestoreProjects.length > 0 ? firestoreProjects : staticProjects),
    ...(firestoreProperties.length > 0 ? firestoreProperties : staticProperties),
  ];
  const project = allProjects.find((p) => String(p.id) === id);
  const isProperty = project?.category === 'Property';
  const backPath = isProperty ? '/properties' : '/projects';
  const backLabel = isProperty ? 'Back to Properties' : 'Back to Projects';
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!project) {
    return (
      <Container maxWidth="md" sx={{ pt: { xs: '110px', md: '140px' }, pb: 10, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, mb: 2 }}>
          Project not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          This listing may have been removed or the link is incorrect.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')} sx={{ backgroundColor: 'primary.main' }}>
          Back to Portfolio
        </Button>
      </Container>
    );
  }

  const gallery = project.images && project.images.length > 0 ? project.images : [project.image];
  const similar = allProjects
    .filter((p) => p.id !== project.id && p.category === project.category && (p.location.includes(project.location.split(',')[0].split(' ')[0]) || p.status === project.status))
    .slice(0, 3);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '70vh' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: '110px', md: '140px' }, pb: { xs: 6, md: 10 } }}>
        <Button
          component={RouterLink}
          to={backPath}
          startIcon={<ArrowBack />}
          sx={{ mb: 4, color: 'text.primary', fontWeight: 700 }}
        >
          {backLabel}
        </Button>

        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', border: '1px solid #2E2A24', cursor: 'zoom-in' }} onClick={() => setLightboxOpen(true)}>
              <img
                src={gallery[activeImage]}
                alt={project.title}
                style={{ width: '100%', height: 420, objectFit: 'cover', display: 'block' }}
              />
              <Chip
                label={project.status}
                sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.94)', color: 'primary.dark', fontWeight: 700 }}
              />
              <IconButton
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                sx={{ position: 'absolute', bottom: 16, right: 16, backgroundColor: 'rgba(15,23,42,0.55)', color: '#fff', '&:hover': { backgroundColor: 'rgba(15,23,42,0.75)' } }}
                aria-label="View fullscreen"
              >
                <Fullscreen />
              </IconButton>
            </Box>
            {gallery.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, mt: 1.5, overflowX: 'auto' }}>
                {gallery.map((img, i) => (
                  <Box
                    key={i}
                    component="img"
                    src={img}
                    onClick={() => setActiveImage(i)}
                    sx={{
                      width: 84,
                      height: 64,
                      objectFit: 'cover',
                      borderRadius: 1.5,
                      cursor: 'pointer',
                      flexShrink: 0,
                      border: i === activeImage ? '2px solid' : '2px solid transparent',
                      borderColor: i === activeImage ? 'secondary.main' : 'transparent',
                      opacity: i === activeImage ? 1 : 0.7,
                    }}
                  />
                ))}
              </Box>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontFamily: 'Optima, Candara, "Century Gothic", sans-serif', fontWeight: 700, color: 'text.primary', mb: 2 }}>
              {project.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1" color="text.secondary">{project.location}</Typography>
            </Box>

            <Typography sx={{ fontFamily: 'Charter, Georgia, serif', fontWeight: 700, fontSize: '1.75rem', color: 'secondary.main', mb: 3 }}>
              {project.price}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 4 }}>
              <SpecItem icon={<SquareFoot />} label={t('spec_area')} value={project.area} />
              <SpecItem icon={<Explore />} label={t('spec_facing')} value={project.facing || '—'} />
              <SpecItem icon={<Info />} label={t('spec_status')} value={project.status} />
              <SpecItem icon={<Event />} label={t('spec_possession')} value={project.completionDate || project.launchDate || '—'} />
            </Box>

            <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8, color: 'text.primary' }}>
              {project.description}
            </Typography>

            {project.plotSizes?.length > 0 && (
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                  Available Sizes / Units
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {project.plotSizes.map((size, index) => (
                    <Chip key={index} label={size} variant="outlined" sx={{ borderColor: 'secondary.main', color: 'text.primary' }} />
                  ))}
                </Box>
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, mb: 1.5, color: 'text.primary' }}>
                Features & Amenities
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.features.map((feature, index) => (
                  <Chip key={index} label={feature} size="small" sx={{ backgroundColor: '#3A3226', color: 'text.primary' }} />
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', border: '1px solid #2E2A24', height: 260 }}>
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(mapQueryFor(project))}&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map for ${project.title}`}
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<Phone />}
                href={`tel:${project.contact}`}
                sx={{ flex: 1, minWidth: 150, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
              >
                Call Now
              </Button>
              <Button
                variant="outlined"
                startIcon={<Email />}
                href={`mailto:${project.email}`}
                sx={{ flex: 1, minWidth: 150, borderColor: 'secondary.main', borderWidth: 1.5, color: 'text.primary' }}
              >
                Email
              </Button>
              <Button
                variant="outlined"
                startIcon={<Map />}
                onClick={() => window.open(project.mapLink, '_blank')}
                sx={{ flex: 1, minWidth: 150, borderColor: 'secondary.main', borderWidth: 1.5, color: 'text.primary' }}
              >
                View on Map
              </Button>
            </Box>
          </Grid>
        </Grid>

        {similar.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Typography variant="h5" sx={{ fontFamily: 'Optima, Candara, sans-serif', fontWeight: 700, color: 'text.primary', mb: 3 }}>
              {t('similar_projects')}
            </Typography>
            <Grid container spacing={3}>
              {similar.map((p) => (
                <Grid item xs={12} sm={6} md={4} key={p.id}>
                  <ProjectCard project={p} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Container>

      <LoanCalculator />

      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        activeIndex={activeImage}
        onNavigate={setActiveImage}
        alt={project.title}
      />
    </Box>
  );
};

export default ProjectDetail;
