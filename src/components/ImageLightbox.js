import React from 'react';
import { Dialog, Box, IconButton, Typography } from '@mui/material';
import { Close, ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// Fullscreen image viewer shared by the project/property detail gallery and
// the listing cards. Uses a frosted-glass backdrop (blurred page content
// showing through a translucent tint) instead of a flat theme-colored panel.
const ImageLightbox = ({ open, onClose, images, activeIndex, onNavigate, alt }) => {
  const hasMultiple = images.length > 1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen
      PaperProps={{
        sx: {
          backgroundColor: 'rgba(15,23,42,0.45)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: 'none',
        },
      }}
    >
      {/* MUI Dialog renders via a portal, but React's synthetic events still
          bubble through the component tree — so without this, clicks on
          Close/Next/Prev here would also fire an ancestor card's onClick
          (e.g. ProjectCard's "navigate to detail" handler). */}
      <Box
        onClick={(e) => e.stopPropagation()}
        sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 16, right: 16, color: '#fff', zIndex: 1 }}
          aria-label="Close"
        >
          <Close fontSize="large" />
        </IconButton>

        {hasMultiple && (
          <IconButton
            onClick={() => onNavigate((activeIndex - 1 + images.length) % images.length)}
            sx={{ position: 'absolute', left: { xs: 8, md: 24 }, color: '#fff', zIndex: 1 }}
            aria-label="Previous image"
          >
            <ArrowBackIos />
          </IconButton>
        )}

        <Box
          component="img"
          src={images[activeIndex]}
          alt={alt}
          sx={{ maxWidth: '92vw', maxHeight: '90vh', objectFit: 'contain' }}
        />

        {hasMultiple && (
          <IconButton
            onClick={() => onNavigate((activeIndex + 1) % images.length)}
            sx={{ position: 'absolute', right: { xs: 8, md: 24 }, color: '#fff', zIndex: 1 }}
            aria-label="Next image"
          >
            <ArrowForwardIos />
          </IconButton>
        )}

        {hasMultiple && (
          <Typography sx={{ position: 'absolute', bottom: 20, color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem' }}>
            {activeIndex + 1} / {images.length}
          </Typography>
        )}
      </Box>
    </Dialog>
  );
};

export default ImageLightbox;
