import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Chip, Box, Button, IconButton } from '@mui/material';
import { LocationOn, Map, Visibility, Fullscreen } from '@mui/icons-material';
import { getStatusColor } from '../data/projects';
import { useLanguage } from '../context/LanguageContext';
import RibbonBadge from './RibbonBadge';
import ImageLightbox from './ImageLightbox';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const detailPath = project.category === 'Property' ? `/property/${project.id}` : `/project/${project.id}`;
  const gallery = project.images && project.images.length > 0 ? project.images : [project.image];

  return (
    <Card
      onClick={() => navigate(detailPath)}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'secondary.main' },
      }}
    >
      <Box sx={{ position: 'relative', p: 1.5, pb: 0 }}>
        {project.badge?.label && <RibbonBadge label={project.badge.label} color={project.badge.color} />}
        <CardMedia
          component="img"
          height="180"
          image={project.image}
          alt={project.title}
          sx={{ objectFit: 'cover', borderRadius: 2 }}
        />
        <Chip
          label={project.status}
          size="small"
          color={getStatusColor(project.status)}
          sx={{ position: 'absolute', bottom: 12, left: 24, fontWeight: 700, color: '#fff' }}
        />
        {project.type && (
          <Chip
            label={project.type}
            size="small"
            sx={{
              position: 'absolute',
              top: 24,
              right: 24,
              backgroundColor: 'rgba(255,255,255,0.94)',
              color: 'text.primary',
              fontWeight: 700,
            }}
          />
        )}
        <IconButton
          onClick={(e) => { e.stopPropagation(); setActiveImage(0); setLightboxOpen(true); }}
          size="small"
          sx={{ position: 'absolute', bottom: 12, right: 24, backgroundColor: 'rgba(15,23,42,0.55)', color: '#fff', '&:hover': { backgroundColor: 'rgba(15,23,42,0.75)' } }}
          aria-label="View fullscreen"
        >
          <Fullscreen fontSize="small" />
        </IconButton>
      </Box>

      <ImageLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={gallery}
        activeIndex={activeImage}
        onNavigate={setActiveImage}
        alt={project.title}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
          {project.title}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {project.location}
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '1.15rem', mb: 1, color: 'secondary.main' }}>
          {project.price}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {project.description.substring(0, 100)}...
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {project.features.slice(0, 3).map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem', borderColor: '#3A342C', color: 'text.secondary' }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Map />}
            onClick={(e) => { e.stopPropagation(); window.open(project.mapLink, '_blank'); }}
            sx={{ flex: 1, borderColor: 'secondary.main', color: 'text.primary' }}
          >
            {t('view_map')}
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<Visibility />}
            onClick={(e) => { e.stopPropagation(); navigate(detailPath); }}
            sx={{ flex: 1, backgroundColor: 'secondary.main', '&:hover': { backgroundColor: 'secondary.dark' } }}
          >
            {t('details')}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
