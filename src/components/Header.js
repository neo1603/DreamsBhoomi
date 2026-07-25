import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useLanguage } from '../context/LanguageContext';
import { logEvent } from '../firebase';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { t } = useLanguage();
  const navigate = useNavigate();

  const navItems = [
    { text: t('nav_home'), to: '/' },
    { text: t('nav_projects'), to: '/projects' },
    { text: t('nav_properties'), to: '/properties' },
    { text: t('nav_about'), to: '/about' },
  ];

  const goTo = (item) => {
    if (item.to) {
      navigate(item.hash ? `${item.to}${item.hash}` : item.to);
    } else if (item.hash) {
      document.getElementById(item.hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleEnquireNow = () => {
    logEvent('select_content', { item: 'header_enquire_now' });
    goTo({ to: '/about', hash: '#contact' });
  };

  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem
          button
          key={item.text}
          onClick={() => goTo(item)}
          sx={{ py: 2 }}
        >
          <ListItemText
            primary={item.text}
            sx={{
              textAlign: 'center',
              '& .MuiTypography-root': {
                fontWeight: 600,
                fontSize: '1.1rem',
                color: theme.palette.text.primary,
              },
            }}
          />
        </ListItem>
      ))}
      <ListItem sx={{ justifyContent: 'center', pt: 1 }}>
        <Button
          variant="contained"
          onClick={handleEnquireNow}
          sx={{ backgroundColor: 'secondary.main', color: 'secondary.contrastText', px: 4 }}
        >
          {t('nav_enquire')}
        </Button>
      </ListItem>
    </List>
  );

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'rgba(30,32,35,0.55)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(46,42,36,0.6)',
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ justifyContent: 'space-between', px: 0, gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 0, overflow: 'hidden' }}>
            <Box
              onClick={() => navigate('/')}
              sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.4, sm: 1 }, cursor: 'pointer', minWidth: 0 }}
            >
              <Box
                component="svg"
                viewBox="0 0 32 32"
                sx={{ width: { xs: 22, sm: 28, md: 32 }, height: { xs: 22, sm: 28, md: 32 }, flexShrink: 0 }}
              >
                <rect x="1" y="1" width="30" height="30" rx="6" fill={theme.palette.primary.dark} stroke={theme.palette.secondary.main} strokeWidth="1.5" />
                <path d="M16 7 L25 15 H21.5 V25 H10.5 V15 H7 Z" fill={theme.palette.secondary.main} />
              </Box>
              <Typography
                component="div"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.06em', md: '0.14em' },
                  fontSize: { xs: '0.72rem', sm: '0.95rem', md: '1.05rem', xl: '1.2rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Dreams
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: theme.palette.secondary.main,
                  fontFamily: 'serif',
                  fontWeight: 500,
                  fontSize: { xs: '0.95rem', sm: '1.3rem', md: '1.45rem', xl: '1.65rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                भूमि
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.06em', md: '0.14em' },
                  fontSize: { xs: '0.72rem', sm: '0.95rem', md: '1.05rem', xl: '1.2rem' },
                  whiteSpace: 'nowrap',
                }}
              >
                Developers
              </Typography>
            </Box>
            <Typography
              variant="caption"
              sx={{
                display: { xs: 'none', xl: 'block' },
                color: theme.palette.secondary.main,
                fontWeight: 500,
                fontSize: '0.8rem',
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              Being brijwasi
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.5, mr: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.text}
                    onClick={() => goTo(item)}
                    sx={{
                      color: theme.palette.text.primary,
                      fontWeight: 600,
                      textTransform: 'none',
                      fontSize: { lg: '0.82rem', xl: '0.95rem' },
                      px: { lg: 0.85, xl: 1.5 },
                      minWidth: 0,
                      '&:hover': {
                        backgroundColor: 'rgba(228,213,194,0.08)',
                      },
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            )}

            {!isMobile && (
              <Button
                variant="contained"
                onClick={handleEnquireNow}
                sx={{
                  backgroundColor: 'secondary.main',
                  color: 'secondary.contrastText',
                  px: 2.5,
                  '&:hover': { backgroundColor: 'secondary.dark', color: '#fff' },
                }}
              >
                {t('nav_enquire')}
              </Button>
            )}

            {isMobile && (
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: theme.palette.text.primary }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </Container>

      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            backgroundColor: 'background.paper',
            boxShadow: theme.shadows[8],
          },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Header;
