import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { Box, Typography, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
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
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';

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

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0F172A' }}>
      <Box
        component="nav"
        sx={{
          width: 240,
          flexShrink: 0,
          backgroundColor: '#1E293B',
          borderRight: '1px solid #334155',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100vh',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>
            Dreams<Box component="span" sx={{ color: 'secondary.main' }}>भूमि</Box>
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>Admin Dashboard</Typography>
        </Box>
        <Divider sx={{ borderColor: '#334155' }} />
        <Box sx={{ flexGrow: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
          <List disablePadding>
            <ListItemButton
              component={NavLink}
              to="/admin"
              end
              sx={{
                borderRadius: 1.5,
                mb: 0.5,
                color: '#CBD5E1',
                '&.active': { backgroundColor: 'secondary.main', color: '#fff' },
                '&:hover': { backgroundColor: '#334155' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </List>

          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 2, mb: 0.5, px: 1.5, fontWeight: 700, letterSpacing: '0.05em' }}>
            MANAGE
          </Typography>
          <List disablePadding>
            {manageItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  color: '#CBD5E1',
                  '&.active': { backgroundColor: 'secondary.main', color: '#fff' },
                  '&:hover': { backgroundColor: '#334155' },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>

          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mt: 2, mb: 0.5, px: 1.5, fontWeight: 700, letterSpacing: '0.05em' }}>
            COMPANY
          </Typography>
          <List disablePadding>
            {companyItems.map((item) => (
              <ListItemButton
                key={item.to}
                component={NavLink}
                to={item.to}
                sx={{
                  borderRadius: 1.5,
                  mb: 0.5,
                  color: '#CBD5E1',
                  '&.active': { backgroundColor: 'secondary.main', color: '#fff' },
                  '&:hover': { backgroundColor: '#334155' },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
          </List>
        </Box>
        <Divider sx={{ borderColor: '#334155' }} />
        <Box sx={{ p: 2 }}>
          <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1 }}>
            {user?.email}
          </Typography>
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 1.5, color: '#CBD5E1', '&:hover': { backgroundColor: '#334155' } }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}><Logout /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, ml: '240px', p: 4 }}>
        <PageTransition />
      </Box>
    </Box>
  );
};

export default AdminLayout;
