import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import {
  Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider,
  Drawer, IconButton,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Apartment,
  Home,
  Image as ImageIcon,
  Inbox,
  RateReview,
  BarChart,
  Business,
  Groups,
  Settings as SettingsIcon,
  Logout,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

const DRAWER_WIDTH = 240;

const manageItems = [
  { to: '/admin/projects', label: 'Projects', icon: <Apartment /> },
  { to: '/admin/properties', label: 'Properties', icon: <Home /> },
  { to: '/admin/banners', label: 'Banners', icon: <ImageIcon /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <RateReview /> },
  { to: '/admin/enquiries', label: 'Enquiries', icon: <Inbox /> },
  { to: '/admin/analytics', label: 'Analytics', icon: <BarChart /> },
];

const companyItems = [
  { to: '/admin/company-details', label: 'Company Details', icon: <Business /> },
  { to: '/admin/team', label: 'Team', icon: <Groups /> },
  { to: '/admin/settings', label: 'Settings', icon: <SettingsIcon /> },
];

const AdminLayout = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const closeDrawer = () => setMobileOpen(false);

  const navButtonSx = {
    borderRadius: 1.5,
    mb: 0.5,
    color: '#C4B7A5',
    '&.active': { backgroundColor: 'secondary.main', color: '#fff' },
    '&:hover': { backgroundColor: '#2E2A24' },
  };

  const sidebarContent = (
    <>
      <Box sx={{ p: 3 }}>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
          Dreams<Box component="span" sx={{ color: 'secondary.main' }}>भूमि</Box>
        </Typography>
        <Typography variant="caption" sx={{ color: '#9B9686' }}>Admin Dashboard</Typography>
      </Box>
      <Divider sx={{ borderColor: '#2E2A24' }} />
      <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
        <List disablePadding>
          <ListItemButton component={NavLink} to="/admin" end onClick={closeDrawer} sx={navButtonSx}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>

        <Typography variant="caption" sx={{ color: '#9B9686', display: 'block', mt: 2, mb: 0.5, px: 1.5, fontWeight: 700, letterSpacing: '0.05em' }}>
          MANAGE
        </Typography>
        <List disablePadding>
          {manageItems.map((item) => (
            <ListItemButton key={item.to} component={NavLink} to={item.to} onClick={closeDrawer} sx={navButtonSx}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Typography variant="caption" sx={{ color: '#9B9686', display: 'block', mt: 2, mb: 0.5, px: 1.5, fontWeight: 700, letterSpacing: '0.05em' }}>
          COMPANY
        </Typography>
        <List disablePadding>
          {companyItems.map((item) => (
            <ListItemButton key={item.to} component={NavLink} to={item.to} onClick={closeDrawer} sx={navButtonSx}>
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
      <Divider sx={{ borderColor: '#2E2A24' }} />
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" sx={{ color: '#9B9686', display: 'block', mb: 1 }}>
          {user?.email}
        </Typography>
        <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1.5, color: '#C4B7A5', '&:hover': { backgroundColor: '#2E2A24' } }}>
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#161719' }}>
      {/* Mobile top bar — the fixed sidebar below is desktop-only, so small
          screens need a hamburger to reach the same nav instead of it being
          permanently rendered and pushing content off-screen. */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: 1.5,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          backgroundColor: '#1E2023',
          borderBottom: '1px solid #2E2A24',
          px: 2,
          py: 1.5,
        }}
      >
        <IconButton onClick={() => setMobileOpen(true)} sx={{ color: '#E4D5C2' }} aria-label="open menu">
          <MenuIcon />
        </IconButton>
        <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>
          Dreams<Box component="span" sx={{ color: 'secondary.main' }}>भूमि</Box> Admin
        </Typography>
      </Box>

      <Box sx={{ display: 'flex' }}>
        <Box
          component="nav"
          sx={{
            display: { xs: 'none', md: 'flex' },
            width: DRAWER_WIDTH,
            flexShrink: 0,
            backgroundColor: '#1E2023',
            borderRight: '1px solid #2E2A24',
            flexDirection: 'column',
            position: 'fixed',
            height: '100vh',
          }}
        >
          {sidebarContent}
        </Box>

        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={closeDrawer}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              backgroundColor: '#1E2023',
              display: 'flex',
              flexDirection: 'column',
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, width: '100%', ml: { md: `${DRAWER_WIDTH}px` }, p: { xs: 2, md: 4 } }}>
          <PageTransition />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
