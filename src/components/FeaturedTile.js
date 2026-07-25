import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

// The simplified image + title + one-line caption tile used for the
// homepage's Featured Projects/Properties rows — deliberately lighter than
// ProjectCard (no price, status, or buttons), matching the plain gallery
// tiles the approved design showed for this specific section. ProjectCard
// stays as-is for the full listing pages, where that extra detail matters.
const FeaturedTile = ({ item }) => {
  const navigate = useNavigate();
  const detailPath = item.category === 'Property' ? `/property/${item.id}` : `/project/${item.id}`;

  return (
    <Box onClick={() => navigate(detailPath)} sx={{ cursor: 'pointer' }}>
      <Box
        component="img"
        src={item.image}
        alt={item.title}
        sx={{ width: '100%', height: { xs: 220, md: 240 }, objectFit: 'cover', borderRadius: 1.5, display: 'block' }}
      />
      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary', mt: 2, mb: 0.5 }}>
        {item.title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {item.location}
      </Typography>
    </Box>
  );
};

export default FeaturedTile;
