import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import VillaIcon from '@mui/icons-material/Villa';
import InfoIcon from '@mui/icons-material/Info';
import { useLanguage } from '../context/LanguageContext';
import { logEvent } from '../firebase';

const MobileActionBar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: <HomeIcon />, label: t('nav_home'), to: '/' },
    { icon: <ApartmentIcon />, label: t('nav_projects'), to: '/projects' },
    { icon: <VillaIcon />, label: t('nav_properties'), to: '/properties' },
    { icon: <InfoIcon />, label: t('nav_about'), to: '/about' },
  ];

  const goTo = (item) => {
    logEvent('select_content', { item: `mobile_bar_${item.label}` });
    navigate(item.to);
  };

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        backgroundColor: 'primary.dark',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0px -4px 16px rgba(0,0,0,0.15)',
      }}
    >
      {navItems.map((item) => {
        const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
        return (
          <Box
            key={item.label}
            component="button"
            onClick={() => goTo(item)}
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 0.25,
              py: 1.25,
              border: 'none',
              backgroundColor: 'transparent',
              color: active ? 'secondary.main' : 'white',
              textDecoration: 'none',
              cursor: 'pointer',
              '& svg': { fontSize: 20 },
            }}
          >
            {item.icon}
            <Typography variant="caption" sx={{ fontSize: '0.65rem', fontWeight: 600 }}>
              {item.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default MobileActionBar;
