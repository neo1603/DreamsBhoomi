import React from 'react';
import { Box, Fab, Tooltip } from '@mui/material';
import { Phone, WhatsApp } from '@mui/icons-material';
import { useLanguage } from '../context/LanguageContext';
import { logEvent } from '../firebase';

const FloatingContactButtons = () => {
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 1.5,
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 1200,
      }}
    >
      <Tooltip title={t('hero_whatsapp')} placement="left">
        <Fab
          href="https://wa.me/919084203961"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => logEvent('contact', { method: 'whatsapp', location: 'floating_button' })}
          sx={{ backgroundColor: '#25d366', color: '#fff', '&:hover': { backgroundColor: '#1ea952' } }}
        >
          <WhatsApp />
        </Fab>
      </Tooltip>
      <Tooltip title={t('hero_call_now')} placement="left">
        <Fab
          href="tel:+919084203961"
          onClick={() => logEvent('contact', { method: 'call', location: 'floating_button' })}
          sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', '&:hover': { backgroundColor: 'secondary.dark', color: '#fff' } }}
        >
          <Phone />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingContactButtons;
